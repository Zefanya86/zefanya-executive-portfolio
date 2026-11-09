'use client';

import React from 'react';
import { PortfolioData, ToolItem, LanguageItem } from '@/types/portfolio';
import { Wrench, Languages, Plus, Trash2 } from 'lucide-react';

interface ToolsLanguagesModuleProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ToolsLanguagesModule({ data, setData }: ToolsLanguagesModuleProps) {
  const tools = data.tools || [];
  const languages = data.languages || [];

  const updateTool = (id: string, updates: Partial<ToolItem>) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  const addTool = () => {
    const newId = `tool_${Date.now()}`;
    const newTool: ToolItem = {
      id: newId,
      name: 'Aplikasi / Software Baru',
      category: 'office',
      order: tools.length + 1,
    };
    setData((prev) => ({
      ...prev,
      tools: [...prev.tools, newTool],
    }));
  };

  const deleteTool = (id: string) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.id !== id),
    }));
  };

  return (
    <div className="space-y-10">
      {/* Tools Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
              <Wrench size={14} />
              <span>Perangkat Lunak, Alat Kerja & Pelaporan</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-ivory tracking-tight mt-1">
              Tools, Software & Documentation Suite ({tools.length})
            </h2>
            <p className="text-xs text-softGray font-sans mt-1">
              Microsoft Office, Google Workspace, Reporting Tools, Adobe Photoshop, Illustrator, CapCut.
            </p>
          </div>

          <button
            onClick={addTool}
            className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-sans font-bold flex items-center gap-1.5 hover:bg-ivory transition-all shadow-luxury"
          >
            <Plus size={14} />
            <span>Tambah Tools</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tools.map((tool, idx) => (
            <div
              key={tool.id}
              className="p-4 rounded-2xl bg-charcoal border border-hairline flex items-center justify-between gap-3 hover:border-gold/40 transition-all"
            >
              <div className="space-y-1 flex-1">
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => updateTool(tool.id, { name: e.target.value })}
                  className="w-full px-2.5 py-1 rounded-lg bg-obsidian border border-hairline text-xs font-bold text-ivory focus:border-gold"
                />
                <select
                  value={tool.category}
                  onChange={(e) => updateTool(tool.id, { category: e.target.value as any })}
                  className="px-2 py-0.5 rounded-md bg-obsidian border border-hairline text-[10px] text-softGray"
                >
                  <option value="office">Office & Productivity</option>
                  <option value="reporting">Reporting & Analytics</option>
                  <option value="creative">Creative & Design</option>
                  <option value="mobile">Mobile Tools</option>
                </select>
              </div>

              <button
                onClick={() => deleteTool(tool.id)}
                className="p-1.5 text-red-400 hover:text-red-300"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="pt-8 border-t border-hairline space-y-6">
        <div className="border-b border-hairline pb-4">
          <div className="flex items-center gap-2 text-xs font-sans text-gold uppercase tracking-widest font-bold">
            <Languages size={14} />
            <span>Kemahiran Bahasa (Verified Language Proficiency)</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-ivory tracking-tight mt-1">
            Official Language Proficiencies
          </h3>
          <p className="text-xs text-softGray font-sans mt-0.5">
            Bahasa Indonesia (Penutur Asli / Native) & English (Upper Intermediate, TOEFL Score 533, CEFR B2).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="p-5 rounded-2xl bg-charcoal border border-hairline space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-serif font-bold text-ivory">
                  {lang.name.id}
                </h4>
                {lang.badge && (
                  <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/40">
                    {lang.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-softGray font-sans">
                Tingkat Kemahiran: <strong className="text-ivory">{lang.level.id}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
