import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from './components/Home.js'
import Rules from "./components/Rules.js";
import Contact from "./components/Contact.js";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
