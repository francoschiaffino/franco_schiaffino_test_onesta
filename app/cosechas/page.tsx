"use client";
import Pagination from '../../components/Pagination';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import { format } from 'date-fns'; 

const Cosechas = () => {
    const [cosechas, setCosechas] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cosechasPerPage] = useState(10);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(()=> {
        const fetchCosechas = async () => {
            try {
              setLoading(true);
              const response = await axios.get('https://testapi.onesta.farm/v1/harvests/');
              setCosechas(response.data.harvests);
              setLoading(false);
              console.log(response.data.harvests);
            } catch (error) {
              console.error('Error:', error);
              setLoading(false);
            }
          };
      
          fetchCosechas();
        }, []);

    const indexOfLastCosecha = currentPage * cosechasPerPage;
    const indexOfFirstCosecha = indexOfLastCosecha - cosechasPerPage;
    const currentCosechas = cosechas ? cosechas.slice(indexOfFirstCosecha, indexOfLastCosecha) : [];

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
                /Cosechas
            </p>
            </div>
        </div>
        <div className="divider w-[1331px] h-[40px] flex justify-between border-b border-black pb-2 mb-5">
            <p className="font-madera text-2xl font-bold leading-7 text-left mt-2">
            Cosechas
            </p>
            <button className="blue_button rounded-full bg-blue-500 text-white font-hindsiliguri text-base font-semibold flex items-center p-3">
            <Link href="/crear_cosecha">
            + Agregar cosecha
            </Link>
            </button>
        </div>

        <table className="custom_table w-full bg-white border-collapse rounded-lg overflow-hidden shadow-md">
        <thead className="light_blue_head">
            <tr>
            <th className="py-2 px-4">Agricultor</th>
            <th className="py-2 px-4">Fruta</th>
            <th className="py-2 px-4">Variedad</th>
            <th className="py-2 px-4">Campo</th>
            <th className="py-2 px-4">Cliente</th>
            </tr>
        </thead>
        <tbody>
            {currentCosechas && currentCosechas.map((cosecha) => (
            <tr className="bg-white border border-d1d1d1">
            <td className="py-2 px-4">{cosecha.grower.name}</td>
            <td className="py-2 px-4">{cosecha.commodity.name}</td>
            <td className="py-2 px-4">{cosecha.variety.name}</td>
            <td className="py-2 px-4">{cosecha.farm.name}</td>
            <td className="py-2 px-4">{cosecha.client.name}</td>
            </tr>
            ))}
        </tbody>
        </table>
        <Pagination
            itemsPerPage={cosechasPerPage}
            totalItems={cosechas ? cosechas.length : 0}
            paginate={paginate}
            currentPage={currentPage}/>

        </div>

    )
}

export default Cosechas
