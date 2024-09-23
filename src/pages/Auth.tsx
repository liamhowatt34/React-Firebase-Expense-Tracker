import { auth, provider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

function Auth() {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-600 to-indigo-500">
      <div className="flex flex-col w-1/3 h-80 justify-around items-center font-bold border border-azure rounded mb-60 shadow-xl bg-slate-700">
        <p className="text-4xl font-bold text-slate-50">
          Expense Tracker - Sign In
        </p>
        <button
          className="flex justify-center items-center h-20 w-64 p-4 mb-10 text-lg text-slate-50 border border-slate-50 rounded-full  hover:bg-slate-50 hover:text-slate-800 transition ease-in-out"
          onClick={signInWithGoogle}
        >
          Sign In With Google
          <span className="material-symbols-outlined ml-2">login</span>
        </button>
      </div>
    </div>
  );
}

export default Auth;
