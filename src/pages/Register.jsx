import { useState, useEffect } from "react";
//import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../feachers/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  isMember: true,
};

import { Link } from "react-router-dom";

const Register = () => {
  const { user, isLoading } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
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
      <Form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Nickname
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="nickname"
                value={values.nickname}
                placeholder="nickname"
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </Form.Group>
        )}
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              placeholder="password"
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Form.Group>
        <button type="submit" className="member-btn" disabled={isLoading}>
          {isLoading ? "loading..." : "Submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>{" "}
      </Form>
      <Link to="/landing" className="btn btn-hero">
        <button className="member-btn">Go Back</button>
      </Link>
    </div>
  );
};

export default Register;
