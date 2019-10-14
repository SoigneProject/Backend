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
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpUsername: '',
      signUpFirstName: '',
      signUpLastName: ''
    };

    // Sign In
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
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
    console.log("Mounting");
    const obj = getFromStorage('soigne');
    if (obj && obj.token) {
      const {
        token
      } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log("Verify Success");
            this.setState({
              token,
              isLoading: false
            });
          } else {
            console.log("Verify Failed");
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
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
    console.log("Signing Up");
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
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('soigne', {
            token: json.token
          });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
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
      const {
        token
      } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
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
      signInEmail,
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
        input type = "email"
        placeholder = "Email"
        value = {
          signInEmail
        }
        onChange = {
          this.onTextboxChangeSignInEmail
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