import React from 'react'
import AdminRoute from './routes/AdminRoute'
import UserRoute from './routes/UserRoute'
import { Navbar } from '@nextui-org/navbar'
import { Toaster } from './components/ui/sonner'

const App = () => {
  return (
    <div>
        
        <UserRoute/>
        <AdminRoute/>
    </div>
  )
}

export default App
