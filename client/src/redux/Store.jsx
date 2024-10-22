import { configureStore } from '@reduxjs/toolkit';
import usereducer from './UserSlice'
import AdminSlice from './Adminslice'
const store = configureStore({
    reducer:{
        user:usereducer,
        admin:AdminSlice
    }
})
export default store