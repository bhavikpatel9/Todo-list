import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-600 flex justify-between p-3'>
      <div className="logo text-2xl">iTask</div>
      <ul className='flex text-2xl gap-5'>
        <li className=' cursor-pointer'>Home</li>
        <li className=' cursor-pointer'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
