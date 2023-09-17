import { PropsWithChildren, useCallback, useState } from 'react';
import { Availability, GROUPS, MONTHS, Month, Source } from './data';
import { DateTime } from 'luxon';
import { Context, useFilterSet } from './Context';

const FilterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [month, setMonth] = useState<Month>(
    DateTime.now().toFormat('MMM').toLowerCase() as Month,
  );
  const [groups, toggleGroup] = useFilterSet(GROUPS);
  const [availability, toggleAvailability] = useFilterSet<Availability>([
    'available',
    'limited',
  ]);
  const [sources, toggleSource] = useFilterSet<Source>(['imported', 'local']);

  const nextMonth = useCallback(() => {
    setMonth(
      (current) => MONTHS[(MONTHS.indexOf(current) + 1) % MONTHS.length],
    );
  }, []);

  const previousMonth = useCallback(() => {
    setMonth(
      (current) => MONTHS[(MONTHS.indexOf(current) + 11) % MONTHS.length],
    );
  }, []);

  const [query, setQuery] = useState('');

  return (
    <Context.Provider
      value={{
        groups,
        toggleGroup,
        availability,
        toggleAvailability,
        sources,
        toggleSource,
        month,
        setMonth,
        nextMonth,
        previousMonth,
        query,
        setQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default FilterProvider;
