import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const navLinks = [
        {href: '/', label: 'Dashboard'},
        {href: '/issues', label: 'Issues'}
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><AiFillBug /></Link>
        <ul className='flex space-x-6 '>
            {navLinks.map(
                navLink => <li key={navLink.href}><Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href={navLink.href}>{navLink.label}</Link></li>
            )}
        </ul>
    </nav>
  )
}

export default NavBar