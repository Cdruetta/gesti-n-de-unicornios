import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const ProductForm = ({ formData, onChange, onCreate, onSaveEdit, isEditing }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onSaveEdit();
    } else {
      onCreate();
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen p-4">
      <div className="w-full md:w-8 lg:w-6">
        <Card 
          title={isEditing ? "Editar Producto" : "Nuevo Producto"} 
          className="shadow-2"
        >
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="field mb-4">
              <InputText
                name="name"
                value={formData.name || ''}
                onChange={onChange}
                className="w-full"
                placeholder="Nombre del producto"
              />
            </div>

            <div className="field mb-4">
              <InputText
                name="price"
                value={formData.price || ''}
                onChange={onChange}
                className="w-full"
                placeholder="Precio"
                keyfilter="money"
              />
            </div>

            <div className="field mb-4">
              <InputText
                name="category"
                value={formData.category || ''}
                onChange={onChange}
                className="w-full"
                placeholder="Categoría"
              />
            </div>

            <Button 
              label={isEditing ? "Guardar Cambios" : "Agregar Producto"} 
              icon={isEditing ? "pi pi-check" : "pi pi-plus"} 
              type="submit"
              className="w-full p-button-secondary"
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProductForm;