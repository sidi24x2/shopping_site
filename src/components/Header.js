import { useContext } from 'react';
import { ProductsContext } from './contexts/ProductsContext';
import Cart from './Cart';
function Header() {
  let productsDetails = useContext(ProductsContext);

  let { cart, isVisible, toggleCart, toggleMode } = productsDetails;
  let productsCount;
  productsCount = 0;

  if (cart.length >= 0) {
    productsCount = cart.reduce((acc, cv) => {
      acc += cv.quantity;
      return acc;
    }, 0);
  }

  if (isVisible) {
    return <Cart productsCount={productsCount} />;
  }

  return (
    <header>
      <div className="header container flex">
        <h1>ShopLy</h1>
        <div class="flex start">
          <div>
            <img
              src="./static/bag-icon.png"
              alt="shoppingCart"
              onClick={toggleCart}
            />
            <small>{productsCount}</small>
          </div>
          <span onClick={toggleMode}>🌖</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
