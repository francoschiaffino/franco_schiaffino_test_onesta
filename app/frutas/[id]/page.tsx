"use client";
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { GrLinkPrevious } from 'react-icons/gr';

const Fruta = () => {
  const { id } = useParams();
  const [fruta, setFruta] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
      const fetchFruta = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`https://testapi.onesta.farm/v1/commodities/${id}`);
            setFruta(response.data.commodity);
            setLoading(false);
            console.log(response.data.commodity);
          } catch (error) {
            console.error('Error:', error);
            setLoading(false);
          }
        };
    
        fetchFruta();
      }, []);

  if (loading){
    return <h2>Loading...</h2>
  }
  if (fruta) {
  return (
    <div className="w-[1331px] h-[932px] top-46 left-55 gap-32">
    <div className="w-[1331px] h-[64px] gap-24 flex items-center">
        <div className="w-[235px] h-[16px] gap-4 flex">
        <p className="w-31 h-16 font-hindsiliguri text-xs font-normal leading-4 tracking-normal text-center text-gray-600">
            Home /Frutas
        </p>
        <p className="w-31 h-16 font-hindsiliguri text-xs font-normal leading-4 tracking-normal text-center text-black">
           /{fruta.name}
        </p>
        </div>
    </div>
    <div className="divider w-[1331px] h-[40px] flex border-b border-black pb-2 mb-5">
        <Link href="/frutas">
            <GrLinkPrevious className='mt-4 mr-3'/>
        </Link>
        <p className="font-madera text-2xl font-bold leading-7 text-left mt-2">
          {fruta.name}
        </p>
      </div>
        <div className="flex justify-center">
          <div key={fruta.id} className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 card">
              <div className="bg-customColor rounded-lg shadow-md p-4 min-card-width">
              <h2 className="text-xl font-semibold mb-2">{fruta.id}</h2>
              <ul>
                  {fruta.varieties.map((variedad) => (
                  <li key={variedad.id} className="mb-1">{variedad.name}</li>
                  ))}
              </ul>
              </div>
          </div>
        </div>
        </div>
  )
  }
}

export default Fruta
