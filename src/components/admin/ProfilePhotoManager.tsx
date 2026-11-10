'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { UploadIcon, CheckIcon, WarningIcon, SVGSpinner } from '@/components/ui';
import { getProfileImage } from '@/lib/cms';

export default function ProfilePhotoManager() {
  const [currentUrl, setCurrentUrl] = useState<string>('/images/Profil.jpeg');
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadPhoto();
  }, []);

  const loadPhoto = async () => {
    setLoading(true);
    try {
      const url = await getProfileImage();
      setCurrentUrl(url);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFeedback(null);
  };

  const handleUpload = async () => {
    if (!previewFile) return;

    setUploading(true);
    setFeedback(null);

    try {
      const supabase = createClient();
      const fileExt = previewFile.name.split('.').pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;

      // 1. Upload ke bucket profile
      const { error: uploadError } = await supabase.storage
        .from('profile')
        .upload(fileName, previewFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 2. Ambil public URL
      const { data: publicUrlData } = supabase.storage
        .from('profile')
        .getPublicUrl(fileName);

      const newPublicUrl = publicUrlData.publicUrl;

      // 3. Simpan URL ke site_settings
      const { error: dbError } = await supabase
        .from('site_settings')
        .upsert({
          key: 'profile_image_url',
          value: newPublicUrl,
        });

      if (dbError) throw dbError;

      setCurrentUrl(newPublicUrl);
      setPreviewFile(null);
      setPreviewUrl(null);
      setFeedback({
        type: 'success',
        message: 'Foto profil berhasil diperbarui secara global di portofolio!',
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal memperbarui foto profil.',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white font-mono">PENGELOLA FOTO PROFIL</h2>
        <p className="text-sm text-zinc-400">
          Ubah foto potret profil utama yang tampil di kartu 3D halaman About secara real-time.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-sm animate-in fade-in duration-300 ${
            feedback.type === 'success'
              ? 'bg-green-950/20 border border-green-800/40 text-green-400'
              : 'bg-red-950/20 border border-red-800/40 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <WarningIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
        {/* Upload Section */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-6">
          <label className="block text-xs font-mono text-zinc-400">PILIH FOTO BARU (JPG, PNG, WEBP)</label>

          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-800 hover:border-teal-500/50 rounded-xl cursor-pointer bg-zinc-950/50 transition-colors">
            <UploadIcon className="w-10 h-10 text-zinc-500 mb-3" />
            <span className="text-sm text-zinc-200 font-semibold text-center">
              {previewFile ? previewFile.name : 'Klik atau drag foto potret ke sini'}
            </span>
            <span className="text-xs text-zinc-500 mt-1">Rekomendasi rasio 4:5 atau 1:1, max 5MB</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {previewFile && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setPreviewFile(null);
                  setPreviewUrl(null);
                }}
                className="flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={uploading}
                onClick={handleUpload}
                className="flex-1 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-zinc-950 font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              >
                {uploading && <SVGSpinner size={16} />}
                <span>{uploading ? 'Mengunggah...' : 'Simpan Foto'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Live Preview Card */}
        <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center">
          <span className="text-xs font-mono text-zinc-400 block mb-4">
            {previewUrl ? 'PREVIEW FOTO BARU' : 'FOTO PROFIL AKTIF SAAT INI'}
          </span>

          <div className="relative w-48 h-60 mx-auto rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-950 shadow-2xl">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <SVGSpinner size={32} />
              </div>
            ) : (
              <Image
                src={previewUrl || currentUrl}
                alt="Foto Profil"
                fill
                className="object-cover"
                sizes="200px"
              />
            )}
          </div>

          <p className="text-xs text-zinc-500 font-mono mt-4 truncate max-w-full">
            {previewUrl ? 'Foto belum disimpan — klik "Simpan Foto"' : currentUrl}
          </p>
        </div>
      </div>
    </div>
  );
}
