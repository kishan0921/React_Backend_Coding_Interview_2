import { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);

  // Fetch currency list
  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => setCurrencies(data))
      .catch((err) => console.error(err));
  }, []);

  // Convert currency
  const convertCurrency = () => {
    if (!amount) return;

    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data.rates[to]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      {/* Dropdowns */}
      <div className="flex gap-4">
        {/* From */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            From:
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(currencies).map((cur) => (
              <option key={cur} value={cur}>
                {cur} - {currencies[cur]}
              </option>
            ))}
          </select>
        </div>

        {/* To */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            To:
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(currencies).map((cur) => (
              <option key={cur} value={cur}>
                {cur} - {currencies[cur]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={convertCurrency}
        className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
      >
        Convert
      </button>

      {/* Result */}
      {result && (
        <div className="mt-4 text-lg font-semibold text-gray-700">
          {amount} {from} = {result} {to}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;