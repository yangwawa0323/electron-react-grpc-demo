import { configureStore } from '@reduxjs/toolkit'
import grpcSettingsReducer from './grpc-settings/slice'

export default configureStore({
  reducer: {
    grpcSettings: grpcSettingsReducer,
  },
})