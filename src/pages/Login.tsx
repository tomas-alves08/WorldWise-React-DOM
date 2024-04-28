import { FC, useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/fakeAuthContext";
import Button from "../components/Button";

const Login: FC = () => {
  const {login, isAuthenticated} = useAuth()
  const navigate = useNavigate()
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(()=>{
    console.log("Login useEffect: ", isAuthenticated)
    if(isAuthenticated) navigate("/app", {replace:true})
  },[isAuthenticated, navigate])

  const handleLogin = (e:React.FormEvent)=>{
    e.preventDefault()
    if(email && password) login(email, password)
    console.log("handleLogin: ", isAuthenticated, email, password)
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button style="primary" onClick={handleLogin}>Login</Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
