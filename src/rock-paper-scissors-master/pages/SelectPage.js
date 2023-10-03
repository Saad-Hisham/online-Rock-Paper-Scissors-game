
import paperImage from "../../rock-paper-scissors-master/images/icon-paper.svg"
import scissorsImage from "../../rock-paper-scissors-master/images/icon-scissors.svg"
import RockImage from "../../rock-paper-scissors-master/images/icon-rock.svg"
import { useDispatch } from "react-redux";
import { changePick, changeResultPage } from "../../Redux";
function SelectPage() {
  const dispatch = useDispatch()
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
                dispatch(changePick("paper"))
                dispatch(changeResultPage())
              }}>
                <img src={paperImage} alt="paper image" />
              </button>

            </div>
            {/* scissors button */}
            <div className="col-6">
              <button aria-label="Choose scissors" className="scissors-button"
                onClick={() => {
                  dispatch(changePick("scissors"))
                  dispatch(changeResultPage())
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
                  dispatch(changePick("rock"))
                  dispatch(changeResultPage())
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

export default SelectPage;
