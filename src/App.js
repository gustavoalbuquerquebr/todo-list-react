import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Search from "./components/Search";
import Users from "./components/Users";
import UserPage from "./components/UserPage";

class App extends React.Component {
  state = {
    users: null,
    alert: null,
    user: null,
  }

  async componentDidMount() {
    const response = await fetch("https://api.github.com/users?per_page=20");
    const users = await response.json();

    this.setState({
      users
    });
  }

  alert(msg) {
    this.setState({
      alert: msg
    })

    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 10000)
  }

  handleSubmit = async (inp) => {

    if (inp === "") {
      this.alert("Blank search");
      return null;
    }

    if (inp.length <= 5) {
      this.alert("Search must be at least 5 chars long");
      return null;
    }

    const response = await fetch("https://api.github.com/search/users?q=" + inp);
    const json = await response.json();
    const users = json.items;

    if (users.length === 0) {
      this.alert("No user found");
      return null;
    }

    this.setState({
      users
    })
  }

  handlePageMount = async (login) => {
    const response = await fetch("https://api.github.com/users/" + login);
    const user = await response.json();

    this.setState({
      user
    });
  };

  render() {
    return (
      <main className="container">
        <Router>
          <Route path="/" exact render={() => {
            return <>
              <Navbar />
              <Alert display={this.state.alert} />
              <Search handleSubmit={this.handleSubmit} />
              <Users users={this.state.users} />
            </>
          }} />
          <Route path="/users/:login" exact render={props => {
            return <>
              <Navbar />
              <UserPage { ...props } user={this.state.user} onMount={this.handlePageMount} />
            </>
          }} />
        </Router>
      </main>
    );
  }
}

export default App;
