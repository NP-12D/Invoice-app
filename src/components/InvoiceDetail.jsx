import styled from "styled-components";
import InvoiceViewHeader from "./InvoiceViewHeader";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function InvoiceDetail({
  invoice,
  onEdit,
  onDelete,
  onMarkAsPaid,
  onBack,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div>
        <GoBackButton
          onClick={onBack || (() => console.log("Go back clicked"))}
        >
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

        <InvoiceViewHeader
          status={invoice.status}
          onEdit={onEdit}
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
                {invoice.projectDescription || "No Description"}
              </ProjectDesc>
            </InvoiceIdBox>
            <SenderAddress>
              <span>{invoice.senderStreet || "19 Union Terrace"}</span>
              <span>{invoice.senderCity || "London"}</span>
              <span>{invoice.senderPostCode || "E1 3EZ"}</span>
              <span>{invoice.senderCountry || "United Kingdom"}</span>
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
                <span>{invoice.clientStreet || "106 Kendell Street"}</span>
                <span>{invoice.clientCity || "Sharrington"}</span>
                <span>{invoice.clientPostCode || "NR24 5WQ"}</span>
                <span>{invoice.clientCountry || "United Kingdom"}</span>
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

              {(invoice.items || []).map((item) => (
                <TableRow key={item.id}>
                  <ColName>
                    <span>{item.name}</span>
                    <MobileItemMeta>
                      {item.qty} x £{Number(item.price).toFixed(2)}
                    </MobileItemMeta>
                  </ColName>
                  <ColQty>{item.qty}</ColQty>
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
      </div>
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
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 48px 24px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
  transition: background-color 0.3s ease;
  padding-top: 64px;

  @media (max-width: 650px) {
    padding: 32px 16px;
  }
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
  width: 730px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  padding: 48px;
  margin-top: 24px;
  box-sizing: border-box;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  transition: background-color 0.3s ease;

  @media (max-width: 650px) {
    padding: 24px;
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
  }
`;

const ProjectDesc = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0;
`;

const SenderAddress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.secondaryText};

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
    gap: 32px 16px;

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
`;

const AddressBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.secondaryText};
`;

const EmailText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  word-break: break-all;
`;

const PricingTableContainer = styled.div`
  background-color: ${({ theme }) => theme.secondaryBg};
  border-radius: 8px;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

const TableBodyPadding = styled.div`
  padding: 32px;
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
`;

const MobileItemMeta = styled.div`
  display: none;
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryText};
  margin-top: 8px;

  @media (max-width: 650px) {
    display: block;
  }
`;

const ColName = styled.div`
  flex: 3.5;
  text-align: left;

  @media (max-width: 650px) {
    flex: 1;
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
  /* დიზაინის მიხედვით, Light თემაზეც კი ეს ბანერი ხშირად ძალიან მუქია (Figma-ში #373B53 ან სრულიად შავი #0C0E16)
     თუ Light თემაზე უფრო ღია გინდათ, შეგიძლიათ დაწეროთ: theme.text ან დატოვოთ მყარი ფერი */
  background-color: ${({ theme }) =>
    theme.text === "#0C0E16" ? "#373B53" : "#0C0E16"};
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: background-color 0.3s ease;
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
`;
