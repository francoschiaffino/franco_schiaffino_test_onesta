"use client";
import Pagination from '../../components/Pagination';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from 'axios';

const Clientes = () => {
    const [clientes, setClientes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientesPerPage] = useState(10);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(()=> {
        const fetchClientes = async () => {
            try {
              setLoading(true);
              const response = await axios.get('https://testapi.onesta.farm/v1/clients/');
              setClientes(response.data.clients);
              setLoading(false);
              console.log(response.data.clients);
            } catch (error) {
              console.error('Error:', error);
              setLoading(false);
            }
          };
      
          fetchClientes();
        }, []);
    
    const indexOfLastCliente = currentPage * clientesPerPage;
    const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
    const currentClientes = clientes ? clientes.slice(indexOfFirstCliente, indexOfLastCliente) : [];

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
                /Clientes
            </p>
            </div>
        </div>
        <div className="divider w-[1331px] h-[40px] flex justify-between border-b border-black pb-2 mb-5">
            <p className="font-madera text-2xl font-bold leading-7 text-left mt-2">
           Clientes
            </p>
        </div>
        <table className="custom_table w-full bg-white border-collapse rounded-lg overflow-hidden shadow-md">
        <thead className="light_blue_head">
            <tr>
            <th className="py-2 px-4">id</th>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Apellido</th>
            <th className="py-2 px-4">Mail</th>
            </tr>
        </thead>
        <tbody>
            {currentClientes && currentClientes.map((cliente) => (
            <tr className="bg-white border border-d1d1d1">
            <td className="py-2 px-4">{cliente.id}</td>
            <td className="py-2 px-4">{cliente.name}</td>
            <td className="py-2 px-4">{cliente.lastName}</td>
            <td className="py-2 px-4">{cliente.email}</td>
            </tr>
            ))}
        </tbody>
        </table>
        <Pagination
            itemsPerPage={clientesPerPage}
            totalItems={clientes ? clientes.length : 0}
            paginate={paginate}
            currentPage={currentPage}/>

        </div>

    )
}

export default Clientes;
