import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useWatch } from "react-hook-form";
import CustomDatePicker from "./CustomDatePicker";

const TERMS_OPTIONS = [
  { value: "1", label: "Net 1 Day" },
  { value: "7", label: "Net 7 Days" },
  { value: "15", label: "Net 15 Days" },
  { value: "30", label: "Net 30 Days" },
];

export default function FormFields({
  register,
  errors,
  control,
  setValue,
  datePickerRef,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const dropdownRef = useRef(null);

  const currentTerms = useWatch({ control, name: "paymentTerms" });
  const createdAt = useWatch({ control, name: "createdAt" });

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [datePickerRef]);

  const currentTermLabel = TERMS_OPTIONS.find(
    (opt) => opt.value === String(currentTerms || "30"),
  )?.label;

  const handleTermSelect = (value) => {
    setValue("paymentTerms", value);
    setShowDropdown(false);
  };

  return (
    <>
      <Section>
        <SectionLabel>Bill From</SectionLabel>

        <FieldGroup>
          <LabelRow>
            <FieldLabel $hasError={!!errors.senderAddress?.street}>
              Street Address
            </FieldLabel>
            {errors.senderAddress?.street && (
              <ErrorMessage>{errors.senderAddress.street.message}</ErrorMessage>
            )}
          </LabelRow>
          <Input
            {...register("senderAddress.street")}
            $hasError={!!errors.senderAddress?.street}
          />
        </FieldGroup>

        <ThreeCol>
          <FieldGroup>
            <LabelRow>
              <FieldLabel $hasError={!!errors.senderAddress?.city}>
                City
              </FieldLabel>
              {errors.senderAddress?.city && (
                <ErrorMessage>{errors.senderAddress.city.message}</ErrorMessage>
              )}
            </LabelRow>
            <Input
              {...register("senderAddress.city")}
              $hasError={!!errors.senderAddress?.city}
            />
          </FieldGroup>

          <FieldGroup>
            <LabelRow>
              <FieldLabel $hasError={!!errors.senderAddress?.postCode}>
                Post Code
              </FieldLabel>
              {errors.senderAddress?.postCode && (
                <ErrorMessage>
                  {errors.senderAddress.postCode.message}
                </ErrorMessage>
              )}
            </LabelRow>
            <Input
              {...register("senderAddress.postCode")}
              defaultValue={control?._defaultValues?.clientAddress?.postCode || ""}
              $hasError={!!errors.senderAddress?.postCode}
            />
          </FieldGroup>

          <FieldGroup>
            <LabelRow>
              <FieldLabel $hasError={!!errors.senderAddress?.country}>
                Country
              </FieldLabel>
              {errors.senderAddress?.country && (
                <ErrorMessage>
                  {errors.senderAddress.country.message}
                </ErrorMessage>
              )}
            </LabelRow>
            <Input
              {...register("senderAddress.country")}
              $hasError={!!errors.senderAddress?.country}
            />
          </FieldGroup>
        </ThreeCol>
      </Section>

      <Section>
        <SectionLabel>Bill To</SectionLabel>

        <FieldGroup>
          <LabelRow>
            <FieldLabel $hasError={!!errors.clientName}>
              Client's Name
            </FieldLabel>
            {errors.clientName && (
              <ErrorMessage>{errors.clientName.message}</ErrorMessage>
            )}
          </LabelRow>
          <Input {...register("clientName")} $hasError={!!errors.clientName} />
        </FieldGroup>

        <FieldGroup>
          <LabelRow>
            <FieldLabel $hasError={!!errors.clientEmail}>
              Client's Email
            </FieldLabel>
            {errors.clientEmail && (
              <ErrorMessage>{errors.clientEmail.message}</ErrorMessage>
            )}
          </LabelRow>
          <Input
            type="email"
            placeholder="e.g. email@example.com"
            {...register("clientEmail")}
            $hasError={!!errors.clientEmail}
          />
        </FieldGroup>

        <FieldGroup>
          <LabelRow>
            <FieldLabel $hasError={!!errors.clientAddress?.street}>
              Street Address
            </FieldLabel>
            {errors.clientAddress?.street && (
              <ErrorMessage>{errors.clientAddress.street.message}</ErrorMessage>
            )}
          </LabelRow>
          <Input
            {...register("clientAddress.street")}
            $hasError={!!errors.clientAddress?.street}
          />
        </FieldGroup>

        <ThreeCol>
          <FieldGroup>
            <LabelRow>
              <FieldLabel $hasError={!!errors.clientAddress?.city}>
                City
              </FieldLabel>
              {errors.clientAddress?.city && (
                <ErrorMessage>{errors.clientAddress.city.message}</ErrorMessage>
              )}
            </LabelRow>
            <Input
              {...register("clientAddress.city")}
              $hasError={!!errors.clientAddress?.city}
            />
          </FieldGroup>

          <FieldGroup>
            <LabelRow>
              <FieldLabel $hasError={!!errors.clientAddress?.postCode}>
                Post Code
              </FieldLabel>
              {errors.clientAddress?.postCode && (
                <ErrorMessage>
                  {errors.clientAddress.postCode.message}
                </ErrorMessage>
              )}
            </LabelRow>
            <Input
              {...register("clientAddress.postCode")}
              $hasError={!!errors.clientAddress?.postCode}
            />
          </FieldGroup>

          <FieldGroup>
            <LabelRow>
              <FieldLabel $hasError={!!errors.clientAddress?.country}>
                Country
              </FieldLabel>
              {errors.clientAddress?.country && (
                <ErrorMessage>
                  {errors.clientAddress.country.message}
                </ErrorMessage>
              )}
            </LabelRow>
            <Input
              {...register("clientAddress.country")}
              $hasError={!!errors.clientAddress?.country}
            />
          </FieldGroup>
        </ThreeCol>
      </Section>

      <Section>
        <TwoCol>
          <CustomDatePicker
            selectedDate={createdAt}
            onSelectDate={(date) => setValue("createdAt", date)}
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
                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  className="arrow-icon"
                >
                  <path
                    d="M1 1l4.22 4.22L9.44 1"
                    stroke="#7C5DFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </SelectTrigger>

              {showDropdown && (
                <DropdownMenu>
                  {TERMS_OPTIONS.map((option) => (
                    <DropdownItem
                      key={option.value}
                      type="button"
                      $isSelected={String(currentTerms) === option.value}
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
          <LabelRow>
            <FieldLabel $hasError={!!errors.description}>
              Project Description
            </FieldLabel>
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </LabelRow>
          <Input
            placeholder="e.g. Graphic Design Services"
            {...register("description")}
            $hasError={!!errors.description}
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
  margin-bottom: 24px;
`;
const FieldGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;
const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $hasError, theme }) =>
    $hasError ? "#EC5757" : theme.secondaryText};
`;
const ErrorMessage = styled.span`
  color: #ec5757;
  font-size: 10px;
  font-weight: 600;
`;
const Input = styled.input`
  height: 48px;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: 700;
  outline: none;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBg || theme.card};
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? "#EC5757" : theme.border)};
  color: ${({ theme }) => theme.text};
  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#EC5757" : "#7c5dfa")};
  }
`;
const CustomSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const SelectTrigger = styled.button`
  height: 48px;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBg || theme.card};
  border: 1px solid
    ${({ $isOpen, theme }) => ($isOpen ? "#7C5DFA" : theme.border)};
  border-radius: 4px;
  padding: 0 20px;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: inherit;
  outline: none;
  .arrow-icon {
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
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
  color: ${({ $isSelected, theme }) => ($isSelected ? "#7C5DFA" : theme.text)};
  cursor: pointer;
  &:last-child {
    border-bottom: none;
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