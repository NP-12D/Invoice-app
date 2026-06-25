import styled from "styled-components";
import Filter from "./Filter";
import AddButton from "./AddButton";

export default function InvoiceHeader({ count = 0, onAddClick }) {
  const renderSubtitle = () => {
    if (count === 0) return "No invoices";
    return (
      <>
        <span className="hide-mobile">There are </span>
        {count} 
        <span className="hide-mobile"> total</span> invoices
      </>
    );
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <Title>Invoices</Title>
        <Subtitle>{renderSubtitle()}</Subtitle>
      </LeftSection>

      <RightSection>
        <Filter />
        <AddButton onClick={onAddClick} />
      </RightSection>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 730px;
  margin: 0 auto;
  font-family: 'League Spartan', 'Spartan', sans-serif;
  box-sizing: border-box;
  padding: 0 10px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.text || "#0C0E16"};
  margin: 0 0 8px 0;

  @media (max-width: 600px) {
    font-size: 20px;
    line-height: 22px;
    letter-spacing: -0.63px;
    margin-bottom: 4px;
  }
`;

const Subtitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.1px;
  color: ${({ theme }) => theme.subtitle || "#888EB0"};
  margin: 0;

  @media (max-width: 600px) {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.23px;

    .hide-mobile {
      display: none;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 600px) {
    gap: 18px;
  }
`;
