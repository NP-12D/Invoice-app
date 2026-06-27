import styled from "styled-components";
import arrowRight from "../assets/icon-arrow-right.svg"
export default function Card({ item }) {
  if (!item) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `Due ${date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value || 0);
  };

  return (
    <CardContainer>
      <LeftSection>
        <InvoiceId>
          <span>#</span>{item.id}
        </InvoiceId>
        <DueDate>{formatDate(item.paymentDue)}</DueDate>
        <ClientName>{item.clientName}</ClientName>
      </LeftSection>

      <RightSection>
        <TotalAmount>{formatCurrency(item.total)}</TotalAmount>
        <StatusBadge type={item.status}>
          <Dot type={item.status} />
          {item.status}
        </StatusBadge>
        <ArrowIcon src={arrowRight}>
        </ArrowIcon>
      </RightSection>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({theme})=>theme.card};
  padding: 28px 32px;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  border: 1px solid transparent;
  transition: border-color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: #7C5DFA;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 40px;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
    gap: 20px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 8px;
  }
`;

const InvoiceId = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme})=>theme.text};
  letter-spacing: -0.25px;
  margin: 0;
  min-width: 75px;

  span {
    color: #7E88C3;
  }
`;

const DueDate = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #7E88C3;
  margin: 0;
  min-width: 120px;
`;

const ClientName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #858BB2;
  margin: 0;
  text-align: left;
`;

const TotalAmount = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #0C0E16;
  letter-spacing: -0.25px;
  margin-right: 20px;
  text-align: right;
  min-width: 90px;

  @media (max-width: 600px) {
    margin-right: 0;
    text-align: left;
  }
`;

const statusColors = {
  paid: { text: '#33D69F', bg: 'rgba(51, 214, 159, 0.08)' },
  pending: { text: '#FF8F00', bg: 'rgba(255, 143, 0, 0.08)' },
  draft: { text: '#373B53', bg: 'rgba(55, 59, 83, 0.08)' }
};

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 104px;
  height: 40px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 700;
  text-transform: capitalize;
  user-select: none;
  
  background-color: ${props => statusColors[props.type]?.bg || statusColors.draft.bg};
  color: ${props => statusColors[props.type]?.text || statusColors.draft.text};
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => statusColors[props.type]?.text || statusColors.draft.text};
`;

const ArrowIcon = styled.img`
  width: 7px;
  height: 10px;
  margin-left: 4px;
  transition: transform 0.2s ease;

  ${CardContainer}:hover & {
    transform: translateX(4px);
  }

  @media (max-width: 600px) {
    display: none;
  }
`;
