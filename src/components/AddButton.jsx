import styled from "styled-components";
import plus from "../assets/icon-plus.svg";
export default function AddButton({onClick}) {
  return (
    <>
      <Button onClick={onClick}>
        <Div>
          <Img src={plus} />
        </Div>
        <div>New <span className="hide-mobile">Invoice</span></div>
      </Button>
    </>
  );
}
const Button = styled.button`
  font-family: Spartan;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #fff;
  padding: 8px;
  border-radius: 24px;
  width: 150px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap:16px;
  background-color: #7c5dfa;
  border: none;
  &:hover{
    background-color:#9277FF;
  }
  @media (max-width: 500px) {
    width: 92px;
    gap: 8px;
    padding-right: 8px;

    .hide-mobile {
      display: none;
    }
  }
`;
const Div = styled.div`
  width: 32px;
  height: 32px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
const Img = styled.img`
  width: 10px;
  height: 10px;
  object-fit: cover;
`;
