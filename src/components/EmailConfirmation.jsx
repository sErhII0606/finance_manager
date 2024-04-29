import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Button, ButtonToolbar } from "rsuite";
import { Input, InputGroup } from "rsuite";
import { ControlRow } from "./UpdatePassword";
import { receiveReport } from "../feachers/user/userSlice";
const EmailConfirmation = ({ setEmailConf, dates }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  const initialState = {
    email: "",
  };
  const [values, setValues] = React.useState(initialState);
  const [emailToSend, setEmailToSend] = React.useState(user.email);
  const handleChange = (_, e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setValues({ ...values, [name]: value });
  };

  const { year, month, date } = useSelector((store) => store.report);
  return (
    <Message
      style={{}}
      showIcon
      type="warning"
      header={`Email your report to ${emailToSend}?`}
    >
      <p> use different email?</p>
      <ControlRow
        label={`Please provide email you wish to receive report for ${dates[0].toDateString()} to ${dates[1].toDateString()}`}
        control={
          <InputGroup>
            {/*  <InputGroup.Addon>sdsdsd</InputGroup.Addon> */}
            <Input
              name="email"
              value={values.email}
              type="email"
              onChange={handleChange}
            />
            <InputGroup.Button
              disabled={isLoading}
              onClick={() => {
                if (!values.email) {
                  return toast.warn("Please provide new email");
                }
                setEmailToSend(values.email);
                setValues(initialState);
              }}
            >
              Use this Email
            </InputGroup.Button>
          </InputGroup>
        }
      ></ControlRow>
      <hr />
      <ButtonToolbar>
        <Button
          size="sm"
          onClick={() => {
            dispatch(
              receiveReport({
                to: emailToSend,
                from: "cerhij1997@gmail.com",
                subject: `Report from ${dates[0].toDateString()} to ${dates[1].toDateString()}`,
                text: `testing`,

                userId: user.userId,
                month,
                year,
              })
            );
            setEmailConf(false); //move to redux!!!!
          }}
        >
          Send Email
        </Button>
        <Button size="sm" onClick={() => setEmailConf(false)}>
          Go Back
        </Button>
      </ButtonToolbar>
    </Message>
  );
};

export default EmailConfirmation;
