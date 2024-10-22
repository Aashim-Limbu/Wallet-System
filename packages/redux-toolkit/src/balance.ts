import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
	name: "balance",
	initialState: 0,
	reducers: {
		addBalance: (state, action) => {
			state += action.payload;
		},
		removeBalance: (state, action) => {
			state -= action.payload;
		},
	},
});
export const {addBalance,removeBalance} = balanceSlice.actions;
export default balanceSlice.reducer;
