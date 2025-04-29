import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

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
      <div className="flex gap-1">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-rounded p-button-success p-button-text-only"
          onClick={() => onEdit(rowData.id)}
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
          style={{ width: '1.5rem', height: '1.5rem' }}
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-rounded p-button-danger p-button-text-only"
          onClick={() => confirmDelete(rowData.id)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          style={{ width: '1.5rem', height: '1.5rem' }}
        />
      </div>
    );
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: '¿Estás seguro de eliminar este producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        onDelete(id);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado',
          life: 3000
        });
      }
    });
  };

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <Card header={header} className="shadow-2">
          <Toast ref={toast} />
          <ConfirmDialog />
          
          <DataTable 
            value={products} 
            scrollable 
            scrollHeight="flex"
            emptyMessage="No se encontraron productos"
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="name" header="Nombre"></Column>
            <Column field="price" header="Precio" body={priceBodyTemplate}></Column>
            <Column field="category" header="Categoría"></Column>
            <Column 
              header="Acciones" 
              body={actionBodyTemplate}
              style={{ width: '90px' }}
            ></Column>
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default ProductsView;