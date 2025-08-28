// import { Sidebar } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
const AdminLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className='flex w-full min-h-screen'>
        {/* admin sidebar */}
        <Sidebar  open={openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col bg-gray-200">
            {/* admin header */}
            <Header setOpen={setOpenSidebar} />
            {/* admin main content */}
            <main className='flex-1 flex md:p-6 p-4 bg-muted/40'>
                <Outlet />  
            </main>
        </div>
    </div>
  )
}

export default AdminLayout