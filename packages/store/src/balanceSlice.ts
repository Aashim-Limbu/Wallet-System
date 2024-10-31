import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Balance = {
    balance:number;
}
const initialState:Balance = {
    balance:0;
}
const balanceSlice = createSlice({
name:"balance",
initialState,
reducers:{
    addBalance:(state,action:PayloadAction<Balance>)=>{
        state.balance+=action.payload.balance;
    },
    removeBalance:(state,action:PayloadAction<Balance>)=>{
        state.balance-=action.payload.balance;
    }
}
})
