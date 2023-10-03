import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import logo from "../images/logo.svg";
import { collection, doc, setDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Create() {
    const [roomName, setRoomname] = useState("");
    const [joinRoomName, setJoinRoomName] = useState("");
    const [roomId, setRoomId] = useState("")

    const [err, setErr] = useState("")
    const [players, setPlayers] = useState()
    const navigate = useNavigate()
    const joinRoom = async () => {
        const roomsCollection = collection(database, "rooms");
        const roomQuery = query(roomsCollection, where("roomName", "==", joinRoomName));
        const roomQuerySnapshot = await getDocs(roomQuery);

        if (roomQuerySnapshot.empty) {
            setErr("No room found with this name");
            return;
        }

        roomQuerySnapshot.forEach(async (docSnapshot) => {
            const roomId = docSnapshot.id;
            const roomData = docSnapshot.data();

            const updatedPlayers = [...roomData.players];
            if (updatedPlayers[0].p1 !== "" && updatedPlayers[1].p1 !== "") {
                setErr("Room is full");
                return;
            }

            if (updatedPlayers[0].p1 === "") {
                updatedPlayers[0].p1 = JSON.parse(localStorage.getItem("userInfo")).name;
                updatedPlayers[0].playerId = JSON.parse(localStorage.getItem("userInfo")).id;
                updatedPlayers[0].playerImage = JSON.parse(localStorage.getItem("userInfo")).image;
            } else {
                updatedPlayers[1].p1 = JSON.parse(localStorage.getItem("userInfo")).name;
                updatedPlayers[1].playerId = JSON.parse(localStorage.getItem("userInfo")).id;
                updatedPlayers[1].playerImage = JSON.parse(localStorage.getItem("userInfo")).image;
            }

            try {
                const roomDocRef = doc(collection(database, "rooms"), roomId);
                setRoomId(roomDocRef)
                await updateDoc(roomDocRef, { players: updatedPlayers, leave: `${JSON.parse(localStorage.getItem("userInfo")).name} has joined the room` });
                console.log("Players field updated successfully!");
                navigate("/online");
            } catch (error) {
                console.error("Error updating players field:", error);
            }
        });
        localStorage.setItem("roomInfo", joinRoomName)

    };
    const createRoom = async () => {
        if (!roomName.trim()) {
            setErr("Room name cannot be empty.");
            return; // Abort room creation if the input is empty
        }

        try {
            const roomsCollection = collection(database, "rooms");
            const roomQuery = query(roomsCollection, where("roomName", "==", roomName));
            const roomQuerySnapshot = await getDocs(roomQuery);

            if (!roomQuerySnapshot.empty) {
                setErr("Room already exists");
                return; // Abort room creation if a room with the same name already exists
            }

            const roomId = uuid();
            const info = JSON.parse(localStorage.getItem("userInfo"));

            const roomDoc = doc(roomsCollection, roomId);
            await setDoc(roomDoc, {
                roomName: roomName,
                id: roomId,
                leave: `${JSON.parse(localStorage.getItem("userInfo")).name} has joined the room`,
                players: [
                    { p1: info.name, score: 0, playagain: false, playerId: info.id, playerImage: info.image, play: "" },
                    { p1: "", score: 0, playagain: false, playerId: "", playerImage: "", play: "" },
                ],
            }).then(() => {
                localStorage.setItem("roomInfo", roomName)
                navigate("/online");


            })
        } catch (error) {
            console.error("Error creating room:", error);
        }

    };

    return (
        <div className="create-room">
            <div className="logo-container">
                <img src={logo} alt="rock paper scissors" />
            </div>
            <div className="buttons-container">
                <div className="create-form">
                    {err != "" ? <span>{err}</span> : null}
                    <input
                        type="text"
                        placeholder={"Enter room name"}
                        onChange={(e) => {
                            setRoomname(e.target.value);
                        }}
                    />
                    <button onClick={createRoom}>create room</button>
                </div>

                <div className="join-form">
                    <input type="text" placeholder="Enter room name to join"
                        onChange={(e) => {
                            setJoinRoomName(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            joinRoom()
                        }}
                    >join room</button>
                </div>
            </div>
        </div>
    );
}

export default Create;