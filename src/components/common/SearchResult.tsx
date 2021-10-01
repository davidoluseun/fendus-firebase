import * as React from "react";
import { Box, Link } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

type SearchResultProps = {
  queryItems: APP.StoreItemTypes[];
  clearQuery: () => void;
};

const SearchResult = ({ queryItems, clearQuery }: SearchResultProps) => {
  const history = useHistory();

  const handlePushToProduct = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    queryItem: APP.StoreItemTypes
  ) => {
    e.preventDefault();
    history.push(`/products/${queryItem.category}/${queryItem._id}`);
    clearQuery();
  };

  return (
    <Box
      bg="#fff"
      mt="1"
      w={{ base: "100%", sm: "400px" }}
      maxH="400px"
      overflowY="auto"
      top={{ base: "50px", lg: "42px" }}
      borderRadius="md"
      position="absolute"
      display={queryItems.length === 0 ? "none" : "block"}
      border=".5px solid rgba(0, 0, 0, .15)"
      boxShadow="0 1px 2px rgba(0, 0, 0, .15)"
    >
      {queryItems.map((queryItem) => (
        <Link
          py="1"
          px="2"
          key={queryItem._id}
          display="block"
          onClick={(e) => handlePushToProduct(e, queryItem)}
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          {queryItem.title}
        </Link>
      ))}
    </Box>
  );
};

export default SearchResult;
