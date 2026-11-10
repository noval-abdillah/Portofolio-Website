'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Certificate } from '@/types';
import { PlusIcon, TrashIcon, CheckIcon, WarningIcon, UploadIcon, SVGSpinner } from '@/components/ui';

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    credential_url: '',
    display_order: 0,
    image: null as File | null,
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal memuat sertifikat. Pastikan tabel certificates sudah dibuat di Supabase.',
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadCertificateImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `cert-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('certificates')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      throw new Error(`Upload gambar gagal: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('certificates')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setFeedback({ type: 'error', message: 'Harap pilih file gambar sertifikat.' });
      return;
    }

    setFormLoading(true);
    setFeedback(null);

    try {
      const imageUrl = await uploadCertificateImage(formData.image);
      const supabase = createClient();

      const { error } = await supabase.from('certificates').insert([
        {
          title: formData.title,
          issuer: formData.issuer,
          credential_url: formData.credential_url || null,
          display_order: Number(formData.display_order) || 0,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      setFeedback({ type: 'success', message: 'Sertifikat berhasil ditambahkan!' });
      setFormData({
        title: '',
        issuer: '',
        credential_url: '',
        display_order: 0,
        image: null,
      });
      setShowForm(false);
      fetchCertificates();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal menyimpan sertifikat.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Yakin ingin menghapus sertifikat ini?')) return;
    setDeletingId(id);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from('certificates').delete().eq('id', id);
      if (dbError) throw dbError;

      if (imageUrl && imageUrl.includes('/certificates/')) {
        const parts = imageUrl.split('/certificates/');
        if (parts.length > 1) {
          const fileName = parts[1].split('?')[0];
          await supabase.storage.from('certificates').remove([fileName]);
        }
      }

      setFeedback({ type: 'success', message: 'Sertifikat berhasil dihapus.' });
      fetchCertificates();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal menghapus sertifikat.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono">PENGELOLA SERTIFIKAT</h2>
          <p className="text-sm text-zinc-400">Tambah, ubah, dan hapus sertifikat yang tampil di halaman About.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-zinc-950 font-bold rounded-lg text-sm flex items-center gap-2 w-fit transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)] cursor-pointer"
        >
          <PlusIcon className="w-4 h-4 stroke-[3]" />
          <span>{showForm ? 'Batal' : 'Tambah Sertifikat'}</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-sm animate-in fade-in duration-300 ${
            feedback.type === 'success'
              ? 'bg-teal-950/20 border border-teal-800/40 text-teal-400'
              : 'bg-red-950/20 border border-red-800/40 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckIcon className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
          ) : (
            <WarningIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-5 animate-in fade-in duration-300"
        >
          <h3 className="text-lg font-bold text-white font-mono">FORM TAMBAH SERTIFIKAT</h3>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">NAMA SERTIFIKAT *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="misal: Digital Talent Academy (KOMDIGI)"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">PENERBIT / ORGANISASI *</label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="misal: Google (via Coursera)"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">URL KREDENSIAL / VERIFIKASI (OPSIONAL)</label>
              <input
                type="url"
                value={formData.credential_url}
                onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                placeholder="https://coursera.org/verify/..."
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">URUTAN TAMPIL (ANGKA)</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-2">BERKAS GAMBAR SERTIFIKAT (PNG/JPG/WEBP) *</label>
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-800 hover:border-teal-500/50 rounded-xl cursor-pointer bg-zinc-950/50 transition-colors">
              <UploadIcon className="w-8 h-8 text-zinc-500 mb-2" />
              <span className="text-sm text-zinc-300 font-medium">
                {formData.image ? formData.image.name : 'Klik untuk unggah gambar sertifikat'}
              </span>
              <span className="text-xs text-zinc-500 mt-1">Maksimal 5MB</span>
              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-zinc-950 font-bold rounded-lg text-sm flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            >
              {formLoading && <SVGSpinner size={16} />}
              <span>Simpan Sertifikat</span>
            </button>
          </div>
        </form>
      )}

      {/* Certificates List */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <SVGSpinner size={36} />
        </div>
      ) : certificates.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 font-mono">Belum ada sertifikat di database. Jalankan migrasi SQL di Supabase.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl flex gap-4 items-start justify-between group hover:border-zinc-700 transition-colors"
            >
              <div className="relative w-24 h-20 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shrink-0">
                <Image
                  src={cert.image_url}
                  alt={cert.title}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-base truncate">{cert.title}</h4>
                <p className="text-zinc-400 text-xs mt-0.5">{cert.issuer}</p>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-teal-500 hover:underline mt-1 inline-block truncate max-w-full font-mono"
                  >
                    Tautan Verifikasi ↗
                  </a>
                )}
                <div className="text-[11px] text-zinc-500 font-mono mt-2">
                  Urutan: {cert.display_order ?? 0}
                </div>
              </div>
              <button
                onClick={() => handleDelete(cert.id, cert.image_url)}
                disabled={deletingId === cert.id}
                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Hapus Sertifikat"
              >
                {deletingId === cert.id ? <SVGSpinner size={16} /> : <TrashIcon className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
