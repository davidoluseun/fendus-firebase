import * as yup from "yup";

export const deliveryFormSchema = yup.object().shape({
  fullName: yup.string().trim().required("Full name is required."),
  email: yup
    .string()
    .trim()
    .email("Invalid email address.")
    .required("Email is required."),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required.")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
      "Invalid phone number."
    ),
  address: yup.string().trim().required("Address is required"),
  state: yup.string().trim().required("State is required"),
  city: yup.string().trim().required("City or town is required."),
});

export default deliveryFormSchema;
