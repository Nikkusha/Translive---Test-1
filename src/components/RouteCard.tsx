import { useState } from 'react';
import type { FreightRoute, TimeFilterState, RateType } from '../data/mockData';
import RateChart from './RateChart';

interface Props {
  route: FreightRoute;
  filter: TimeFilterState;
  rateType: RateType;
}

function applyMarkup(rate: number, markupPct: number): number {
  return Math.round(rate * (1 + markupPct / 100));
}

function TrendBadge({ current, previous }: { current: number; previous: number }) {
  const pct = ((current - previous) / previous) * 100;
  const isUp = pct > 0;
  const isFlat = Math.abs(pct) < 0.01;
  const diff = current - previous;
  const sign = diff > 0 ? '+' : '';
  const [hovered, setHovered] = useState(false);
  const tooltipText = isFlat
    ? 'წინა კვირასთან შედარებით: ცვლილება არ არის'
    : `წინა კვირასთან შედარებით:\n${sign}€${diff.toLocaleString()} (${sign}${pct.toFixed(1)}%)`;

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 3,
          padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 600,
          background: isFlat ? '#F3F4F6' : isUp ? '#FEF2F2' : '#F0FDF4',
          color: isFlat ? '#9CA3AF' : isUp ? '#DC2626' : '#16A34A',
          cursor: 'default',
        }}>
        {isFlat ? '— 0.0%' : (
          <>
            {isUp ? (
              <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 2l4 5H2l4-5z" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 10L2 5h8l-4 5z" />
              </svg>
            )}
            {Math.abs(pct).toFixed(1)}%
          </>
        )}
      </span>

      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          right: 0,
          background: '#111827',
          color: '#fff',
          fontSize: 11,
          fontWeight: 500,
          borderRadius: 5,
          padding: '6px 10px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          pointerEvents: 'none',
          zIndex: 50,
          lineHeight: 1.6,
        }}>
          {tooltipText.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            bottom: -5,
            right: 10,
            width: 10,
            height: 10,
            background: '#111827',
            transform: 'rotate(45deg)',
            borderRadius: 1,
          }} />
        </div>
      )}
    </div>
  );
}

const PRESET_LABELS: Record<TimeFilterState['preset'], string> = {
  'current-week': 'მიმდინარე კვირა',
  'prev-week': 'წინა კვირა',
  'prev-month': 'წინა თვე',
  'custom': 'Custom range',
};

export default function RouteCard({ route, filter, rateType }: Props) {
  const [open, setOpen] = useState(false);

  const markup = rateType === 'client' ? route.clientMarkupPct : 0;
  const displayRate = applyMarkup(route.currentAvgRate, markup);
  const displayPrev = applyMarkup(route.previousWeekRate, markup);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 6,
        border: open ? '1px solid #EA580C' : '1px solid #E5E7EB',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: open ? '0 2px 8px rgba(234,88,12,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left cursor-pointer"
        style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
      >
        {/* Route icon */}
        <div style={{
          flexShrink: 0, width: 32, height: 32, borderRadius: 5,
          background: '#F9FAFB', border: '1px solid #E5E7EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg className="w-4 h-4" style={{ color: '#6B7280' }} viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H18a1 1 0 001-1V8a1 1 0 00-.29-.71l-3-3A1 1 0 0015 4H3z" />
          </svg>
        </div>

        {/* Route name + badges */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {route.origin}, {route.originCountry}
            <span style={{ margin: '0 6px', color: '#D1D5DB' }}>→</span>
            {route.destination}, {route.destinationCountry}
          </p>
          <div className="flex items-center gap-1">
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '1px 6px', borderRadius: 3, fontSize: 10, fontWeight: 600,
              background: route.shipmentType === 'ექსპორტი' ? '#ECFDF5' : '#F5F3FF',
              color: route.shipmentType === 'ექსპორტი' ? '#059669' : '#7C3AED',
              border: route.shipmentType === 'ექსპორტი' ? '1px solid #A7F3D0' : '1px solid #DDD6FE',
            }}>
              {route.shipmentType}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '1px 6px', borderRadius: 3, fontSize: 10, fontWeight: 600,
              background: '#EFF6FF', color: '#2563EB',
              border: '1px solid #BFDBFE',
            }}>
              {route.vehicleType}
            </span>
          </div>
        </div>

        {/* Rate */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 1 }}>Avg Rate</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>
            €{displayRate.toLocaleString()}
          </p>
        </div>

        {/* Trend */}
        <div style={{ flexShrink: 0 }}>
          <TrendBadge current={displayRate} previous={displayPrev} />
        </div>

        {/* Chevron */}
        <div style={{
          flexShrink: 0, marginLeft: 2, color: open ? '#EA580C' : '#9CA3AF',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.25s, color 0.2s',
        }}>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {/* Expanded chart */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 280 : 0,
        opacity: open ? 1 : 0,
        transition: 'max-height 0.3s ease, opacity 0.25s ease',
      }}>
        <div style={{ padding: '10px 16px 16px', borderTop: '1px solid #F3F4F6' }}>
          <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>
            Rate trend · {PRESET_LABELS[filter.preset]}
            {rateType === 'client' && (
              <span style={{ marginLeft: 6, color: '#C2410C' }}>· +{route.clientMarkupPct}% markup included</span>
            )}
          </p>
          {open && (
            <RateChart
              data={route.weeklyHistory}
              filter={filter}
              markupPct={markup}
            />
          )}
        </div>
      </div>
    </div>
  );
}
