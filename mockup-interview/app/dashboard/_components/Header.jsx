"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log(path)
  }, [])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
      <Image src={'./logo.svg'} width={100} height={90} alt='logo' />
      <ul className='flex gap-6'>
        <li className={`hover:text-primary hover:font-bold  transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold  transition-all cursor-pointer ${path == '/questions' && 'text-primary font-bold'}`}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold   transition-all cursor-pointer ${path == '/howitworks' && 'text-primary font-bold'}`}>How it works?</li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header;