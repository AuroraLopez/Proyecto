import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig"; 
import { ICategoria } from "../Interfaces/gatos";
import { nanoid } from 'nanoid'
import { deleteDoc } from "firebase/firestore";


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