import React from "react";
import User from "./User";
import Loading from "./Loading";

function Users( { users } ) {

  if (!users) {
    return <Loading />
  }

  return (
    <section className="flex">
      { users.map(user => <User key={user.id} user={user} />) }
    </section>
  );
}

export default Users;