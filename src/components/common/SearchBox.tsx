import * as React from "react";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

type SearchBoxProps = {
  hasRightElement?: boolean;
  hasAutoFocus?: boolean;
  value: string;
  onChange: (query: string) => void;
  
};

const SearchBox = ({ hasRightElement, value, onChange }: SearchBoxProps) => {
  return (
    <InputGroup>
      <Input
        h="42px"
        name="search"
        type="search"
        borderRadius="full"
        value={value}
        focusBorderColor="#000"
        borderColor="darkBorder"
        autoComplete="off"
        placeholder="Search products..."
        onChange={(e) => onChange(e.currentTarget.value)}
        _hover={{ borderColor: "darkBorer" }}
      />
      {hasRightElement && (
        <InputRightElement
          pointerEvents="none"
          children={<MdSearch size="24px" />}
        />
      )}
    </InputGroup>
  );
};

export default SearchBox;
