import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./reducer";
import data from "../data.json";

const Cart = createContext();

const productsArray = data.products;

const Context = ({ children }) => {
  const products = productsArray.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    description: product.description,
    weight: product.weight,
    type: product.type,
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    searchQuery: "",
    byType: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
