import { CartState } from "../../store/cart-context";
import Head from "next/head";
import CartList from "../../components/carrinho/CartList";
import Header from "../../components/layout/Header";
import Logo from "../../components/layout/Logo";

function Carrinho() {
  const {
    state: { products },
  } = CartState();

  let content;

  if (products.length === 0) {
    content = <p className="empty">Você não tem itens no carrinho.</p>;
  } else {
    content = <CartList products={products} />;
  }

  return (
    <main className="main">
      <Head>
        <title>Carrinho | iBurguer</title>
        <meta
          name="description"
          content="Faça seu pedido no site e finalize no whatsapp!!"
        />
      </Head>
      <Header />

      <h2 className="title">Carrinho</h2>
      {content}
    </main>
  );
}

export default Carrinho;
