import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";
import { Link as RouteLink, Redirect, useHistory } from "react-router-dom";
import { Formik, Form, FormikState } from "formik";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import CustomField from "../common/CustomField";
import PasswordField from "../common/PasswordField";
import { signUpSchema } from "../../schemas/signUpSchema";
import { auth, db } from "../../firebase";

type FormDataTypes = {
  fullName: string;
  email: string;
  password: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

type SignUpProps = {
  currentUser: APP.CurrentUserTypes;
};

const SignUp = ({ currentUser }: SignUpProps) => {
  const alert = useAlert();
  const history = useHistory();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    formData: FormDataTypes,
    { setSubmitting, resetForm }: FormikBagTypes
  ) => {
    setSubmitting(true);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      let displayName = formData.fullName;

      if (displayName.indexOf(" ") >= 0)
        displayName = displayName.split(" ").slice(0, -1)[0];

      await user?.updateProfile({ displayName });

      await db.collection("users").doc(user?.uid).set({
        fullName: formData.fullName,
        displayName,
        email: formData.email,
        phoneNumber: "",
        address: "",
        state: "",
        city: "",
      });

      const actionCodeSettings = {
        url: `${process.env.REACT_APP_ACTION_CODE_URL}`,
      };

      await user?.sendEmailVerification(actionCodeSettings);

      resetForm();
      setSubmitting(false);

      alert.show(
        `Hi👋 ${displayName}, a verification link has been sent to your email address, ensure to verify your email in order to make payment.`
      );

      history.replace("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        alert.show(
          "Email already in use. If this is your email sign in instead."
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
            Create Account
          </Heading>
          <Text fontSize="16px">Create a new account</Text>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <CustomField
                name="fullName"
                type="text"
                label="Full name"
                placeholder="Enter your full name"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <CustomField
                name="email"
                type="email"
                label="Email address"
                placeholder="Enter your email address"
                isHidden={false}
                errors={errors}
                touched={touched}
              />
              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter your password"
                isHidden={false}
                errors={errors}
                touched={touched}
              />
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
                Create Account
              </Button>

              <Text fontSize="16px">
                Already have an account?
                <Link as={RouteLink} to="/sign-in" ml="1" color="link">
                  Sign in
                </Link>
              </Text>
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

export default connect(mapStateToProps)(SignUp);
