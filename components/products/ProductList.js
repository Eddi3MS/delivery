import classes from "./ProductList.module.css";
import { CartState } from "../../store/cart-context";
import Card from "../ui/Card";
import { useState, useEffect } from "react";
import Notification from "../ui/notification";

function ProductList() {
  const [menu, setMenu] = useState();
  const [cartMessage, setCartMessage] = useState(0);

  const {
    state: { cart, products },
    productDispatch,
    dispatch,
    productState: { byType },
  } = CartState();

  useEffect(() => {
    const interval = setInterval(() => {
      setCartMessage(null);
    }, 2000);
    return () => clearInterval(interval);
  });

  let notification;
  if (cartMessage === "plus") {
    notification = {
      status: "added",
      message: "Produto adicionado ao carrinho.",
    };
  }

  if (cartMessage === "minus") {
    notification = {
      status: "removed",
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
          <li key={prod.id} className={classes.item}>
            <Card>
              {prod.image ? (
                <div className={classes.image}>
                  <img src={prod.image} alt={prod.name} />
                </div>
              ) : null}

              <div className={classes.heading}>
                <h3>{prod.name}</h3> <h4>R$ {prod.price},00</h4>
              </div>
              <div className={classes.content}>
                <p>{prod.description}</p>

                <p className={classes.info}>{prod.weight}</p>
              </div>
              <div className={classes.actions}>
                {cart.some((p) => p.id === prod.id) ? (
                  <button
                    className={classes.remove}
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      });
                      setCartMessage("minus");
                    }}
                  >
                    <img
                      src="./images/remove_cart.svg"
                      alt="remover do carrinho"
                    />
                    Remover
                  </button>
                ) : (
                  <button
                    className={classes.add}
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: prod,
                      });
                      setCartMessage("plus");
                    }}
                  >
                    <img
                      src="./images/add_cart.svg"
                      alt="Adicionar ao Carrinho"
                    />
                    Adicionar
                  </button>
                )}
              </div>
            </Card>
          </li>
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
