import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaUser,
  FaShareAlt,
  FaStar,
  FaCrown,
} from "react-icons/fa";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {

  // React icons for the four subscription products
  function getSubscriptionIcon(item) {
    switch (item.id) {
      case 1:
        return <FaUser />;
      case 2:
        return <FaShareAlt />;
      case 3:
        return <FaStar />;
      case 4:
        return <FaCrown />;
      default:
        return null;
    }
  }

  function isSubscription(item) {
    return item.id >= 1 && item.id <= 4;
  }

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your Cart</h1>

        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <p>
            Visit the Products page to add
            subscriptions or merchandise.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">

      <h1>Your Cart</h1>

      <p>
        Review your selections and adjust quantities
        as needed.
      </p>

      <div className="cart-items">

        {cart.map((item) => (

          <article
            className="cart-item"
            key={item.id}
          >

            {/* Subscription Icon or Product Image */}

            <div className="cart-image-area">

              {isSubscription(item) ? (

                <div className="cart-product-icon">
                  {getSubscriptionIcon(item)}
                </div>

              ) : (

                <img
                  src={item.img}
                  alt={item.service}
                />

              )}

            </div>

            <div className="cart-item-info">

              <h2>{item.service}</h2>

              <p>{item.serviceInfo}</p>

              <p>
                Price: ${item.price.toFixed(2)}
              </p>

              {/* Quantity Controls */}

              {isSubscription(item) ? (

                <div className="subscription-quantity">
                  <span>
                    Quantity: 1
                  </span>

                  <p className="subscription-note">
                    One subscription plan allowed per cart.
                  </p>
                </div>

              ) : (

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>

                  <span>
                    Quantity: {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>

                </div>

              )}

              <p className="item-subtotal">
                Subtotal: $
                {(
                  item.price * item.quantity
                ).toFixed(2)}
              </p>

              <button
                type="button"
                className="remove-cart-button"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                <FaTrash />
                Remove
              </button>

            </div>

          </article>

        ))}

      </div>

      <div className="cart-summary">

        <h2>Order Summary</h2>

        <p>
          Total Items:
          <strong> {totalItems}</strong>
        </p>

        <p className="cart-total">
          Total Price:
          <strong>
            {" "}
            ${totalPrice.toFixed(2)}
          </strong>
        </p>

      </div>

    </section>
  );
}

export default Cart;