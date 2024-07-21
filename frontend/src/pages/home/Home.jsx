import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import { Item ,customer,packages,allPackage,packagByStatus} from "../../api/endpoint";
import AppContext from "../../context/context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Home() {
  const { addItemOpen, orderOpen,itemOpen,setItemOpen } = useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [addedItem,setAddedItem]=useState(null);
  const [customerId,setCustomerId]=useState(null);
  const queryClient = useQueryClient();
  const [item, setItem] = useState({
    name: "",
    price: 0,
    weight: 0,
  });

  const fetchItems = async () => {
    const response = await api.get(Item);
    return response.data;
  };

  const addItem = async () => {
    const body = {
      name: item.name,
      price: parseInt(item.price),
      weight: parseInt(item.weight),
    };
    const response = await api.post(Item, body);
    return response;
  };

  const placeOrder = async () => {
    const body = {
     items:selectedItem
    };
    const response = await api.post(packages(customerId), body);
    return response.data;
  };

  const clientRegister = async () => {
    const body = {
      email,
    };
    const response = await api.post(customer, body);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchItems"],
    queryFn: fetchItems,
  });

  const {
    mutate,
    isError: mutationErr,
    isLoading: mutationLoading,
  } = useMutation({
    mutationKey: ["fetchItems"],
    mutationFn: addItem,
    onSuccess: (data) => {
      // Invalidate and refetch
      setAddedItem(data);
      queryClient.invalidateQueries({ queryKey: ["fetchItems"] });
    },
    onSettled:(data)=>{
      setAddedItem(data);
    }
  });

  const {
    mutate:placeOrderMutate,
    isError: placeOrderError,
    isLoading:  placeOrderLoading,
  } = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      // Invalidate and refetch
      data&&(
        alert('Order has been placed.'),
        setSelectedItem([])
      )
      // queryClient.invalidateQueries({ queryKey: ["fetchItems"] });
    },
    onError:(data)=>{
      console.log(error)
      console.log(`error occure:${data}`)
    }
  });

  const {
    mutate:registerClientMutate,
    isError: registerClientError,
    isLoading:  registerClientLoading,
  } = useMutation({
    mutationFn: clientRegister,
    onSuccess: (data) => {
      setCustomerId(data.id);
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["fetchItems"] });
      closeDialog();
    },
    onError:(data)=>{
    console.log(data);
    }
  });

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Error ocuure :{error.message}</h2>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addToCart = (id) => {
    setSelectedItem([...selectedItem, id]);
    console.log(selectedItem);
  };

  const removeFromCart = (id) => {
    const items = selectedItem.filter((item) => item != id);
    setSelectedItem(items);
  };

  const handleRegisterEmail=()=>{
    setIsOpen(true);
     setItemOpen(false);
  }

  const handleOrderPlace = () => {
    console.log(email);
    console.log(customerId)
    console.log(selectedItem)
    placeOrderMutate();
  };

  const closeDialog = () => {
    !isValidEmail(email)&&(
      setEmail('')
    );
    setIsOpen(false);
    setItemOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerClientMutate();
    closeDialog();
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="mainContainer">
      {!addItemOpen && !orderOpen && itemOpen && (
        <div className="itemContainer">
          <h3>Buy Now</h3>
          <input></input>
          <div className="itemList">
            {data.length > 0 ? (
              data.map((item) => {
                return (
                  <div className="itemCard" key={item.id}>
                    <div className="cardtop">
                      <h4>{item.name}</h4>
                    </div>
                    <div className="cardbtm">
                      <div>
                        <p>Price:{item.price}</p>
                        <p>Weight:{item.weight}</p>
                      </div>
                      <div>
                        {selectedItem.includes(item.id) ? (
                          <button onClick={() => removeFromCart(item.id)}>
                            Remove from Cart
                          </button>
                        ) : (
                          <button onClick={() => addToCart(item.id)}>
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h3>No item Found</h3>
              </div>
            )}
          </div>
          <div className="placeOrder">
            {
              email===''?(
                 <button id="open-dialog" onClick={handleRegisterEmail}>
              Place Order
            </button>
              ):(
                <button id="open-dialog" onClick={handleOrderPlace}>
                Place Order
              </button>
              )
            }
           
          </div>
        </div>
      )}
      <div className="dialogueBox">
        {isOpen && (
          <dialog id="newsletter-dialog" open className="dialog-centered">
            <button className="close-button" onClick={closeDialog}>
              X
            </button>
            <form id="newsletter-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Enter your email:</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                autoFocus
              />
              <button type="submit">Register</button>
            </form>
          </dialog>
        )}
      </div>
      {addItemOpen && (
        <div className="addItemBox">
          <h2>Add Item</h2>
          <form>
            <label>Name:</label>
            <br />
            <input
              type="text"
              onChange={handleChange}
              value={item.name}
              name="name"
            />
            <br />
            <label>Price:</label>
            <br />
            <input
              type="number"
              onChange={handleChange}
              value={item.price}
              name="price"
            />
            <br />
            <label>Weight:</label>
            <br />
            <input
              type="number"
              onChange={handleChange}
              value={item.weight}
              name="weight"
            />
            <br />
            <br />
            <button disabled={mutationLoading} onClick={() => mutate()}>
              Add Item
            </button>
          </form>
          <dialog id="newsletter-dialog">
            <button className="close-button" onClick={closeDialog}>
              X
            </button>
            <form id="newsletter-form" onSubmit={handleSubmit}>
              <label >Enter your email to subscribe:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                autoFocus
              />
              <button type="submit">Register</button>
            </form>
          </dialog>
        </div>
      )}
      {orderOpen && <p>Orders</p>}
    </div>
  );
}

export default Home;
