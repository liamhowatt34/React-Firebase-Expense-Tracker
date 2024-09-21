import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();

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

  return (
    <div className="flex p-12 h-screen">
      <section className="flex flex-col justify-between items-start w-1/2 h-2/3 border-2 border-red-500">
        <h1>Expense Tracker</h1>
        <div>
          <h3>Your Balance</h3>
          <h2>$0.00</h2>
        </div>
        <div>
          <div>
            <h4>Income</h4>
            <p>$0.00</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p>$0.00</p>
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
      </section>
    </div>
  );
}

export default ExpenseTracker;
