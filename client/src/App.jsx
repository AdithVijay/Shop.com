import React from 'react'
import AdminRoute from './routes/AdminRoute'
import UserRoute from './routes/UserRoute'
import { Navbar } from '@nextui-org/navbar'
import { Toaster } from './components/ui/sonner'
import UserProfileRoute from './routes/UserProfileRoute'

const App = () => {
  return (
    <div>
        <UserRoute/>
        <AdminRoute/>
        <UserProfileRoute/>
    </div>
  )
}

export default App
