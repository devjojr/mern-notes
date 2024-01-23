import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(userName, email, password);
  };

  return (
    <div className="signup-page section">
      <div className="columns">
        <div className="column is-4 is-offset-4">
          <h1 className="title">Sign Up</h1>
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
              <label>User Name</label>
              <div className="control has-icons-left">
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
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
                  Sign Up
                </button>
                {error && (
                  <div id="signup-error" className="error">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <p className="has-text-centered is-size-7">
              Already have an account?
              <Link to="/login"> Click here to log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
