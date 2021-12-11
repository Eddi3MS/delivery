import { CartState } from "../../store/cart-context";
import classes from "./CartItem.module.css";

function CartItem({ prod }) {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <tr>
      <td className={classes.qtt}>
        <select
          value={prod.qty}
          onChange={(e) =>
            dispatch({
              type: "CHANGE_CART_QTY",
              payload: {
                id: prod.id,
                qty: e.target.value,
              },
            })
          }
        >
          {[...Array(10).keys()].map((x) => (
            <option key={x + 1}>{x + 1}</option>
          ))}
        </select>
      </td>
      <td>{prod.name}</td>
      <td>R$ {prod.price},00</td>
      <td>
        <button
          className={classes.remove}
          onClick={() =>
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: prod,
            })
          }
        >
          <svg height="1em" viewBox="0 0 16 16" fill="white">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
