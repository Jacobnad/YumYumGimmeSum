import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => dispatch(addToCart(item));

  return (
    <li className="menuItem" onClick={handleAddToCart}>
      <div className="menuHeader">
        <span className="menuName">{item.name.toUpperCase()}</span>
        <span className="menuLine"></span>
        <span className="menuPrice">{item.price} SEK</span>
      </div>
      {!!item.ingredients?.length && (
        <p className="menuIngredients">{item.ingredients.join(", ")}</p>
      )}
    </li>
  );
};

export default MenuItem;
