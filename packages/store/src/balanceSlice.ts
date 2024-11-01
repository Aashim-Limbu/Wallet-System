import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Balance = {
	balance: number;
};
const initialState: Balance = {
	balance: 0,
};
const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		addBalance: (state, action: PayloadAction<Balance>) => {
			state.balance += action.payload.balance;
		},
		removeBalance: (state, action: PayloadAction<Balance>) => {
			state.balance -= action.payload.balance;
		},
	},
});
export const accountReducer = accountSlice.reducer;
export const { addBalance, removeBalance } = accountSlice.actions;
export default accountSlice;
