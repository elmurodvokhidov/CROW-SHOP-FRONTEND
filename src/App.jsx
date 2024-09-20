import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
// import Login from "./pages/Login";
import ProdactFilter from "./pages/ProdactFilter";
import Single from './pages/singleproducts';
import Basket from './pages/Basket'
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/products" element={<ProdactFilter />} />
        <Route path="/single" element={<Single />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
      <Footer />
    </div>
  );
}
