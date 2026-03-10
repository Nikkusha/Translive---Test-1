import { useState } from 'react';
import { routes, type TimeFilterState, type SearchFilterState, type RateType } from '../data/mockData';
import TimeFilter from './TimeFilter';
import RouteGrid from './RouteGrid';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

export default function RouteDashboard() {
  const [activeNav, setActiveNav] = useState('routes');

  const [timeFilter, setTimeFilter] = useState<TimeFilterState>({
    preset: 'current-week',
    customStart: '',
    customEnd: '',
  });

  const [searchFilter, setSearchFilter] = useState<SearchFilterState>({
    origin: '',
    destination: '',
    vehicleType: 'ყველა',
    shipmentType: 'ყველა',
  });

  const [rateType, setRateType] = useState<RateType>('client');

  const filteredRoutes = routes.filter((r) => {
    if (searchFilter.origin && !r.origin.toLowerCase().includes(searchFilter.origin.toLowerCase()))
      return false;
    if (searchFilter.destination && !r.destination.toLowerCase().includes(searchFilter.destination.toLowerCase()))
      return false;
    if (searchFilter.vehicleType !== 'ყველა' && r.vehicleType !== searchFilter.vehicleType)
      return false;
    if (searchFilter.shipmentType !== 'ყველა' && r.shipmentType !== searchFilter.shipmentType)
      return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F5F7' }}>
      {/* Sidebar */}
      <Sidebar activeId={activeNav} onSelect={setActiveNav} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}>
          <div className="px-6 py-3 flex items-center justify-between">
            {/* Page title */}
            <div>
              <h1 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>მარშრუტების მონიტორინგი</h1>
              <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>ფასების სტატისტიკა და ტენდენციები</p>
            </div>

            {/* Rate type toggle */}
            <div
              style={{
                background: '#F3F4F6',
                border: '1px solid #E5E7EB',
                borderRadius: 6,
                padding: 3,
                display: 'flex',
                gap: 2,
              }}
            >
              {([
                { value: 'client', label: 'კლიენტის ფასი', icon: '👤' },
                { value: 'carrier', label: 'გადამზიდის ფასი', icon: '🚛' },
              ] as { value: RateType; label: string; icon: string }[]).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRateType(opt.value)}
                  className="cursor-pointer transition-all"
                  style={{
                    padding: '5px 14px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    border: 'none',
                    background: rateType === opt.value ? '#fff' : 'transparent',
                    color: rateType === opt.value ? '#EA580C' : '#6B7280',
                    boxShadow: rateType === opt.value ? '0 1px 3px rgba(0,0,0,0.10)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <span style={{ fontSize: 13 }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '20px 24px' }}>
          {/* Search / filter bar */}
          <SearchBar value={searchFilter} onChange={setSearchFilter} />

          {/* Section title + time filter */}
          <div className="flex items-center justify-between mb-3 gap-4 flex-wrap">
            <div>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>
                Top 10 Popular Routes
                {filteredRoutes.length < routes.length && (
                  <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 400, color: '#9CA3AF' }}>
                    ({filteredRoutes.length} ნაჩვენებია)
                  </span>
                )}
              </h2>
              <p style={{ fontSize: 11, color: '#9CA3AF', margin: '2px 0 0' }}>კარტზე დაჭერით ნახავთ ფასების ისტორიას</p>
            </div>
            <TimeFilter value={timeFilter} onChange={setTimeFilter} />
          </div>

          {filteredRoutes.length === 0 ? (
            <div
              className="rounded py-16 text-center"
              style={{ background: '#fff', border: '1px solid #E5E7EB' }}
            >
              <p style={{ fontSize: 13, color: '#9CA3AF' }}>არცერთი მარშრუტი არ შეესაბამება ფილტრს</p>
            </div>
          ) : (
            <RouteGrid routes={filteredRoutes} filter={timeFilter} rateType={rateType} />
          )}

          <p style={{ textAlign: 'center', fontSize: 11, color: '#D1D5DB', marginTop: 20 }}>
            Data refreshed weekly · Rates in EUR / GEL / USD / RUB · Mock data for demo
          </p>
        </main>
      </div>
    </div>
  );
}
