import { invoiceValidationSchema } from "./yup";
import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormFields from "./FormFields";
import ItemRows from "./ItemRows";
import FormFooter from "./FormFooter";

const EMPTY_FORM = {
  senderAddress: { street: "", city: "", postCode: "", country: "" },
  clientAddress: { street: "", city: "", postCode: "", country: "" },
  clientName: "",
  clientEmail: "",
  createdAt: new Date().toISOString().split("T")[0],
  paymentTerms: "30",
  description: "",
  items: [{ name: "", quantity: 1, price: 0, total: 0 }],
};

export default function InvoiceForm({
  isOpen,
  onClose,
  onSave,
  invoiceToEdit,
}) {
  const datePickerRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceValidationSchema),
    defaultValues: structuredClone(EMPTY_FORM),
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (isOpen) {
      if (invoiceToEdit) {
        reset(structuredClone(invoiceToEdit));
      } else {
        reset(structuredClone(EMPTY_FORM));
      }
    }
  }, [invoiceToEdit, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmitHandler = (data) => {
    const cleanData = structuredClone(data);
    const issueDate = new Date(cleanData.createdAt);
    const termsDays = Number(cleanData.paymentTerms || 30);
    issueDate.setDate(issueDate.getDate() + termsDays);
    const paymentDue = issueDate.toISOString().split("T")[0];

    const total = cleanData.items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0,
    );
    const sanitizedItems = cleanData.items.map((item) => ({
      ...item,
      total: Number(item.quantity) * Number(item.price),
    }));

    onSave({
      ...cleanData,
      id: invoiceToEdit
        ? invoiceToEdit.id
        : `RT${Math.floor(1000 + Math.random() * 9000)}`,
      status: invoiceToEdit ? invoiceToEdit.status : "pending",
      items: sanitizedItems,
      total,
      paymentDue, 
    });
    onClose();
  };

  const handleSaveDraft = () => {
    const currentValues = structuredClone(getValues());

    const issueDate = new Date(currentValues.createdAt || new Date());
    const termsDays = Number(currentValues.paymentTerms || 30);
    issueDate.setDate(issueDate.getDate() + termsDays);
    const paymentDue = issueDate.toISOString().split("T")[0];

    onSave({
      ...currentValues,
      id: `RT${Math.floor(1000 + Math.random() * 9000)}`,
      status: "draft",
      paymentDue,
      total:
        currentValues.items?.reduce(
          (sum, item) =>
            sum + Number(item.quantity || 0) * Number(item.price || 0),
          0,
        ) || 0,
    });
    onClose();
  };

  const onFooterActionClick = (actionType) => {
    if (actionType === "draft") {
      handleSaveDraft();
    } else {
      handleSubmit(onSubmitHandler)();
    }
  };

  return (
    <Overlay>
      <Backdrop onClick={onClose} />
      <Panel>
        <FormBody className="form-body-container custom-scroll">
          <GoBackMobile onClick={onClose}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
              <path
                d="M6 1L2 5l4 4"
                stroke="#7C5DFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Go back</span>
          </GoBackMobile>
          <Title>
            {invoiceToEdit ? (
              <>
                Edit <span>#</span>
                {invoiceToEdit.id}
              </>
            ) : (
              "New Invoice"
            )}
          </Title>

          <FormFields
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            datePickerRef={datePickerRef}
          />

          <ItemRows
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
            control={control}
          />

          {errors.items?.root && (
            <ErrorMessageText>{errors.items.root.message}</ErrorMessageText>
          )}
          {Object.keys(errors).length > 0 && (
            <GlobalErrorText>- All fields must be populated</GlobalErrorText>
          )}
        </FormBody>

        <FormFooter
          isEditMode={!!invoiceToEdit}
          onClose={onClose}
          onActionClick={onFooterActionClick}
        />
      </Panel>
    </Overlay>
  );
}

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideInDesktop = keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`;
const slideInMobile = keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  animation: ${fadeIn} 0.25s ease-out forwards;
`;

const Panel = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  box-shadow: 20px 0 50px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.text};
  z-index: 2;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    top: 0;
    padding-left: 103px;
    width: 100%;
    max-width: 640px;
    height: 100vh;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    animation: ${slideInDesktop} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @media (min-width: 651px) and (max-width: 1023px) {
    top: 80px;
    left: 0;
    padding-left: 0px;
    width: 100%;
    max-width: 616px;
    height: calc(100vh - 80px);
    border-top-right-radius: 20px;
    animation: ${slideInDesktop} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @media (max-width: 650px) {
    top: 72px;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: calc(100vh - 72px);
    animation: ${slideInMobile} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

const FormBody = styled.div`
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  margin-right: 12px;
  padding: 24px 12px 32px 24px;

  @media (min-width: 1024px) {
    margin-right: 20px;
    padding: 56px 20px 32px 56px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrol};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
`;

const GoBackMobile = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.25px;
  cursor: pointer;
  display: none;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 0;
  font-family: inherit;

  @media (max-width: 650px) {
    display: flex;
  }
`;

const Title = styled.h2`
  font-family: "League Spartan", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 48px 0;
  letter-spacing: -0.5px;

  span {
    color: #7e88c3;
  }

  @media (max-width: 650px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const GlobalErrorText = styled.p`
  color: #ec5757;
  font-size: 10px;
  font-weight: 600;
  margin-top: 32px;
  letter-spacing: -0.21px;
`;

const ErrorMessageText = styled.p`
  color: #ec5757;
  font-size: 10px;
  font-weight: 600;
  margin-top: 12px;
`;