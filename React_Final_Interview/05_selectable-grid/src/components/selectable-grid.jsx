/* eslint-disable react/prop-types */

// React hooks import
import { useCallback, useState } from "react";

const SelectableGrid = ({ rows = 10, cols = 10 }) => {

  // 🧠 STATE 1: mouse press ho raha hai ya nahi
  const [isMouseDown, setIsMouseDown] = useState(false);

  // 🧠 STATE 2: kaun kaun se boxes selected hain
  const [selectedBoxes, setSelectedBoxes] = useState([]);



  // 🖱️ Mouse Down (jab user click karta hai)
  const handleMouseDown = (boxNumber) => {

    // Mouse press ON
    setIsMouseDown(true);

    // Starting box set kar rahe hain
    setSelectedBoxes([boxNumber]);
  };



  // 🖱️ Mouse Enter (drag karte waqt chalega)
  const handleMouseEnter = useCallback(
    (boxNumber) => {

      // Sirf tab chalega jab mouse press hai
      if (isMouseDown) {

        // Starting box (jahan se drag start hua)
        const startBox = selectedBoxes[0];

        // Ending box (jahan tak drag hua)
        const endBox = boxNumber;



        // 🧠 BOX → ROW/COL conversion

        // Example: box 23 → row = 2
        const startRow = Math.floor((startBox - 1) / cols);

        // Example: box 23 → col = 2
        const startCol = (startBox - 1) % cols;

        const endRow = Math.floor((endBox - 1) / cols);
        const endCol = (endBox - 1) % cols;



        // 🧠 Rectangle boundary find karna
        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);



        // 📦 Selected boxes store karne ke liye array
        const selected = [];

        // 🔁 Rectangle ke andar ke sab boxes select karo
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {

            // Row + Col → Box number me convert
            selected.push(row * cols + col + 1);
          }
        }

        // Final selected boxes set karo
        setSelectedBoxes(selected);
      }
    },
    [isMouseDown, selectedBoxes, cols] // dependencies important hai ⚠️
  );



  // 🖱️ Mouse Up (drag complete)
  const handleMouseUp = () => {

    // Mouse release → selection stop
    setIsMouseDown(false);
  };



  // 🎨 UI Render
  return (
    <div
      className="grid"

      // CSS variables (grid banane ke liye)
      style={{ "--rows": rows, "--cols": cols }}

      // Mouse release handle
      onMouseUp={handleMouseUp}
    >

      {/* 🔁 Grid boxes generate kar rahe hain */}
      {[...Array(rows * cols).keys()].map((i) => (

        <div
          key={i}

          // Agar box selected hai → class "selected"
          className={`box ${
            selectedBoxes.includes(i + 1) ? "selected" : ""
          }`}

          // Click → selection start
          onMouseDown={() => handleMouseDown(i + 1)}

          // Drag → selection continue
          onMouseEnter={() => handleMouseEnter(i + 1)}
        >
          {/* Box number show */}
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;