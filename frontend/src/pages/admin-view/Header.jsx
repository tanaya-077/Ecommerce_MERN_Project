import { Button } from '@/components/ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'

const Header = ({setOpen}) => {
  
  return (
    <div>
      <header className='flex items-center justify-between py-3 px-4 bg-background text-white'>
        <Button onClick={()=>setOpen(true)}
        className="lg:hidden sm:block" >
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
          <Button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow">
            <LogOut />
            Logout</Button>
        </div>
      </header>
    </div>
  )
}

export default Header