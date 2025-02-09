import { useContext } from 'react';
import { ProductsContext } from './contexts/ProductsContext';
function Hero() {
  let productsDetails = useContext(ProductsContext);
  let { products, sizes, order, addToCart } = productsDetails;

  order = String(order);

  let filteredProducts;
  if (sizes.length <= 0) {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((p) => {
      return p.availableSizes.some((s) => sizes.includes(s));
    });
  }
  if (order === 'high2low') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    console.log(filteredProducts);
  }
  if (order === 'low2high') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <>
      <div class="hero">
        <ul className="products flex wrap">
          {filteredProducts.map((p) => (
            <li key={p.id}>
              <img src={`./static/products/${p.sku}_1.jpg`} alt="img" />
              <h5>{p.title}</h5>
              <hr />
              <h6>
                {p.currencyFormat}
                {p.price}
              </h6>
              <button onClick={() => addToCart(p)}>Add To Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Hero;
