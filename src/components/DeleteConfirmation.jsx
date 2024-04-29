import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Button, ButtonToolbar } from "rsuite";
import { deleteUser } from "../feachers/user/userSlice";

const DeleteConfirmation = ({ setDeleteConfirmation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { accessToken, userId } = user;
  return (
    <Message
      style={{}}
      showIcon
      type="warning"
      header="Do you want to delete your account?"
    >
      <p> All date will be deleted permanently and cannot be restored.</p>
      <p> Press confirm to delete your account.</p>
      <hr />
      <ButtonToolbar>
        <Button
          size="sm"
          onClick={() => dispatch(deleteUser({ accessToken, userId }))}
        >
          Confirm
        </Button>
        <Button size="sm" onClick={() => setDeleteConfirmation(false)}>
          Go Back
        </Button>
      </ButtonToolbar>
    </Message>
  );
};

export default DeleteConfirmation;
