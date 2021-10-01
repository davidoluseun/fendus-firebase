import * as yup from "yup";

export const passwordResetSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email address.")
    .required("Email is required."),
});

export default passwordResetSchema;
