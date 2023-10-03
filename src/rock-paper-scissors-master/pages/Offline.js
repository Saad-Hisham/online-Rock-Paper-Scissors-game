import { useDispatch, useSelector } from "react-redux";
import Rules from "./Rules";
import SelectPage from "./SelectPage";
import { toggleRuleState } from "../../Redux";
import ScoreBoard from "./ScoreBoard";
import Result from "./Result";
function Offline() {
  const state = useSelector((state) => state.player.openStates);
  const ResultPageState = useSelector((state) => state.player.resultPageToggle);

  const dispatch = useDispatch()
  return (
    <div>
      <ScoreBoard />
     
      {ResultPageState != true ? <SelectPage /> : <Result />}

      {state.rulesPage != true ? null : <Rules />}
      <button className="rules-button" aria-label="show rules" onClick={() => {
        dispatch(toggleRuleState())
      }}>rules</button>
    </div>
  );
}

export default Offline;
