import { Box } from "@chakra-ui/react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import ProductLayout02 from "./ProductLayout02";
import ProductItem from "./ProductItem";
import MainHelperLinks from "../common/MainHelperLinks";

type ProductProps = {
  storeItems: APP.StoreItemTypes[];
};

type ParamTypes = {
  category: string;
  id: string;
};

type LinksType = {
  title: string;
  category: string;
  product: APP.StoreItemTypes | undefined;
  id: string;
};

const getLinks = ({ title, category, product, id }: LinksType) => {
  return [
    { text: "Home", to: "/" },
    { text: title, to: `/products/${category}` },
    { text: product?.title, to: `/products/${category}/${id}` },
  ];
};

const Product = ({ storeItems }: ProductProps) => {
  let { category, id } = useParams<ParamTypes>();

  const product = storeItems.find((storeItem) => storeItem._id === id);
  
  const reletedProducts = storeItems.filter(
    (storeItem) => storeItem.category === category
  );

  let title = category;
  if (category === "arrivals") title = "New Arrivals";

  const links = getLinks({ title, category, product, id });

  if (product === undefined) return <Redirect to="/not-found" />;

  return (
    <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <MainHelperLinks links={links} />
      <ProductItem product={product} />
      <ProductLayout02
        hasHeading={true}
        title="Related Products"
        products={reletedProducts.slice(0, 4)}
      />
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
});

export default connect(mapStateToProps)(Product);
