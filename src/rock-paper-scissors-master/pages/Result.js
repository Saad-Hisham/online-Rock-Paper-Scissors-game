import rock from "../../rock-paper-scissors-master/images/icon-rock.svg"
import paper from "../../rock-paper-scissors-master/images/icon-paper.svg"
import scissors from "../../rock-paper-scissors-master/images/icon-scissors.svg"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeResultPage, changeScore } from "../../Redux";
import AnimationComponent from "../pages/AnimationComponent"
import { motion, useAnimation } from "framer-motion";

function Result() {
  const dispatch = useDispatch()
  const picked = useSelector((state) => state.player.playerPick);
  const computerPicked = useSelector((state) => state.player.computerChoise);
  const [random, pickRandom] = useState(Math.floor(Math.random() * 3))
  const [win, setWin] = useState("")

  const imageMap = {
    rock: rock,
    paper: paper,
    scissors: scissors,
  };

  useEffect(() => {
    switch (picked) {
      case "paper":
        switch (computerPicked[random]) {
          case "rock":
            setTimeout(() => {
              setWin("win");
              dispatch(changeScore())
            }, 2600);

            break;
          case "scissors":

            setTimeout(() => {
              setWin("lose");
            }, 2600);
            break;
          case "paper":
            setTimeout(() => {
              setWin("draw");
            }, 2600);
            break;
          default:
            break;
        }
        break;
      case "rock":
        switch (computerPicked[random]) {
          case "rock":
            setTimeout(() => {
              setWin("draw");
            }, 2600);
            break;
          case "scissors":

            setTimeout(() => {
              setWin("win");
              dispatch(changeScore())
            }, 2600);

            break;
          case "paper":

            setTimeout(() => {
              setWin("lose");
            }, 2600);
            break;
          default:
            break;
        }
        break;
      case "scissors":
        switch (computerPicked[random]) {
          case "rock":

            setTimeout(() => {
              setWin("lose");
            }, 2600);
            break;
          case "scissors":

            setTimeout(() => {
              setWin("draw");
            }, 2600);
            break;
          case "paper":
            setTimeout(() => {
              setWin("win");
              dispatch(changeScore())
            }, 2600);


            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }, []);

  const controls = useAnimation();
  const controlsTwo = useAnimation();
  const scale = useAnimation();


  useEffect(() => {
    const sequenceAnimation = async () => {
      await controls.start({ x: "5vw", scale: 0, y: "20vh" });
      await controls.start({ x: "10vw", y: "-20vh", scale: 1.2, transition: { duration: .5, ease: "easeInOut" } });
      await controls.start({ x: "0vw", y: "0vh", scale: 1, transition: { duration: .5, ease: "linear" } });
    };

    sequenceAnimation();
  }, [controls]);


  useEffect(() => {
    const sequenceAnimation = async () => {
      await controlsTwo.start({ x: "5vw", scale: 0, y: "20vh", transition: { duration: .5, ease: "easeInOut", delay: 1 } });
      await controlsTwo.start({ x: "10vw", y: "-20vh", scale: 1.2, transition: { duration: .5, ease: "easeInOut" } });
      await controlsTwo.start({ x: "0vw", y: "0vh", scale: 1, transition: { duration: .5, ease: "linear" } });
    };

    sequenceAnimation();
  }, [controlsTwo]);


  return (
    <div className="container result-page">
      {win == "win" ? <AnimationComponent /> : null}

      <div className="row">
        <div className="col-4">
          <div>
            <div>

            </div>
            <p>you picked</p>
            <motion.div
              initial={{ x: "5vw", scale: 0, y: "20vh" }}
              animate={controls}

              className={win == "win" ? `pick-section ${picked}-result winner` : `pick-section ${picked}-result `}>
              <div className="first-layer"> </div>
              <div className="second-layer"

              ></div>
              <div className="third-layer"
              ></div>
              <div className="fourth-layer"
              ></div>

              <img src={imageMap[picked]} alt={`${picked} image`} />
            </motion.div>
          </div>
        </div>

        <div className="col-4 condition">
          {win != "" ? <div className="button-container-play">
            <h2>{win == "win" ? "you win" : null}
              {win == "lose" ? "the house wins" : null}
              {win == "draw" ? "It's A DRAW" : null}
            </h2>
            <button onClick={() => {
              dispatch(changeResultPage())
            }}>play again</button>
          </div> : null}


        </div>
        <div className="col-4">
          <div>
            <p>the house picked</p>
            <motion.div
              initial={{ x: "-5vw", scale: 0, y: "20vh" }}
              animate={controlsTwo}
              className={win == "lose" ? `pick-section ${computerPicked[random]}-result winner` : `pick-section ${computerPicked[random]}-result `}>

              <div className="first-layer"></div>
              <div className="second-layer"

              ></div>
              <div className="third-layer"></div>
              <div className="fourth-layer"></div>

              <img src={imageMap[computerPicked[random]]} alt={`${computerPicked[random]} image`} />


            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Result