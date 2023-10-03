import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import ResultOnline from "./ResultOnline";
import ScoreBoardOnline from "./ScoreBoardOnline";
import SelectPageOnline from "./SelectPageOnline";
import { database } from "../../firebase";
import AnimationComponent from "../pages/AnimationComponent";

function Online() {
  const [roomData, setRoomData] = useState(null);
  const [contentKey, setContentKey] = useState(0);
  useEffect(() => {
    const RoomName = localStorage.getItem("roomInfo");
    const roomsCollection = collection(database, "rooms");
    const roomQuery = query(roomsCollection, where("roomName", "==", RoomName));

    const unsubscribe = onSnapshot(roomQuery, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((docSnapshot) => {
        data.push({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        });
      });
      setRoomData(data);
      setContentKey((prevKey) => prevKey + 1); // Update the key to trigger animation
    });

    return () => {
      unsubscribe(); // Unsubscribe from real-time updates when component unmounts
    };
  }, []);

  const filterd = roomData != null ? roomData[0].players.filter(player => player.playerId == JSON.parse(localStorage.getItem("userInfo")).id) : null;
  return (
    <div>
         {roomData !== null && roomData[0].leave !== "" && (
        <div className="leave-container">
          <motion.div
            key={contentKey} // Use the key to trigger animation on content change
            initial={{ y: "10vh", opacity: 1 }} // Set initial state
            animate={{ y: 0, opacity: 0, transition: { duration: 3, delay: 0, ease: "easeInOut" } }} // Set animate state
            className={roomData[0].leave.includes("Left") ? "leave" : "join"}          >
            {roomData[0].leave}

          </motion.div>
        </div>
      )}
         {roomData != null && roomData[0].players[0].play != "" && roomData[0].players[1].play != "" ? 
            <AnimationComponent/>
            
            : null}
      <ScoreBoardOnline />

      {filterd != null && filterd[0].play == "" || filterd != null&&roomData[0].players[0].playagain==true&&roomData[0].players[1].playagain==true ? <SelectPageOnline /> : <ResultOnline />}

    </div>
  );
}

export default Online;