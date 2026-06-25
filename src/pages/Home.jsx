import styled from "styled-components";
import SideBar from "../layout/SideBar";
import Filter from "../components/Filter";

export default function Home() {
  return (
    <>
      <Main>
        <Filter/>
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
  padding-left:120px;
  padding-top:80px;
`;
