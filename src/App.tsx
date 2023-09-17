import { Box, ChakraProvider, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import FilterDrawer from './FilterDrawer';
import FilterProvider from './FilterProvider';
import List from './List';
import Header from './Header';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ChakraProvider>
      <FilterProvider>
        <Stack position="fixed" inset={0} spacing={0}>
          <Header showFilters={() => setDrawerOpen(true)} />
          <Box flex={1} overflowY="auto">
            <List />
          </Box>
        </Stack>
        <FilterDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </FilterProvider>
    </ChakraProvider>
  );
};

export default App;
