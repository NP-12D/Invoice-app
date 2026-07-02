import styled from "styled-components";
import arrowRight from "../../assets/icon-arrow-right.svg";
import { Link } from "react-router-dom";
import Status from "../Status";

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
    <StyledLink to={`/invoice/${item.id}`}>
      <CardContainer>
        <InvoiceId>
          <span>#</span>
          {item.id}
        </InvoiceId>

        <DueDate>{formatDate(item.paymentDue)}</DueDate>

        <ClientName>{item.clientName}</ClientName>

        <TotalAmount>{formatCurrency(item.total)}</TotalAmount>

        <StatusWrapper>
          <Status status={item.status} />
        </StatusWrapper>

        <ArrowIcon src={arrowRight} alt="arrow right" />
      </CardContainer>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
`;

const CardContainer = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 16px 32px;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  border: 1px solid transparent;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 0.8fr 1.2fr 1.2fr 1.2fr 1.2fr auto;
  align-items: center;

  &:hover {
    border-color: #7c5dfa;
  }

  @media (max-width: 768px) {
    padding: 24px;
    grid-template-columns: 1fr 1.5fr 1.5fr 1.2fr 1.2fr auto;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "id client"
      "meta status";
    gap: 8px;
    padding: 24px;
  }
`;

const InvoiceId = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.25px;
  margin: 0;

  span {
    color: #7e88c3;
  }

  @media (max-width: 600px) {
    grid-area: id;
    margin-bottom: 16px;
  }
`;

const DueDate = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #7e88c3;
  margin: 0;

  @media (max-width: 600px) {
    grid-area: meta;
    align-self: flex-start;
  }
`;

const ClientName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => (theme.text === "#0C0E16" ? "#858bb2" : "#FFFFFF")};
  margin: 0;
  text-align: left;

  @media (max-width: 600px) {
    grid-area: client;
    text-align: right;
    align-self: flex-start;
  }
`;

const TotalAmount = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.25px;
  text-align: right;
  padding-right: 20px;

  @media (max-width: 600px) {
    grid-area: meta;
    text-align: left;
    align-self: flex-end;
    margin-top: 24px; /* თარიღსა და თანხას შორის დაშორება მობილურზე */
    padding-right: 0;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 600px) {
    grid-area: status;
    align-self: flex-end;
  }
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
