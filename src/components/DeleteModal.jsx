import styled from "styled-components";

export default function DeleteModal({ isOpen, onClose, onConfirm, invoiceId }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Confirm Deletion</ModalTitle>
        <ModalText>
          Are you sure you want to delete invoice <span>#{invoiceId}</span>? This action cannot be undone.
        </ModalText>
        
        <ButtonGroup>
          <ButtonCancel onClick={onClose}>Cancel</ButtonCancel>
          <ButtonDelete onClick={onConfirm}>Delete</ButtonDelete>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
}


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 24px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: ${({ theme }) => theme.card}; 
  border-radius: 8px;
  padding: 48px;
  box-sizing: border-box;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;

  @media (max-width: 500px) {
    padding: 32px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
`;

const ModalText = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.7;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0 0 16px 0;
  letter-spacing: -0.1px;

  span {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ButtonBase = styled.button`
  height: 48px;
  padding: 0 24px;
  border: none;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.25px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }
`;

const ButtonCancel = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.secondaryBg}; 
  color: ${({ theme }) => theme.secondaryText};

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover}; 
    color: ${({ theme }) => theme.text === "#0C0E16" ? theme.secondaryText : "#7E88C3"};
  }
`;

const ButtonDelete = styled(ButtonBase)`
  background-color: #ec5757; 
  color: #ffffff;

  &:hover {
    background-color: #ff9797; 
  }
`;