import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteTransaction = () => {
  const deleteTransaction = async (id: string) => {
    try {
      const transactionDocRef = doc(db, "transactions", id);
      await deleteDoc(transactionDocRef);
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  return { deleteTransaction };
};
