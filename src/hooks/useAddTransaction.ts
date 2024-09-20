import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

interface TransactionData {
  description: string;
  transactionAmount: number;
  transactionType: string;
}

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }: TransactionData) => {
    await addDoc(transactionCollectionRef, {
      userID: "",
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
