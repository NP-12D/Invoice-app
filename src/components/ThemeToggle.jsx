import { useRecoilState } from "recoil";
import { themeAtom } from "../utilis/themeAtom";
import styled from "styled-components";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg"

export default function ThemeToggle() {
  const [theme, setTheme] = useRecoilState(themeAtom);

  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
       <img src={theme === "light" ? sun: moon}/>
    </Button>
   
  );
}

const Button=styled.button`
  border:none;
  background-color:transparent;
  width:20px;
  height:20px;
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
`