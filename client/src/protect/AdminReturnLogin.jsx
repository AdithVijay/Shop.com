import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminReturnLogin = ({children}) => {
    const admin =  useSelector(state=>state.admin.admin)
    if(admin){
        return <Navigate to = {"/category"}/>
    }
    return children
}

export default AdminReturnLogin
