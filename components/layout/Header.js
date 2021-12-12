import Link from "next/link";
import classes from "./Header.module.css";
import { CartState } from "../../store/cart-context";

function header() {
  const {
    state: { cart },
  } = CartState();

  return (
    <header className={classes.header}>
      <Link href="/" passHref>
        <div className={classes.logo}>
          <img className={classes.icon} src="./images/home.svg" alt="home" />
        </div>
      </Link>
      <Link href="/carrinho" passHref>
        <div className={classes.cart}>
          <img
            className={classes.icon}
            src="./images/cart.svg"
            alt="carrinho"
          />
          <span>{cart.length}</span>
        </div>
      </Link>
    </header>
  );
}

export default header;
