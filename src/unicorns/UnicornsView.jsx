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

    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text(`Ficha Técnica de ${unicorn.name}`, 15, 15);

    try {
      doc.addImage('/public/logo.jpg', 150, 10, 40, 40);
    } catch (e) {
      console.warn("No se pudo cargar la imagen.");
    }

    doc.setFontSize(12);
    doc.text(`Nombre: ${unicorn.name}`, 15, 35);
    doc.text(`Color: ${unicorn.color}`, 15, 45);
    doc.text(`Edad: ${unicorn.age}`, 15, 55);
    doc.text(`Poder: ${unicorn.power}`, 15, 65);

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
        onClick={() => confirmDelete(rowData.id)}
        tooltip="Eliminar"
      />
    </div>
  );

  return (
    <div className="grid p-fluid">
      <Toast ref={toast} />

      {/* Formulario de creación/edición de unicornio - Arriba */}
      <div className="col-12 flex justify-content-center">
        <Card className="shadow-2 p-fluid mb-4" style={{ maxWidth: '500px' }}>
          <h3>{editingId ? 'Editar Unicornio' : 'Nuevo Unicornio'}</h3>

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
                icon="pi pi-plus" 
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
