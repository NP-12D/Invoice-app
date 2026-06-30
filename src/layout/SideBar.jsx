import styled from "styled-components";
import avatar from "../assets/image-avatar.jpg";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <Bar>
      <Link to="/">
      <Logo>
        <Img src="/logo2.png" />
      </Logo>
      </Link>
      <BottomCont>
        <ThemeToggle />
        <Line />
        <PorfilImg src={avatar} />
      </BottomCont>
    </Bar>
  );
}

const Bar = styled.div`
  position: fixed; 
  left: 0;
  top: 0;
  z-index: 99999;
  width: 103px;
  height: 100vh;
  background-color: #373b53;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
    border-radius: 0; 
   
  }

  @media (max-width: 650px) {
    height: 72px;
    
  }
`;

const Logo = styled.div`
  width: 103px;
  height: 103px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 650px) {
    width: 72px;
    height: 72px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BottomCont = styled.div`
  width: 103px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    width: auto;
    height: 100%;
    flex-direction: row;
    margin-bottom: 0;
    margin-right: 24px;
    gap: 24px;
  }

  @media (max-width: 650px) {
    margin-right: 16px;
    gap: 16px;
  }
`;

const PorfilImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 650px) {
    width: 32px;
    height: 32px;
  }
`;

const Line = styled.span`
  width: 100%;
  height: 1px;
  background-color: #494e6e;

  @media (max-width: 1024px) {
    width: 1px;
    height: 100%; /
  }
`;