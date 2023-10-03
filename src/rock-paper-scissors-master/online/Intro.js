import { useNavigate } from "react-router-dom"

function Intro() {
    const navigate = useNavigate()
    return (
        <div className="intro">
            <div>
                <button
                    onClick={() => {
                        navigate("/offline")
                    }}>
                    PLAY VS BOT 🤖
                </button>

                <button onClick={() => {
                    navigate("/login")
                }}>
                    PLAY VS FRIEND 🤝
                </button>
            </div>
        </div>
    )
}
export default Intro