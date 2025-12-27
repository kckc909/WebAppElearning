import React, { useState } from 'react';
import {
  X, Sliders, Save, Video, Code, Layout, AlignLeft, AlignCenter, AlignRight,
  Square, Circle, Monitor, Palette, Maximize, Plus, Trash2, ImageIcon, Type, Lock, Upload
} from 'lucide-react';
import { Lesson, ContentBlock, Section } from '../../../../../../types/lesson-builder';

interface SettingsPanelProps {
  selection: { type: 'lesson', data: Lesson } | { type: 'block', data: ContentBlock } | { type: 'section', data: Section } | null;
  onUpdateLesson: (updates: Partial<Lesson>) => void;
  onUpdateBlock: (updates: Partial<ContentBlock>) => void;
  onUpdateSection?: (updates: Partial<Section>) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ selection, onUpdateLesson, onUpdateBlock, onUpdateSection, onClose }) => {
  // Local state for toggling between URL and Upload tabs for video
  const [videoTab, setVideoTab] = useState<'url' | 'upload'>('url');

  if (!selection) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 bg-slate-50">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <Sliders size={16} />
          <span className="capitalize">
            {selection.type === 'lesson' ? 'Lesson Properties' : selection.type === 'section' ? 'Section Properties' : `${selection.data.type.replace('-', ' ')}`}
          </span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* ================= SECTION SETTINGS ================= */}
        {selection.type === 'section' && onUpdateSection && (
          <>
            <SettingsGroup title="Section Info">
              <TextField
                label="Section Title"
                value={selection.data.title}
                onChange={(val: string) => onUpdateSection({ title: val })}
                placeholder="e.g., Module 1: Introduction"
              />
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-100">
                Sections organize your lessons into modules or chapters. Use clear, descriptive titles.
              </div>
            </SettingsGroup>
          </>
        )}

        {/* ================= LESSON SETTINGS ================= */}
        {selection.type === 'lesson' && (
          <>
            <SettingsGroup title="General Info">
              <TextField
                label="Title"
                value={selection.data.title}
                onChange={(val: string) => onUpdateLesson({ title: val })}
              />
              <TextAreaField
                label="Learning Objective"
                rows={4}
                value={selection.data.metadata.objective}
                onChange={(val: string) => onUpdateLesson({ metadata: { ...selection.data.metadata, objective: val } })}
                placeholder="By the end of this lesson..."
              />
            </SettingsGroup>

            <SettingsGroup title="Configuration">
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="Est. Time (min)"
                  type="number"
                  value={selection.data.metadata.estimatedTime}
                  onChange={(val: string) => onUpdateLesson({ metadata: { ...selection.data.metadata, estimatedTime: parseInt(val) } })}
                />
                <SelectField
                  label="Type"
                  value={selection.data.metadata.isOptional ? 'optional' : 'required'}
                  options={['required', 'optional']}
                  onChange={(val: string) => onUpdateLesson({ metadata: { ...selection.data.metadata, isOptional: val === 'optional' } })}
                />
              </div>
            </SettingsGroup>

            <SettingsGroup title="Layout Appearance">
              <div className="space-y-4">
                <SelectField
                  label="Content Width"
                  value={selection.data.metadata.containerWidth || 'max-w-5xl'}
                  options={[
                    { label: 'Narrow', value: 'max-w-3xl' },
                    { label: 'Standard', value: 'max-w-5xl' },
                    { label: 'Wide', value: 'max-w-7xl' },
                    { label: 'Full Width', value: 'max-w-full' },
                  ]}
                  onChange={(val: string) => onUpdateLesson({ metadata: { ...selection.data.metadata, containerWidth: val } })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <SelectField
                    label="Region Gap"
                    value={selection.data.metadata.gapSize || 'gap-6'}
                    options={[
                      { label: 'Tight', value: 'gap-2' },
                      { label: 'Normal', value: 'gap-6' },
                      { label: 'Wide', value: 'gap-10' },
                    ]}
                    onChange={(val: string) => onUpdateLesson({ metadata: { ...selection.data.metadata, gapSize: val } })}
                  />
                  <SelectField
                    label="Background"
                    value={selection.data.metadata.backgroundColor || 'bg-slate-100/50'}
                    options={[
                      { label: 'White', value: 'bg-white' },
                      { label: 'Light Gray', value: 'bg-slate-100/50' },
                      { label: 'Blue Tint', value: 'bg-blue-50/50' },
                    ]}
                    onChange={(val: string) => onUpdateLesson({ metadata: { ...selection.data.metadata, backgroundColor: val } })}
                  />
                </div>
              </div>
            </SettingsGroup>
          </>
        )}

        {/* ================= BLOCK SETTINGS ================= */}
        {selection.type === 'block' && (
          <>
            {/* --- CONTENT FIELDS (Type Specific) --- */}
            {selection.data.type === 'smart-file' && (
              <div className="p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100">
                Upload a file on the canvas to configure this block automatically.
              </div>
            )}

            {selection.data.type === 'text' && (
              <SettingsGroup title="Text Content">
                <TextAreaField
                  label="Markdown"
                  rows={12}
                  value={selection.data.content.html}
                  onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, html: val } })}
                />
              </SettingsGroup>
            )}

            {selection.data.type === 'video' && (
              <SettingsGroup title="Video Source">
                {/* Source Type Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                  <button
                    onClick={() => setVideoTab('url')}
                    className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${videoTab === 'url' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    External Link
                  </button>
                  <button
                    onClick={() => setVideoTab('upload')}
                    className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${videoTab === 'upload' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    File Upload
                  </button>
                </div>

                {/* Input Fields */}
                {videoTab === 'url' ? (
                  <TextField
                    label="Video URL"
                    value={selection.data.content.url}
                    onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, url: val } })}
                    placeholder="YouTube, Vimeo, or MP4 link..."
                  />
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative group">
                    <input
                      type="file"
                      accept="video/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const url = URL.createObjectURL(e.target.files[0]);
                          onUpdateBlock({ content: { ...selection.data.content, url } });
                        }
                      }}
                    />
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="text-blue-500" size={20} />
                    </div>
                    <span className="text-xs font-medium text-slate-700">Click to upload video</span>
                    <span className="text-[10px] text-slate-400 mt-1">MP4, WebM supported</span>
                    {selection.data.content.url?.startsWith('blob:') && (
                      <div className="mt-3 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded">
                        File selected
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-4 mt-4 pt-3 border-t border-slate-50">
                  <Toggle
                    label="Autoplay"
                    checked={selection.data.settings?.autoplay}
                    onChange={(c: any) => onUpdateBlock({ settings: { ...selection.data.settings, autoplay: c } })}
                  />
                  <Toggle
                    label="Controls"
                    checked={selection.data.settings?.showControls !== false}
                    onChange={(c: any) => onUpdateBlock({ settings: { ...selection.data.settings, showControls: c } })}
                  />
                </div>
              </SettingsGroup>
            )}

            {selection.data.type === 'image' && (
              <SettingsGroup title="Image Source">
                <TextField
                  label="Image URL"
                  value={selection.data.content.url}
                  onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, url: val } })}
                  placeholder="https://..."
                />
                <TextField
                  label="Alt Text"
                  value={selection.data.settings?.altText}
                  onChange={(val: string) => onUpdateBlock({ settings: { ...selection.data.settings, altText: val } })}
                  placeholder="Description..."
                />
              </SettingsGroup>
            )}

            {selection.data.type === 'ide' && (
              <SettingsGroup title="Environment">
                <SelectField
                  label="Language"
                  value={selection.data.settings?.language || 'javascript'}
                  options={['javascript', 'python', 'html', 'css', 'java', 'sql']}
                  onChange={(val: string) => onUpdateBlock({ settings: { ...selection.data.settings, language: val } })}
                />
                <TextAreaField
                  label="Starter Code"
                  rows={6}
                  className="font-mono text-xs"
                  value={selection.data.content.code}
                  onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, code: val } })}
                />
                <Toggle
                  label="Read Only"
                  checked={selection.data.settings?.readOnly}
                  onChange={(c: any) => onUpdateBlock({ settings: { ...selection.data.settings, readOnly: c } })}
                />
              </SettingsGroup>
            )}

            {selection.data.type === 'document' && (
              <SettingsGroup title="Document">
                <TextField
                  label="Document URL"
                  value={selection.data.content.url}
                  onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, url: val } })}
                  placeholder="PDF Link..."
                />
                <SelectField
                  label="Viewer Height"
                  value={selection.data.settings?.height || 'h-96'}
                  options={[
                    { label: 'Short', value: 'h-64' },
                    { label: 'Medium', value: 'h-96' },
                    { label: 'Tall', value: 'h-[600px]' },
                  ]}
                  onChange={(val: string) => onUpdateBlock({ settings: { ...selection.data.settings, height: val } })}
                />
              </SettingsGroup>
            )}

            {selection.data.type === 'embed' && (
              <SettingsGroup title="Embed Config">
                <TextField
                  label="Embed URL"
                  value={selection.data.content.url}
                  onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, url: val } })}
                  placeholder="https://..."
                />
                <SelectField
                  label="Frame Height"
                  value={selection.data.settings?.height || 'h-96'}
                  options={[{ label: 'Medium', value: 'h-96' }, { label: 'Tall', value: 'h-[600px]' }, { label: 'Full', value: 'h-[800px]' }]}
                  onChange={(val: string) => onUpdateBlock({ settings: { ...selection.data.settings, height: val } })}
                />
              </SettingsGroup>
            )}

            {selection.data.type === 'quiz' && (
              <SettingsGroup title="Quiz Definition">
                <div className="space-y-4">
                  <SelectField
                    label="Question Type"
                    value={selection.data.content.questionType || 'multiple-choice'}
                    options={[
                      { label: 'Multiple Choice', value: 'multiple-choice' },
                      { label: 'Text Input', value: 'text-input' },
                      { label: 'File Upload', value: 'file-upload' },
                      { label: 'Mixed', value: 'mixed' },
                    ]}
                    onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, questionType: val } })}
                  />

                  <TextAreaField
                    label="Question Text"
                    rows={2}
                    value={selection.data.content.question}
                    onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, question: val } })}
                  />

                  <TextField
                    label="Question Image URL (Optional)"
                    value={selection.data.content.imageUrl}
                    onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, imageUrl: val } })}
                    placeholder="https://..."
                  />

                  {/* Options Editor - Only for Multiple Choice */}
                  {(!selection.data.content.questionType || selection.data.content.questionType === 'multiple-choice') && (
                    <div className="space-y-2 mt-2 pt-2 border-t border-slate-100">
                      <label className="text-xs font-medium text-slate-600 flex justify-between items-center">
                        <span>Answer Options</span>
                        <button
                          onClick={() => {
                            const currentOpts = selection.data.content.options || ['Option 1'];
                            onUpdateBlock({ content: { ...selection.data.content, options: [...currentOpts, `Option ${currentOpts.length + 1}`] } });
                          }}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[10px] font-bold uppercase"
                        >
                          <Plus size={10} /> Add
                        </button>
                      </label>
                      {(selection.data.content.options || ['Option 1']).map((opt: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="correct"
                            checked={selection.data.content.correctAnswer === idx}
                            onChange={() => onUpdateBlock({ content: { ...selection.data.content, correctAnswer: idx } })}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            title="Mark as correct"
                          />
                          <input
                            className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded focus:border-blue-500 outline-none"
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...(selection.data.content.options || [])];
                              newOptions[idx] = e.target.value;
                              onUpdateBlock({ content: { ...selection.data.content, options: newOptions } });
                            }}
                          />
                          <button
                            onClick={() => {
                              const newOptions = [...(selection.data.content.options || [])];
                              newOptions.splice(idx, 1);
                              onUpdateBlock({ content: { ...selection.data.content, options: newOptions } });
                            }}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SettingsGroup>
            )}

            {selection.data.type === 'practice' && (
              <SettingsGroup title="Practice Activity">
                <TextAreaField
                  label="Instructions"
                  rows={3}
                  value={selection.data.content.instructions}
                  onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, instructions: val } })}
                />
                <TextField
                  label="Max Points"
                  type="number"
                  value={selection.data.settings?.points}
                  onChange={(val: string) => onUpdateBlock({ settings: { ...selection.data.settings, points: parseInt(val) } })}
                />
              </SettingsGroup>
            )}

            {selection.data.type === 'question-slot' && (
              <SettingsGroup title="Question Bank">
                <TextField
                  label="Question ID"
                  value={selection.data.content.questionId}
                  onChange={(val: string) => onUpdateBlock({ content: { ...selection.data.content, questionId: val } })}
                  placeholder="UUID..."
                />
                <button className="w-full py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs font-medium hover:bg-blue-100 transition-colors">
                  Browse Question Bank
                </button>
              </SettingsGroup>
            )}

            {/* --- VISUAL APPEARANCE (Common) --- */}
            {selection.type === 'block' && (
              <SettingsGroup title="Visual Appearance">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <SelectField
                    label="Padding"
                    value={selection.data.settings?.padding || 'p-0'}
                    options={[
                      { label: 'None', value: 'p-0' },
                      { label: 'Small', value: 'p-3' },
                      { label: 'Medium', value: 'p-6' },
                      { label: 'Large', value: 'p-10' },
                    ]}
                    onChange={(val: string) => onUpdateBlock({ settings: { ...selection.data.settings, padding: val } })}
                  />
                  <SelectField
                    label="Radius"
                    value={selection.data.settings?.borderRadius || 'rounded-none'}
                    options={[
                      { label: 'Square', value: 'rounded-none' },
                      { label: 'Small', value: 'rounded-md' },
                      { label: 'Medium', value: 'rounded-xl' },
                      { label: 'Large', value: 'rounded-2xl' },
                    ]}
                    onChange={(val: string) => onUpdateBlock({ settings: { ...selection.data.settings, borderRadius: val } })}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-2">Background</label>
                    <div className="flex gap-2">
                      {['bg-transparent', 'bg-white', 'bg-slate-50', 'bg-blue-50', 'bg-yellow-50'].map(bg => (
                        <button
                          key={bg}
                          onClick={() => onUpdateBlock({ settings: { ...selection.data.settings, backgroundColor: bg } })}
                          className={`w-8 h-8 rounded-full border ${bg === 'bg-transparent' ? 'bg-white' : bg} ${(selection.data.settings?.backgroundColor || 'bg-white') === bg ? 'ring-2 ring-blue-500 ring-offset-1 border-blue-500' : 'border-slate-200'
                            } relative`}
                          title={bg}
                        >
                          {bg === 'bg-transparent' && <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-[8px]">X</div>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-50 space-y-3">
                    {/* Fill Space */}
                    <div className="flex flex-col">
                      <Toggle
                        label="Fill Remaining Space"
                        checked={selection.data.settings?.flexGrow}
                        onChange={(c: any) => onUpdateBlock({ settings: { ...selection.data.settings, flexGrow: c } })}
                      />
                      <p className="text-[10px] text-slate-400 mt-1 pl-11">
                        Block will expand to occupy empty vertical space.
                      </p>
                    </div>

                    {/* Lock Position */}
                    <div className="flex flex-col">
                      <Toggle
                        label="Lock Position (Sticky)"
                        checked={selection.data.settings?.isSticky}
                        onChange={(c: any) => onUpdateBlock({ settings: { ...selection.data.settings, isSticky: c } })}
                      />
                      <p className="text-[10px] text-slate-400 mt-1 pl-11">
                        Block stays visible at the top while scrolling.
                      </p>
                    </div>
                  </div>

                  {/* Alignment - Only relevant for text/video usually */}
                  {(selection.data.type === 'text' || selection.data.type === 'video' || selection.data.type === 'image') && (
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-2">Alignment</label>
                      <div className="flex bg-slate-100 rounded-lg p-1 w-max">
                        {[
                          { val: 'left', icon: <AlignLeft size={16} /> },
                          { val: 'center', icon: <AlignCenter size={16} /> },
                          { val: 'right', icon: <AlignRight size={16} /> }
                        ].map(align => (
                          <button
                            key={align.val}
                            onClick={() => onUpdateBlock({ settings: { ...selection.data.settings, textAlign: align.val as 'left' | 'center' | 'right' } })}
                            className={`p-1.5 rounded ${(selection.data.settings?.textAlign || 'left') === align.val ? 'bg-white shadow text-blue-600' : 'text-slate-400 hover:text-slate-600'
                              }`}
                          >
                            {align.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SettingsGroup>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// --- Helpers ---

const SettingsGroup = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm space-y-3">
    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-50 pb-2">
      {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const TextField = ({ label, value, onChange, placeholder, type = 'text', className = '' }: any) => (
  <div>
    <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
    <input
      type={type}
      className={`w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all ${className}`}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder, rows = 3, className = '' }: any) => (
  <div>
    <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
    <textarea
      rows={rows}
      className={`w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none ${className}`}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, value, options, onChange }: any) => (
  <div>
    <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
    <div className="relative">
      <select
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white appearance-none capitalize transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt: any) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt.replace('_', ' ') : opt.label;
          return <option key={val} value={val}>{lbl}</option>
        })}
      </select>
    </div>
  </div>
);

const Toggle = ({ label, checked, onChange }: any) => (
  <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChange(!checked)}>
    <div className={`w-9 h-5 rounded-full relative transition-colors ${checked ? 'bg-blue-500' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow transition-transform ${checked ? 'left-5' : 'left-1'}`} />
    </div>
    <span className="text-xs font-medium text-slate-600">{label}</span>
  </div>
);