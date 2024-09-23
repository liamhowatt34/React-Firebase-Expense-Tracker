import { useState, useMemo } from "react";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

interface Transaction {
  description: string;
  transactionAmount: number;
  transactionType: string;
  id: string;
}

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = (type: string) => {
    let total = 0;

    transactions.forEach((transaction: Transaction) => {
      if (transaction.transactionType === type) {
        total += transaction.transactionAmount;
      }
    });

    return total;
  };

  const totalBalance = useMemo(() => {
    return calculateTotal("income") - calculateTotal("expense");
  }, [transactions]);
  const totalIncome = useMemo(() => calculateTotal("income"), [transactions]);
  const totalExpense = useMemo(() => calculateTotal("expense"), [transactions]);

  return (
    <div className="flex p-12 h-screen bg-gradient-to-r from-cyan-600 to-indigo-500">
      <section className="flex flex-col justify-center items-start w-1/2 h-full p-10 bg-slate-800 text-slate-50 rounded-sm mr-4 shadow-xl shadow-black rounded-r-lg">
        <div className="flex w-full justify-between items-center font-bold mb-28">
          {profilePhoto && (
            <div>
              <img
                src={profilePhoto}
                className="rounded-full"
                alt="profile photo"
              />
            </div>
          )}
          <h1 className="text-4xl mb-2 underline">{name}'s Expense Tracker</h1>
          <button
            onClick={signUserOut}
            className="flex justify-center items-center border border-slate-50 h-12 w-auto rounded-full p-4 hover:bg-slate-50 hover:text-slate-600"
          >
            Sign Out
          </button>
        </div>
        <div className="mb-12">
          <h3 className="font-bold text-3xl underline mb-1">Balance</h3>
          {totalBalance >= 0 ? (
            <h2 className="font-bold text-3xl">${totalBalance}</h2>
          ) : (
            <h2 className="font-bold text-3xl">-${totalBalance * -1}</h2>
          )}
        </div>
        <div className="font-bold text-xl flex w-1/4 justify-around items-center mb-20">
          <div>
            <h4 className="mr-12 underline">Income</h4>
            <p>${totalIncome}</p>
          </div>
          <div>
            <h4 className="underline">Expense</h4>
            <p>${totalExpense}</p>
          </div>
        </div>
        <form
          action=""
          className="flex flex-col justify-between items-start h-1/2 w-1/2 mb-2"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder="Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            className="h-10 rounded-md p-2 text-slate-800 w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            required
            onChange={(e) => setTransactionAmount(Number(e.target.value))}
            className="h-10 rounded-md p-2 text-slate-800 w-full"
          />
          <div className="flex w-20 justify-around items-center">
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
              className="m-2"
            />
            <label htmlFor="expense">Expense</label>
          </div>
          <div className="flex w-20 justify-around items-center">
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center font-bold  border border-slate-50 h-12 w-auto rounded-full p-4 hover:bg-slate-50 hover:text-slate-600"
          >
            Add Transaction
          </button>
        </form>
      </section>
      <section className="h-full w-1/2 ml-4 bg-slate-800 text-slate-50 flex flex-col items-start font-bold p-12 shadow-xl shadow-black rounded-l-lg">
        <h3 className="text-4xl mb-8 mt-4 underline">Transactions</h3>
        <ul className="overflow-auto border border-slate-50 h-3/4 w-1/2 p-4 rounded-sm">
          {transactions.map((transaction: Transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li
                key={transaction.id}
                className="mb-4 border border-slate-50 p-2 rounded-lg"
              >
                <h4 className="underline">{description}</h4>
                <p>
                  ${transactionAmount} {"- "}
                  <label htmlFor="">{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default ExpenseTracker;
