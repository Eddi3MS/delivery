import Head from "next/head";
import Header from "../components/layout/Header";
import ProductsList from "../components/products/ProductList";
import Logo from "../components/layout/Logo";

export default function Home() {
  return (
    <main className="main">
      <Head>
        <title>iBurguer Lanches</title>
        <meta
          name="description"
          content="Lanches com ingredientes selecionados"
        />
      </Head>
      <Header />
      <Logo />
      <section className="homeSection">
        <h2 className="title">Menu</h2>
        <ProductsList />
      </section>
    </main>
  );
}
