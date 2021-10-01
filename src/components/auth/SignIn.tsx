import { Box, Heading, Text, Button, Image, Link } from "@chakra-ui/react";
import { Link as RouteLink, useHistory, useLocation } from "react-router-dom";
import { Formik, Form, FormikState } from "formik";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
import CustomField from "../common/CustomField";
import PasswordField from "../common/PasswordField";
import { setCurrentUser } from "../../redux";
import { auth } from "../../firebase";
import { signInSchema } from "../../schemas/signInSchema";
import defaultUser from "../../images/user.webp";

type LocationTypes = {
  from: {
    pathname: string;
  };
};

type FormDataTypes = {
  email: string;
  password: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

type SignInProps = {
  currentUser: APP.CurrentUserTypes;
  setCurrentUser: (payload: APP.CurrentUserTypes) => APP.AuthActionTypes;
};

const SignIn = ({ setCurrentUser, currentUser }: SignInProps) => {
  const history = useHistory();
  const alert = useAlert();
  const { state } = useLocation<LocationTypes>();

  const handleSubmit = async (
    formData: FormDataTypes,
    { setSubmitting, resetForm }: FormikBagTypes
  ) => {
    setSubmitting(true);

    try {
      await auth.signInWithEmailAndPassword(formData.email, formData.password);

      setSubmitting(false);
      resetForm();

      setCurrentUser(auth.currentUser);

      alert.show(`Hi👋 ${auth.currentUser?.displayName}, welcome back.`);

      history.replace(state ? state.from.pathname : "/");
    } catch (err) {
      if (err.code === "auth/user-not-found")
        alert.show(
          "User not found! We don't have your email on our platform, maybe you entered the wrong email address."
        );
      else if (err.code === "auth/wrong-password")
        alert.show("Incorrect password.");
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
        p="4"
        mx="auto"
        bg="#fff"
        maxW="400px"
        borderRadius="md"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Box textAlign="center" mb="4">
          <Image src={defaultUser} mx="auto" mb="2" alt="" />
          <Heading as="h1" fontSize="26px">
            Welcome Back
          </Heading>
          <Text fontSize="16px">Login to continue</Text>
        </Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
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

              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter your password"
                isHidden={false}
                errors={errors}
                touched={touched}
              />

              <Box display="flex" justifyContent="flex-end">
                <Link
                  as={RouteLink}
                  to="/password-reset"
                  mt="-2"
                  href="#"
                  fontSize="16px"
                  color="link"
                >
                  Forgot Password?
                </Link>
              </Box>

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
                Login
              </Button>

              <Text fontSize="16px">
                Don't have an account?
                <Link as={RouteLink} to="/sign-up" ml="1" color="link">
                  Create one
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

const mapDispatchToProps = (dispatch: APP.AuthDispatchTypes) => ({
  setCurrentUser: (payload: APP.CurrentUserTypes) =>
    dispatch(setCurrentUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
