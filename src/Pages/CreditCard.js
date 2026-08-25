import { useState } from "react";

function CreditCard() {

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  // Formats the card number into groups of four
  function handleCardNumber(event) {

    let number = event.target.value;

    // Remove anything that is not a number
    number = number.replace(/\D/g, "");

    // Limit card number to 16 digits
    number = number.slice(0, 16);

    // Add a space after every four numbers
    number = number.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(number);
  }

  function handleSaveCard(event) {

    event.preventDefault();

    const cardInfo = {
      cardName: cardName,
      cardNumber: cardNumber,
      expiration: expiration,
      cvv: cvv,
    };

    localStorage.setItem(
      "streamListCard",
      JSON.stringify(cardInfo)
    );

    setMessage(
      "Your card information has been saved."
    );
  }

  return (
    <section className="credit-card-page">

      <h1>Payment Information</h1>

      <p>
        Enter your credit card information below.
      </p>

      <form onSubmit={handleSaveCard}>

        <label>
          Name on Card
        </label>

        <input
          type="text"
          value={cardName}
          onChange={(event) =>
            setCardName(event.target.value)
          }
          required
        />

        <label>
          Card Number
        </label>

        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumber}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          required
        />

        <label>
          Expiration Date
        </label>

        <input
          type="text"
          value={expiration}
          onChange={(event) =>
            setExpiration(event.target.value)
          }
          placeholder="MM/YY"
          required
        />

        <label>
          CVV
        </label>

        <input
          type="text"
          value={cvv}
          onChange={(event) =>
            setCvv(event.target.value)
          }
          maxLength="4"
          required
        />

        <button type="submit">
          Save Card
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}

    </section>
  );
}

export default CreditCard;