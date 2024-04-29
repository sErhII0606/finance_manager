import React from "react";

import { Input, InputGroup } from "rsuite";
import { ControlRow } from "./UpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyEmail } from "../feachers/user/userSlice";
const VerifyEmail = () => {
  const dispatch = useDispatch();
  const styles = {
    width: 600,
  };
  const { user, isLoading } = useSelector((store) => store.user);
  const { accessToken, email } = user;
  const initialState = {
    email,
  };
  const [values, setValues] = React.useState(initialState);
  const handleChange = (_, e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setValues({ ...values, [name]: value });
  };
  return (
    <div>
      {" "}
      <ControlRow
        label={`Please provide your email`}
        control={
          <InputGroup style={styles}>
            {/*  <InputGroup.Addon>sdsdsd</InputGroup.Addon> */}
            <Input
              name="email"
              value={values.email}
              type="text"
              onChange={handleChange}
            />
            <InputGroup.Button
              disabled={isLoading}
              onClick={() => {
                if (!values.email) {
                  return toast.warn("Please provide new email");
                }
                dispatch(verifyEmail(values.email));
                setValues(initialState);
              }}
            >
              Verify Email
            </InputGroup.Button>
          </InputGroup>
        }
      ></ControlRow>
    </div>
  );
};

export default VerifyEmail;
