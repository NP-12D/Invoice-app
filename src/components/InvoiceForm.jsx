import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import CustomDatePicker from "./CustomDatePicker";

const EMPTY_FORM = {
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  paymentTerms: "30",
  projectDescription: "",
  items: [{ id: Date.now(), name: "", qty: 1, price: 0, total: 0 }],
};

export default function InvoiceForm({
  isOpen,
  onClose,
  onSave,
  invoiceToEdit,
}) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(
        invoiceToEdit
          ? { ...invoiceToEdit }
          : {
              ...EMPTY_FORM,
              items: [{ id: Date.now(), name: "", qty: 1, price: 0, total: 0 }],
            },
      );
    }
  }, [invoiceToEdit, isOpen]);

  useEffect(() => {
    function handleOutside(e) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "qty" || field === "price") {
          updated.total =
            (Number(updated.qty) || 0) * (Number(updated.price) || 0);
        }
        return updated;
      }),
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), name: "", qty: 1, price: 0, total: 0 },
      ],
    }));
  };

  const deleteItem = (id) => {
    if (formData.items.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }));
  };

  const handleSubmit = (status) => {
    if (!formData.clientName || !formData.projectDescription) return;
    const total = formData.items.reduce((sum, i) => sum + i.total, 0);
    const id = invoiceToEdit
      ? invoiceToEdit.id
      : Math.random().toString(36).substr(2, 6).toUpperCase();
    onSave({
      ...formData,
      id,
      paymentDue: formData.invoiceDate,
      status,
      total,
    });
    onClose();
  };

  return (
    <Overlay>
      <Backdrop onClick={onClose} />

      <Panel>
        <FormBody className="custom-scroll">
          <Title>
            {invoiceToEdit ? `Edit #${invoiceToEdit.id}` : "New Invoice"}
          </Title>

          <Section>
            <SectionLabel>Bill From</SectionLabel>
            <FieldGroup>
              <FieldLabel>Street Address</FieldLabel>
              <Input
                name="senderStreet"
                value={formData.senderStreet}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <ThreeCol>
              <FieldGroup>
                <FieldLabel>City</FieldLabel>
                <Input
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleInputChange}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Post Code</FieldLabel>
                <Input
                  name="senderPostCode"
                  value={formData.senderPostCode}
                  onChange={handleInputChange}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Country</FieldLabel>
                <Input
                  name="senderCountry"
                  value={formData.senderCountry}
                  onChange={handleInputChange}
                />
              </FieldGroup>
            </ThreeCol>
          </Section>

          <Section>
            <SectionLabel>Bill To</SectionLabel>
            <FieldGroup>
              <FieldLabel>Client's Name</FieldLabel>
              <Input
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Client's Email</FieldLabel>
              <Input
                type="email"
                placeholder="e.g. email@example.com"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Street Address</FieldLabel>
              <Input
                name="clientStreet"
                value={formData.clientStreet}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <ThreeCol>
              <FieldGroup>
                <FieldLabel>City</FieldLabel>
                <Input
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleInputChange}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Post Code</FieldLabel>
                <Input
                  name="clientPostCode"
                  value={formData.clientPostCode}
                  onChange={handleInputChange}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Country</FieldLabel>
                <Input
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleInputChange}
                />
              </FieldGroup>
            </ThreeCol>
          </Section>

          <Section>
            <TwoCol>
              <CustomDatePicker
                selectedDate={formData.invoiceDate}
                onSelectDate={(date) =>
                  setFormData((prev) => ({ ...prev, invoiceDate: date }))
                }
                show={showDatePicker}
                setShow={setShowDatePicker}
                datePickerRef={datePickerRef}
              />
              <FieldGroup>
                <FieldLabel>Payment Terms</FieldLabel>
                <Select
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                >
                  <option value="30">Net 30 Days</option>
                  <option value="15">Net 15 Days</option>
                  <option value="1">Net 1 Day</option>
                </Select>
              </FieldGroup>
            </TwoCol>
            <FieldGroup>
              <FieldLabel>Project Description</FieldLabel>
              <Input
                placeholder="e.g. Graphic Design Services"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
              />
            </FieldGroup>
          </Section>

          <ItemSection>
            <ItemListTitle>Item List</ItemListTitle>

            <ItemHeaders>
              <span style={{ flex: 3 }}>Item Name</span>
              <span style={{ flex: 1, textAlign: "center" }}>Qty.</span>
              <span style={{ flex: 2 }}>Price</span>
              <span style={{ flex: 1.5 }}>Total</span>
              <span style={{ width: 40 }} />
            </ItemHeaders>

            {formData.items.map((item) => (
              <ItemRow key={item.id}>
                <ItemField $flex={3}>
                  <MobileLabel>Item Name</MobileLabel>
                  <Input
                    placeholder="Design Work"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(item.id, "name", e.target.value)
                    }
                  />
                </ItemField>
                <ItemField $flex={1}>
                  <MobileLabel>Qty.</MobileLabel>
                  <Input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(item.id, "qty", e.target.value)
                    }
                    style={{ textAlign: "center", padding: "0 4px" }}
                  />
                </ItemField>
                <ItemField $flex={2}>
                  <MobileLabel>Price (£)</MobileLabel>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(item.id, "price", e.target.value)
                    }
                  />
                </ItemField>
                <ItemTotal $flex={1.5}>
                  <MobileLabel>Total</MobileLabel>
                  <TotalValue>£{item.total.toFixed(2)}</TotalValue>
                </ItemTotal>
                <DeleteBtn type="button" onClick={() => deleteItem(item.id)}>
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M11.583 3.556H1.417M4.222 1.333h4.556M10.389 3.556l-.684 10.254a1.778 1.778 0 01-1.774 1.657H5.07a1.778 1.778 0 01-1.775-1.657L2.61 3.556" />
                  </svg>
                </DeleteBtn>
              </ItemRow>
            ))}

            <AddItemBtn type="button" onClick={addItem}>
              + Add New Item
            </AddItemBtn>
          </ItemSection>
        </FormBody>

        <Footer>
          <CancelBtn type="button" onClick={onClose}>
            {invoiceToEdit ? "Cancel" : "Discard"}
          </CancelBtn>
          <FooterRight>
            {!invoiceToEdit && (
              <DraftBtn type="button" onClick={() => handleSubmit("draft")}>
                Save as Draft
              </DraftBtn>
            )}
            <SaveBtn
              type="button"
              onClick={() =>
                handleSubmit(invoiceToEdit ? invoiceToEdit.status : "pending")
              }
            >
              {invoiceToEdit ? "Save Changes" : "Save & Send"}
            </SaveBtn>
          </FooterRight>
        </Footer>
      </Panel>
    </Overlay>
  );
}

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideIn = keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`;

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
  top: 0;
  left: 0;
  width: 100%;
  max-width: 616px;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  z-index: 2;
  box-shadow: 20px 0 50px rgba(0, 0, 0, 0.25);
  animation: ${slideIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  color: ${({ theme }) => theme.text};
  @media (min-width: 1024px) {
    left: 103px;
    max-width: 616px;
  }

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const FormBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 56px 24px 32px;

  @media (min-width: 768px) {
    padding: 56px 56px 32px;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height:100px;
    
    position:absolute;
    right:20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.secondaryHover};
    border-radius: 4px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 48px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionLabel = styled.h4`
  font-size: 12px;
  font-weight: 700;
  color: #7c5dfa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryText};
  letter-spacing: -0.1px;
