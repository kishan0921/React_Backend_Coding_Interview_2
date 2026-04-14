// Ye ek reusable React component hai jo currency dropdown + favorites handle karta hai
const CurrencyDropDown = ({
  
  // currencies → object hai (code → name)
  // Example: { USD: "US Dollar", INR: "Indian Rupee" }
  currencies,

  // current selected currency (jaise "USD")
  currency,

  // function jo selected currency ko update karega
  setCurrency,

  // favorites list (default empty array agar pass na ho)
  favorites = [],

  // function jo currency ko favorites me add/remove karega
  handleFavorite,

  // label/title jo dropdown ke upar dikhega
  title = "",
}) => {
  
  return (
    <div className="w-full">

      {/* 🏷️ LABEL SECTION */}
      {/* Ye dropdown ke upar title show karta hai */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>


      {/* 🔽 DROPDOWN SELECT */}
      <select
        
        // Current selected value bind kar rahe hain
        value={currency}

        // Jab user dropdown change kare
        onChange={(e) => setCurrency(e.target.value)}

        // Tailwind styling
        className="w-full p-2 border border-gray-300 rounded-md"
      >

        {/* currencies object ko loop kar rahe hain */}
        {/* Object.entries → [code, name] pairs deta hai */}
        {Object.entries(currencies).map(([code, name]) => (

          // Har currency ke liye ek option banega
          <option key={code} value={code}>
            {/* Example: USD - US Dollar */}
            {code} - {name}
          </option>
        ))}
      </select>


      {/* ⭐ FAVORITES SECTION */}
      {/* Sirf tab show hoga jab favorites list empty nahi hai */}
      {favorites.length > 0 && (

        <div className="mt-2 flex flex-wrap gap-2">

          {/* Har favorite currency ke liye button bana rahe hain */}
          {favorites.map((fav) => (

            <button
              key={fav}

              // Click karte hi wo currency select ho jaayegi
              onClick={() => setCurrency(fav)}

              // Styling:
              // Agar ye current selected currency hai → highlight karo
              // warna normal gray button
              className={`px-2 py-1 text-sm rounded-md border ${
                currency === fav
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {/* Button pe currency code show hoga */}
              {fav}
            </button>
          ))}
        </div>
      )}


      {/* ⭐ ADD TO FAVORITES BUTTON */}
      <button
        
        // Current selected currency ko favorites me add karega
        onClick={() => handleFavorite(currency)}

        // Styling
        className="mt-2 text-sm text-indigo-600 hover:underline"
      >
        ⭐ Add to Favorites
      </button>

    </div>
  );
};


// Component export kar rahe hain taaki dusre components me use ho sake
export default CurrencyDropDown;