import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../feature/slices/user.slice";
import { useAppDispatch } from "@/hooks";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Props = {
  text: string;
};

const OAuth = ({ text }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeHandler = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" }); // Allowing users if selecting popup window even if they have only one account

    try {
      dispatch(signInStart());
      //refering docs:- https://firebase.google.com/docs/auth/web/google-signin#web-modular-api_4
      const auth = getAuth(app);
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json(); //*** Note : await is required */

      if (res.ok) {
        dispatch(signInSuccess(data?.user));
        toast.success(data?.message);
        navigate("/home");
      }
    } catch (error) {
      dispatch(signInFailure());
      console.log(`ERROR:While getting response GOOGLE OAUTH ${error}`);
    }
  };
  return (
    <Button
      onClick={changeHandler}
      variant={"outline"}
      type="button"
      className="w-full bg-white text-black text-[16px] flex items-center gap-2"
    >
      <FcGoogle className="w-6 h-6" />
      {text}
    </Button>
  );
};

export default OAuth;
