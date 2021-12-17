import classes from "./ProductList.module.css";
import { CartState } from "../../store/cart-context";
import ProductItem from "./ProductItem";
import { useState, useEffect } from "react";
import Notification from "../ui/notification";

function ProductList() {
  const [menu, setMenu] = useState("lanches");
  const [cartItems, setCartItems] = useState(0);
  const [prevItems, setPrevItems] = useState(0);
  const [cartMessage, setCartMessage] = useState(0);

  const {
    state: { cart, products },
    productDispatch,
    productState: { byType },
  } = CartState();

  useEffect(() => {
    setCartItems(cart.length);
    if (cartItems > prevItems) {
      setCartMessage("plus");
      setPrevItems(cart.length);
    }
    if (cartItems < prevItems) {
      setCartMessage("minus");
      setPrevItems(cart.length);
    }
  }, [cart, cartItems, prevItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCartMessage(null);
    }, 2000);
    return () => clearInterval(interval);
  });

  let notification;
  if (cartMessage === "plus") {
    notification = {
      status: "success",
      message: "Produto adicionado ao carrinho.",
    };
  }

  if (cartMessage === "minus") {
    notification = {
      status: "error",
      message: "Produto removido do carrinho.",
    };
  }

  const transformProducts = () => {
    let sortedProducts = products;

    if (byType) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.type.toLowerCase().includes(byType)
      );
    }

    if (!byType) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.type.toLowerCase().includes("lanches")
      );
    }

    return sortedProducts;
  };

  return (
    <>
      <div className={classes.navigation}>
        <h2 className="title">Menu</h2>
        <nav className={classes.menu}>
          <button
            value="lanches"
            onClick={(e) => {
              productDispatch({
                type: "FILTER_BY_TYPE",
                payload: e.target.value,
              });
              setMenu(e.target.value);
            }}
            aria-pressed={menu === "lanches" ? true : false}
          >
            Lanches
          </button>
          <button
            value="bebidas"
            onClick={(e) => {
              productDispatch({
                type: "FILTER_BY_TYPE",
                payload: e.target.value,
              });
              setMenu(e.target.value);
            }}
            aria-pressed={menu === "bebidas" ? true : false}
          >
            Bebidas
          </button>
          <button
            value="sobremesas"
            onClick={(e) => {
              productDispatch({
                type: "FILTER_BY_TYPE",
                payload: e.target.value,
              });
              setMenu(e.target.value);
            }}
            aria-pressed={menu === "sobremesas" ? true : false}
          >
            Sobremesas
          </button>
        </nav>
      </div>
      <ul className={classes.list}>
        {transformProducts().map((prod) => (
          <ProductItem key={prod.id} prod={prod} />
        ))}
      </ul>

      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
    </>
  );
}

export default ProductList;
