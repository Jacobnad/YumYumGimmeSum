import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuData } from "../../redux/menuSlice";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import MenuItem from "../../components/menuItem/MenuItem";
import DipItem from "../../components/dipItem/DipItem";
import "./menu.scss";
import logo2 from "../../assets/logo2.svg";
import cartIcon from "../../assets/Union.svg";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { items: menu = [], status } = useSelector((state) => state.menu);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const navigateToCart = useCallback(() => navigate("/cart"), [navigate]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Fel inträffat.</p>;

  const dips = menu.filter(({ type }) => type === "dip");
  const foodItems = menu.filter(({ type }) => type !== "dip" && type !== "drink");

  const totalCartQuantity = cartItems.reduce((total, { quantity }) => total + quantity, 0);

  return (
    <div className="menuPage">
      <img src={logo2} alt="Yum Yum Logo" className="logo2" onClick={toggleMenu} />
      <DropdownMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

      <div className="cartContainer" onClick={navigateToCart}>
        <div className="cartBox" />
        <img src={cartIcon} alt="Cart Icon" className="cartIcon" />
        <span className="cartBadge">{totalCartQuantity}</span>
      </div>

      <div className="menuBox">
        <h1>MENY</h1>
        <ul>
          {foodItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>

        {dips.length > 0 && (
          <>
            <div className="menuDipsHeader">
              <span>DIPSÅS</span>
              <span className="menuLine"></span>
              <span className="menuPrice">19 SEK</span>
            </div>
            <div className="dipsContainer">
              {dips.map((dip) => (
                <DipItem key={dip.id} dip={dip} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Menu;

