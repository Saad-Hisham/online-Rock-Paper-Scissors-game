import RulesImage from "../../rock-paper-scissors-master/images/image-rules.svg"
import CloseIcon from "../../rock-paper-scissors-master/images/icon-close.svg"
import { useDispatch } from "react-redux"
import { toggleRuleState } from "../../Redux"

function Rules() {
    const dispatch = useDispatch()
    return (
        <div className="row rules-row">
            <div className="col-12 rules-container">
                <div>
                    <div className="rulse-header">
                        <h1>Rules</h1> <img src={CloseIcon} alt=" close Icon" onClick={()=>{
                            dispatch(toggleRuleState())
                        }}/>

                    </div>
                    <img src={RulesImage} alt="close icon " />
                </div>
            </div>

        </div>
    )
}
export default Rules