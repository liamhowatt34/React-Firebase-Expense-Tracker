import { useAddTransaction } from "../../hooks/useAddTransaction";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();

  return (
    <div className="flex p-12 h-screen">
      <section className="flex flex-col justify-between items-start w-1/2 h-2/3 border-2 border-red-500">
        <h1>Expense Tracker</h1>
        <div>
          <h3>Your Balance</h3>
          <h2>$0.00</h2>
        </div>
        {/* Summary */}
        <div>
          {/* Income */}
          <div>
            <h4>Income</h4>
            <p>$0.00</p>
          </div>
          {/* Expense */}
          <div>
            <h4>Expense</h4>
            <p>$0.00</p>
          </div>
        </div>
        <form action="" className="flex flex-col">
          <input type="text" placeholder="Description" required />
          <input type="number" placeholder="Amount" required />
          <input type="radio" id="expense" value={"expense"} />
          <label htmlFor="expense">Expense</label>
          <input type="radio" id="income" value={"income"} />
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
