import React from "react";
import { Link } from "react-router-dom";

function User( { user } ) {
  return (
    <article className="mb2 mr1">
      <img src={user.avatar_url} alt="profile" width="50" />
      <h4>{user.login}</h4>
      <Link to={`/users/${user.login}`}>
        Profile
      </Link>
    </article>
  )
}

export default User;