import classes from "./ProductList.module.css";
import { CartState } from "../../store/cart-context";
import ProductItem from "./ProductItem";
import { useState } from "react";

function ProductList() {
  const [menu, setMenu] = useState("lanches");
  const {
    state: { products },
    productDispatch,
    productState: { byType },
  } = CartState();

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
      <nav className={classes.menu}>
        <button
          value="lanches"
          onClick={(e) => {
            productDispatch({
              type: "FILTER_BY_TYPE",
              payload: e.target.value,
            });
          }}
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
          }}
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
          }}
          aria-pressed={menu === "sobremesas" ? true : false}
        >
          Sobremesas
        </button>
      </nav>
      <ul className={classes.list}>
        {transformProducts().map((prod) => (
          <ProductItem key={prod.id} prod={prod} />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
