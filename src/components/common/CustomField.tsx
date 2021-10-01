import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { VisuallyHidden, FormErrorMessage, Box, Flex } from "@chakra-ui/react";
import { Field, FieldAttributes } from "formik";

type CustomFieldProps = {
  name: string;
  label: string;
  type?: string;
  isTextarea?: boolean;
  isHidden?: boolean;
  isDisabled?: boolean;
  hasAsterisk?: boolean;
  placeholder?: string;
  errors: any;
  touched: any;
};

const CustomField = (props: CustomFieldProps) => {
  const { name, label, isHidden, type, isTextarea } = props;
  const { isDisabled, placeholder, errors, touched, hasAsterisk } = props;

  return (
    <Field name={name}>
      {({ field }: FieldAttributes<any>) => (
        <FormControl mb="4" isInvalid={!!errors[name] && touched[name]}>
          {isHidden ? (
            <VisuallyHidden>
              <FormLabel>{label}</FormLabel>
            </VisuallyHidden>
          ) : (
            <Flex>
              <FormLabel mr="2">{label}</FormLabel>
              {hasAsterisk && (
                <Box as="span" color="error">
                  *
                </Box>
              )}
            </Flex>
          )}
          {!isTextarea ? (
            <Input
              {...field}
              type={type}
              focusBorderColor="#000"
              errorBorderColor="error"
              borderColor="darkBorder"
              disabled={isDisabled}
              _hover={{ borderColor: "none" }}
              placeholder={placeholder}
            />
          ) : (
            <Textarea
              {...field}
              name="message"
              focusBorderColor="#000"
              errorBorderColor="error"
              borderColor="darkBorder"
              _hover={{ borderColor: "none" }}
              placeholder={placeholder}
            />
          )}

          <FormErrorMessage fontSize="14px" color="error">
            {errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomField;
