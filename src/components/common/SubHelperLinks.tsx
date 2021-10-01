import { Flex, Link, Icon, Button } from "@chakra-ui/react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { connect } from "react-redux";

type SubHelperLinksProps = {
  deliveryState: string;
  isCart?: boolean;
  isPayment?: boolean;
};

const SubHelperLinks = (props: SubHelperLinksProps) => {
  const { deliveryState, isCart, isPayment } = props;
  const history = useHistory();

  const handlePushToPayment = () => history.push("/payment");

  return (
    <Flex align="center" fontSize="14px" display={{ base: "none", lg: "flex" }}>
      <Link
        p="2"
        to="/cart"
        as={RouteLink}
        color={isCart ? "primary" : ""}
        _hover={{ textDecor: "none" }}
      >
        Cart
      </Link>
      <Icon boxSize="18px" as={MdKeyboardArrowRight} />

      <Button
        p="2"
        h="37px"
        borderRadius="0"
        fontSize="14px"
        bg="transparent"
        fontWeight="normal"
        color={isPayment ? "primary" : ""}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        disabled={deliveryState ? false : true}
        _disabled={{ opacity: ".7", cursor: "not-allowed" }}
        onClick={handlePushToPayment}
      >
        Payment
      </Button>
      <Icon boxSize="18px" as={MdKeyboardArrowRight} />
      <Link p="2" to="/orders" as={RouteLink} _hover={{ textDecor: "none" }}>
        Orders
      </Link>
    </Flex>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  deliveryState: state.deliveryState.deliveryState,
});

export default connect(mapStateToProps)(SubHelperLinks);
