import styled from "styled-components";
import Status from "./Status";

export default function InvoiceDetailHeader({ status = "pending", onEdit, onDelete, onMarkAsPaid }) {
  return (
    <Container>
      <StatusSection>
        <StatusLabel>Status</StatusLabel>
        <Status status={status} />
      </StatusSection>

      <ActionsSection>
        <ButtonEdit onClick={onEdit}>Edit</ButtonEdit>
        <ButtonDelete onClick={onDelete}>Delete</ButtonDelete>
        {status !== "paid" && <ButtonPaid onClick={onMarkAsPaid}>Mark as Paid</ButtonPaid>}
      </ActionsSection>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 730px;
  background-color: ${({ theme }) => theme.card}; 
  border-radius: 8px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  transition: background-color 0.3s ease;

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StatusLabel = styled.span`
  color: ${({ theme }) => theme.secondaryText}; 
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.1px;
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 600px) {
  }
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
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }
`;

const ButtonEdit = styled(ButtonBase)`
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

const ButtonPaid = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.buttonBg}; 
  color: ${({ theme }) => theme.buttonText}; 

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover}; 
  }
`;