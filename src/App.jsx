import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import Home from "./pages/Home";
import { themeAtom } from "./utilis/themeAtom";
import { lightTheme, darkTheme } from "./utilis/Themes";
import InvoiceView from "./components/InvoiceView";

function App() {
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
