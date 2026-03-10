import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    ),
  },
  {
    id: 'routes',
    label: 'მარშრუტები',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
      </svg>
    ),
    badge: 10,
  },
  {
    id: 'orders',
    label: 'შეკვეთები',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
    badge: 65,
  },
  {
    id: 'clients',
    label: 'კლიენტები',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    id: 'documents',
    label: 'დოკუმენტები',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    badge: 7,
  },
  {
    id: 'analytics',
    label: 'ანალიტიკა',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    id: 'cargo',
    label: 'კარგო',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H18a1 1 0 001-1V8a1 1 0 00-.29-.71l-3-3A1 1 0 0015 4H3z" />
      </svg>
    ),
  },
];

const BOTTOM_ITEMS: NavItem[] = [
  {
    id: 'settings',
    label: 'პარამეტრები',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
  },
];

interface Props {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: Props) {
  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '16px 18px',
        borderBottom: '1px solid #F3F4F6',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 6,
          background: '#EA580C',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width={16} height={16} viewBox="0 0 20 20" fill="white">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H18a1 1 0 001-1V8a1 1 0 00-.29-.71l-3-3A1 1 0 0015 4H3z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>FreightWatch</div>
          <div style={{ fontSize: 10, color: '#9CA3AF', lineHeight: 1.2 }}>Rate Monitor</div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '10px 10px 0', overflowY: 'auto' }}>
        <div style={{ marginBottom: 4 }}>
          <p style={{
            fontSize: 10, fontWeight: 600, color: '#9CA3AF',
            textTransform: 'uppercase', letterSpacing: '0.07em',
            padding: '6px 8px 4px',
          }}>მთავარი</p>
          {NAV_ITEMS.slice(0, 2).map((item) => (
            <NavButton key={item.id} item={item} active={activeId === item.id} onSelect={onSelect} />
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <p style={{
            fontSize: 10, fontWeight: 600, color: '#9CA3AF',
            textTransform: 'uppercase', letterSpacing: '0.07em',
            padding: '6px 8px 4px',
          }}>მართვა</p>
          {NAV_ITEMS.slice(2).map((item) => (
            <NavButton key={item.id} item={item} active={activeId === item.id} onSelect={onSelect} />
          ))}
        </div>
      </nav>

      {/* Divider + bottom */}
      <div style={{ borderTop: '1px solid #F3F4F6', padding: '10px 10px' }}>
        {BOTTOM_ITEMS.map((item) => (
          <NavButton key={item.id} item={item} active={activeId === item.id} onSelect={onSelect} />
        ))}

        {/* User */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 8px 4px',
          marginTop: 4,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: '#FFF7ED', border: '1px solid #FED7AA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width={14} height={14} viewBox="0 0 20 20" fill="#EA580C">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              გიორგი შ.
            </div>
            <div style={{ fontSize: 10, color: '#9CA3AF' }}>Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavButton({ item, active, onSelect }: { item: NavItem; active: boolean; onSelect: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '7px 8px',
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
        marginBottom: 1,
        background: active ? '#FFF7ED' : hovered ? '#F9FAFB' : 'transparent',
        color: active ? '#EA580C' : '#374151',
        transition: 'background 0.12s, color 0.12s',
        textAlign: 'left',
      }}
    >
      {/* Active indicator */}
      <div style={{
        width: 3, height: 16, borderRadius: 2,
        background: active ? '#EA580C' : 'transparent',
        flexShrink: 0,
        marginLeft: -2,
        transition: 'background 0.12s',
      }} />

      <span style={{ color: active ? '#EA580C' : hovered ? '#374151' : '#6B7280', flexShrink: 0 }}>
        {item.icon}
      </span>

      <span style={{ fontSize: 12, fontWeight: active ? 600 : 500, flex: 1, lineHeight: 1 }}>
        {item.label}
      </span>

      {item.badge !== undefined && (
        <span style={{
          fontSize: 10, fontWeight: 600,
          background: active ? '#EA580C' : '#F3F4F6',
          color: active ? '#fff' : '#6B7280',
          borderRadius: 10,
          padding: '1px 6px',
          lineHeight: 1.6,
        }}>
          {item.badge}
        </span>
      )}
    </button>
  );
}
