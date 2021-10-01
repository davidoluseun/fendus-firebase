import * as React from "react";
import { Box, Heading, FormControl, VisuallyHidden } from "@chakra-ui/react";
import { FormLabel, FormErrorMessage, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { selectState } from "../../redux";
import { options } from "../../utils/selectStateOptions";

type OptionTypes = { value: string; label: string };
type SelectedTypes = OptionTypes | OptionTypes[] | null;

type DeliveryEstimateProps = {
  selectState: (payload: string) => APP.DeliveryStateActionTypes;
  deliveryState: string;
};

const DeliveryEstimate = (props: DeliveryEstimateProps) => {
  const { selectState, deliveryState } = props;
  const [touched, setTouched] = React.useState(false);
  const history = useHistory();

  const handleChange = (selected?: SelectedTypes) => {
    const state = (selected as OptionTypes).value;
    setTouched(false);
    selectState(state);
  };

  const handleBlur = () => {
    if (deliveryState === "") setTouched(true);
  };

  const handlePushToPayment = () => history.push("/payment");

  return (
    <Box>
      <Heading as="h3" my="19px" fontSize="18px" fontWeight="semibold">
        Delivery Estimates
      </Heading>

      <FormControl mb="4" isInvalid={!deliveryState && touched}>
        <VisuallyHidden>
          <FormLabel>Delivery State</FormLabel>
        </VisuallyHidden>
        <Select
          options={options}
          defaultValue={
            options[
              options.findIndex((option) => option.value === deliveryState)
            ]
          }
          placeholder="Select delivery state"
          className={
            !deliveryState && touched
              ? "select-container invalid"
              : "select-container"
          }
          classNamePrefix="inner"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormErrorMessage fontSize="14px" color="error">
          State is required.
        </FormErrorMessage>
      </FormControl>

      <Button
        w="100%"
        bg="primary"
        color="#fff"
        border="1px solid"
        borderColor="primary"
        _hover={{ bg: "primary" }}
        _active={{ bg: "primary" }}
        disabled={deliveryState ? false : true}
        onClick={handlePushToPayment}
      >
        Proceed to Payment
      </Button>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  deliveryState: state.deliveryState.deliveryState,
});

const mapDispatchToProps = (dispatch: APP.DeliveryStateDispatchTypes) => ({
  selectState: (payload: string) => dispatch(selectState(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryEstimate);
