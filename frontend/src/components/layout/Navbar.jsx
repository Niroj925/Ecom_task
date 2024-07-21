import { useContext } from "react";
import AppContext from "../../context/context";

const Navbar = () => {
  const { addItemOpen, setAddItemOpen, orderOpen, setOrderOpen} =
    useContext(AppContext);

  const handleAddItem = () => {
    setAddItemOpen(true);
    setOrderOpen(addItemOpen && false);
  };

  const handleOrder = () => {
    setOrderOpen(true);
    setAddItemOpen(orderOpen && false);
  };
  const handleClick = () => {
    setOrderOpen(false);
    setAddItemOpen( false);
  };
  
  return (
    <div className="navContainer">
      <div>
        <h3 onClick={handleClick}>Mero Shop</h3>
      </div>
      <div className="navLeft">
        <div>
          <p onClick={handleAddItem}>Add Item</p>
        </div>
        <div>
          <p onClick={handleOrder}>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
