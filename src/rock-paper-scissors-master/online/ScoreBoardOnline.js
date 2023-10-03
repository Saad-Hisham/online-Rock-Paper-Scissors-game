import { collection, onSnapshot, query, where } from "firebase/firestore";
import avatar from "../images/user.png"
import { database } from "../../firebase";
import { useEffect, useState } from "react";
function ScoreBoardOnline() {
  const [roomData, setRoomData] = useState(null);
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
  return (
    <header className="row online-score">
      <div className="col-6">
        <div>
        <div className="avatar-container">
          <img src={roomData!=null && roomData[0].players[0].playerImage.includes(".jpg")==true ||roomData!=null && roomData[0].players[0].playerImage.includes(".png")==true ? roomData[0].players[0].playerImage:avatar} alt="user image" />  
          <p>{roomData!=null && roomData[0].players[0].p1!=""?roomData[0].players[0].p1:"player one"}</p>
        </div>
        <div className="score-container col-6">
          <p>
            <span>score</span>
            <br></br>
            <span>{roomData!=null && roomData[0].players[0].score!=0?roomData[0].players[0].score:"0"}</span>

          </p>
        </div>
        </div>
      </div>
      <div className="col-6 second-score">
        <div >
        <div className="avatar-container">
        <p>{roomData!=null && roomData[0].players[1].p1!=""? roomData[0].players[1].p1:"player two"}</p>
          <img src={roomData!=null && roomData[0].players[1].playerImage.includes(".jpg")==true ||roomData!=null && roomData[0].players[1].playerImage.includes(".png")==true  ? roomData[0].players[1].playerImage:avatar} alt="user image" />

        </div>
        <div className="score-container col-6">
          <p>
            <span>score</span>
            <br></br>
            <span>{roomData!=null && roomData[0].players[1].score!=0?roomData[0].players[1].score:"0"}</span>


          </p>
        </div>
        </div>
      </div>
    </header>
  )
}
export default ScoreBoardOnline