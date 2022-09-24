import { useEffect } from "react";

function DeleteRemindrPopup({setToggleDeletePopup, setDeleteId, deleteId, remindrs, setRemindrs}) {

   useEffect(()=>{
    document.body.style.overflow = "hidden"

    return ()=>{
      document.body.style.overflow = "auto"
    }

  })

  function deleteRemindr(id){
        const newRemindrs = remindrs.filter((remindr) => remindr.id !== id)

        setRemindrs(newRemindrs)
    }


  return (
    <div className="overlay">
       <div className="delete-remindr-popup">
      <h2>Delete Remindr</h2>

      <p>Are you sure you want to delete this remindr?</p>

      <div className="buttons">
        <button
        onClick={()=> {
          deleteRemindr(deleteId)
          setToggleDeletePopup(false)
        }
        }
        className="delete">
          Yes, Delete
          </button>


        <button 
        onClick={()=>setToggleDeletePopup(false)}
        className="leave">No, Leave it</button>
      </div>
     </div>
    </div>
   
  )
}

export default DeleteRemindrPopup