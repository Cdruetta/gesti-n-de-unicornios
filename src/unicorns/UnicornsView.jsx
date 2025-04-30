import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UnicornsView = ({  
  unicorns,
  formData,
  onChange,
  onCreate,
  onDelete,
  onEdit,
  onUpdate,
  editingId
}) => {
  const toast = useRef(null);

  // Función para exportar un unicornio individual a PDF
  const exportUnicornToPDF = (unicorn) => {
    const doc = new jsPDF();
    
    // Configuración del PDF
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text(`Ficha Técnica de ${unicorn.name}`, 15, 15);
    
    // Imagen de ejemplo (puedes reemplazarla)
    doc.addImage(
      '/public/logo.jpg',  
      150,
      10,
      40,
      40
    );
    
    
    // Datos del unicornio
    rowData = {
      name: unicorn.name,
      color: unicorn.color,
      age: unicorn.age,
      power: unicorn.power
    };
    doc.setFontSize(12);
    doc.text(`Nombre: ${unicorn.name}`, 15, 35);
    doc.text(`Color: ${unicorn.color}`, 15, 45);
    doc.text(`Edad: ${unicorn.age}`, 15, 55);
    doc.text(`Poder: ${unicorn.power}`, 15, 65);
    
    // Guardar el documento
    doc.save(`unicornio_${unicorn.name.replace(/\s+/g, '_')}.pdf`);
    showToast('success', 'Éxito', `PDF de ${unicorn.name} generado`);
  };

  // Plantilla para el botón PDF individual
  const pdfButtonTemplate = (rowData) => {
    return (
      <Button 
        icon="pi pi-file-pdf"
        className="p-button-rounded p-button-help p-button-sm"
        onClick={() => exportUnicornToPDF(rowData)}
        tooltip="Descargar PDF"
        tooltipOptions={{ position: 'top' }}
      />
    );
  };

  // Plantilla de botones de acción (sin el PDF)
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-rounded p-button-success p-button-sm"
          onClick={() => onEdit(rowData)}
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => confirmDelete(rowData._id)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  // ... (resto de tus funciones existentes)

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <Card className="shadow-2">
          <DataTable 
            value={unicorns} 
            scrollable
            scrollHeight="flex"
            emptyMessage="No se encontraron unicornios"
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="name" header="Nombre" ></Column>
            <Column field="color" header="Color" ></Column>
            <Column field="age" header="Edad" ></Column>
            <Column field="power" header="Poder" ></Column>
            <Column 
              header="PDF" 
              body={pdfButtonTemplate}
              style={{ width: '80px' }}
              exportable={false}
            ></Column>
            <Column 
              header="Acciones" 
              body={actionBodyTemplate}
              style={{ width: '120px' }}
              exportable={false}
            ></Column>
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default UnicornsView;