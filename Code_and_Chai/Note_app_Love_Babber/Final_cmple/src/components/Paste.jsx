import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removefromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

const Paste = () => {  // Changed component name to PascalCase
  const pastes = useSelector((state) => state.paste.pastes)  // Fixed variable name

  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete  (pasteId){
    dispatch(removefromPastes(pasteId));

  }


  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href, // You can customize the URL if needed
        })
        .then(() => toast.success('Shared successfully!'))
        .catch((error) => toast.error('Error sharing:', error));
    } else {
      toast.error('Web Share API is not supported in your browser.');
    }
  }
  

  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5'
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {filteredData.length > 0 &&
          filteredData.map
          ((paste) => (
            <div key={paste?._id} className='border'>  
              <div>
                {paste.title}
              </div>
              <div>
                {paste.content}
              </div>
              <div className='flex flex-row gap-4 place-content-evenly'>

                <button>
                  <a href={`/?pasteId=${paste?._id}`}>
                    Edit
                  </a>
                </button>


                <button>
                  <a href={`/pastes/${paste?._id}`}>
                  View
                  </a>
                </button>


                <button onClick={() => handleDelete(paste?._id)}>
                  Delete
                </button>
                <button onClick={() => {
                  navigator.clipboard.writeText
                  (paste?.content)
                  toast.success("copied to clipbaord")
                }}>
                  Copy
                </button>

                <button onClick={() => handleShare(paste)}>Share</button>
              </div>
            <div>
              {paste.createdAt}
              </div>

            </div>
          ))}
      </div>
    </div>
  )
}

export default Paste  // Matched component name