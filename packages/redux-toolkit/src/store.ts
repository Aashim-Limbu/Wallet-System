import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./balance";
const store = configureStore({
	reducer: {
		balance: balanceReducer,
	},
});
export default store;
