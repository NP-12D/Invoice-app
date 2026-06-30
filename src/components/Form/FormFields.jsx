import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomDatePicker from "./CustomDatePicker";

const TERMS_OPTIONS = [
  { value: "1", label: "Net 1 Day" },
  { value: "7", label: "Net 7 Days" },
  { value: "15", label: "Net 15 Days" },
  { value: "30", label: "Net 30 Days" },
];

export default function FormFields({ 
  formData, 
  handleInputChange, 
  setFormData, 
  showDatePicker, 
  setShowDatePicker, 
  datePickerRef 
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close custom select dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTermLabel = TERMS_OPTIONS.find(
    (opt) => opt.value === String(formData.paymentTerms || "30")
  )?.label;

  const handleTermSelect = (value) => {
    // Mimic standard change event shape to stay compatible with handleInputChange
    handleInputChange({
      target: { name: "paymentTerms", value },
    });
    setShowDropdown(false);
  };

  return (
    <>
      <Section>
        <SectionLabel>Bill From</SectionLabel>
        <FieldGroup>
          <FieldLabel>Street Address</FieldLabel>
          <Input 
            name="senderAddress.street" 
            value={formData.senderAddress?.street || ""} 
            onChange={handleInputChange} 
          />
        </FieldGroup>
        <ThreeCol>
          <FieldGroup>
            <FieldLabel>City</FieldLabel>
            <Input 
              name="senderAddress.city" 
              value={formData.senderAddress?.city || ""} 
              onChange={handleInputChange} 
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Post Code</FieldLabel>
            <Input 
              name="senderAddress.postCode" 
              value={formData.senderAddress?.postCode || ""} 
              onChange={handleInputChange} 
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Country</FieldLabel>
            <Input 
              name="senderAddress.country" 
              value={formData.senderAddress?.country || ""} 
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
            value={formData.clientName || ""} 
            onChange={handleInputChange} 
          />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Client's Email</FieldLabel>
          <Input 
            type="email" 
            placeholder="e.g. email@example.com" 
            name="clientEmail" 
            value={formData.clientEmail || ""} 
            onChange={handleInputChange} 
          />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Street Address</FieldLabel>
          <Input 
            name="clientAddress.street" 
            value={formData.clientAddress?.street || ""} 
            onChange={handleInputChange} 
          />
        </FieldGroup>
        <ThreeCol>
          <FieldGroup>
            <FieldLabel>City</FieldLabel>
            <Input 
              name="clientAddress.city" 
              value={formData.clientAddress?.city || ""} 
              onChange={handleInputChange} 
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Post Code</FieldLabel>
            <Input 
              name="clientAddress.postCode" 
              value={formData.clientAddress?.postCode || ""} 
              onChange={handleInputChange} 
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Country</FieldLabel>
            <Input 
              name="clientAddress.country" 
              value={formData.clientAddress?.country || ""} 
              onChange={handleInputChange} 
            />
          </FieldGroup>
        </ThreeCol>
      </Section>

      {/* Meta Dates & Info Section */}
      <Section>
        <TwoCol>
          <CustomDatePicker
            selectedDate={formData.createdAt} 
            onSelectDate={(date) => setFormData((prev) => ({ ...prev, createdAt: date }))}
            show={showDatePicker}
            setShow={setShowDatePicker}
            datePickerRef={datePickerRef}
          />
          
          <FieldGroup ref={dropdownRef}>
            <FieldLabel>Payment Terms</FieldLabel>
            <CustomSelectWrapper>
              <SelectTrigger 
                type="button" 
                $isOpen={showDropdown}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span>{currentTermLabel}</span>
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" className="arrow-icon">
                  <path d="M1 1l4.22 4.22L9.44 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </SelectTrigger>

              {showDropdown && (
                <DropdownMenu>
                  {TERMS_OPTIONS.map((option) => (
                    <DropdownItem 
                      key={option.value} 
                      type="button"
                      $isSelected={String(formData.paymentTerms) === option.value}
                      onClick={() => handleTermSelect(option.value)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </CustomSelectWrapper>
          </FieldGroup>
        </TwoCol>
        
        <FieldGroup>
          <FieldLabel>Project Description</FieldLabel>
          <Input 
            placeholder="e.g. Graphic Design Services" 
            name="description" 
            value={formData.description || ""} 
            onChange={handleInputChange} 
          />
        </FieldGroup>
      </Section>
    </>
  );
}

// --- Styled Components ---

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
  position: relative;
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
  font-weight: 700;
  letter-spacing: -0.25px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease;
  font-family: inherit;
  background-color: ${({ theme }) => theme.inputBg || theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  &:focus {
    border-color: #7c5dfa;
  }
`;

/* --- Custom Pixel-Perfect Dropdown Selection Layouts --- */

const CustomSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectTrigger = styled.button`
  height: 48px;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBg || theme.card};
  border: 1px solid ${({ $isOpen, theme }) => ($isOpen ? "#7C5DFA" : theme.border)};
  border-radius: 4px;
  padding: 0 20px;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #7C5DFA;
  }

  .arrow-icon {
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
  z-index: 10;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  height: 48px;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 24px;
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.25px;
  color: ${({ $isSelected, theme }) => ($isSelected ? "#7C5DFA" : theme.text)};
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #7C5DFA;
  }
`;

const ThreeCol = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    & > div:last-child {
      grid-column: span 2;
    }
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;