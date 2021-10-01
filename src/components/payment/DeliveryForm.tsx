import { Box, Heading, Button, Grid } from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import { connect } from "react-redux";
import CustomField from "../common/CustomField";
import CustomSelect from "../common/CustomSelect";
import { deliveryFormSchema } from "../../schemas/deliveryFormSchema";

type FormDataTypes = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

type DeliveryFormProps = {
  doSubmit: (data: APP.UserInfoTypes) => Promise<boolean>;
  userInfo: APP.UserInfoTypes;
  deliveryState: string;
};

const DeliveryForm = (props: DeliveryFormProps) => {
  const { doSubmit, userInfo, deliveryState } = props;

  const initialValues = {
    fullName: userInfo ? userInfo.fullName : "",
    email: userInfo? userInfo.email : "",
    phoneNumber: userInfo ? userInfo.phoneNumber : "",
    address: userInfo ? userInfo.address : "",
    city: userInfo ? userInfo.city : "",
    state: deliveryState,
  };

  const handleSubmit = async (
    formData: FormDataTypes,
    { setSubmitting, resetForm }: FormikBagTypes
  ) => {
    setSubmitting(true);

    const isSubmitted = await doSubmit(formData);

    if (isSubmitted) resetForm();

    setSubmitting(false);
  };

  return (
    <Box as="section">
      <Box
        p="4"
        borderRadius="md"
        bg="#fff"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Heading as="h1" mb="4" fontSize="20px">
          Delivery Details
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={deliveryFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomField
                  name="fullName"
                  type="text"
                  label="Full name"
                  placeholder="Enter your full name"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="Enter your email address"
                  isHidden={false}
                  hasAsterisk={true}
                  isDisabled={true}
                  errors={errors}
                  touched={touched}
                />
              </Grid>

              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomField
                  name="phoneNumber"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="address"
                  type="text"
                  label="Address"
                  placeholder="Enter delivery address"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />
              </Grid>

              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)" }}
                gridGap={{ sm: "6" }}
              >
                <CustomSelect
                  name="state"
                  label="State"
                  hasAsterisk={true}
                  isDisabled={true}
                  placeholder="Select delivery state"
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="city"
                  type="text"
                  label="City/Town"
                  placeholder="Enter delivery city or town"
                  isHidden={false}
                  errors={errors}
                  hasAsterisk={true}
                  touched={touched}
                />
              </Grid>

              <Button
                w="100%"
                my="4"
                bg="primary"
                color="#fff"
                type="submit"
                fontWeight="semibold"
                border="1px solid"
                borderColor="primary"
                isLoading={isSubmitting}
                _hover={{ bg: "primary" }}
                _active={{ bg: "primary" }}
              >
                Submit Details
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  deliveryState: state.deliveryState.deliveryState,
});

export default connect(mapStateToProps)(DeliveryForm);
