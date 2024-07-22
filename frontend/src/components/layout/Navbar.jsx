import { useContext } from "react";
import AppContext from "../../context/context";
import { allPackage } from "../../api/endpoint";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const Navbar = () => {
  const { addItemOpen, setAddItemOpen, orderOpen, setOrderOpen,setAllPackage} =
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

  const fetchPackages = async () => {
    const response = await api.get(allPackage);
    return response.data;
  };

  if(orderOpen){
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchPackages"],
    queryFn: fetchPackages,
  });
  
 data&&(
  // console.log(data),
  setAllPackage(data)
 )
  }
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
