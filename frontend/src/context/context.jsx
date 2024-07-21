// context.js

import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [addItemOpen, setAddItemOpen] = useState(false); 
  const [orderOpen,setOrderOpen]=useState(false);
  const [itemOpen, setItemOpen] = useState(true);
  const [packages,setPackages]=useState([])
  return (
    <AppContext.Provider value={{ addItemOpen, setAddItemOpen,orderOpen,setOrderOpen,itemOpen, setItemOpen,packages,setPackages }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
