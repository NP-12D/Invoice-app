import styled from "styled-components";
import InvoiceViewHeader from "./InvoiceViewHeader";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import InvoiceForm from "./Form/InvoiceForm";
import { Link } from "react-router-dom";

export default function InvoiceDetail({
  invoice,
  onSaveEdit,
  onDelete,
  onMarkAsPaid,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!invoice) return null;

  return (
    <Wrapper>
      <InnerContainer>
        <Link to="/">
          <GoBackButton>
            <ArrowIcon width="7" height="10" viewBox="0 0 7 10" fill="none">
              <path
                d="M1 1l4 4-4 4"
                stroke="#7C5DFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </ArrowIcon>
            <span>Go back</span>
          </GoBackButton>
        </Link>

        <InvoiceViewHeader
          status={invoice.status}
          onEdit={() => setIsFormOpen(true)}
          onDelete={() => setIsModalOpen(true)}
          onMarkAsPaid={() => onMarkAsPaid(invoice.id)}
        />

        <DetailCard>
          <CardTopRow>
            <InvoiceIdBox>
              <h2>
                <span>#</span>
                {invoice.id}
              </h2>
              <ProjectDesc>
                {invoice.description || "No Description"}
              </ProjectDesc>
            </InvoiceIdBox>
            <SenderAddress>
              <span>{invoice.senderAddress?.street || "19 Union Terrace"}</span>
              <span>{invoice.senderAddress?.city || "London"}</span>
              <span>{invoice.senderAddress?.postCode || "E1 3EZ"}</span>
              <span>{invoice.senderAddress?.country || "United Kingdom"}</span>
            </SenderAddress>
          </CardTopRow>

          <CardMiddleGrid>
            <InfoCol style={{ gap: "32px" }}>
              <div>
                <InfoLabel>Invoice Date</InfoLabel>
                <InfoValue>{formatDate(invoice.createdAt)}</InfoValue>
              </div>
              <div>
                <InfoLabel>Payment Due</InfoLabel>
                <InfoValue>{formatDate(invoice.paymentDue)}</InfoValue>
              </div>
            </InfoCol>

            <InfoCol>
              <InfoLabel>Bill To</InfoLabel>
              <InfoValue>{invoice.clientName}</InfoValue>
              <AddressBlock>
                <span>
                  {invoice.clientAddress?.street || "106 Kendell Street"}
                </span>
                <span>{invoice.clientAddress?.city || "Sharrington"}</span>
                <span>{invoice.clientAddress?.postCode || "NR24 5WQ"}</span>
                <span>
                  {invoice.clientAddress?.country || "United Kingdom"}
                </span>
              </AddressBlock>
            </InfoCol>

            <InfoCol>
              <InfoLabel>Sent to</InfoLabel>
              <EmailText>{invoice.clientEmail || "client@mail.com"}</EmailText>
            </InfoCol>
          </CardMiddleGrid>

          <PricingTableContainer>
            <TableBodyPadding>
              <TableHeader>
                <ColName>Item Name</ColName>
                <ColQty>QTY.</ColQty>
                <ColPrice>Price</ColPrice>
                <ColTotal>Total</ColTotal>
              </TableHeader>

              {(invoice.items || []).map((item, index) => (
                <TableRow key={index}>
                  <ColName>
                    <span>{item.name}</span>
                    <MobileItemMeta>
                      {item.quantity} x £{Number(item.price).toFixed(2)}
                    </MobileItemMeta>
                  </ColName>
                  <ColQty>{item.quantity}</ColQty>
                  <ColPrice>£{Number(item.price).toFixed(2)}</ColPrice>
                  <ColTotal>£{Number(item.total).toFixed(2)}</ColTotal>
                </TableRow>
              ))}
            </TableBodyPadding>

            <TableFooterBanner>
              <FooterBannerLabel>Amount Due</FooterBannerLabel>
              <FooterBannerValue>
                £{Number(invoice.total).toFixed(2)}
              </FooterBannerValue>
            </TableFooterBanner>
          </PricingTableContainer>
        </DetailCard>
      </InnerContainer>
      <InvoiceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        invoiceToEdit={invoice}
        onSave={(updatedInvoice) => {
          if (onSaveEdit) onSaveEdit(updatedInvoice);
          setIsFormOpen(false);
        }}
      />
    
      <DeleteModal
        isOpen={isModalOpen}
        invoiceId={invoice.id}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onDelete(invoice.id);
          setIsModalOpen(false);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
  transition: background-color 0.3s ease;
  box-sizing: border-box;

  padding: 72px 24px 120px 103px;

  @media (max-width: 1024px) {
    padding: 120px 48px 120px 48px;
  }

  @media (max-width: 650px) {
    padding: 104px 24px 160px 24px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 730px;
  display: flex;
  flex-direction: column;
`;

const GoBackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding: 0;
  align-self: flex-start;

  span {
    transition: color 0.2s ease;
  }

  &:hover span {
    color: ${({ theme }) => theme.secondaryText};
  }
`;

const ArrowIcon = styled.svg`
  transform: rotate(180deg);
`;

const DetailCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  padding: 48px;
  margin-top: 24px;
  box-sizing: border-box;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  transition: background-color 0.3s ease;

  @media (max-width: 650px) {
    padding: 24px;
    margin-top: 16px;
  }
`;

const CardTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 44px;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
  }
`;

const InvoiceIdBox = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.text};
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;

    span {
      color: ${({ theme }) => theme.secondaryText};
    }

    @media (max-width: 650px) {
      font-size: 16px;
      margin-bottom: 4px;
    }
  }
`;

const ProjectDesc = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0;

  @media (max-width: 650px) {
    font-size: 13px;
  }
`;

const SenderAddress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.secondaryText};
  letter-spacing: -0.1px;

  @media (max-width: 650px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const CardMiddleGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.6fr;
  gap: 20px;
  margin-bottom: 44px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr 1fr;
    gap: 32px 20px;
    margin-bottom: 40px;

    & > div:last-child {
      grid-column: span 2;
    }
  }
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 12px;
  letter-spacing: -0.1px;
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
  line-height: 20px;

  @media (max-width: 650px) {
    font-size: 15px;
  }
