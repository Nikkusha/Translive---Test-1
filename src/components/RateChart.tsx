import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { WeeklyRate, TimeFilterState } from '../data/mockData';

interface Props {
  data: WeeklyRate[];
  filter: TimeFilterState;
  markupPct: number;
}

function weekToDate(weekStr: string): Date {
  const [yr, wkPart] = weekStr.split('-W');
  const year = parseInt(yr, 10);
  const week = parseInt(wkPart, 10);
  const jan4 = new Date(year, 0, 4);
  const dow = jan4.getDay() || 7;
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - (dow - 1) + (week - 1) * 7);
  return monday;
}

function getVisibleData(data: WeeklyRate[], filter: TimeFilterState): WeeklyRate[] {
  if (filter.preset === 'current-week') return data.slice(-6);
  if (filter.preset === 'prev-week') return data.slice(-7, -1);
  if (filter.preset === 'prev-month') return data.slice(-9);
  if (filter.preset === 'custom' && filter.customStart && filter.customEnd) {
    const start = new Date(filter.customStart + 'T00:00:00');
    const end = new Date(filter.customEnd + 'T00:00:00');
    const filtered = data.filter((d) => {
      const wDate = weekToDate(d.week);
      return wDate >= start && wDate <= end;
    });
    return filtered.length > 0 ? filtered : data.slice(-4);
  }
  return data.slice(-6);
}

function formatWeek(w: string) {
  const parts = w.split('-W');
  return parts.length === 2 ? `W${parts[1]}` : w;
}

function formatEUR(v: number) {
  return `€${v.toLocaleString()}`;
}

export default function RateChart({ data, filter, markupPct }: Props) {
  const raw = getVisibleData(data, filter);
  const visible = markupPct > 0
    ? raw.map((d) => ({ ...d, avgRate: Math.round(d.avgRate * (1 + markupPct / 100)) }))
    : raw;

  const rates = visible.map((d) => d.avgRate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const padding = Math.round((maxRate - minRate) * 0.2) || 100;
  const yMin = Math.max(0, Math.floor((minRate - padding) / 100) * 100);
  const yMax = Math.ceil((maxRate + padding) / 100) * 100;

  return (
    <div className="w-full h-44 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={visible} margin={{ top: 4, right: 10, bottom: 0, left: 6 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="week"
            tickFormatter={formatWeek}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[yMin, yMax]}
            tickFormatter={formatEUR}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            width={58}
          />
          <Tooltip
            formatter={(value) => [formatEUR(Number(value)), 'Avg Rate']}
            labelFormatter={(label) => `Week: ${label}`}
            contentStyle={{
              borderRadius: 5,
              border: '1px solid #E5E7EB',
              fontSize: 11,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#374151',
            }}
          />
          <Line
            type="monotone"
            dataKey="avgRate"
            stroke="#EA580C"
            strokeWidth={2}
            dot={{ r: 3, fill: '#EA580C', strokeWidth: 0 }}
            activeDot={{ r: 4, fill: '#C2410C' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
