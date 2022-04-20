import { useState, useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="bg-primary d-flex justify-content-center display-1 text-light fw-bold shadow">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
