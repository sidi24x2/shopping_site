import React, { useState, useEffect } from 'react';
import './styles/style.scss';
import Header from './components/Header';
import Aside from './components/Aside';
import Main from './components/Main';
import data from './data.json';
import { ProductsContext } from './components/contexts/ProductsContext';

const allSize = [...new Set(data.products.map((p) => p.availableSizes).flat())];

function App() {
  const [sizes, setSizes] = useState([]);
  const [order, setOrder] = useState('');
  const [cart, setCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-site');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorageAndUpdate();
    }
  });

  let localStorageAndUpdate = () => {
    localStorage.setItem('shopping-site', JSON.stringify(cart));
  };

  let addSizes = (val) => {
    if (sizes.includes(val)) {
      setSizes((prevSize) => {
        let newSizes = sizes.filter((s) => s !== val);
        return newSizes;
      });
    } else {
      setSizes((prevSize) => [...sizes, val]);
    }
  };

  let toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };
  let selectOrder = (event) => {
    if (event.target.value) {
      setOrder(event.target.value);
    }
  };

  let addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  let removeItem = (item) => {
    let updateCart = cart.filter((product) => product.id !== item);
    console.log(updateCart);
    setCart(updateCart);
  };

  let incrementItem = (item) => {
    setCart((prevCart) => {
      const updateCart = prevCart.map((product) =>
        product.id === item
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      return updateCart;
    });
  };

  let decrementItem = (item) => {
    setCart((prevCart) => {
      const updateCart = prevCart.map((product) =>
        product.id === item
          ? product.quantity - 1 >= 0
            ? { ...product, quantity: product.quantity - 1 }
            : product
          : product
      );
      return updateCart;
    });
  };

  let toggleMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <ProductsContext.Provider
      value={{
        sizes,
        order,
        addSizes,
        selectOrder,
        allSize,
        products: data.products,
        cart,
        addToCart,
        isVisible,
        toggleCart,
        removeItem,
        incrementItem,
        decrementItem,
        toggleMode,
      }}
    >
      <Header />
      <div className="grid container">
        <Aside />
        <Main />
      </div>
    </ProductsContext.Provider>
  );
}

export default App;
