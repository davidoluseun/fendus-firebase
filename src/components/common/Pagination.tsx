import { Box, Button } from "@chakra-ui/react";
import _ from "lodash";

type PaginationProps = {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <Box
      as="nav"
      mt="2"
      display="inline-block"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      {pages.map((page) => (
        <Button
          key={page}
          p="2"
          bg={page === currentPage ? "primary" : "#fff"}
          color={page === currentPage ? "#fff" : "link"}
          onClick={() => onPageChange(page)}
          borderRadius="0"
          _hover={{ bg: page === currentPage ? "primary" : "#e2e8f0" }}
          _active={{ bg: page === currentPage ? "primary" : "#e2e8f0" }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
