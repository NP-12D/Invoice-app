import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import FormFields from "./FormFields";
import ItemRows from "./ItemRows";
import FormFooter from "./FormFooter";

const EMPTY_FORM = {
  senderAddress: { street: "", city: "", postCode: "", country: "" },
  clientAddress: { street: "", city: "", postCode: "", country: "" },
  clientName: "",
  clientEmail: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  paymentTerms: "30",
  description: "",
  items: [],
};

export default function InvoiceForm({ isOpen, onClose, onSave, invoiceToEdit }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (invoiceToEdit) {
        setFormData({
          ...invoiceToEdit,
          senderAddress: { ...(invoiceToEdit.senderAddress || {}) },
          clientAddress: { ...(invoiceToEdit.clientAddress || {}) },
          items: (invoiceToEdit.items || []).map((item, index) => ({
            ...item,
            id: item.id || `existing-item-${index}`,
            quantity: item.quantity || item.qty || 1, 
          }))
        });
      } else {
        setFormData({
          ...EMPTY_FORM,
          senderAddress: { ...EMPTY_FORM.senderAddress },
          clientAddress: { ...EMPTY_FORM.clientAddress },
          items: [{ id: `new-item-${Date.now()}`, name: "", quantity: 1, price: 0, total: 0 }]
        });
      }
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

    setFormData((prev) => {
      if (!name.includes(".")) {
        return { ...prev, [name]: value };
      }
      const [parentKey, childKey] = name.split(".");
      return {
        ...prev,
        [parentKey]: {
          ...(prev[parentKey] || {}), 
          [childKey]: value,
        },
      };
    });
  };

  const handleItemChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== id) return item;

        const targetField = field === "qty" ? "quantity" : field;
        
        const updated = { 
          ...item, 
          [targetField]: field === "price" ? (parseFloat(value) || 0) : (parseInt(value, 10) || 0)
        };

        updated.total = updated.quantity * updated.price;
        return updated;
      }),
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items, 
        { id: `item-${Date.now()}`, name: "", quantity: 1, price: 0, total: 0 }
      ],
    }));
  };

  const deleteItem = (id) => {
    if (formData.items.length === 1) return;
    setFormData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }));
  };

  const handleSubmit = (actionType) => {
    const total = formData.items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    
    let finalStatus = "pending";

    if (!invoiceToEdit) {
      finalStatus = actionType === "draft" ? "draft" : "pending";
    } else {
      finalStatus = invoiceToEdit.status === "draft" && actionType === "send" ? "pending" : invoiceToEdit.status;
    }

    const sanitizedItems = formData.items.map(item => ({
      name: item.name,
      quantity: Number(item.quantity),
      price: Number(item.price),
      total: Number(item.total)
    }));

    onSave({
      ...formData,
      id: invoiceToEdit ? invoiceToEdit.id : `RT${Math.floor(1000 + Math.random() * 9000)}`,
      status: finalStatus,
      items: sanitizedItems,
      total,
    });
    
    onClose();
  };

  return (
    <Overlay>
      <Backdrop onClick={onClose} />
      <Panel>
        <FormBody className="custom-scroll">
          <GoBackMobile onClick={onClose}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
              <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Go back</span>
          </GoBackMobile>

          <Title>
            {invoiceToEdit ? <>Edit <span>#</span>{invoiceToEdit.id}</> : "New Invoice"}
          </Title>

          <FormFields
            formData={formData}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            datePickerRef={datePickerRef}
          />

          <ItemRows
            items={formData.items}
            handleItemChange={handleItemChange}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        </FormBody>

        <FormFooter
          isEditMode={!!invoiceToEdit}
          onClose={onClose}
          onActionClick={handleSubmit} 
        />
      </Panel>
    </Overlay>
  );
}

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideIn = keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99; 
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
  left: 0;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  box-shadow: 20px 0 50px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  color: ${({ theme }) => theme.text};
  z-index: 2;
  
  @media (max-width: 650px) {
    top: 70px; 
    width: 100%;
    max-width: 100%;
    height: calc(100vh - 70px);
  }

  @media (min-width: 651px) and (max-width: 1023px) {
    top: 80px; 
    width: 100%;
    max-width: 616px;
    height: calc(100vh - 80px);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  @media (min-width: 1024px) {
    top: 0;
    left: 103px;
    width: 100%;
    max-width: 616px;
    height: 100vh;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const FormBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px 24px 32px;
  @media (min-width: 1024px) { padding: 56px 56px 32px; }
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-thumb { background-color: ${({ theme }) => theme.border}; border-radius: 4px; }
`;

const GoBackMobile = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  padding: 0;
  font-family: inherit;
  display: none;
  @media (max-width: 650px) { display: flex; }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 48px;
  letter-spacing: -0.5px;
  span { color: ${({ theme }) => theme.secondaryText}; }
  @media (max-width: 600px) { font-size: 20px; margin-bottom: 24px; }
`;