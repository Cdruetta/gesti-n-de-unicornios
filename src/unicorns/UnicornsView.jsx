import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  const handleSubmit = () => {
    if (editingId) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este unicornio?')) {
      onDelete(id);  
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Unicornio eliminado',
        life: 3000
      });
    }
  };

  const exportUnicornToPDF = (unicorn) => {
    const doc = new jsPDF();
  
    
    doc.setFillColor(100, 149, 237); 
    doc.rect(0, 0, 210, 30, 'F'); 
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Ficha Técnica' , 105, 20, { align: 'center' });
  
    
    try {
      doc.addImage('/logo.png', 'PNG', 160, 1, 28, 28); 
    } catch (e) {
      console.warn("No se pudo cargar la imagen.");
    }
  
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    autoTable(doc, {
      startY: 40, 
      margin: { left: 15, right: 15 },
      head: [['Campo', 'Valor']],
      body: [
        ['Nombre', unicorn.name],
        ['Color', unicorn.color],
        ['Edad', unicorn.age],
        ['Poder', unicorn.power],
      ],
      theme: 'grid',
      styles: { fontStyle: 'normal', halign: 'left' },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
    });
  
    
    doc.setFontSize(10);
    doc.text(`Generado por GCsoft - ${new Date().toLocaleDateString()}`, 15, 290);
  
    doc.save(`unicornio_${unicorn.name.replace(/\s+/g, '_')}.pdf`);
  
    toast.current?.show({
      severity: 'success',
      summary: 'PDF generado',
      detail: `PDF de ${unicorn.name} generado`,
      life: 3000
    });
  };

  const pdfButtonTemplate = (rowData) => (
    <Button
      icon="pi pi-file-pdf"
      className="p-button-rounded p-button-help p-button-sm"
      onClick={() => exportUnicornToPDF(rowData)}
      tooltip="Descargar PDF"
    />
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-button-sm"
        onClick={() => onEdit(rowData)}
        tooltip="Editar"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-sm"
        onClick={() => confirmDelete(rowData._id)}  // Confirmar y eliminar
        tooltip="Eliminar"
      />
    </div>
  );

  return (
    <div className="grid p-fluid">
      <Toast ref={toast} />

      {/* Formulario de creación/edición de unicornio */}
      <div className="col-12 flex justify-content-center">
        <Card className="shadow-2 p-fluid mb-4" style={{ maxWidth: '500px' }}>
          <h2>{editingId ? 'Editar Unicornio' : 'Nuevo Unicornio'}</h2>

          <div className="grid formgrid p-fluid">
            <div className="field col-12">
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Nombre"
              />
            </div>
            <div className="field col-12">
              <InputText
                id="color"
                name="color"
                value={formData.color}
                onChange={onChange}
                placeholder="Color"
              />
            </div>
            <div className="field col-12">
              <InputText
                id="age"
                name="age"
                value={formData.age}
                onChange={onChange}
                placeholder="Edad"
              />
            </div>
            <div className="field col-12">
              <InputText
                id="power"
                name="power"
                value={formData.power}
                onChange={onChange}
                placeholder="Poder"
              />
            </div>

            <div className="col-12 flex justify-content-end">
              <Button 
                label={editingId ? 'Actualizar Unicornio' : 'Crear Unicornio'} 
                icon="pi pi-+plus" 
                className="p-button-secondary" 
                onClick={handleSubmit} 
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabla de unicornios */}
      <div className="col-12">
        <Card className="shadow-2">
          <DataTable 
            value={unicorns}  
            scrollable 
            scrollHeight="flex"
            emptyMessage="No se encontraron unicornios"
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="name" header="Nombre" />
            <Column field="color" header="Color" />
            <Column field="age" header="Edad" />
            <Column field="power" header="Poder" />
            <Column 
              header="PDF" 
              body={pdfButtonTemplate}
              style={{ width: '80px' }}
            />
            <Column 
              header="Acciones" 
              body={actionBodyTemplate}
              style={{ width: '120px' }}
            />
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default UnicornsView;
