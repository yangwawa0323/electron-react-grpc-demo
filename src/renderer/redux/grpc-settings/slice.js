import { createSlice } from '@reduxjs/toolkit'

export const grpcSettingsSlice = createSlice({
	name: 'grpcSettings',
	initialState : {
		open: false,
		grpcServer: 'http://xueit.guoziweb.com:8181',
	},
	reducers : {
		show: (state) =>{
			state.open = true
		},
		hide : (state) => {
			state.open = false
		},
		setGrpcAddressPort: (state,action) => {
			state.grpcServer = action.payload
		}
	},
});

// Action creators are generated for each case reducer function 
export const { show, hide, setGrpcAddressPort } = grpcSettingsSlice.actions

export default grpcSettingsSlice.reducer