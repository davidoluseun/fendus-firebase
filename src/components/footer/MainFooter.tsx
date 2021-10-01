import { Grid, Box, Heading, Link, Text, Button } from "@chakra-ui/react";
import { Flex, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { VisuallyHidden, FormErrorMessage, Image } from "@chakra-ui/react";
import { Formik, Form, Field, FieldAttributes, FormikState } from "formik";
import { Link as RouteLink } from "react-router-dom";
import { useAlert } from "react-alert";
import { newsletterFormSchema } from "../../schemas/newsletterFormSchema";
import { auth } from "../../firebase";
import http from "../../services/httpService";
import Logo from "../../images/logo2.png";

type FormDataTypes = {
  email: string;
};

type FormikBagTypes = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormDataTypes>> | undefined
  ) => void;
};

const MainFooter = () => {
  const alert = useAlert();

  const handleSubmit = async (
    formData: FormDataTypes,
    { setSubmitting, resetForm }: FormikBagTypes
  ) => {
    setSubmitting(true);

    let displayName = auth.currentUser?.displayName;
    if (!displayName) displayName = "";

    const data = { displayName, email: formData.email };

    try {
      const res = await http.post("/subscribe", data);
      if (res.status === 200) {
        resetForm();
        alert.show(`Thanks for subscribing!`);
      } else {
        alert.show(
          "An error occurred. It seems our mail server is down, please try again."
        );
      }
    } catch (err) {
      alert.show(
        "Oops! An error occurred. Check your internet connection and try again."
      );
    }
    setSubmitting(false);
  };

  return (
    <Grid
      py="10"
      gridRowGap="30px"
      gridColumnGap="5%"
      templateColumns={{ base: "auto", md: "1.3fr 1.2fr .8fr" }}
    >
      <Box>
        <Link as={RouteLink} to="/">
          <Image src={Logo} alt="Store Logo" mb={{ base: "4", md: "6" }} />
        </Link>
        <Text>
          Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue,
          magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis,
          accumsan porttitor, facilisis luctus, metus.
        </Text>
        <Box mt="4">
          <Text>Got Questions? Call us 24/7</Text>
          <Link href="tel:+2348068623394">+2348068623394</Link>
        </Box>
      </Box>

      <Box flexBasis={{ base: "100%" }}>
        <Heading as="h3" fontSize="26px" mb={{ base: "4", md: "6" }}>
          Newsletter
        </Heading>
        <Box>
          Opt in to our mailing list to get updates on our latest prouducts.
        </Box>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={newsletterFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field name="email">
                {({ field }: FieldAttributes<any>) => {
                  return (
                    <FormControl
                      mt="4"
                      maxW="400px"
                      isInvalid={!!errors["email"] && touched["email"]}
                    >
                      <VisuallyHidden>
                        <FormLabel>Email address</FormLabel>
                      </VisuallyHidden>
                      <Flex>
                        <Input
                          {...field}
                          type="email"
                          borderRightRadius="0"
                          placeholder="Enter your email address"
                        />
                        <Button
                          bg="primary"
                          color="#fff"
                          type="submit"
                          fontWeight="semibold"
                          border="1px solid"
                          borderColor="primary"
                          borderLeftRadius="0"
                          isLoading={isSubmitting}
                          _hover={{ bg: "primary" }}
                          _active={{ bg: "primary" }}
                        >
                          Subscribe
                        </Button>
                      </Flex>
                      <FormErrorMessage>{errors["email"]}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
            </Form>
          )}
        </Formik>
      </Box>

      <Box fontStyle="normal" as="address" flexBasis={{ base: "100%" }}>
        <Heading
          as="h3"
          fontStyle="normal"
          fontSize="26px"
          mb={{ base: "4", md: "6" }}
        >
          Get In Touch
        </Heading>
        <Box>
          Shop D001 Ogba Multipurpose <br />
          Shopping Complex, <br />
          Ogba, Lagos.
        </Box>
        <Link
          mt="4"
          d="inline-block"
          target="_blank"
          rel="noreferrer"
          href="mailto:info@fendus.com"
        >
          info@fendus.com
        </Link>
      </Box>
    </Grid>
  );
};

export default MainFooter;
