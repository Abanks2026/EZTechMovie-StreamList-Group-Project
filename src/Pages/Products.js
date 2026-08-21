import {
  FaUser,
  FaShareAlt,
  FaStar,
  FaCrown,
} from "react-icons/fa";

import list from "../data";

function Products({ addToCart,
  cartWarning }) {

  // Assign React icons to the four subscription products
  function getSubscriptionIcon(product) {
    switch (product.id) {
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

  // Determines whether the product is one
  // of the four subscription products
  function isSubscription(product) {
    return product.id >= 1 && product.id <= 4;
  }

  return (
    <section className="products-page">

      <h1>StreamList Products</h1>

      <p>
        Select a subscription or product to add
        to your cart.
      </p>
	
     {cartWarning && (
 	 <div className="cart-warning">
    		{cartWarning}
         </div>
     )}

      <div className="product-grid">

        {list.map((product) => (

          <article
            className="product-card"
            key={product.id}
          >

            <div className="product-image-area">

              {isSubscription(product) ? (

                <div className="product-icon">
                  {getSubscriptionIcon(product)}
                </div>

              ) : (

                <img
                  src={product.img}
                  alt={product.service}
                />

              )}

            </div>

            <div className="product-info">

              <h2>{product.service}</h2>

              <p>
                {product.serviceInfo}
              </p>

              <p className="product-price">
                ${product.price.toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}

export default Products;