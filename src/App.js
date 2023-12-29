
import { Route, Routes, useNavigate } from "react-router-dom";
import Offline from "./rock-paper-scissors-master/pages/Offline";
import Online from "./rock-paper-scissors-master/online/Online";
import Login from "./rock-paper-scissors-master/online/Login";
import { useEffect, useState } from "react";
import Create from "./rock-paper-scissors-master/online/Create";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { database } from "./firebase";
import { useDispatch } from "react-redux";
import Intro from "./rock-paper-scissors-master/online/Intro";


function App() {
  const navigate = useNavigate();
  const localStorageData = localStorage.getItem("userInfo");
  const room = localStorage.getItem("roomInfo");
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [path, setPath] = useState("")
  const leaveRoom = async () => {
    const RoomName = localStorage.getItem("roomInfo")
    const roomsCollection = collection(database, "rooms");
    const roomQuery = query(roomsCollection, where("roomName", "==", RoomName));

    const roomQuerySnapshot = await getDocs(roomQuery);
    roomQuerySnapshot.forEach(async (docSnapshot) => {
      const roomData = docSnapshot.data();
      const roomId = docSnapshot.id;
      const result = roomData.players.filter(name => name.playerId == JSON.parse(localStorage.getItem("userInfo")).id);
      setName(result[0].p1)

      for (let i = 0; i < roomData.players.length; i++) {
        if (roomData.players[i].playerId == JSON.parse(localStorage.getItem("userInfo")).id) {
          roomData.players[i].p1 = ""
          roomData.players[i].playerId = ""
          roomData.players[i].playerImage = ""
          roomData.players[i].play = ""


        }
      }

      const roomDocRef = doc(collection(database, "rooms"), roomId);
      await updateDoc(roomDocRef, { players: roomData.players, leave: `${JSON.parse(localStorage.getItem("userInfo")).name} has Left the room` });

      setTimeout(() => {
        updateDoc(roomDocRef, { leave: `` });

      }, 1000);

    })
    localStorage.setItem("roomInfo", null)

  }

  useEffect(() => {
    if (localStorage.getItem("roomInfo") == null) {
      localStorage.setItem("roomInfo", null)
    }
    const pathname = window.location.pathname// returns the absolute URL of a page
    setPath(pathname)
    if (!localStorageData && pathname == "/online" || !localStorageData && pathname == "/create") {
      navigate("/login");
    }
    if (localStorageData != null && pathname == "/login" || localStorageData != null && pathname == "/login" || room == "null" && pathname == "/online") {
      navigate("/create");
    }
    if (pathname != "/online") {
      leaveRoom()
      localStorage.setItem("roomInfo", null)

    }

    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      leaveRoom()

    });

  }, [localStorageData, navigate]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/offline" element={<Offline />} />
        <Route path="/online" element={<Online />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Offline />} />

      </Routes>

      {path != "/" ? <button className="home"
      onClick={()=>{
        navigate("/")
      }}
      >Home</button> : null}

      <footer>
        <div class="attribution">
          Challenge by <a href="https://www.frontendmentor.io/profile/Saad-Hisham" target="_blank">Frontend Mentor</a>.
          Coded with ❤️ by <a href="https://3d-portofolio-seven.vercel.app/" target="_blank">Saad Hesham</a>.
        </div>
      </footer>
    </div>
  );
}

export default App;
