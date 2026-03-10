import type { SearchFilterState } from '../data/mockData';

interface Props {
  value: SearchFilterState;
  onChange: (v: SearchFilterState) => void;
}

const VEHICLE_OPTIONS: Array<{ id: SearchFilterState['vehicleType']; label: string }> = [
  { id: 'ყველა', label: 'ყველა' },
  { id: 'ტენტი', label: 'ტენტი' },
  { id: 'რეფი', label: 'რეფი' },
  { id: 'მეგა', label: 'მეგა' },
];

const SHIPMENT_OPTIONS: Array<{ id: SearchFilterState['shipmentType']; label: string }> = [
  { id: 'ყველა', label: 'ყველა' },
  { id: 'ექსპორტი', label: 'ექსპორტი' },
  { id: 'იმპორტი', label: 'იმპორტი' },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #E5E7EB',
  borderRadius: 5,
  padding: '6px 10px 6px 30px',
  fontSize: 12,
  color: '#374151',
  background: '#fff',
  outline: 'none',
};


export default function SearchBar({ value, onChange }: Props) {
  return (
    <div
      className="flex flex-wrap gap-x-5 gap-y-3 items-end mb-4 px-4 py-3 rounded"
      style={{ background: '#fff', border: '1px solid #E5E7EB' }}
    >
      {/* Origin */}
      <div className="flex-1" style={{ minWidth: 120 }}>
        <div className="relative">
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            style={{ color: '#9CA3AF' }}
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="საიდან: ქვეყანა / ქალაქი"
            value={value.origin}
            onChange={(e) => onChange({ ...value, origin: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Destination */}
      <div className="flex-1" style={{ minWidth: 120 }}>
        <div className="relative">
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            style={{ color: '#9CA3AF' }}
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="სად: ქვეყანა / ქალაქი"
            value={value.destination}
            onChange={(e) => onChange({ ...value, destination: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Vehicle type */}
      <div className="flex gap-1">
        {VEHICLE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange({ ...value, vehicleType: opt.id })}
            className="cursor-pointer transition-colors"
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              border: value.vehicleType === opt.id ? '1px solid #EA580C' : '1px solid #E5E7EB',
              background: value.vehicleType === opt.id ? '#EA580C' : '#fff',
              color: value.vehicleType === opt.id ? '#fff' : '#6B7280',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Shipment type */}
      <div className="flex gap-1">
        {SHIPMENT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange({ ...value, shipmentType: opt.id })}
            className="cursor-pointer transition-colors"
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              border: value.shipmentType === opt.id ? '1px solid #EA580C' : '1px solid #E5E7EB',
              background: value.shipmentType === opt.id ? '#EA580C' : '#fff',
              color: value.shipmentType === opt.id ? '#fff' : '#6B7280',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
