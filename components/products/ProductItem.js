import Card from "../ui/Card";
import classes from "./ProductItem.module.css";
import { CartState } from "../../store/cart-context";

function ProductItem({ prod }) {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <li className={classes.item}>
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
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remover do Carrinho
            </button>
          ) : (
            <button
              className={classes.add}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
            >
              Adicionar ao Carrinho
            </button>
          )}
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
