"use client";
import React, {useEffect, useState} from 'react';
import { GrLinkPrevious } from 'react-icons/gr';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Link from 'next/link';
import axios from 'axios';

const CrearCosecha = () => {
    const [frutas, setFrutas] = useState(null);
    const [agricultores, setAgricultores] = useState(null);
    const [clientes, setClientes] = useState(null);
    const [selectedAgricultor, setSelectedAgricultor] = useState('');
    const [selectedFruta, setSelectedFruta] = useState('');
    const [selectedCampo, setSelectedCampo] = useState('');
    const [selectedVariedad, setSelectedVariedad] = useState('');
    const [selectedCliente, setSelectedCliente] = useState('');
    const [selectedGrower, setSelectedGrower] = useState('');
    const [selectedFruit, setSelectedFruit] = useState('');
    const [selectedCamp, setSelectedCamp] = useState('');
    const [selectedVariety, setSelectedVariety] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [campos, setCampos] = useState([]);
    const [variedades, setVariedades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(()=> {
        const fetchFrutas = async () => {
            try {
              setLoading(true);
              const response = await axios.get('https://testapi.onesta.farm/v1/commodities/');
              setFrutas(response.data.commodities);
              setLoading(false);
              console.log(response.data.commodities);
            } catch (error) {
              console.error('Error:', error);
              setLoading(false);
            }
          };
          const fetchAgricultores = async () => {
            try {
              setLoading(true);
              const response = await axios.get('https://testapi.onesta.farm/v1/growers');
              setAgricultores(response.data.growers);
              setLoading(false);
              if (selectedAgricultor && agricultores) {
                const selectGrower = agricultores.find(agricultor => agricultor.id === selectedAgricultor);
                setSelectedGrower(selectGrower);
                if (selectedGrower) {
                  setCampos(selectGrower.farms);
                }
              }
            } catch (error) {
              console.error('Error:', error);
              setLoading(false);
            }
          };

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
      
          fetchAgricultores();
      
          fetchFrutas();
        }, []);

        useEffect(() => {
            if (selectedAgricultor) {
              const selectGrower = agricultores.find(agricultor => agricultor.id === selectedAgricultor);
              setSelectedGrower(selectGrower);
              setCampos(selectGrower.farms);
            }
          }, [selectedAgricultor, agricultores]);
        
        useEffect(() => {
            if (selectedFruta && frutas) {
              const selectFruit = frutas.find(fruta => fruta.id === selectedFruta);
              setSelectedFruit(selectFruit);
              setVariedades(selectFruit.varieties);
            }
          }, [selectedFruta, frutas]);

          useEffect(() => {
            if (selectedCampo && campos) {
              setSelectedCamp(campos.find(campo => campo.id === selectedCampo));
            }
          }, [selectedCampo, campos]);

          useEffect(() => {
            if (selectedVariedad && variedades) {
              setSelectedVariety(variedades.find(variedad => variedad.id === selectedVariedad));
            }
          }, [selectedVariedad, variedades]);

          useEffect(() => {
            if (selectedCliente && clientes) {
              setSelectedClient(clientes.find(cliente => cliente.id === selectedCliente));
            }
          }, [selectedCliente, clientes]);

          const createCosecha = async () => {
            if (!selectedAgricultor || !selectedFruta || !selectedCampo || !selectedVariedad || !selectedCliente) {
                setErrorMessage('Tienes que rellenar todos los campos');
                return;
            }
    
    
            const requestBody = {
                growerId: selectedGrower.id,
                farmId: selectedCamp.id,
                clientId: selectedClient.id,
                commodityId: selectedFruit.id,
                varietyId: selectedVariety.id,
            };
    
            try {
                const response = await axios.post('https://testapi.onesta.farm/v1/harvests/', requestBody);
                setSuccessMessage('Cosecha agregada con éxito');
                setErrorMessage('');
                setSelectedAgricultor('');
                setSelectedFruta('');
                setSelectedCampo('');
                setSelectedVariedad('');
                setSelectedCliente('');
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Ocurrió un error al agregar la cosecha');
                setSuccessMessage('');
            }
        };
    
    if (loading){
        return <h2>Loading...</h2>
        }

  return (
    <div className="w-[1331px] h-[932px] top-46 left-55 gap-32">
      <div className="w-[1331px] h-[64px] gap-24 flex items-center">
        <div className="w-[500px] h-[16px] gap-4 flex navigation">
          <p className="navigation-item font-hindsiliguri text-xs font-normal leading-4 tracking-normal text-center text-gray-600">
            Home / Cosechas /
          </p>
          <p className="navigation-item font-hindsiliguri text-xs font-normal leading-4 tracking-normal text-black ">
            Agregar nueva cosecha
          </p>
        </div>
      </div>
      <div className="divider w-[1331px] h-[40px] flex border-b border-black pb-2 mb-5">
        <Link href="/cosechas">
            <GrLinkPrevious className='mt-4 mr-3'/>
        </Link>
        <p className="font-madera text-2xl font-bold leading-7 text-left mt-2">
          Agregar nueva cosecha
        </p>
      </div>
      <div className='flex space-x-4 mb-7'>
        <div className='w-1/2 flex flex-col'>
            <p className='mb-3'>Agricultor</p>
            <div className='select-box border border-gray-300 rounded-md relative overflow-hidden'>
                <select className="select-input w-full py-2 px-4 bg-transparent border-none appearance-none" onChange={(e) => setSelectedAgricultor(e.target.value)}>
                <option value="">Seleccionar Agricultor</option>
                {agricultores && agricultores.map((agricultor) => (
                    <option value={agricultor.id}>{agricultor.name}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiOutlineChevronDown className="h-4 w-4 text-gray-400" /> 
                </div>
            </div>
        </div>
        <div className='w-1/2 flex flex-col'>
            <p className='mb-3'>Campo</p>
            <div className='select-box border border-gray-300 rounded-md relative overflow-hidden'>
                <select className="select-input w-full py-2 px-4 bg-transparent border-none appearance-none" onChange={(e) => setSelectedCampo(e.target.value)}>
                    <option value="">Seleccionar Campo</option>
                    {campos && campos.map((campo) => (
                        <option value={campo.id}>{campo.name}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiOutlineChevronDown className="h-4 w-4 text-gray-400" /> 
                </div>
            </div>
        </div>
      </div>
      <div className='flex space-x-4 mb-7'>
        <div className='w-1/2 flex flex-col'>
            <p className='mb-3'>Fruta</p>
            <div className='select-box border border-gray-300 rounded-md relative overflow-hidden'>
                <select className="select-input w-full py-2 px-4 bg-transparent border-none appearance-none" onChange={(e) => setSelectedFruta(e.target.value)}>
                <option value="">Seleccionar Fruta</option>
                {frutas && frutas.map((fruta) => (
                    <option value={fruta.id}>{fruta.name}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiOutlineChevronDown className="h-4 w-4 text-gray-400" /> 
                </div>
            </div>
        </div>
        <div className='w-1/2 flex flex-col'>
            <p className='mb-3'>Variedad</p>
            <div className='select-box border border-gray-300 rounded-md relative overflow-hidden'>
                <select className="select-input w-full py-2 px-4 bg-transparent border-none appearance-none" onChange={(e) => setSelectedVariedad(e.target.value)}>
                <option value="">Seleccionar Variedad</option>
                {variedades && variedades.map((variedad) => (
                        <option value={variedad.id}>{variedad.name}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiOutlineChevronDown className="h-4 w-4 text-gray-400" /> 
                </div>
            </div>
        </div>
      </div>
      <div className='flex space-x-4 mb-7'>
        <div className='w-1/2 flex flex-col'>
                <p className='mb-3'>Cliente</p>
                <div className='select-box border border-gray-300 rounded-md relative overflow-hidden w-[1330px]'>
                    <select className="select-input w-full py-2 px-4 bg-transparent border-none appearance-none" onChange={(e) => setSelectedCliente(e.target.value)}>
                    <option value="">Seleccionar Cliente</option>
                    {clientes && clientes.map((cliente) => (
                        <option value={cliente.id}>{cliente.name}</option>
                    ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <HiOutlineChevronDown className="h-4 w-4 text-gray-400" /> 
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-end justify-end">
        <button className="blue_button rounded-full bg-blue-500 text-white font-hindsiliguri text-base font-semibold flex items-center p-3 h-[40px]" onClick={createCosecha}>
            Agregar
        </button>
        </div>
        <div className="flex items-end justify-end">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      </div>
  );
};

export default CrearCosecha;

