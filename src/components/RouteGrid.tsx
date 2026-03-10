import type { FreightRoute, TimeFilterState, RateType } from '../data/mockData';
import RouteCard from './RouteCard';

interface Props {
  routes: FreightRoute[];
  filter: TimeFilterState;
  rateType: RateType;
}

export default function RouteGrid({ routes, filter, rateType }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} filter={filter} rateType={rateType} />
      ))}
    </div>
  );
}
