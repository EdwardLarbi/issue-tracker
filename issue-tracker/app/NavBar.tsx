'use client' ;

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classnames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);

    const navLinks = [
        {href: '/', label: 'Dashboard'},
        {href: '/issues', label: 'Issues'}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><AiFillBug /></Link>
        <ul className='flex space-x-6 '>
            {navLinks.map(
                navLink =>
                    <li key={navLink.href}>
                        <Link 
                            className={classnames({
                                'text-zinc-900': navLink.href === currentPath,
                                'text-zinc-500': navLink.href !== currentPath,
                                'hover:text-zinc-800 transition-colors': true,
                            })} 
                            href={navLink.href}>{navLink.label}
                        </Link>
                    </li>
            )}
        </ul>
    </nav>
  )
}

export default NavBar