`;

const AddressBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.secondaryText};
  letter-spacing: -0.1px;
`;

const EmailText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  word-break: break-all;
  line-height: 20px;

  @media (max-width: 650px) {
    font-size: 15px;
  }
`;

const PricingTableContainer = styled.div`
  background-color: ${({ theme }) => theme.secondaryBg};
  border-radius: 8px;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

const TableBodyPadding = styled.div`
  padding: 32px;

  @media (max-width: 650px) {
    padding: 24px;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 32px;

  @media (max-width: 650px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 650px) {
    margin-bottom: 24px;
  }
`;

const MobileItemMeta = styled.div`
  display: none;
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryText};
  margin-top: 8px;
  font-weight: 700;

  @media (max-width: 650px) {
    display: block;
  }
`;

const ColName = styled.div`
  flex: 3.5;
  text-align: left;

  @media (max-width: 650px) {
    flex: 1;
    font-size: 15px;
  }
`;

const ColQty = styled.span`
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 650px) {
    display: none;
  }
`;

const ColPrice = styled.span`
  flex: 2;
  text-align: right;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 650px) {
    display: none;
  }
`;

const ColTotal = styled.span`
  flex: 2;
  text-align: right;
  color: ${({ theme }) => theme.text};

  @media (max-width: 650px) {
    flex: none;
    font-size: 16px;
  }
`;

const TableFooterBanner = styled.div`
  background-color: ${({ theme }) =>
    theme.text === "#0C0E16" ? "#373B53" : "#0C0E16"};
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: background-color 0.3s ease;

  @media (max-width: 650px) {
    padding: 24px;
  }
`;

const FooterBannerLabel = styled.span`
  font-size: 13px;
  color: #ffffff;
  font-weight: 500;
`;

const FooterBannerValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;

  @media (max-width: 650px) {
    font-size: 20px;
  }
`;
