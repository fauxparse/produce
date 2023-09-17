import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useFilters } from './Context';

type HeaderProps = {
  showFilters: () => void;
};

const Header: React.FC<HeaderProps> = ({ showFilters }) => {
  const { query, setQuery } = useFilters();

  return (
    <HStack p={2} bgColor="gray.200">
      <InputGroup size="lg">
        <Input
          size="lg"
          autoFocus
          pr="4.5rem"
          type="text"
          placeholder="Search"
          bgColor="white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button size="md" mr={1} onClick={showFilters}>
            Filter
          </Button>
        </InputRightElement>
      </InputGroup>
    </HStack>
  );
};

export default Header;
