import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setUpdatePasswordModal } from "../feachers/user/userSlice";
import DeleteConfirmation from "../components/DeleteConfirmation";
import UpdatePassword from "../components/UpdatePassword";
import UpdateNickname from "../components/UpdateNickname";
import VerifyEmail from "../components/VerifyEmail";

const Settings = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { user, updatePasswordModal, isLoading } = useSelector(
    (store) => store.user
  );
  const { accessToken, userId } = user;
  return (
    <div>
      {" "}
      <div>
        <UpdateNickname />
      </div>{" "}
      <div>
        <VerifyEmail />
      </div>
      <div>
        {updatePasswordModal ? (
          <UpdatePassword />
        ) : (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => dispatch(setUpdatePasswordModal(true))}
          >
            Update password
          </button>
        )}
      </div>
      <div>
        {deleteConfirmation ? (
          <DeleteConfirmation setDeleteConfirmation={setDeleteConfirmation} />
        ) : (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setDeleteConfirmation(true)}
          >
            Delete account
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
