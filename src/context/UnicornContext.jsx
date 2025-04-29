import { createContext, useState, useEffect } from "react";

export const UnicornContext = createContext(); //contexto para compartir datos de unicornios

export const UnicornProvider = ({ children }) => { 
  const [unicorns, setUnicorns] = useState([]); //estado para almacenar la lista de unicornios

  const API_URL = 'https://crudcrud.com/api/2d4ee6caa4124296a4fbbfce5ab6bf3e/unicorns';   //url de mi api

  const getUnicorns = async () => { //obtenemos los unicornios
    try {
      const response = await fetch(API_URL); //obtenemos los unicornios
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json(); //convertimos la respuesta a json
        setUnicorns(data); //actualizamos el estado con los unicornios obtenidos
        } catch (error) {
        console.error("Error al obtener unicornios:", error);
        }
    };

    const createUnicorn = async (unicorn) => { //creamos un nuevo unicornio
        try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unicorn)
        });
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        await getUnicorns();
        } catch (error) {
        console.error("Error al crear unicornio:", error);
        }
    };

    const editUnicorn = async (id, unicorn) => { //editamos un unicornio
        try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unicorn)
        });
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        await getUnicorns();
        } catch (error) {
        console.error("Error al editar unicornio:", error);
        }
    };

    const deleteUnicorn = async (id) => {  //eliminamos un unicornio
        try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        await getUnicorns();
        } catch (error) {
        console.error("Error al eliminar unicornio:", error);
        }
    };

    useEffect(() => { //cargamos los unicornios al iniciar la aplicacion
        getUnicorns();
    }, []);

    return (
        <UnicornContext.Provider value={{ unicorns, getUnicorns, createUnicorn, editUnicorn, deleteUnicorn }}>  
        {children} 
        </UnicornContext.Provider>
    );
};
