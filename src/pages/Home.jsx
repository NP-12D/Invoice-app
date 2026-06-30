import styled from "styled-components";
import SideBar from "../layout/SideBar";
import InvoiceHeader from "../components/InvoiceHeader";
import { useState } from "react";
import Card from "../components/Card";
import InvoiceForm from "../components/Form/InvoiceForm";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredInvoicesState, invoicesState } from "../utilis/invoicesAtom"; 
import empty from "../assets/Email campaign_Flatline 2.png";

export default function Home() {
  const filteredInvoices = useRecoilValue(filteredInvoicesState);
  const setInvoices = useSetRecoilState(invoicesState); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveInvoice = (newInvoice) => {
    setInvoices((prevInvoices) => {
      const exists = prevInvoices.some((inv) => inv.id === newInvoice.id);
      if (exists) {
        return prevInvoices.map((inv) => (inv.id === newInvoice.id ? newInvoice : inv));
      }
      return [newInvoice, ...prevInvoices];
    });
  };

  return (
    <PageWrapper>
      <SideBar />
      <Main>
        <InvoiceHeader
          onAddClick={() => setIsFormOpen(true)}
          invoicesCount={filteredInvoices.length}
        />
        <Container>
          {filteredInvoices.length === 0 ? (
            <Empty>
              <img src={empty} alt="empty" />
              <EmptyHeader>There is nothing here</EmptyHeader>
              <EmptyDis>
                Create an invoice by clicking the New button and get started
              </EmptyDis>
            </Empty>
          ) : (
            filteredInvoices.map((item) => <Card item={item} key={item.id} />)
          )}
        </Container>
      </Main>
      
      <InvoiceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        invoiceToEdit={null} 
        onSave={handleSaveInvoice} 
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  max-width: 730px;
  margin: 0 auto;
  padding-left: 103px;
  padding-top: 72px;
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  gap: 65px;
  box-sizing: border-box;

  @media (min-width: 1025px) {
    max-width: calc(730px + 103px);
  }

  @media (max-width: 1024px) {
    padding-left: 48px;
    padding-right: 48px;
    padding-top: 136px;
    gap: 56px;
  }

  @media (max-width: 650px) {
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 104px;
    gap: 32px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 40px;

  img {
    margin-bottom: 64px;
    width: 242px;
    height: 200px;
    object-fit: contain;

    @media (max-width: 650px) {
      margin-bottom: 40px;
    }
  }
`;

const EmptyHeader = styled.h2`
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.63px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 16px 0;
`;

const EmptyDis = styled.p`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryText};
  max-width: 220px;
  margin: 0;
`;