import React from "react";

import { Input, InputGroup } from "rsuite";
import { ControlRow } from "./UpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import { updateNickname } from "../feachers/user/userSlice";
import { toast } from "react-toastify";
const UpdateNickname = () => {
  const dispatch = useDispatch();
  const styles = {
    width: 600,
  };
  const { user, isLoading } = useSelector((store) => store.user);
  const { accessToken, nickname } = user;
  const initialState = {
    newNickname: nickname,
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
        label={`Please provide your new nickname`}
        control={
          <InputGroup style={styles}>
            {/*  <InputGroup.Addon>sdsdsd</InputGroup.Addon> */}
            <Input
              name="newNickname"
              value={values.newNickname}
              type="text"
              onChange={handleChange}
            />
            <InputGroup.Button
              disabled={isLoading}
              onClick={() => {
                if (!values.newNickname) {
                  return toast.warn("Please provide new nickname");
                }
                dispatch(
                  updateNickname({
                    AccessToken: accessToken,
                    newNickname: values.newNickname,
                  })
                );
                setValues(initialState);
              }}
            >
              Submit New Nickname
            </InputGroup.Button>
          </InputGroup>
        }
      ></ControlRow>
    </div>
  );
};

export default UpdateNickname;
