import { Box, Heading, Flex, Link, Image } from "@chakra-ui/react";
import { Grid, LinkBox, LinkOverlay, Icon } from "@chakra-ui/react";
import * as CurrencyFormat from "react-currency-format";
import { Link as RouteLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

type ProductLayout01Props = {
  products: APP.StoreItemTypes[];
  title?: string;
  hasHeading?: boolean;
  hasMore?: boolean;
  path?: string;
};

const ProductLayout01 = (props: ProductLayout01Props) => {
  const { products, title, hasHeading, hasMore, path } = props;

  return (
    <Box mt="6" as={hasHeading ? "section" : "div"} borderRadius="md">
      {hasHeading ? (
        <Flex align="center" px="4" py="3" justify="space-between">
          <Heading as="h1" ml="-4" fontSize="20px" textTransform="capitalize">
            {title}
          </Heading>
          {hasMore ? (
            <Link
              as={RouteLink}
              to={path ? path : "/"}
              fontSize="16px"
              fontWeight="semibold"
              _hover={{ textDecor: "none" }}
            >
              View more
              <Icon boxSize="20px" as={MdKeyboardArrowRight} />
            </Link>
          ) : null}
        </Flex>
      ) : null}
      <Grid
        mt="4"
        p="4"
        bg="#fff"
        gridGap="6"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
      >
        {products.map((product) => (
          <LinkBox
            key={product._id}
            borderRadius="md"
            justifyContent="space-between"
            fontSize="16px"
          >
            <Image src={product.image} alt="" borderRadius="md" />

            <Heading
              as="h3"
              mt="2"
              mb="1"
              fontSize="inherit"
              fontWeight="semibold"
              maxW={{ base: "90px", sm: "initial", lg: "100px", xl: "initial" }}
              noOfLines={{ base: 1 }}
            >
              <LinkOverlay
                as={RouteLink}
                to={`/products/${product.category}/${product._id}`}
              >
                {product.title}
              </LinkOverlay>
            </Heading>

            <CurrencyFormat
              renderText={(value: number) => (
                <Box as="strong" color="primary">
                  {value}
                </Box>
              )}
              decimalScale={2}
              value={product.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix="&#8358;"
            />
          </LinkBox>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductLayout01;
