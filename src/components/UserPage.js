import React from "react";
import Loading from "./Loading";

class UserPage extends React.Component {

  componentDidMount() {
    console.log("!");
    this.props.onMount(this.props.match.params.login);
  }

  render() {
    if (!this.props.user) {
      return <Loading />;
    }

    return (
      <>
        <img src={this.props.user.avatar_url} alt="profile" width="250" />
        <h2>{this.props.user.login}</h2>
        <p>{this.props.user.bio}</p>
      </>
    )
  }
}

export default UserPage;