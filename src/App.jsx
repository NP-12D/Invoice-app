import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import Home from "./pages/Home";
import { themeAtom } from "./utilis/themeAtom";
import { lightTheme, darkTheme } from "./utilis/Themes";
import InvoiceView from "./components/InvoiceView/InvoiceView";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { invoicesState } from "./utilis/invoicesAtom";
import axios from "axios";

function App() {
  const setData = useSetRecoilState(invoicesState);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/data/data.json");
        setData(response.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    getData();
  }, [setData]);
  console.log(themeAtom);
  const theme = useRecoilValue(themeAtom);
  console.log(theme);
  
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/invoice/:id" element={<InvoiceView />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
