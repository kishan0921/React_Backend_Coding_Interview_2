import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams(); // Get the paste ID from the URL params
  const allPastes = useSelector((state) => state.paste.pastes); // Get all pastes from Redux store

  // Filter the paste with the matching ID (returns an array)
  const paste = allPastes.filter((p) => p._id === id);
  console.log("Final Paste: ", paste);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="enter title here"
          value={paste.length > 0 ? paste[0].title : ''} // Safely access title from the first element of the array
          disabled
          onChange={(e) => setTitle(e.target.value)} // onChange handler is not needed for disabled input
        />

        {/* <button 
          className="p-2 rounded-2xl mt-2"
          onClick={createPaste}  // Added missing click handler
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"  // Fixed comma in class name
          value={paste.length > 0 ? paste[0].content : ''} // Safely access content from the first element of the array
          placeholder="enter content here"  // Fixed typo: contect → content
          disabled
          onChange={(e) => setValue(e.target.value)} // onChange handler is not needed for disabled textarea
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;