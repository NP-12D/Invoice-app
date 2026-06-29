import styled from "styled-components";
import avatar from "../assets/image-avatar.jpg";
import ThemeToggle from "../components/ThemeToggle";

export default function SideBar() {
  return (
    <>
      <Bar>
        <Logo>
          <Img src="/logo2.png" />
        </Logo>
        <BottomCont>
          <ThemeToggle />
          <Line />
          <PorfilImg src={avatar} />
        </BottomCont>
      </Bar>
    </>
  );
}
const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99999;
  width: 103px;
  min-height: 100%;
  background-color: #373b53;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`;
const Logo = styled.div`
  width: 103px;
  height: 103px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const BottomCont = styled.div`
  width: 103px;
  height: 117px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const PorfilImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
const Line = styled.span`
  width: 100%;
  height: 1px;
  background-color: #494e6e;
`;
