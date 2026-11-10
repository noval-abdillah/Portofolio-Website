'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Skill } from '@/types';
import { PlusIcon, TrashIcon, CheckIcon, WarningIcon, SVGSpinner } from '@/components/ui';

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [newName, setNewName] = useState('');
  const [category, setCategory] = useState<'tech' | 'office'>('tech');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal memuat skills dari Supabase.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('skills').insert([
        {
          name: newName.trim(),
          category,
        },
      ]);

      if (error) throw error;

      setFeedback({ type: 'success', message: `Keahlian "${newName.trim()}" berhasil ditambahkan.` });
      setNewName('');
      fetchSkills();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal menambahkan keahlian.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    setDeletingId(id);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;

      setFeedback({ type: 'success', message: `"${name}" berhasil dihapus.` });
      fetchSkills();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal menghapus keahlian.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const techList = skills.filter((s) => s.category === 'tech');
  const officeList = skills.filter((s) => s.category === 'office');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white font-mono">PENGELOLA KEAHLIAN & TECH STACK</h2>
        <p className="text-sm text-zinc-400">Atur badge keahlian teknis dan software perkantoran di halaman About.</p>
      </div>

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

      {/* Add New Skill Bar */}
      <form
        onSubmit={handleAddSkill}
        className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col sm:flex-row gap-3 items-center"
      >
        <input
          type="text"
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama skill (misal: Docker, Supabase, Excel)"
          className="flex-1 w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500 font-mono"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'tech' | 'office')}
          aria-label="Pilih Kategori Keahlian"
          className="w-full sm:w-auto px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500 font-mono"
        >
          <option value="tech">Kategori: Tech Stack</option>
          <option value="office">Kategori: Office Tools</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-zinc-950 font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.2)] shrink-0"
        >
          {submitting ? <SVGSpinner size={16} /> : <PlusIcon className="w-4 h-4 stroke-[3]" />}
          <span>Tambah</span>
        </button>
      </form>

      {/* Skills Display Grid */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <SVGSpinner size={36} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-xl">
            <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center justify-between">
              <span>TECH STACK ({techList.length})</span>
              <span className="text-xs text-teal-500 font-normal">Tampil di About</span>
            </h3>
            {techList.length === 0 ? (
              <p className="text-xs text-zinc-500 font-mono">Belum ada tech stack di database (menggunakan fallback bawaan).</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {techList.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs rounded-full font-mono group"
                  >
                    <span>{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id, skill.name)}
                      disabled={deletingId === skill.id}
                      className="text-zinc-500 hover:text-red-400 ml-1 cursor-pointer"
                      title={`Hapus ${skill.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Office Tools */}
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-xl">
            <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center justify-between">
              <span>OFFICE TOOLS ({officeList.length})</span>
              <span className="text-xs text-teal-500 font-normal">Tampil di About</span>
            </h3>
            {officeList.length === 0 ? (
              <p className="text-xs text-zinc-500 font-mono">Belum ada office tools di database (menggunakan fallback bawaan).</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {officeList.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs rounded-full font-mono group"
                  >
                    <span>{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id, skill.name)}
                      disabled={deletingId === skill.id}
                      className="text-zinc-500 hover:text-red-400 ml-1 cursor-pointer"
                      title={`Hapus ${skill.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
