import styled from "styled-components";
import arrowRight from "../assets/icon-arrow-right.svg";
import { Link } from "react-router-dom";
import Status from "./Status"; 

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
    <Link to={`/invoice/${item.id}`}>
      <CardContainer>
        <LeftSection>
          <InvoiceId>
            <span>#</span>
            {item.id}
          </InvoiceId>
          <DueDate>{formatDate(item.paymentDue)}</DueDate>
          <ClientName>{item.clientName}</ClientName>
        </LeftSection>

        <RightSection>
          <TotalAmount>{formatCurrency(item.total)}</TotalAmount>
          <Status status={item.status} />
          <ArrowIcon src={arrowRight} />
        </RightSection>
      </CardContainer>
    </Link>
  );
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.card};
  padding: 28px 32px;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  border: 1px solid transparent;
  transition: border-color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: #7c5dfa;
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
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.25px;
  margin: 0;
  min-width: 75px;

  span {
    color: #7e88c3;
  }
`;

const DueDate = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #7e88c3;
  margin: 0;
  min-width: 120px;
`;

const ClientName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #858bb2;
  margin: 0;
  text-align: left;
`;

const TotalAmount = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #0c0e16;
  letter-spacing: -0.25px;
  margin-right: 20px;
  text-align: right;
  min-width: 90px;

  @media (max-width: 600px) {
    margin-right: 0;
    text-align: left;
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
