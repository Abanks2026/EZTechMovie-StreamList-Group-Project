import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import StreamList from "./Pages/StreamList";
import Movies from "./Pages/Movies";
import TMDBMovies from "./Pages/TMDBMovies";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import About from "./Pages/About";

import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("streamListCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // warning message for dupes

  const [cartWarning, setCartWarning] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "streamListCart",
      JSON.stringify(cart)
    );
  }, [cart]);

function addToCart(product) {
  const isSubscription =
    product.id >= 1 && product.id <= 4;

  // Check whether ANY subscription is already in the cart
  const subscriptionInCart = cart.find(
    (item) => item.id >= 1 && item.id <= 4
  );

  // Stop user from adding another subscription
  if (isSubscription && subscriptionInCart) {
    setCartWarning(
      `You already have the ${subscriptionInCart.service} in your cart. Only one subscription plan may be selected at a time.`
    );

    setTimeout(() => {
      setCartWarning("");
    }, 4000);

    return;
  }

  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.id === product.id
    );

    // Merchandise can have multiple quantities
    if (existingItem) {
      return currentCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    // Add new item
    return [
      ...currentCart,
      {
        ...product,
        quantity: 1,
      },
    ];
  });

  setCartWarning("");
}

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

function increaseQuantity(id) {
  const item = cart.find(
    (cartItem) => cartItem.id === id
  );

  const isSubscription =
    item && item.id >= 1 && item.id <= 4;

  if (isSubscription) {
    setCartWarning(
      "Subscription plans are limited to a quantity of one."
    );

    setTimeout(() => {
      setCartWarning("");
    }, 4000);

    return;
  }

  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
}

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  }

  return (
    <div className="App">
      <Navigation cartCount={cart.length} />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<StreamList />} />

          <Route
            path="/movies"
            element={<Movies />}
          />

          <Route
            path="/tmdb"
            element={<TMDBMovies />}
          />

          <Route
            path="/products"
            element={
              <Products addToCart={addToCart}
	      cartWarning={cartWarning} />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            }
          />

          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;