import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartSlice";
import logoCorner from "../../assets/logo2.svg";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import ReceiptComp from "../../components/receipt/ReceiptComp";
import "./receipt.scss";

const Receipt = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderNumber } = useSelector(({ order }) => order);
  const { items, total } = useSelector(({ cart }) => cart);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNewOrder = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
    navigate("/menu");
  };

  return (
    <div className="receiptPage">
      <img
        src={logoCorner}
        alt="Union Logo"
        className="unionLogo"
        onClick={toggleMenu}
      />
      <DropdownMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

      <ReceiptComp
        orderNumber={orderNumber}
        items={items}
        total={total}
        handleNewOrder={handleNewOrder}
      />

      <button className="newOrderBtn" onClick={handleNewOrder}>
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
};

export default Receipt;

