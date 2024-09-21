import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

interface Transaction {
  description: string;
  transactionAmount: number;
  transactionType: string;
  id: string;
}

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      onSnapshot(queryTransactions, (snapshot) => {
        let docs: Transaction[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id } as Transaction);
        });

        setTransactions(docs);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, getTransactions };
};
