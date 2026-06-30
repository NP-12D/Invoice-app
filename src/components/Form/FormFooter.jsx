import styled from "styled-components";

export default function FormFooter({ isEditMode, onClose, onActionClick }) {
  return (
    <Footer>
      <CancelBtn type="button" onClick={onClose}>
        {isEditMode ? "Cancel" : "Discard"}
      </CancelBtn>
      <FooterRight>
        {!isEditMode && (
          <DraftBtn type="button" onClick={() => onActionClick("draft")}>
            Save as Draft
          </DraftBtn>
        )}
        <SaveBtn 
          type="button" 
          onClick={() => onActionClick("send")}
        >
          {isEditMode ? "Save Changes" : "Save & Send"}
        </SaveBtn>
      </FooterRight>
    </Footer>
  );
}

const Footer = styled.div`
  height: 110px;
  background-color: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  @media (min-width: 768px) { padding: 0 56px; }
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
  font-size: 15px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;
  &:hover { background-color: ${({ theme }) => theme.secondaryHover}; }
`;

const DraftBtn = styled.button`
  height: 48px;
  padding: 0 24px;
  background-color: #373b53;
  color: #dfe3fa;
  border: none;
  border-radius: 24px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;
  &:hover { background-color: #0c0e16; }
`;

const SaveBtn = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  height: 48px;
  padding: 0 24px;
  border: none;
  border-radius: 24px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;
  &:hover { background-color: ${({ theme }) => theme.buttonHover}; }
`;