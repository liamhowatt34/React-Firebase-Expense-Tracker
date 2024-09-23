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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-600 to-indigo-600">
      <div className="flex flex-col w-1/3 h-96 justify-around items-center font-bold font-mono border border-azure rounded mb-60 bg-white bg-opacity-10 backdrop-blur-xl shadow-xl">
        <p className="text-4xl font-bold text-sky-400">
          Expense Tracker Sign In
        </p>
        <button
          className="flex justify-center items-center h-20 w-64 p-4 text-lg border border-azure rounded-full bg-slate-50 backdrop-opacity-80 hover:bg-opacity-50 hover:shadow-sm hover:shadow-white transition ease-in-out"
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
