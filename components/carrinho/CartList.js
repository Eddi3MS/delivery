import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import classes from "./CartList.module.css";
import { CartState } from "../../store/cart-context";
import Card from "../ui/Card";
import router from "next/router";

function CartList() {
  const [nome, setNome] = useState("");
  const [address, setAddress] = useState("");
  const [bairro, setBairro] = useState("");
  const [comp, setComp] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const msg = cart.map((product) => {
    const message = `Quantidade: 0${product.qty}%0ANome: ${product.name}%0APreço: ${product.price}`;
    return message;
  });

  // %0A = <br>
  // %20 = space

  const edit = msg.join("%0A%0A");

  const phone = 37999853557;
  const message = `Pedido%20%0A%0A${edit}%0A%0ATotal:%20R$${total},00%0A%0ANome:%20${nome}%0AEndereço:%20${address}%0ABairro:%20${bairro}%0AComplemento:%20${comp}`;

  function orderHandler(e) {
    e.preventDefault();

    if (cart.length === 0) {
      setErrorMessage("Não há itens no carrinho.");
      return;
    }

    if (nome.trim() === "" || address.trim() === "" || bairro.trim() === "") {
      setErrorMessage("Preencha todos os campos de entrega.");

      return;
    }

    router.push(`https://wa.me/+55${phone}?text=${message}`);
  }
  return (
    <>
      <Card>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Qtd</th>
              <th>Produto</th>
              <th>Preço Unitário</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((prod) => (
              <CartItem key={prod.id} prod={prod} />
            ))}
          </tbody>
        </table>
      </Card>

      <div className={classes.total}>
        <span>Total: R$ {total},00</span>
      </div>

      <h3 className="title">Endereço para entrega:</h3>

      <form className={classes.address}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            required
            id="nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            required
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={classes.complementary}>
          <div>
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              required
              id="bairro"
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              required
              id="complemento"
              onChange={(e) => setComp(e.target.value)}
            />
          </div>
        </div>
      </form>

      {errorMessage ? (
        <span className={classes.error}>
          <img src="./images/error.svg" alt="alert" />
          {errorMessage}
        </span>
      ) : null}

      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        className={classes.finalizar}
        onClick={orderHandler}
      >
        Finalizar Compra
      </a>
      <p className={classes.warning}>
        * você será direcionado para o whatsapp.
      </p>
    </>
  );
}

export default CartList;
