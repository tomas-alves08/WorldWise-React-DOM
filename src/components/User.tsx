import { useNavigate } from "react-router";
import { useAuth } from "../contexts/fakeAuthContext";
import styles from "./User.module.css";
import { FC } from "react";

const User:FC = ()=>{
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/")
    console.log("LOGOUT!!")
  }

  return (
    <div className={styles.user}>
      <img src={user ? user.avatar : undefined} alt={user ? user.name : undefined} />
      <span>Welcome{user ? "," : "!"} {user && user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
