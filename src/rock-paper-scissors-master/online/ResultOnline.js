import rock from "../../rock-paper-scissors-master/images/icon-rock.svg"
import paper from "../../rock-paper-scissors-master/images/icon-paper.svg"
import scissors from "../../rock-paper-scissors-master/images/icon-scissors.svg"
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { database } from "../../firebase";
import AnimationComponent from "../pages/AnimationComponent";
function ResultOnline() {
  const [roomData, setRoomData] = useState(null);
  const [win, setWin] = useState("")
  const [roomId, setRoomId] = useState("")
  const imageMap = {
    rock: rock,
    paper: paper,
    scissors: scissors,
  };

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
    });

    return () => {
      unsubscribe(); // Unsubscribe from real-time updates when component unmounts
    };
  }, []);

  const controls = useAnimation();
  const controlsTwo = useAnimation();

  useEffect(() => {
    const sequenceAnimation = async () => {
      await controls.start({ x: "5vw", scale: 0, y: "20vh" });
      await controls.start({ x: "10vw", y: "-20vh", scale: 1.2, transition: { duration: 0.5, ease: "easeInOut" } });
      await controls.start({ x: "0vw", y: "0vh", scale: 1, transition: { duration: 0.5, ease: "linear" } });
    };

    sequenceAnimation();
  }, [controls]);

  useEffect(() => {
    const sequenceAnimation = async () => {
      await controlsTwo.start({ x: "5vw", scale: 0, y: "20vh", transition: { duration: 0.5, ease: "easeInOut", delay: 1 } });
      await controlsTwo.start({ x: "10vw", y: "-20vh", scale: 1.2, transition: { duration: 0.5, ease: "easeInOut" } });
      await controlsTwo.start({ x: "0vw", y: "0vh", scale: 1, transition: { duration: 0.5, ease: "linear" } });
    };

    sequenceAnimation();
  }, [controlsTwo]);

  const playAgain = async () => {
    const roomsCollection = collection(database, "rooms");
    const roomQuery = query(roomsCollection, where("roomName", "==", localStorage.getItem("roomInfo")));
    const roomQuerySnapshot = await getDocs(roomQuery);



    roomQuerySnapshot.forEach(async (docSnapshot) => {
      const roomData = docSnapshot.data();

      console.log(roomData.id)

      for (let i = 0; i < roomData.players.length; i++) {
        if (roomData.players[i].playerId == JSON.parse(localStorage.getItem("userInfo")).id) {
          roomData.players[i].playagain = true;

        }
      }

      try {
        const docRef = doc(database, "rooms", docSnapshot.id); // Get the document reference
        await updateDoc(docRef, { players: roomData.players }); // Pass the document reference to updateDoc
      } catch (error) {
        console.error("Error updating players field:", error);
      }
    });
  }
  useEffect(() => {
    function updateScore() {
      try {
        const docRef = doc(database, "rooms", roomData[0].id); // Assuming roomData[0].id represents the ID of the room
        updateDoc(docRef, { players: roomData[0].players });
      } catch (error) {
        console.error("Error updating players field:", error);
      }
    }
    if (roomData != null && roomData[0]?.players != null) {
      const player1Play = roomData[0]?.players[0]?.play;
      const player2Play = roomData[0]?.players[1]?.play;
      const playerOne = roomData[0]?.players[0];
      const playerTwo = roomData[0]?.players[1];

      if (player1Play === "rock" && player2Play === "scissors") {
        setWin(`${playerOne.p1} wins`);
        // Update the player's score
        playerOne.score += 1;
        updateScore()
      }

      if (player1Play === "rock" && player2Play === "paper") {
        setWin(`${playerTwo.p1} wins`);
        // Update the player's score
        playerTwo.score += 1;
        updateScore()
      }

      if (player1Play === "rock" && player2Play === "rock") {
        setWin(`TIE`);
        // Update the player's score
        updateScore()
      }


      if (player1Play === "paper" && player2Play === "rock") {
        setWin(`${playerOne.p1} wins`);
        playerOne.score += 1;
        // Update the player's score
        updateScore()
      }


      if (player1Play === "paper" && player2Play === "scissors") {
        setWin(`${playerTwo.p1} wins`);
        // Update the player's score
        playerTwo.score += 1;
        updateScore()
      }

      if (player1Play === "paper" && player2Play === "paper") {
        setWin(`TIE`);
        // Update the player's score
        updateScore()
      }

      if (player1Play === "scissors" && player2Play === "paper") {
        setWin(`${playerTwo.p1} wins`);
        playerOne.score += 1;
        // Update the player's score
        updateScore()
      }


      if (player1Play === "scissors" && player2Play === "scissors") {
        setWin(`TIE`);
        // Update the player's score
        updateScore()
      }

      if (player1Play === "scissors" && player2Play === "rock") {
        setWin(`${playerTwo.p1} wins`);
        playerTwo.score += 1;
        // Update the player's score
        updateScore()
      }
    }
  }, [roomData?.[0]?.players?.[0]?.play, roomData?.[0]?.players?.[1]?.play]);
  return (
    <div className="container result-page">
      {/* <AnimationComponent /> */}

      <div className="row">
        <div className="col-4">
          <div>
            <div>

            </div>
            {roomData != null && roomData[0].players[0].playagain == true ? <div className="p-a">want to play again</div> : null}
            <p>{roomData != null ? roomData[0].players[0].p1 : "player one picked"} </p>
            {roomData != null && roomData[0].players[0].play != "" ?

              <motion.div
                initial={{ x: "5vw", scale: 1.5, y: "20vh" }}
                animate={{ x: 0, scale: 1, y: 0, transition: { duration: .5, ease: "linear" } }}

                className={roomData != null ? `pick-section ${roomData[0].players[0].play}-result` : "rock"}>
                <div className="first-layer"> </div>
                <div className="second-layer"

                ></div>
                <div className="third-layer"
                ></div>
                <div className="fourth-layer"
                ></div>
                <img src={roomData != null ? imageMap[roomData[0].players[0].play] : ""} alt={roomData != null ? `${roomData[0].players[0].play} image` : "image"} />
              </motion.div>
              : null}

          </div>
        </div>

        <div className="col-4 condition">
          <div className="button-container-play">
            <h2>
              {win}
            </h2>
            {roomData != null && roomData[0].players[0].play != "" && roomData[0].players[1].play != "" ? <button onClick={() => {
              playAgain()
            }}>play again</button> 
            
          
            : null}
           

          </div>


        </div>
        <div className="col-4">
          <div>
            {roomData != null && roomData[0].players[1].playagain == true ? <div className="p-a">want to play again</div> : null}

            <p>{roomData != null ? roomData[0].players[1].p1 : "player two picked"} picked</p>
            {roomData != null && roomData[0].players[1].play != "" ?
              <motion.div
                initial={{ x: "5vw", scale: 1.5, y: "20vh" }}
                animate={{ x: 0, scale: 1, y: 0, transition: { duration: .5, ease: "linear" } }}

                className={roomData != null ? `pick-section ${roomData[0].players[1].play}-result` : "rock"}>
                <div className="first-layer"> </div>
                <div className="second-layer"

                ></div>
                <div className="third-layer"
                ></div>
                <div className="fourth-layer"
                ></div>
                <img src={roomData != null ? imageMap[roomData[0].players[1].play] : ""} alt={roomData != null ? `${roomData[0].players[0].play} image` : "image"} />
              </motion.div>
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResultOnline