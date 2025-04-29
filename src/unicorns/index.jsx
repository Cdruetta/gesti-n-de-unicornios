import { UnicornProvider } from "../context/UnicornContext";
import UnicornsContainer from "./UnicornsContainer";


// Este componente encapsula el contenedor de unicornios dentro del proveedor de contexto.
const UnicornsWrapper = () => { 
  return (
    <UnicornProvider>
      <UnicornsContainer />
    </UnicornProvider>
  );
};

export default UnicornsWrapper;
