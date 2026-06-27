import styled from "styled-components";
import SideBar from "../layout/SideBar";
import InvoiceHeader from "../components/InvoiceHeader";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);

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

  return (
    <>
      <Main>
        <InvoiceHeader count={data.length} />
        <Container>
          {data.map((item) => (
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
