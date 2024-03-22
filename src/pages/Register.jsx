import { useState, useEffect } from "react";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../feachers/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  isMember: true,
};

import { Link } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState(initialState);

  const { user, isLoading } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { nickname, email, password, isMember } = values;
    if (!email || !password || (!isMember && !nickname)) {
      toast.error("please");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ nickname, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <FormRow
            type="text"
            name="nickname"
            value={values.nickname}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="member-btn" disabled={isLoading}>
          {isLoading ? "loading..." : "Submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
      <Link to="/landing" className="btn btn-hero">
        <button className="member-btn">Go Back</button>
      </Link>
    </div>
  );
};

export default Register;
