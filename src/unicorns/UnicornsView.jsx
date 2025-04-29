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

  const confirmDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este unicornio?')) {
      onDelete(id);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Unicornio eliminado',
        life: 3000
      });
    }
  };

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <Card title={header} className="shadow-2 mb-4">
          <Toast ref={toast} />
          
          <div className="formgrid grid">
            <div className="field col-12 md:col-3">
              <InputText
                name="name"
                value={formData.name}
                onChange={onChange}
                className="w-full"
                placeholder="Nombre"
              />
            </div>

            <div className="field col-12 md:col-3">
              <InputText
                name="color"
                value={formData.color}
                onChange={onChange}
                className="w-full"
                placeholder="Color "
              />
            </div>

            <div className="field col-12 md:col-2">
              <InputText
                name="age"
                value={formData.age}
                onChange={onChange}
                className="w-full"
                placeholder="Edad"
              />
            </div>

            <div className="field col-12 md:col-2">
              <InputText
                name="power"
                value={formData.power}
                onChange={onChange}
                className="w-full"
                placeholder="Poder "
              />
            </div>

            <div className="field col-12 md:col-2 flex align-items-end">
              {editingId ? (
                <Button 
                  label="Actualizar"
                  icon="pi pi-check"
                  onClick={onUpdate}
                  className="w-full"
                />
              ) : (
                <Button 
                  label="Crear"
                  icon="pi pi-plus"
                  onClick={onCreate}
                  className="w-full p-button-secondary"
                />
              )}
            </div>
          </div>
        </Card>

        <Card className="shadow-2">
          <DataTable 
            value={unicorns} 
            scrollable
            scrollHeight="flex"
            emptyMessage="No se encontraron unicornios"
            header={header}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="name" header="Nombre" ></Column>
            <Column field="color" header="Color" ></Column>
            <Column field="age" header="Edad" ></Column>
            <Column field="power" header="Poder"></Column>
            <Column 
              header="Acciones" 
              body={actionBodyTemplate}
              style={{ width: '120px' }}
            ></Column>
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default UnicornsView;