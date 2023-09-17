import { useMemo } from 'react';
import { useFilters } from './Context';
import data, { Produce } from './data';
import { map, sortBy, uniqBy } from 'lodash-es';
import { Table, Tbody, Td, Tr } from '@chakra-ui/react';
import Fuse from 'fuse.js';

const fuse = new Fuse(data, {
  keys: ['name'],
  threshold: 0.1,
});

const List: React.FC = () => {
  const { groups, availability, sources, month, query } = useFilters();

  const availabilityFilter = useMemo(
    () =>
      new RegExp(
        `^(${[...availability].join('|')})(\\.(${[...sources].join('|')}))?$`,
      ),
    [availability, sources],
  );

  const searchResults = useMemo(
    () => (query ? map(fuse.search(query), 'item') : sortBy(data, 'name')),
    [query],
  );

  const filtered = useMemo(
    () =>
      uniqBy(
        searchResults.filter((item) => {
          if (!groups.has(item.group)) return false;
          const value = item.months[month];
          if (!value.match(availabilityFilter)) return false;
          return true;
        }),
        'name',
      ),
    [searchResults, groups, availabilityFilter, month],
  );

  return (
    <Table minHeight={0}>
      <Tbody>
        {filtered.map((item) => (
          <Row key={item.name} produce={item} />
        ))}
      </Tbody>
    </Table>
  );
};

const Row: React.FC<{ produce: Produce }> = ({ produce }) => {
  const { month } = useFilters();
  const color = useMemo(() => {
    const value = produce.months[month];
    if (value.startsWith('available')) return 'green';
    if (value.startsWith('limited')) return 'yellow';
    return 'red';
  }, [produce, month]);
  const imported = produce.months[month].endsWith('.imported');

  return (
    <Tr>
      <Td color={`${color}.500`} pr={0}>
        ●
      </Td>
      <Td pl={4}>{produce.name}</Td>
      <Td
        color={`${color}.500`}
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="0.1em"
        minW="7.5rem"
        textAlign="right"
      >
        {imported && 'Imported'}
      </Td>
    </Tr>
  );
};

export default List;
