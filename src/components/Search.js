import React from "react";

class Search extends React.Component {

  state = {
    input: "",
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.input);
  }

  render() {
    return (
      <form className="mb2" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.input} onChange={this.handleChange} />
      </form>
    )
  }
}

export default Search;