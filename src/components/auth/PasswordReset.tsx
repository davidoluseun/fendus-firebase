import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import CustomField from "../common/CustomField";
import { passwordResetSchema } from "../../schemas/passwordResetSchema";
import { auth } from "../../firebase";

type FormDataTypes = {
  email: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

type PasswordResetProps = {
  currentUser: APP.CurrentUserTypes;
};

const PasswordReset = ({ currentUser }: PasswordResetProps) => {
  const alert = useAlert();

  const handleSubmit = async (
    formData: FormDataTypes,
    { setSubmitting, resetForm }: FormikBagTypes
  ) => {
    setSubmitting(true);

    try {
      const actionCodeSettings = {
        url: `${process.env.REACT_APP_ACTION_CODE_URL}/sign-in`,
      };

      await auth.sendPasswordResetEmail(formData.email, actionCodeSettings);

      resetForm();
      setSubmitting(false);

      alert.show(
        `Hi👋, password reset link has been sent to your email address, follow the link to reset your password.`
      );
    } catch (err) {
      if (err.code === "auth/user-not-found")
        alert.show(
          "User not found! We don't have your email on platform app, maybe you entered the wrong email address."
        );
      else
        alert.show(
          "Oops! An error occurred. Check your internet connection and try again."
        );

      setSubmitting(false);
    }
  };

  if (currentUser) return <Redirect to="/" />;

  return (
    <Box as="section" px="4">
      <Box
        bg="#fff"
        p="4"
        maxW="400px"
        mx="auto"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Box textAlign="center" mb="4">
          <Heading as="h1" fontSize="26px">
            Reset Password
          </Heading>
          <Text fontSize="16px" mt="1">
            Enter your account's email address and we will send you a password
            reset link.
          </Text>
        </Box>
        
        <Formik
          initialValues={{ email: "" }}
          validationSchema={passwordResetSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <CustomField
                name="email"
                type="email"
                label="Email address"
                placeholder="Enter your email address"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <Button
                w="100%"
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
                Send Reset Email
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(PasswordReset);
