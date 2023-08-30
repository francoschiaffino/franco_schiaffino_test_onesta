"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from 'axios';
import Pagination from '../../components/Pagination';

const Frutas = () => {
    const [frutas, setFrutas] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [frutasPerPage] = useState(10);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(()=> {
        const fetchFrutas = async () => {
            try {
              setLoading(true);
              const response = await axios.get('https://testapi.onesta.farm/v1/commodities/?page=1');
              setFrutas(response.data.commodities);
              setLoading(false);
              console.log(response.data.commodities);
            } catch (error) {
              console.error('Error:', error);
              setLoading(false);
            }
          };
      
          fetchFrutas();
        }, []);
    
    const indexOfLastFruta = currentPage * frutasPerPage;
    const indexOfFirstFruta = indexOfLastFruta - frutasPerPage;
    const currentFrutas = frutas ? frutas.slice(indexOfFirstFruta, indexOfLastFruta) : [];

    if (loading){
      return <h2>Loading...</h2>
    }

    return (
        <div className="w-[1331px] h-[932px] top-46 left-55 gap-32">
        <div className="w-[1.331px] h-[64px] gap-24 flex items-center">
            <div className="w-[135px] h-[16px] gap-4 flex">
            <p className="w-31 h-16 font-hindsiliguri text-xs font-normal leading-4 tracking-normal text-center text-gray-600">
                Home
            </p>
            <p className="w-31 h-16 font-hindsiliguri text-xs font-normal leading-4 tracking-normal text-center text-black">
                /Frutas
            </p>
            </div>
        </div>
        <div className="divider w-[1331px] h-[40px] flex justify-between border-b border-black pb-2 mb-5">
            <p className="font-madera text-2xl font-bold leading-7 text-left mt-2">
           Frutas
            </p>
        </div>




        <div className="flex flex-wrap justify-start">
            {currentFrutas && currentFrutas.map((fruta) => (
            <div key={fruta.id} className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 card relative">
                <div className="bg-customColor rounded-lg shadow-md p-4 min-card-height">
                <h2 className="text-xl font-semibold mb-2">                 <Link href={`/frutas/${fruta.id}`}>
                        <span className="text-600 hover:underline">
                        {fruta.name}
                        </span>
                    </Link></h2>
                <ul>
                    {fruta.varieties.map((variedad) => (
                    <li key={variedad.id} className="mb-1">{variedad.name}</li>
                    ))}
                </ul>
                </div>
            </div>

            ))}
        </div>
        <Pagination
            itemsPerPage={frutasPerPage}
            totalItems={frutas ? frutas.length : 0}
            paginate={paginate}
            currentPage={currentPage}/>
        </div>

    )
}

export default Frutas
