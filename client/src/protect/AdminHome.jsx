import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminHome = ({children}) => {
    const admin =  useSelector(state=>state.admin.admin)
    if(!admin){
        return <Navigate to = {"/admin"}/>
    }
    return children
}

export default AdminHome
