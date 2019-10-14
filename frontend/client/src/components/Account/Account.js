import React, {
  Component
} from 'react';
import axios from 'axios';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInUsername: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpUsername: '',
      signUpFirstName: '',
      signUpLastName: ''
    };

    // Sign In
    this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    // Sign Up
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('soigne');
    if (obj && obj.token) {
      const token = obj.token;
      // Verify token
      axios.get('http://localhost:3000/users/verify?token=' + token)
        .then(json => {
          if (json.data.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  // =============================== Sign In ===============================

  onTextboxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  // =============================== Sign Up ===============================

  // First name
  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  // Last name
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  // Username
  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value,
    });
  }

  // Email
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  // Password
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
      signUpFirstName,
      signUpLastName,
      signUpUsername
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    axios.post('http://localhost:3000/users/signup', {
      firstName: signUpFirstName,
      lastName: signUpLastName,
      username: signUpUsername,
      emailAddress: signUpEmail,
      password: signUpPassword,
    }).then(json => {
        console.log('json', json);
        if (json.data.success) {
          this.setState({
            signUpError: json.data.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.data.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInUsername,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    axios.post('http://localhost:3000/users/signin', {
      username: signInUsername,
      password: signInPassword
    }).then(json => {
        console.log('json', json);
        if (json.data.success) {
          setInStorage('soigne', {
            token: json.data.token
          });
          this.setState({
            signInError: json.data.message,
            isLoading: false,
            signInPassword: '',
            signInUsername: '',
            token: json.data.token,
          });
        } else {
          this.setState({
            signInError: json.data.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
        isLoading: true,
    });
    const obj = getFromStorage('soigne');
    if (obj && obj.token) {
        const token = obj.token;
        // Verify token
        axios.get('http://localhost:3000/users/logout?token=' + token).then(json => {
            if (json.data.success) {
              localStorage.removeItem('soigne');
                this.setState({
                    token: '',
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false,
                });
            }
        });
    } else {
        this.setState({
            isLoading: false,
        });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpUsername,
      signUpEmail,
      signUpPassword,
      signUpError
    } = this.state;

    if (isLoading) {
      return (<div> <p> Loading... </p></div>);
    }

    if (!token) {
      return ( <div>
        <div> {
          (signInError) ? ( <p> {
              signInError
            } </p>
          ) : (null)
        } <p> Sign In </p> <
        input type = "text"
        placeholder = "Username"
        value = {
          signInUsername
        }
        onChange = {
          this.onTextboxChangeSignInUsername
        }
        /> <br />
        <input type = "password"
          placeholder = "Password"
          value = {
            signInPassword
          }
          onChange = {
            this.onTextboxChangeSignInPassword
          }
        /> <br />
        <button onClick = {
          this.onSignIn
        }> Sign In </button>
        </div> 
        <br />
        <br />
        <div> {
          (signUpError) ? ( <p> {
              signUpError
            } </p>
          ) : (null)
        } <p> Sign Up </p>
        <input type = "text"
          placeholder = "First Name"
          value = {
            signUpFirstName
          }
          onChange = {
            this.onTextboxChangeSignUpFirstName
          }/><br />
        <input type = "text"
          placeholder = "Last Name"
          value = {
            signUpLastName
          }
          onChange = {
            this.onTextboxChangeSignUpLastName
          }/><br />
        <input type = "text"
          placeholder = "Username"
          value = {
            signUpUsername
          }
          onChange = {
            this.onTextboxChangeSignUpUsername
          }/><br />
        <input type = "email"
          placeholder = "Email"
          value = {
            signUpEmail
          }
          onChange = {
            this.onTextboxChangeSignUpEmail
          }/><br />
        <input type = "password"
          placeholder = "Password"
          value = {
            signUpPassword
          }
          onChange = {
            this.onTextboxChangeSignUpPassword
          }/><br />
        <button onClick = {
          this.onSignUp
        }> Sign Up </button>
        </div>

        </div>
      );
    }

    return ( 
      <div>
      <p> Account </p> 
      <button onClick = {
        this.logout
      }> Logout </button> 
      </div>
    );
  }
}

export default Account;