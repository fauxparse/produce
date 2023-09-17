import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GROUPS, Month, SOURCES } from './data';
import { useFilters } from './Context';
import { upperFirst } from 'lodash-es';

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MONTH_LABELS: Record<Month, string> = {
  jan: 'January',
  feb: 'February',
  mar: 'March',
  apr: 'April',
  may: 'May',
  jun: 'June',
  jul: 'July',
  aug: 'August',
  sep: 'September',
  oct: 'October',
  nov: 'November',
  dec: 'December',
};

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const {
    groups,
    toggleGroup,
    availability,
    toggleAvailability,
    sources,
    toggleSource,
    month,
    nextMonth,
    previousMonth,
  } = useFilters();

  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Stack gap={4} py={4}>
            <ButtonGroup isAttached>
              <Button variant="outline" onClick={previousMonth}>
                Previous
              </Button>
              <Text
                flex={1}
                display="grid"
                placeContent="center"
                borderWidth="1px 0"
                borderColor="gray.200"
                px={4}
                fontWeight="semibold"
              >
                {MONTH_LABELS[month]}
              </Text>
              <Button variant="outline" onClick={nextMonth}>
                Next
              </Button>
            </ButtonGroup>
            <Divider />
            <ButtonGroup flexWrap="wrap" gap={2} spacing={0}>
              {GROUPS.map((group) => (
                <Button
                  key={group}
                  colorScheme={groups.has(group) ? 'blue' : undefined}
                  onClick={() => toggleGroup(group)}
                >
                  {group}
                </Button>
              ))}
            </ButtonGroup>
            <Divider />
            <ButtonGroup>
              <Button
                colorScheme={
                  availability.has('available') ? 'green' : undefined
                }
                onClick={() => toggleAvailability('available')}
              >
                Available
              </Button>
              <Button
                colorScheme={availability.has('limited') ? 'yellow' : undefined}
                onClick={() => toggleAvailability('limited')}
              >
                Limited
              </Button>
              <Button
                colorScheme={
                  availability.has('unavailable') ? 'red' : undefined
                }
                onClick={() => toggleAvailability('unavailable')}
              >
                Unavailable
              </Button>
            </ButtonGroup>
            <Divider />
            <ButtonGroup>
              {SOURCES.map((source) => (
                <Button
                  key={source}
                  colorScheme={sources.has(source) ? 'blue' : undefined}
                  onClick={() => toggleSource(source)}
                >
                  {upperFirst(source)}
                </Button>
              ))}
            </ButtonGroup>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
