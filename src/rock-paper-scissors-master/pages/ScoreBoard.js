import { useSelector } from "react-redux"
import gameName from "../../rock-paper-scissors-master/images/logo.svg"
function ScoreBoard(){
  const score = useSelector((state) => state.player.score);

return(
    <header className="row">
    {/* score board  */}
    <div className="image-container col-6">
      <img src={gameName} alt="Rock Paper Scissors" />
    </div>
    <div className="score-container col-6">
      <p>
        <span>score</span>
        <br></br>
        <span>{localStorage.getItem(score)!=null ? 0 :JSON.parse(localStorage.getItem("score"))/2}</span>
        
      </p>
    </div>
  </header>
)
}
export default ScoreBoard