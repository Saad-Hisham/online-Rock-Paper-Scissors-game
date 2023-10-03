import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'player',
    initialState: {
        openStates: {
            rulesPage: false
        },
        playerPick: "",
        computerChoise: ["rock", "scissors", "paper"],
        resultPageToggle:false,
        score:0,
        onlineState:{
            leave:{message:"",state:false},
            join:false,
        }
    },
    
    reducers: {
        toggleRuleState: (state, action) => {
            if (state.openStates.rulesPage != true) {
                state.openStates.rulesPage = true
            }
            else {
                state.openStates.rulesPage = false
            }
        },
        changePick: (state, action) => {
            state.playerPick = action.payload
        },
        changeResultPage : (state,action)=>{
            if (state.resultPageToggle!=true) {
                state.resultPageToggle = true
            }
            else{
                state.resultPageToggle = false

            }
        },
        changeScore:(state,action)=>{
            if(localStorage.getItem("score")!=null){
                state.score=JSON.parse(localStorage.getItem("score"))
            }
            state.score +=1
            localStorage.setItem("score",state.score)
          
        }

    }
});

export const { toggleRuleState, changePick ,changeResultPage,changeScore,leave} = userSlice.actions;
export default userSlice.reducer;