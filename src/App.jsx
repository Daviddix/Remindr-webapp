import EmptyRemindr from "../components/EmptyRemindr"
import Header from "../components/Header"
import AddRemindrPopup from "../components/AddRemindrPopup"
import DeleteRemindrPopup from "../components/DeleteRemindrPopup"
import Remindr from "../components/Remindr"
import './App.css'
import EditRemindrPopup from "../components/EditRemindrPopup"
import { useState } from "react"

function App() {
  //necessary states
  const [remindrs, setRemindrs] = useState([])
  const [title, setTitle] = useState("")
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [vibrate, setVibrate] = useState(false)


  const [toggleAddPopup,setToggleAddPopup] = useState(false)
  const [toggleDeletePopup,setToggleDeletePopup] = useState(false)
  const [toggleEditPopup, setToggleEditPopup] = useState(false)

  const [deleteId, setDeleteId] = useState(0)
  const [oneToEdit, setOneToEdit] = useState({})
  const [stopTimer, setStopTimer] = useState(false)

  let timerId
  function createNotification(title, vibrate, hours, minutes, seconds){
    const hoursInMil = hours * 3600000
      const minsInMil = minutes * 6000
      const secsInMil = seconds * 1000
      const timeToRun = hoursInMil + minsInMil + secsInMil
      timerId = setInterval(() => {
        Notification.requestPermission()
        .then((p)=>{
          new Notification(title, {
            body:`time to  ${title}, and notification will play in ${hours} hours ${minutes} minutes ${seconds} seconds`,
            vibrate: vibrate,
            silent:false
          })
        })
    },timeToRun);
   
  }  

  function addRemindrFunction(title, vibrate, hours, minutes, seconds){
    if (title.trim()) {
      if (hours == 0 && minutes == 0 && seconds == 0) {
        return alert("please enter a valid number")
      }
      const newObj = {
      title: title,
      vibrate: vibrate,
      hours: hours,
      minutes: minutes,
      seconds:seconds,
      id: Date.now(),
      startSendingNotifications: setTimeout(function timer(){
        createNotification(title, vibrate, hours, minutes, seconds) 
      }, 0),
      stopSendingNotifications: function t() {
        clearInterval(timerId)
      }
      
    }

    newObj.startSendingNotifications

    setRemindrs((prev)=> [...prev, newObj])
    setTitle("")
    setVibrate(false)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setToggleAddPopup(false)

    
    }else{
      alert("please enter a title")
      setTitle("")
      setVibrate(false)
    }
    
  }

  //mapping over the remindrs array to create a new remindr for each object in the array
  const remindersMapped= remindrs.map(({title, vibrate, id, hours, minutes, seconds}) =>{
    return <Remindr 
    id={id}
    title={title} 
    remindrs={remindrs}
    setRemindrs={setRemindrs}
    setToggleDeletePopup={setToggleDeletePopup}
    setToggleEditPopup={setToggleEditPopup}
    setDeleteId={setDeleteId}
    setOneToEdit={setOneToEdit}
    hours={hours}
    minutes={minutes}
    seconds={seconds}
    vibrate={vibrate} />
  })
 
  return (
    <main className="App">
      <Header
      setToggleAddPopup={setToggleAddPopup}
      />

     <h1 className="heading">
      My Remindrs
     </h1>

     {remindrs.length <= 0 && <EmptyRemindr />}

     <div className="remindrs-container">
      {remindersMapped}
     </div>

     <button 
     onClick={()=>setToggleAddPopup(prev=>!prev)}className="add-remindrs">
      Add a new remindr
     </button>

    {toggleAddPopup && <AddRemindrPopup
     title={title} 
     setTitle={setTitle}
     vibrate={vibrate}
     setVibrate={setVibrate}
     hours={hours}
     setHours={setHours}
     minutes={minutes}
     setMinutes={setMinutes}
     seconds={seconds}
     setSeconds={setSeconds}
     setRemindrs = {setRemindrs}
     addRemindrFunction={addRemindrFunction}
     setToggleAddPopup={setToggleAddPopup}
     />}


    {toggleDeletePopup && <DeleteRemindrPopup
    setToggleDeletePopup={setToggleDeletePopup}
    setDeleteId={setDeleteId}
    deleteId={deleteId}
    remindrs={remindrs}
    setRemindrs={setRemindrs}
    />}


    {toggleEditPopup &&<EditRemindrPopup
    toggleEditPopup={toggleEditPopup}
    setToggleEditPopup={setToggleEditPopup}
    oneToEdit={oneToEdit}
    remindrs={remindrs}
    setRemindrs={setRemindrs}
    />}
     
    </main>
  )
}

export default App
