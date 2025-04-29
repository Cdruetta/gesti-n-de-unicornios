import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const ProductsView = ({ products, onDelete, onEdit }) => {
  const toast = useRef(null);

  const header = (
    <div className="flex justify-content-between align-items-center">
      <span className="text-xl font-bold">Gestión de Productos</span>
    </div>
  );

  const priceBodyTemplate = (rowData) => {
    return `$${rowData.price.toFixed(2)}`;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-rounded p-button-success p-button-sm"
          onClick={() => onEdit(rowData.id)}
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => confirmDelete(rowData.id)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const confirmDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      onDelete(id);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto eliminado',
        life: 3000
      });
    }
  };

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <Card className="shadow-2">
          <Toast ref={toast} />
          <DataTable 
            value={products} 
            scrollable 
            scrollHeight="flex"
            emptyMessage="No se encontraron productos"
            header={header}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="name" header="Nombre" />
            <Column field="price" header="Precio" body={priceBodyTemplate} />
            <Column field="category" header="Categoría" />
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

export default ProductsView;
