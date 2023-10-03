
import paperImage from "../../rock-paper-scissors-master/images/icon-paper.svg"
import scissorsImage from "../../rock-paper-scissors-master/images/icon-scissors.svg"
import RockImage from "../../rock-paper-scissors-master/images/icon-rock.svg"
import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { database } from "../../firebase";
import { motion } from "framer-motion";
function SelectPageOnline() {
  const [roomData, setRoomData] = useState(null);
  const [contentKey, setContentKey] = useState(0);
  const [message , setMessage] = useState("")

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

  const pick = async (e) => {
    const roomsCollection = collection(database, "rooms");
    const roomQuery = query(roomsCollection, where("roomName", "==", localStorage.getItem("roomInfo")));
    const roomQuerySnapshot = await getDocs(roomQuery);
    roomQuerySnapshot.forEach(async (docSnapshot) => {
      const roomData = docSnapshot.data();

      for (let i = 0; i < roomData.players.length; i++) {
        if (roomData.players[i].playerId == JSON.parse(localStorage.getItem("userInfo")).id) {
          roomData.players[i].play = e;
          setMessage(`${roomData.players[i].p1} has played`)

        }
        if(  roomData.players[0].playagain == true&&roomData.players[1].playagain==true){
          roomData.players[0].play = "";
          roomData.players[1].play = "";
          roomData.players[0].playagain = false;
          roomData.players[1].playagain = false;


        }
      }

      try {
        const docRef = doc(database, "rooms", docSnapshot.id); // Get the document reference
        await updateDoc(docRef, { players: roomData.players,leave:message}); // Pass the document reference to updateDoc
      } catch (error) {
        console.error("Error updating players field:", error);
      }
    });
  };
  return (
    <div className="App container" >
   

      <main>
        {/* choose section */}
        <section className="container">
          {/* that row contain paper and scissors */}
          <div className="row">
            {/* paper button */}
            <div className="col-6 paper-col">
              <button aria-label="Choose paper" className="paper-button" onClick={() => {
                pick("paper")
              }}>
                <img src={paperImage} alt="paper image" />
              </button>

            </div>
            {/* scissors button */}
            <div className="col-6">
              <button aria-label="Choose scissors" className="scissors-button"
                onClick={() => {
                  pick("scissors")
                }}
              >
                <img src={scissorsImage} alt="scissors Image" />
              </button>
            </div>
          </div>
          {/* that row contain rock */}
          <div className="row rock-row">

            {/* rock button */}
            <div className="col-12">
              <button aria-label="Choose rock" className="rock-button"
                onClick={() => {
                  pick("rock")
                }}
              >
                <img src={RockImage} alt="rock Image" />
              </button>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}

export default SelectPageOnline;
