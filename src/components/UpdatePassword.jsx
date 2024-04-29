import React from "react";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import {
  Input,
  InputGroup,
  Modal,
  ButtonToolbar,
  Button,
  RadioGroup,
  Radio,
  Placeholder,
  FlexboxGrid,
} from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import {
  setUpdatePasswordModal,
  updatePassword,
} from "../feachers/user/userSlice";
import { toast } from "react-toastify";
export const ControlRow = ({ label, control, ...rest }) => (
  <FlexboxGrid {...rest} style={{ marginBottom: 10 }} align="middle">
    <FlexboxGrid.Item colspan={6}>{label}: </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={18}>{control}</FlexboxGrid.Item>
  </FlexboxGrid>
);
export const styles = {
  width: 300,
};
const UpdatePassword = () => {
  const { user, updatePasswordModal, isLoading } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const [visibleCo, setVisibleCo] = React.useState(false);
  const [visibleCu, setVisibleCu] = React.useState(false);
  const [visibleN, setVisibleN] = React.useState(false);
  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const [values, setValues] = React.useState(initialState);
  const handleChange = (_, e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setValues({ ...values, [name]: value });
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      open={updatePasswordModal}
      onClose={() => dispatch(setUpdatePasswordModal(false))}
    >
      <Modal.Header>
        <Modal.Title>Create New Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ControlRow
          label="current password"
          control={
            <InputGroup inside style={styles}>
              {/*  <InputGroup.Addon>sdsdsd</InputGroup.Addon> */}
              <Input
                name="currentPassword"
                value={values.currentPassword}
                type={visibleCu ? "text" : "password"}
                onChange={handleChange}
              />
              <InputGroup.Button onClick={() => setVisibleCu(!visibleCu)}>
                {visibleCu ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
          }
        />
        <ControlRow
          label="new password"
          control={
            <InputGroup inside style={styles}>
              {/*  <InputGroup.Addon>sdsdsd</InputGroup.Addon> */}
              <Input
                name="newPassword"
                value={values.newPassword}
                type={visibleN ? "text" : "password"}
                onChange={handleChange}
              />
              <InputGroup.Button onClick={() => setVisibleN(!visibleN)}>
                {visibleN ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
          }
        />
        <ControlRow
          label="confirm new password"
          control={
            <InputGroup inside style={styles}>
              {/*  <InputGroup.Addon>sdsdsd</InputGroup.Addon> */}
              <Input
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                type={visibleCo ? "text" : "password"}
                onChange={handleChange}
              />
              <InputGroup.Button onClick={() => setVisibleCo(!visibleCo)}>
                {visibleCo ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading}
          onClick={() => {
            if (!values.newPassword || !values.currentPassword) {
              return toast.error("You must provide a password");
            }
            if (values.newPassword !== values.confirmNewPassword) {
              return toast.error("please confirm new password");
            }
            if (values.newPassword === values.currentPassword) {
              return toast.error("New password already used");
            }
            setValues(initialState);
            dispatch(
              updatePassword({
                accessToken: user.accessToken,
                previousPassword: values.currentPassword,
                proposedPassword: values.newPassword,
              })
            );
          }}
          appearance="primary"
        >
          Ok
        </Button>
        <Button
          onClick={() => dispatch(setUpdatePasswordModal(false))}
          appearance="subtle"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePassword;
