import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import StartPage from "./pages/startPage/StartPage";
import OrderConfirmation from "./pages/orderConfirmation/OrderConfirmation";
import Receipt from "./pages/receipt/Receipt";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderConfirmation />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;
