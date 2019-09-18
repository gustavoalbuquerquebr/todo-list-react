import React from "react";

class Page extends React.Component {
  render() {
    return (
      <h1>{this.props.match.params.login}</h1>
    )
  }
}

export default Page;