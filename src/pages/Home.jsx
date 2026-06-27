import styled from "styled-components";
import SideBar from "../layout/SideBar";
import InvoiceHeader from "../components/InvoiceHeader";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import InvoiceForm from "../components/InvoiceForm";

export default function Home() {
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); // ფორმის ღია/დახურვის სთეითი
  const [activeFilters, setActiveFilters] = useState([]); // ფილტრების მასივი: ['draft', 'pending', 'paid']

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/data.json");
        setData(response.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    getData();
  }, []);

  const handleFilterChange = (status) => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status) // თუ უკვე იყო, ვაშორებთ
        : [...prev, status] // თუ არ იყო, ვამატებთ
    );
  };

  const filteredInvoices = activeFilters.length === 0
    ? data
    : data.filter((invoice) => activeFilters.includes(invoice.status.toLowerCase()));
  return (
    <>
     <InvoiceForm isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}/>
      <Main>
       <InvoiceHeader 
          onAddClick={() => setIsFormOpen(true)} 
          invoicesCount={filteredInvoices.length}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
        <Container>
          {filteredInvoices.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </Container>
      </Main>
      <SideBar />
    </>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding-left: 120px;
  padding-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 65px;
`;

const Container = styled.div`
  width: 730px;
  height: 600px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  gap: 16px;
`;
