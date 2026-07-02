import * as Yup from "yup";

export const invoiceValidationSchema = Yup.object().shape({
  senderAddress: Yup.object().shape({
    street: Yup.string().trim().required("can't be empty"),
    city: Yup.string().trim().required("can't be empty"),
    postCode: Yup.string().trim().required("can't be empty"),
    country: Yup.string().trim().required("can't be empty"),
  }),
  clientName: Yup.string().trim().required("can't be empty"),
  clientEmail: Yup.string()
    .trim()
    .required("can't be empty")
    .email("invalid email"),
  clientAddress: Yup.object().shape({
    street: Yup.string().trim().required("can't be empty"),
    city: Yup.string().trim().required("can't be empty"),
    postCode: Yup.string().trim().required("can't be empty"),
    country: Yup.string().trim().required("can't be empty"),
  }),
  description: Yup.string().trim().required("can't be empty"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().trim().required(""), 
        quantity: Yup.number()
          .typeError("")
          .positive("")
          .required(""),
        price: Yup.number()
          .typeError("")
          .positive("")
          .required(""),
      })
    )
    .min(1, "- An item must be added"), 
});