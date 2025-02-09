import { useContext } from 'react';
import { ProductsContext } from './contexts/ProductsContext';
function Cart(props) {
  let productsDetails = useContext(ProductsContext);

  let { cart, toggleCart, removeItem, incrementItem, decrementItem } =
    productsDetails;

  let subTotal = cart.reduce((acc, cv) => {
    acc += cv.quantity * cv.price;
    return acc;
  }, 0);
  return (
    <>
      <section class="cart">
        <div class="flex container">
          <div>
            <img src="./static/bag-icon.png" alt="cart" />
            <small>{props.productsCount}</small>
          </div>
          <span onClick={toggleCart}>❌</span>
        </div>
        <ul class="cartItems container">
          {cart.map((product) => (
            <li key={product.id} className="flex">
              <img
                src={`/static/products/${product.sku}_2.jpg`}
                alt="product_img"
              />
              <div className="cart-item-details">
                <h5>{product.title}</h5>
                <h6>{product.description}</h6>
                <p>
                  Price : {product.currencyFormat}
                  {product.price}
                </p>
              </div>
              <div className="flex col ">
                <span onClick={() => removeItem(product.id)}>❌</span>
                <div>
                  <span
                    className="inc"
                    onClick={() => decrementItem(product.id)}
                  >
                    -
                  </span>
                  <span>{product.quantity}</span>
                  <span
                    className="inc"
                    onClick={() => incrementItem(product.id)}
                  >
                    +
                  </span>{' '}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div class="flex container">
          <h4>SubTotal</h4>
          <h5>{subTotal}</h5>
        </div>
        <div class="flex center">
          <button onClick={() => alert(`Your total amount is $${subTotal}`)}>
            CheckOut
          </button>
        </div>
      </section>
    </>
  );
}

export default Cart;
