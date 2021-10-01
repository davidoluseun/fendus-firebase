import { Box, Button, Flex, Grid, Icon, Heading } from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import { FaUser } from "react-icons/fa";
import CustomField from "../common/CustomField";
import CustomSelect from "../common/CustomSelect";
import { profileFormSchema } from "../../schemas/profileFormSchema";

type FormDataTypes = {
  fullName: string;
  email: string;
  state: string;
  phoneNumber: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

type ProfileFormProps = {
  userInfo: APP.UserInfoTypes;
  doSubmit: (formData: APP.UserInfoTypes) => Promise<boolean>;
};

const ProfileForm = ({ userInfo, doSubmit }: ProfileFormProps) => {
  const initialValues = {
    fullName: userInfo ? userInfo.fullName : "",
    email: userInfo ? userInfo.email : "",
    state: userInfo ? userInfo.state : "",
    phoneNumber: userInfo ? userInfo.phoneNumber : "",
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
    <Box>
      <Flex align="center" fontSize={{ base: "18px", sm: "24px" }}>
        <Icon as={FaUser} color="primary" />
        <Heading as="h1" ml={{ base: "1", sm: "2" }} fontSize="inherit">
          Profile
        </Heading>
      </Flex>

      <Box
        p="4"
        mt="6"
        bg="#fff"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={profileFormSchema}
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
                <CustomSelect
                  name="state"
                  label="State"
                  hasAsterisk={true}
                  placeholder="Select your state"
                  errors={errors}
                  touched={touched}
                />

                <CustomField
                  name="phoneNumber"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  isHidden={false}
                  hasAsterisk={true}
                  errors={errors}
                  touched={touched}
                />
              </Grid>

              <Button
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
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ProfileForm;
