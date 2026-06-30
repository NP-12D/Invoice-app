import styled from "styled-components";

export default function ItemRows({ items, handleItemChange, addItem, deleteItem }) {
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

      {(items || []).map((item, index) => {
        const itemKey = item.id || `row-${index}-${item.name}`;

        return (
          <ItemRow key={itemKey}>
            <ItemField className="name-field">
              <MobileLabel>Item Name</MobileLabel>
              <Input 
                placeholder="Design Work" 
                value={item.name || ""} 
                onChange={(e) => handleItemChange(itemKey, "name", e.target.value)} 
              />
            </ItemField>
            
            <ItemField className="qty-field">
              <MobileLabel>Qty.</MobileLabel>
              <Input 
                type="number" 
                min="1" 
                value={item.quantity !== undefined ? item.quantity : 1} 
                onChange={(e) => handleItemChange(itemKey, "qty", e.target.value)} 
                style={{ textAlign: "center", padding: "0 4px" }} 
              />
            </ItemField>

            <ItemField className="price-field">
              <MobileLabel>Price</MobileLabel>
              <Input 
                type="number" 
                step="0.01" 
                value={item.price || 0} 
                onChange={(e) => handleItemChange(itemKey, "price", e.target.value)} 
              />
            </ItemField>

            <ItemTotal>
              <MobileLabel>Total</MobileLabel>
              <TotalValue>£{(Number(item.total) || 0).toFixed(2)}</TotalValue>
            </ItemTotal>

            <DeleteBtn type="button" onClick={() => deleteItem(itemKey)}>
              <svg width="13" height="16" viewBox="0 0 13 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11.583 3.556H1.417M4.222 1.333h4.556M10.389 3.556l-.684 10.254a1.778 1.778 0 01-1.774 1.657H5.07a1.778 1.778 0 01-1.775-1.657L2.61 3.556" />
              </svg>
            </DeleteBtn>
          </ItemRow>
        );
      })}

      <AddItemBtn type="button" onClick={addItem}>
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
  color: #77798F;
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

  &.name-field { flex: 2.5; }
  &.qty-field { flex: 0.6; }
  &.price-field { flex: 1.2; }

  @media (max-width: 600px) {
    &.name-field { grid-column: span 4; }
    &.qty-field { grid-column: 1; }
    &.price-field { grid-column: 2; }
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
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  &:focus { border-color: #7c5dfa; }
`;

const ItemTotal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 600px) { grid-column: 3; }
`;

const MobileLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryText};
  display: none;
  @media (max-width: 600px) { display: block; }
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
  &:hover { color: #ec5757; }
  @media (max-width: 600px) { grid-column: 4; }
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
  &:hover { background-color: ${({ theme }) => theme.secondaryHover}; }
`;