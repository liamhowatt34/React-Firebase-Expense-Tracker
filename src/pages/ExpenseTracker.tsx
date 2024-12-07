import { useState, useMemo } from "react";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { Timestamp } from "firebase/firestore";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

interface Transaction {
  description: string;
  transactionAmount: number;
  transactionType: string;
  datetime?: Timestamp;
  id: string;
}

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();
  const { deleteTransaction } = useDeleteTransaction();
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
    <div className="flex flex-col lg:flex-row items-center lg:justify-center p-8 lg:h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      {/* Left Section */}
      <section className="flex flex-col justify-between items-start lg:w-1/2 w-full p-6 bg-white rounded-lg shadow-md lg:mr-4 mb-6 lg:mb-0">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-8">
          {profilePhoto && (
            <img
              src={profilePhoto}
              className="h-16 w-16 rounded-full border-2 border-gray-300"
              alt="Profile"
            />
          )}
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mx-4">
            {name}'s Expense Tracker
          </h1>
          <button
            onClick={signUserOut}
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Balance Overview */}
        <div className="w-full mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Balance</h3>
          <h2
            className={`text-3xl font-bold ${
              totalBalance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${Math.abs(totalBalance)}
          </h2>
        </div>

        {/* Income and Expense */}
        <div className="flex justify-between items-center w-full mb-8">
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-700">Income</h4>
            <p className="text-lg font-semibold text-green-600">
              ${totalIncome}
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-700">Expense</h4>
            <p className="text-lg font-semibold text-red-600">
              ${totalExpense}
            </p>
          </div>
        </div>

        {/* Transaction Form */}
        <form onSubmit={onSubmit} className="w-full space-y-4">
          <input
            type="text"
            placeholder="Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            required
            onChange={(e) => setTransactionAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="form-radio"
              />
              <span>Expense</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="form-radio"
              />
              <span>Income</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Add Transaction
          </button>
        </form>
      </section>

      {/* Right Section */}
      <section className="flex flex-col items-start lg:w-1/2 w-full p-6 bg-white rounded-lg shadow-md lg:ml-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Transactions
        </h3>
        <ul className="w-full space-y-4 max-h-96 overflow-y-auto">
          {transactions
            .slice()
            .reverse()
            .map((transaction: Transaction) => (
              <li
                key={transaction.id}
                className="p-4 border border-gray-400 rounded-md"
              >
                <h4 className="font-medium text-gray-800">
                  {transaction.description}
                </h4>
                <p className="text-sm text-gray-600">
                  ${transaction.transactionAmount} -{" "}
                  <span
                    className={`${
                      transaction.transactionType === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.transactionType}
                  </span>
                </p>
                <p className="text-xs mb-2 text-gray-500">
                  {transaction.datetime?.toDate().toLocaleString()}
                </p>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default ExpenseTracker;
