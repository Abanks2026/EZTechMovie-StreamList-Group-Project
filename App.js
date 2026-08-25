import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";

import Navigation from "./components/Navigation";
import StreamList from "./Pages/StreamList";
import TMDBMovies from "./Pages/TMDBMovies";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import CreditCard from "./Pages/CreditCard";
import About from "./Pages/About";

import "./App.css";

function App() {

    const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("streamListUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });


  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("streamListCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  

  const [cartWarning, setCartWarning] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "streamListCart",
      JSON.stringify(cart)
    );
  }, [cart]);

  function handleLogout() {
    setUser(null);

    localStorage.removeItem(
      "streamListUser"
  );
 }


  function addToCart(product) {
    const isSubscription =
      product.id >= 1 && product.id <= 4;

    const subscriptionInCart = cart.find(
      (item) => item.id >= 1 && item.id <= 4
    );

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

  function clearCart() {
  	setCart([]);
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

/* If user is not logged in,
   display the Google Login page */
if (!user) {
  return <Login setUser={setUser} />;
}

  return (
  <div className="App">
 <Navigation cartCount={cart.length}
 handleLogout={handleLogout} />
 <main className="page-container">
  <Routes>
    <Route path="/" element={<StreamList />} />
    <Route
      path="/tmdb"
      element={<TMDBMovies />}
    />
    
    <Route
    path="/products"
    element={
    <Products
    addToCart={addToCart}
    cartWarning={cartWarning}/>
            }
          />

          <Route
          path="/cart"
          element={
          <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          />
        }
          />

          <Route
            path="/checkout"
            element={<CreditCard />}
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