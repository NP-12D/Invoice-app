import styled from "styled-components";
import { useWatch } from "react-hook-form";
export default function ItemRows({
  fields,
  append,
  remove,
  register,
  errors,
  control, 
}) {
  const watchedItems =
    useWatch({
      control,
      name: "items",
    }) || [];

  return (
    <ItemSection>
      <ItemListTitle>Item List</ItemListTitle>
      <ItemHeaders>
        <span style={{ flex: "2.5" }}>Item Name</span>
        <span style={{ flex: "0.6", textAlign: "center" }}>Qty.</span>
        <span style={{ flex: "1.2" }}>Price</span>
        <span style={{ flex: "1" }}>Total</span>
        <span style={{ width: "24px" }} />
      </ItemHeaders>

      {fields.map((field, index) => {
        const qty = Number(watchedItems[index]?.quantity || 0);
        const price = Number(watchedItems[index]?.price || 0);
        const totalAmount = (qty * price).toFixed(2);

        const hasNameError = !!errors.items?.[index]?.name;
        const hasQtyError = !!errors.items?.[index]?.quantity;
        const hasPriceError = !!errors.items?.[index]?.price;

        return (
          <ItemRow key={field.id}>
            <ItemField className="name-field">
              <MobileLabel>Item Name</MobileLabel>
              <Input
                placeholder="Design Work"
                {...register(`items.${index}.name`)}
                $hasError={hasNameError}
              />
            </ItemField>

            <ItemField className="qty-field">
              <MobileLabel>Qty.</MobileLabel>
              <Input
                type="number"
                min="1"
                {...register(`items.${index}.quantity`)}
                $hasError={hasQtyError}
                style={{ textAlign: "center", padding: "0 4px" }}
              />
            </ItemField>

            <ItemField className="price-field">
              <MobileLabel>Price</MobileLabel>
              <Input
                type="number"
                step="0.01"
                {...register(`items.${index}.price`)}
                $hasError={hasPriceError}
              />
            </ItemField>

            <ItemTotal>
              <MobileLabel>Total</MobileLabel>
              <TotalValue>£{totalAmount}</TotalValue>
            </ItemTotal>

            <DeleteBtn type="button" onClick={() => remove(index)}>
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
        );
      })}

      <AddItemBtn
        type="button"
        onClick={() => append({ name: "", quantity: 1, price: 0, total: 0 })}
      >
        + Add New Item
      </AddItemBtn>
    </ItemSection>
  );
}

const ItemSection = styled.div`
  margin-top: 8px;
`;
const ItemListTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #77798f;
  margin-bottom: 16px;
`;
const ItemHeaders = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 16px;
  @media (max-width: 600px) {
    display: none;
  }
`;
const ItemRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 18px;
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 64px 1fr 1fr 24px;
    gap: 16px 8px;
  }
`;
const ItemField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  &.name-field {
    flex: 2.5;
  }
  &.qty-field {
    flex: 0.6;
  }
  &.price-field {
    flex: 1.2;
  }
  @media (max-width: 600px) {
    &.name-field {
      grid-column: span 4;
    }
    &.qty-field {
      grid-column: 1;
    }
    &.price-field {
      grid-column: 2;
    }
  }
`;
const Input = styled.input`
  height: 48px;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: 700;
  outline: none;
  width: 100%;
  font-family: inherit;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? "#EC5757" : theme.border)};
  color: ${({ theme }) => theme.text};
  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#EC5757" : "#7c5dfa")};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
`;
const ItemTotal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 600px) {
    grid-column: 3;
  }
`;
const MobileLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryText};
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
  color: ${({ theme }) => theme.secondaryText};
`;
const DeleteBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #888eb0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 24px;
  padding: 0;
  transition: color 0.2s ease;
  &:hover {
    color: #ec5757;
  }
  @media (max-width: 600px) {
    grid-column: 4;
  }
`;
const AddItemBtn = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.secondaryBg};
  color: ${({ theme }) => theme.secondaryText};
  border: none;
  border-radius: 24px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  margin-top: 18px;
  transition: background-color 0.2s ease;
  font-family: inherit;
  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
`;
