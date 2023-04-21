import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Api from "./api";
import Main from "./main";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Api />} />
          <Route path={"/main"} element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
