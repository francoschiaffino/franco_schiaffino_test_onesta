import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full mb-16 pt-3">
       <Link href='/' className='desc'>
        <Image
          src='/onesta_farm_logo.png'
          alt='logo'
          width={100}
          height={100}
          className='object-contain'
        />
      </Link>
      <Link href="/frutas" className='desc'>
        Frutas
      </Link>
      <Link href="/cosechas" className='desc'>
        Cosechas
      </Link>
      <Link href="/agricultores" className='desc'>
        Agricultores
      </Link>
      <Link href="/clientes" className='desc'>
        Clientes
      </Link>
    </div>
  );
};

export default Navbar;