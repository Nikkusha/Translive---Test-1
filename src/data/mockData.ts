export interface WeeklyRate {
  week: string;
  avgRate: number;
}

export type VehicleType = 'ტენტი' | 'რეფი' | 'მეგა';
export type ShipmentType = 'ექსპორტი' | 'იმპორტი';

export type RateType = 'client' | 'carrier';

export interface FreightRoute {
  id: string;
  origin: string;
  originCountry: string;
  destination: string;
  destinationCountry: string;
  currentAvgRate: number;
  previousWeekRate: number;
  weeklyHistory: WeeklyRate[];
  vehicleType: VehicleType;
  shipmentType: ShipmentType;
  clientMarkupPct: number;
}

export interface SearchFilterState {
  origin: string;
  destination: string;
  vehicleType: 'ყველა' | VehicleType;
  shipmentType: 'ყველა' | ShipmentType;
}

export type TimePreset = 'current-week' | 'prev-week' | 'prev-month' | 'custom';

export interface TimeFilterState {
  preset: TimePreset;
  customStart: string; // YYYY-MM-DD
  customEnd: string;   // YYYY-MM-DD
}

function generateHistory(
  base: number,
  weeks: number,
  volatility: number
): WeeklyRate[] {
  const history: WeeklyRate[] = [];
  let rate = base;
  const now = new Date(2025, 11, 29);

  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    const yr = d.getFullYear();
    const wk = Math.ceil(
      ((d.getTime() - new Date(yr, 0, 1).getTime()) / 86400000 + 1) / 7
    );
    rate += (Math.random() - 0.5) * 2 * volatility;
    rate = Math.max(rate, base * 0.6);
    history.push({
      week: `${yr}-W${String(wk).padStart(2, '0')}`,
      avgRate: Math.round(rate),
    });
  }
  return history;
}

export const routes: FreightRoute[] = [
  {
    id: 'r1',
    origin: 'Tbilisi', originCountry: 'Georgia',
    destination: 'Munich', destinationCountry: 'Germany',
    currentAvgRate: 2840,
    previousWeekRate: 2760,
    weeklyHistory: generateHistory(2800, 12, 120),
    vehicleType: 'ტენტი',
    shipmentType: 'ექსპორტი',
    clientMarkupPct: 14,
  },
  {
    id: 'r2',
    origin: 'Istanbul', originCountry: 'Turkey',
    destination: 'Warsaw', destinationCountry: 'Poland',
    currentAvgRate: 1950,
    previousWeekRate: 2100,
    weeklyHistory: generateHistory(2000, 12, 90),
    vehicleType: 'ტენტი',
    shipmentType: 'ექსპორტი',
    clientMarkupPct: 12,
  },
  {
    id: 'r3',
    origin: 'Baku', originCountry: 'Azerbaijan',
    destination: 'Rotterdam', destinationCountry: 'Netherlands',
    currentAvgRate: 3420,
    previousWeekRate: 3380,
    weeklyHistory: generateHistory(3400, 12, 150),
    vehicleType: 'რეფი',
    shipmentType: 'ექსპორტი',
    clientMarkupPct: 18,
  },
  {
    id: 'r4',
    origin: 'Yerevan', originCountry: 'Armenia',
    destination: 'Berlin', destinationCountry: 'Germany',
    currentAvgRate: 2610,
    previousWeekRate: 2590,
    weeklyHistory: generateHistory(2600, 12, 100),
    vehicleType: 'ტენტი',
    shipmentType: 'ექსპორტი',
    clientMarkupPct: 13,
  },
  {
    id: 'r5',
    origin: 'Munich', originCountry: 'Germany',
    destination: 'Tbilisi', destinationCountry: 'Georgia',
    currentAvgRate: 2180,
    previousWeekRate: 2350,
    weeklyHistory: generateHistory(2250, 12, 110),
    vehicleType: 'მეგა',
    shipmentType: 'იმპორტი',
    clientMarkupPct: 16,
  },
  {
    id: 'r6',
    origin: 'Istanbul', originCountry: 'Turkey',
    destination: 'Frankfurt', destinationCountry: 'Germany',
    currentAvgRate: 1780,
    previousWeekRate: 1720,
    weeklyHistory: generateHistory(1750, 12, 80),
    vehicleType: 'ტენტი',
    shipmentType: 'ექსპორტი',
    clientMarkupPct: 11,
  },
  {
    id: 'r7',
    origin: 'Warsaw', originCountry: 'Poland',
    destination: 'Tbilisi', destinationCountry: 'Georgia',
    currentAvgRate: 1540,
    previousWeekRate: 1540,
    weeklyHistory: generateHistory(1550, 12, 70),
    vehicleType: 'რეფი',
    shipmentType: 'იმპორტი',
    clientMarkupPct: 15,
  },
  {
    id: 'r8',
    origin: 'Tehran', originCountry: 'Iran',
    destination: 'Munich', destinationCountry: 'Germany',
    currentAvgRate: 4100,
    previousWeekRate: 3950,
    weeklyHistory: generateHistory(4000, 12, 200),
    vehicleType: 'რეფი',
    shipmentType: 'ექსპორტი',
    clientMarkupPct: 20,
  },
  {
    id: 'r9',
    origin: 'Amsterdam', originCountry: 'Netherlands',
    destination: 'Baku', destinationCountry: 'Azerbaijan',
    currentAvgRate: 3750,
    previousWeekRate: 3800,
    weeklyHistory: generateHistory(3780, 12, 160),
    vehicleType: 'მეგა',
    shipmentType: 'იმპორტი',
    clientMarkupPct: 17,
  },
  {
    id: 'r10',
    origin: 'Tbilisi', originCountry: 'Georgia',
    destination: 'Amsterdam', destinationCountry: 'Netherlands',
    currentAvgRate: 2990,
    previousWeekRate: 2890,
    weeklyHistory: generateHistory(2940, 12, 130),
    vehicleType: 'ტენტი',
    shipmentType: 'ექსპორტი',
    clientMarkupPct: 13,
  },
];
