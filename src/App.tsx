import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import ExpenseTracker from "./pages/ExpenseTracker";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
