import { useState, useRef, useEffect } from 'react';
import type { TimeFilterState } from '../data/mockData';

interface Props {
  value: TimeFilterState;
  onChange: (v: TimeFilterState) => void;
}

const PRESETS: { id: TimeFilterState['preset']; label: string }[] = [
  { id: 'current-week', label: 'მიმდინარე კვირა' },
  { id: 'prev-week', label: 'წინა კვირა' },
  { id: 'prev-month', label: 'წინა თვე' },
];

function formatCustomLabel(start: string, end: string): string {
  if (!start || !end) return 'Custom';
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const sd = String(s.getDate()).padStart(2, '0');
  const ed = String(e.getDate()).padStart(2, '0');
  if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
    return `${months[s.getMonth()]} ${sd}–${ed}`;
  }
  return `${months[s.getMonth()]} ${sd} – ${months[e.getMonth()]} ${ed}`;
}

export default function TimeFilter({ value, onChange }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [draftStart, setDraftStart] = useState(value.customStart);
  const [draftEnd, setDraftEnd] = useState(value.customEnd);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function selectPreset(preset: TimeFilterState['preset']) {
    onChange({ preset, customStart: value.customStart, customEnd: value.customEnd });
    setPickerOpen(false);
  }

  function applyCustom() {
    if (draftStart && draftEnd) {
      onChange({ preset: 'custom', customStart: draftStart, customEnd: draftEnd });
      setPickerOpen(false);
    }
  }

  const isCustomActive = value.preset === 'custom';

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 12px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    border: active ? '1px solid #EA580C' : '1px solid #E5E7EB',
    background: active ? '#EA580C' : '#fff',
    color: active ? '#fff' : '#6B7280',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.15s',
  });

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {PRESETS.map((p) => (
        <button
          key={p.id}
          onClick={() => selectPreset(p.id)}
          style={pillStyle(value.preset === p.id)}
        >
          {p.label}
        </button>
      ))}

      {/* Custom range picker */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setPickerOpen((o) => !o)}
          className="inline-flex items-center gap-1"
          style={pillStyle(isCustomActive)}
        >
          <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {isCustomActive && value.customStart && value.customEnd
            ? formatCustomLabel(value.customStart, value.customEnd)
            : 'Custom'}
        </button>

        {pickerOpen && (
          <div
            className="absolute right-0 top-full mt-1 z-50 w-52"
            style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 6,
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              padding: 14,
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
              Date Range
            </p>
            <div className="flex flex-col gap-2 mb-3">
              <div>
                <label style={{ fontSize: 11, color: '#6B7280', marginBottom: 3, display: 'block' }}>From</label>
                <input
                  type="date"
                  value={draftStart}
                  onChange={(e) => setDraftStart(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: 4, padding: '5px 8px', fontSize: 12, color: '#374151', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, color: '#6B7280', marginBottom: 3, display: 'block' }}>To</label>
                <input
                  type="date"
                  value={draftEnd}
                  min={draftStart}
                  onChange={(e) => setDraftEnd(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: 4, padding: '5px 8px', fontSize: 12, color: '#374151', outline: 'none' }}
                />
              </div>
            </div>
            <button
              onClick={applyCustom}
              disabled={!draftStart || !draftEnd}
              style={{
                width: '100%',
                background: '#EA580C',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '6px 0',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                opacity: !draftStart || !draftEnd ? 0.4 : 1,
              }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
