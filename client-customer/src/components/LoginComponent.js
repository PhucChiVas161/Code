import React, { Component } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import axios from "axios";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "sonkk",
      txtPassword: "123",
      snackbarOpen: false,
      snackbarMessage: "",
    };
  }

  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Please input username and password",
      });
    }
  }

  apiLogin(account) {
    axios.post("/api/customer/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate("/home");
      } else {
        this.setState({ snackbarOpen: true, snackbarMessage: result.message });
      }
    });
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">CUSTOMER LOGIN</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td>Username</td>
                <td>
                  <TextField
                    type="text"
                    value={this.state.txtUsername}
                    onChange={(e) => {
                      this.setState({ txtUsername: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <TextField
                    type="password"
                    value={this.state.txtPassword}
                    onChange={(e) => {
                      this.setState({ txtPassword: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.btnLoginClick(e)}
                  >
                    LOGIN
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }
}

export default withRouter(Login);
