import styled from "styled-components";
import CustomDatePicker from "./CustomDatePicker";

export default function FormFields({ 
  formData, 
  handleInputChange, 
  setFormData, 
  showDatePicker, 
  setShowDatePicker, 
  datePickerRef 
}) {
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
          <FieldGroup>
            <FieldLabel>Payment Terms</FieldLabel>
            <Select 
              name="paymentTerms" 
              value={formData.paymentTerms || "30"} 
              onChange={handleInputChange}
            >
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="15">Net 15 Days</option>
              <option value="30">Net 30 Days</option>
            </Select>
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
  font-weight: 700;
  letter-spacing: -0.25px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease;
  font-family: inherit;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  &:focus {
    border-color: #7c5dfa;
  }
`;

const Select = styled.select`
  height: 48px;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  padding: 0 20px;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 700;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-family: inherit;
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