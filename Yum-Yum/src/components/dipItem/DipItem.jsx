import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const DipItem = ({ dip }) => {
  const dispatch = useDispatch();

  return (
    <span className="dipItem" onClick={() => dispatch(addToCart(dip))}>
      {dip.name}
    </span>
  );
};

export default DipItem;
