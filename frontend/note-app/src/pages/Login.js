import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="login-page section">
      <div className="columns">
        <div className="column is-4 is-offset-4">
          <h1 className="title">Log In</h1>
          <form onSubmit={handleSubmit} className="box">
            <div className="field">
              <label>Email</label>
              <div className="control has-icons-left">
                <input
                  type="email"
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-success" disabled={isLoading}>
                  Log In
                </button>
                {error && (
                  <div className="error" id="login-error">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <p className="has-text-centered is-size-7">
              Don't have an account?
              <Link to="/signup"> Click here to sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
