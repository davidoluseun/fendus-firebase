import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { VisuallyHidden, FormErrorMessage } from "@chakra-ui/react";
import { Field, FieldAttributes } from "formik";
import Select from "react-select";
import { options } from "../../utils/selectStateOptions";

type CustomSelectProps = {
  name: string;
  label: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  hasAsterisk?: boolean;
  placeholder?: string;
  errors: any;
  touched: any;
};

const CustomSelect = (props: CustomSelectProps) => {
  const { name, label, isHidden, placeholder, isDisabled } = props;
  const { errors, touched, hasAsterisk } = props;

  return (
    <Field name={name}>
      {({ field, form, onBlur }: FieldAttributes<any>) => (
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

          <Select
            name={name}
            options={options}
            value={options.find((option) => option.value === field.value)}
            className={
              !!errors[name] && touched[name]
                ? "select-container invalid"
                : "select-container"
            }
            isDisabled={isDisabled}
            classNamePrefix="inner"
            onChange={(option) => form.setFieldValue(name, option?.value)}
            onBlur={onBlur}
            placeholder={placeholder}
          />

          <FormErrorMessage fontSize="14px" color="error">
            {errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomSelect;
