import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../redux/orderSlice";
import "./cart.scss";
import cartIcon from "../../assets/Union.svg";
import CartItem from "../../components/cartItem/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  const navigateToMenu = () => navigate("/menu");

  const handleCheckout = async () => {
    const orderData = {
      tenant: localStorage.getItem("tenantId"),
      items,
      total,
    };

    await dispatch(placeOrder(orderData));
    navigate("/order");
  };

  if (!items.length) {
    return (
      <div className="cartPage">
        <img src={cartIcon} alt="Cart Icon" className="cartIconCart" onClick={navigateToMenu} />
        <p className="emptyCart">Varukorgen är tom.</p>
      </div>
    );
  }

  return (
    <div className="cartPage">
      <img src={cartIcon} alt="Cart Icon" className="cartIconCart" onClick={navigateToMenu} />

      <ul className="cartItems">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="cartTotalBox">
        <span className="cartTotalLabel">TOTAL</span>
        <span className="cartTotalValue">{total} SEK</span>
      </div>

      <button className="checkoutBtn" onClick={handleCheckout}>
        TAKE MY MONEY!
      </button>
    </div>
  );
};

export default Cart;
