import logo from "../../assets/logo.png";

const ReceiptComp = ({ orderNumber, items, total }) => (
  <div className="receiptContainer">
    <img src={logo} alt="YYGS Logo" className="receiptLogo" />
    <h1>KVITTO</h1>
    <p className="receiptOrderNumber">#{orderNumber}</p>

    <ul className="receiptItems">
      {items.map(({ id, name, quantity, price }) => (
        <li key={id} className="receiptItem">
          <div className="receiptItemInfo">
            <span className="receiptItemName">{name.toUpperCase()}</span>
            <span className="itemQuantity">{quantity} stycken</span>
          </div>
          <span className="receiptLine"></span>
          <span className="receiptItemPrice">{price * quantity} SEK</span>
        </li>
      ))}
    </ul>

    <div className="receiptTotalBox">
      <div className="totalText">
        <span>TOTALT</span>
        <span className="moms">inkl 20% moms</span>
      </div>
      <span className="totalPrice">{total} SEK</span>
    </div>
  </div>
);

export default ReceiptComp;
