import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

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

  const header = (
    <div className="flex justify-content-between align-items-center">
      <span className="text-xl font-bold">Gestión de Unicornios</span>
    </div>
  );

  // Función para confirmar eliminación
  const confirmDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este unicornio?')) {
      onDelete(id);
      showToast('success', 'Éxito', 'Unicornio eliminado');
    }
  };

  // Mostrar notificación
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  // Plantilla de botones de acción
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

  // Manejar submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate();
      showToast('success', 'Éxito', 'Unicornio actualizado');
    } else {
      onCreate();
      showToast('success', 'Éxito', 'Unicornio creado');
    }
  };

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <Card title={header} className="shadow-2 mb-4">
          <Toast ref={toast} />
          
          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="formgrid grid">
              <div className="field col-12 md:col-3">
                <InputText
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="w-full"
                  placeholder="Nombre"
                  required
                />
              </div>

              <div className="field col-12 md:col-3">
                <InputText
                  name="color"
                  value={formData.color}
                  onChange={onChange}
                  className="w-full"
                  placeholder="Color"
                  required
                />
              </div>

              <div className="field col-12 md:col-2">
                <InputText
                  name="age"
                  value={formData.age}
                  onChange={onChange}
                  className="w-full"
                  placeholder="Edad"
                  type="number"
                  required
                />
              </div>

              <div className="field col-12 md:col-2">
                <InputText
                  name="power"
                  value={formData.power}
                  onChange={onChange}
                  className="w-full"
                  placeholder="Poder"
                  required
                />
              </div>

              <div className="field col-12 md:col-2 flex align-items-end">
                <Button 
                  type="submit"
                  label={editingId ? "Actualizar" : "Crear"}
                  icon={editingId ? "pi pi-check" : "pi pi-plus"}
                  className={`w-full ${!editingId && "p-button-secondary"}`}
                />
              </div>
            </div>
          </form>
        </Card>

        {/* Tabla de datos */}
        <Card className="shadow-2">
          <DataTable 
            value={unicorns} 
            scrollable
            scrollHeight="flex"
            emptyMessage="No se encontraron unicornios"
            header={header}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="name" header="Nombre" sortable></Column>
            <Column field="color" header="Color" sortable></Column>
            <Column field="age" header="Edad" sortable></Column>
            <Column field="power" header="Poder" sortable></Column>
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