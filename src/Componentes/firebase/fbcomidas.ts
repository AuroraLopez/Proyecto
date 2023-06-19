import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig"; 
import { Comidas } from "../Interfaces/gatos";
import { nanoid } from 'nanoid'
import { deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export const app = initializeApp(firebaseConfig)
export const db = getFirestore() 

export const newComida = async (data: Comidas) => {
    try{
        console.log('Insertando en FB el objeto', data)
        const newData = {codigo: nanoid(20), ...data}
        const docRef = doc(db, "Comida", newData.codigo);
        await setDoc(docRef, newData);
    }catch(error){
        console.log(error)
    }
}

export const getComidas = async (): Promise<Comidas[]> => {
    const comidas: Comidas[] = [];
    const comidasRef = collection(db, "Comida");
    const comidasDocs = await getDocs(comidasRef);
    comidasDocs.forEach(doc => {
      const comida = { ...doc.data() } as Comidas;
      comidas.push(comida);
    });
    console.log(comidas);
    return comidas;
  };
  
  export const delcomida = async (codigo: string) => {
    try {
      const delcomidaRef = doc(db, "Comida", codigo);
      await deleteDoc(delcomidaRef);
      window.location.reload();
      console.log("Eliminado correctamente");
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar la categoría");
    }
  };

  export const modifyproduct = async (data: Comidas) => {
    try {
      const addRef = doc(db, "Comida");
      const newData = { ...data };
      await updateDoc(addRef, newData);
      console.log("Modificado correctamente");
    } catch (error) {
      console.log(error);
      throw new Error("Error al modificar la categoría");
    }
  };

