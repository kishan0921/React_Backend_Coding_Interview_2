// React hooks import kar rahe hain
import { useEffect, useState } from "react";

// Dropdown component import (reuse kar rahe hain)
import CurrencyDropDown from "./CurrencyDropDown";

const CurrencyConverter = () => {

  // 🌐 Saari currencies (USD, INR, EUR...) store karne ke liye
  // Initially empty object hai → baad me API se fill hoga
  const [currencies, setCurrencies] = useState({});

  // 💰 User ka input amount (default 1 rakha hai)
  const [amount, setAmount] = useState(1);

  // 🔄 From currency (kis se convert karna hai)
  const [fromCurrency, setFromCurrency] = useState("USD");

  // 🔄 To currency (kis me convert karna hai)
  const [toCurrency, setToCurrency] = useState("INR");

  // 📊 Conversion result store karne ke liye
  const [result, setResult] = useState(null);

  // ⏳ Loading state (jab API call chal raha ho)
  const [loading, setLoading] = useState(false);

  // ⭐ Favorite currencies list
  const [favorites, setFavorites] = useState([]);



  // 🌐 API se currencies fetch karna (sirf ek baar jab component load ho)
  useEffect(() => {

    // Async function kyunki fetch time leta hai
    const fetchCurrencies = async () => {
      try {

        // API call
        const res = await fetch("https://api.frankfurter.app/currencies");

        // Response ko JSON me convert
        const data = await res.json();

        // State update → dropdown me currencies dikhengi
        setCurrencies(data);

      } catch (error) {
        // Error aaye to console me print
        console.error("Error fetching currencies:", error);
      }
    };

    // Function call
    fetchCurrencies();

  }, []); // Empty dependency → sirf ek baar run hoga



  // ⭐ Favorite add karne ka function
  const handleFavorite = (currency) => {

    // Check: agar already favorite me nahi hai
    if (!favorites.includes(currency)) {

      // Naya array bana ke add kar rahe hain (React rule)
      setFavorites([...favorites, currency]);
    }
  };



  // 💱 Currency convert karne ka function
  const convertCurrency = async () => {

    // Agar amount empty hai (0 ya null) → kuch mat karo
    if (!amount) return;

    // Loading start (button disable ho jayega)
    setLoading(true);

    try {

      // API call with dynamic values
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );

      // Response JSON me convert
      const data = await res.json();

      // Result set (converted value)
      setResult(data.rates[toCurrency]);

    } catch (error) {

      // Error handle
      console.error("Conversion error:", error);

    } finally {

      // Chahe success ho ya error → loading band
      setLoading(false);
    }
  };



  // 🎨 UI Return
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">

      {/* 🏷️ Title */}
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>


      {/* 🔽 Reusable Dropdown Component (2 baar use ho raha hai) */}
      <div className="flex gap-4">

        {/* FROM Currency */}
        <CurrencyDropDown
          currencies={currencies}          // saari currencies
          currency={fromCurrency}          // selected value
          setCurrency={setFromCurrency}    // update function
          favorites={favorites}            // favorites list
          handleFavorite={handleFavorite}  // add to favorites
          title="From"                     // label
        />

        {/* TO Currency */}
        <CurrencyDropDown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          favorites={favorites}
          handleFavorite={handleFavorite}
          title="To"
        />
      </div>



      {/* 💰 Amount Input */}
      <div className="mt-4">

        <label className="block text-sm font-medium text-gray-700">
          Amount:
        </label>

        <input
          type="number"
          min="0"

          // Controlled input (state se bind hai)
          value={amount}

          // Input change → state update
          onChange={(e) => setAmount(e.target.value)}

          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>



      {/* 🔘 Convert Button */}
      <button
        onClick={convertCurrency}

        // Loading ke time disable
        disabled={loading}

        className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md"
      >
        {/* Loading ke hisaab se text change */}
        {loading ? "Converting..." : "Convert"}
      </button>



      {/* 📊 Result Show */}
      {result !== null && (

        <div className="mt-4 text-lg font-semibold text-gray-700">

          {/* Example: 1 USD = 83 INR */}
          {amount} {fromCurrency} = {result} {toCurrency}

        </div>
      )}
    </div>
  );
};


// Export component
export default CurrencyConverter;