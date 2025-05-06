import React, { useState, useEffect } from 'react';
import UnicornsView from './UnicornsView';

const API_URL = "https://crudcrud.com/api/4f6559c303834a02afc9a3a4e79de56d/unicorns"; // Reemplaza con tu endpoint

const UnicornsContainer = () => { 
  const [unicorns, setUnicorns] = useState([]);
  const [formData, setFormData] = useState({ name: "", color: "", age: "", power: "" });
  const [editingId, setEditingId] = useState(null);

  // Cargar unicornios al inicio
  useEffect(() => {
    fetchUnicorns();
  }, []);

  // GET: Obtener todos los unicornios
  const fetchUnicorns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Unicornios obtenidos:", data); // Verifica que la respuesta esté correcta
      setUnicorns(data);
    } catch (error) {
      console.error("Error fetching unicorns:", error);
    }
  };

  // POST: Crear unicornio
  const onCreate = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchUnicorns(); // Recargar lista
      setFormData({ name: "", color: "", age: "", power: "" }); // Limpiar formulario
    } catch (error) {
      console.error("Error creating unicorn:", error);
    }
  };

  // PUT: Actualizar unicornio
  const onUpdate = async () => {
    try {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchUnicorns(); // Recargar lista
      setEditingId(null); // Salir del modo edición
      setFormData({ name: "", color: "", age: "", power: "" }); // Limpiar formulario
    } catch (error) {
      console.error("Error updating unicorn:", error);
    }
  };

  // DELETE: Eliminar unicornio
  const onDelete = async (id) => {
    try {
      console.log("Eliminando unicornio con id:", id); // Verifica que el id sea correcto
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchUnicorns(); // Recargar lista después de la eliminación
    } catch (error) {
      console.error("Error deleting unicorn:", error);
    }
  };

  // Manejar cambios en el formulario
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Entrar en modo edición (prellenar formulario)
  const onEdit = (unicorn) => {
    setFormData({
      name: unicorn.name,
      color: unicorn.color,
      age: unicorn.age,
      power: unicorn.power,
    });
    setEditingId(unicorn._id); // CRUDCRUD usa "_id" como clave
  };

  return (
    <UnicornsView
      unicorns={unicorns}
      formData={formData}
      editingId={editingId}
      onChange={onChange}
      onCreate={onCreate}
      onEdit={onEdit}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
};

export default UnicornsContainer;