`;

const Input = styled.input`
  height: 48px;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 15px;
  letter-spacing: -0.25px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease;
  font-family: inherit;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }

  &:focus {
    border-color: #7c5dfa;
  }
`;

const Select = styled.select`
  height: 48px;
  background-color: ${({ theme }) => theme.secondaryBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  padding: 0 20px;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-family: inherit;
  appearance: auto;
`;
const ThreeCol = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;

    & > div:last-child {
      grid-column: 1 / -1;
    }
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ItemSection = styled.div`
  margin-top: 8px;
`;

const ItemListTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 24px;
`;

const ItemHeaders = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 8px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ItemRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const ItemField = styled.div`
  flex: ${({ $flex }) => $flex};
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 600px) {
    flex: unset;
    width: ${({ $flex }) =>
      $flex === 3
        ? "100%"
        : $flex === 1
          ? "calc(30% - 8px)"
          : $flex === 2
            ? "calc(50% - 8px)"
            : "auto"};
  }
`;

const ItemTotal = styled.div`
  flex: ${({ $flex }) => $flex};
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: flex-end;

  @media (max-width: 600px) {
    flex: unset;
    width: calc(20% - 8px);
  }
`;

const MobileLabel = styled.label`
  font-size: 12px;
  color: #dfe3fa;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

const TotalValue = styled.span`
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: #888eb0;
`;

const DeleteBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #888eb0;
  display: flex;
  align-items: center;
  padding: 12px 4px;
  align-self: flex-end;
  transition: color 0.2s ease;

  &:hover {
    color: #ec5757;
  }
`;

const AddItemBtn = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.secondaryBg};
  border: none;
  border-radius: 24px;
  color: ${({ theme }) => theme.secondaryText};
  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s ease;
  font-family: inherit;

  &:hover {
    background-color: #1e2139;
  }
`;

const Footer = styled.div`
  height: 110px;
  background-color: ${({ theme }) => theme.background};

  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  @media (min-width: 768px) {
    padding: 0 56px;
  }
`;

const FooterRight = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelBtn = styled.button`
  height: 48px;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.secondaryBg};
  color: ${({ theme }) => theme.secondaryText};
  border: none;
  border-radius: 24px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
`;

const DraftBtn = styled.button`
  height: 48px;
  padding: 0 24px;
  background-color: #373b53;
  color: #888eb0;
  border: none;
  border-radius: 24px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0c0e16;
    color: #fff;
  }
`;

const SaveBtn = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
  height: 48px;
  padding: 0 24px;
  border: none;
  border-radius: 24px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #9277ff;
  }
`;
