import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

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

  return (
    <div className="">
      <p>Sign in With Google to Continue</p>
      <button className="" onClick={signInWithGoogle}>
        {" "}
        Sign In With Google
      </button>
    </div>
  );
}

export default Auth;
