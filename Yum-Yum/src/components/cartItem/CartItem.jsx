import { useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity, addToCart } from "../../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => dispatch(decreaseQuantity(item));
  const handleIncrease = () => dispatch(addToCart(item));
  const handleRemove = () => dispatch(removeFromCart(item));

  return (
    <li className="cartItem">
      <div className="cartHeader">
        <span className="cartName">{item.name.toUpperCase()}</span>
        <span className="cartLine"></span>
        <span className="cartPrice">{item.price * item.quantity} SEK</span>
      </div>

      <div className="cartControls">
        <button className="controlBtn" onClick={handleDecrease}>–</button>
        <span className="quantity">{item.quantity}</span>
        <button className="controlBtn" onClick={handleIncrease}>+</button>
        <button className="trashBtn" onClick={handleRemove}>🗑</button>
      </div>
    </li>
  );
};

export default CartItem;
