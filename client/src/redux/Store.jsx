import { configureStore } from '@reduxjs/toolkit';
import usereducer from './Userslice'
import AdminSlice from './Adminslice'
const store = configureStore({
    reducer:{
        user:usereducer,
        admin:AdminSlice
    }
})
export default store