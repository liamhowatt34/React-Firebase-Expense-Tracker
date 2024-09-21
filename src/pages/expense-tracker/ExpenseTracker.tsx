import { useState, useMemo } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/usegetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

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

    transactions.forEach((transaction) => {
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
    <div className="flex p-12 h-screen">
      <section className="flex flex-col justify-between items-start w-1/2 h-2/3 border-2 border-red-500">
        <div className="flex w-full justify-between p-4">
          {profilePhoto && (
            <div>
              <img src={profilePhoto} alt="profile photo" />
            </div>
          )}
          <h1>{name}'s Expense Tracker</h1>
          <button onClick={signUserOut}>Sign Out</button>
        </div>
        <div>
          <h3>Your Balance</h3>
          {totalBalance >= 0 ? (
            <h2>${totalBalance}</h2>
          ) : (
            <h2>-${totalBalance * -1}</h2>
          )}
        </div>
        <div>
          <div>
            <h4>Income</h4>
            <p>${totalIncome}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p>${totalExpense}</p>
          </div>
        </div>
        <form action="" className="flex flex-col" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            required
            onChange={(e) => setTransactionAmount(Number(e.target.value))}
          />
          <input
            type="radio"
            id="expense"
            value="expense"
            checked={transactionType === "expense"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            id="income"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <label htmlFor="income">Income</label>
          <button type="submit">Add Transaction</button>
        </form>
      </section>
      <section>
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={transaction.id}>
                <h4>{description}</h4>
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
