import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig"; 
import { ICategoria } from "../Interfaces/gatos";
import { nanoid } from 'nanoid'
import { deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import datos from "../Datos/datos.json"

export const app = initializeApp(firebaseConfig)
export const db = getFirestore() 

export const newCategoria = async (data: ICategoria) => {
    try{
        console.log('Insertando en FB el objeto', data)
        const newData = {codigo: nanoid(20), ...data}
        const docRef = doc(db, "Categorias", newData.codigo);
        await setDoc(docRef, newData);
    }catch(error){
        console.log(error)
    }
}

export const getCategorias = async (): Promise<ICategoria[]> => {
    let categorias: ICategoria[] = [];
      const categoriasRef = collection(db, "Categorias");
      const CategoriasDocs = await getDocs(categoriasRef);
      CategoriasDocs.forEach(doc => {
        const categoria = { ...doc.data() } as ICategoria;
        categorias.push(categoria);
      });
    console.log(categorias)
    return categorias;
  }
  
  export const delproduct = async (codigo: string) => {
    try {
      const delRef = doc(db, "Categorias", codigo);
      await deleteDoc(delRef);
      window.location.reload();
      console.log("Eliminado correctamente");
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar la categoría");
    }
  };

  export const modifyproduct = async (data: ICategoria) => {
    try {
      const addRef = doc(db, "Categorias");
      const newData = { ...data };
      await updateDoc(addRef, newData);
      console.log("Modificado correctamente");
    } catch (error) {
      console.log(error);
      throw new Error("Error al modificar la categoría");
    }
  };

  export const cargarprod = async () => {
    try {
        console.log('carga de datos...');
        datos.map(async (datos) => {
            const codigo = nanoid(20);
            const docRef = doc(db, "Categorias", codigo);
            await setDoc(docRef, { codigo: codigo, ...datos });
            window.location.reload();
        });
    } catch (error) {
        console.log(error);
    }
};
