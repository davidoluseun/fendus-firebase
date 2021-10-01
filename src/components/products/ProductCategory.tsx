import { Box } from "@chakra-ui/react";
import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ProductLayout02 from "../products/ProductLayout02";
import MainHelperLinks from "../common/MainHelperLinks";

type ParamTypes = {
  category: string;
};

type ProductCategoryProps = {
  storeItems: APP.StoreItemTypes[];
};

const getLinks = (title: string, category: string) => {
  return [
    { text: "Home", to: "/" },
    { text: title, to: `/products/${category}` },
  ];
};

const ProductCategory = ({ storeItems }: ProductCategoryProps) => {
  const { category } = useParams<ParamTypes>();

  const products = storeItems.filter(
    (storeItem) => storeItem.category === category
  );

  let title = category;
  if (category === "arrivals") title = "New Arrivals";

  const links = getLinks(title, category);

  if (products.length === 0) return <Redirect to="/not-found" />;

  return (
    <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <MainHelperLinks links={links} />
      <ProductLayout02 products={products.slice(0, 4)} />
      <ProductLayout02 products={products.slice(4, 8)} />
      <ProductLayout02 products={products.slice(8, 12)} />
      <ProductLayout02 products={products.slice(12, 16)} />
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
});

export default connect(mapStateToProps)(ProductCategory);
