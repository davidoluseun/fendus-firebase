import { Box } from "@chakra-ui/react";
import { connect } from "react-redux";
import Hero from "../hero/Hero";
import ProductLayout01 from "../products/ProductLayout01";
import ProductLayout02 from "../products/ProductLayout02";

type HomeProps = {
  storeItems: APP.StoreItemTypes[];
};

const Home = ({ storeItems }: HomeProps) => {
  const arrivals = storeItems.filter(
    (storeItem) => storeItem.category === "arrivals"
  );

  const bags = storeItems.filter((storeItem) => storeItem.category === "bags");

  const fitness = storeItems.filter(
    (storeItem) => storeItem.category === "fitness"
  );

  const household = storeItems.filter(
    (storeItem) => storeItem.category === "household"
  );

  const kitchen = storeItems.filter(
    (storeItem) => storeItem.category === "kitchen"
  );

  return (
    <Box
      as="main"
      mt="4"
      px={{ base: "4", md: "6" }}
      marginX="auto"
      maxW="1200px"
    >
      <Hero />
      <ProductLayout01
        title="New Arrivals"
        hasHeading={true}
        hasMore={true}
        path="products/arrivals"
        products={arrivals.slice(0, 6)}
      />

      <ProductLayout02
        title="Kitchen"
        hasHeading={true}
        hasMore={true}
        path="products/kitchen"
        products={kitchen.slice(0, 4)}
      />

      <ProductLayout01
        title="Household"
        hasHeading={true}
        hasMore={true}
        path="products/household"
        products={household.slice(0, 6)}
      />

      <ProductLayout02
        title="Fitness"
        hasHeading={true}
        hasMore={true}
        path="products/fitness"
        products={fitness.slice(0, 4)}
      />

      <ProductLayout01
        title="Bags"
        hasHeading={true}
        hasMore={true}
        path="products/bags"
        products={bags.slice(0, 6)}
      />
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
});

export default connect(mapStateToProps)(Home);
