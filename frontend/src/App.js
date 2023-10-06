import React from "react";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Parts/Footer";
import Nav from "./Components/Parts/Nav";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <div className="container-scroller">

        <Nav/>

        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">

            <Home/>

            <Footer/>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;

