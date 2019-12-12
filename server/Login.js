import React, { useState } from "react";
import "./App.css";

const Profile = ({ user, setUser }) => {
  const signOut = () => {
    setUser({
      username: "",
      password: "",
      isLoggedIn: false
    });
  };

  return (
    <div>
      Welcome {user.username}!<button onClick={signOut}>SIGN OUT</button>
    </div>
  );
};

const Registration = ({ user, users, setUser, setUsers, setRegister }) => {
  const onUserNameChange = event => {
    setUser({ ...user, username: event.currentTarget.value });
  };
  // spread operator with the only part I want to change
  const onPasswordChange = event => {
    setUser({ ...user, password: event.currentTarget.value });
  };

  const registerUser = () => {
    //check whether its a valid user, already in
    const validUser = users
      .map(users => users.username)
      .includes(user.username);
    if (!validUser) {
      setUsers([...users, user]);
      setRegister(false);
      setUser({
        username: "",
        password: "",
        isLoggedIn: false
      });
    } else {
      alert("That user already exists!");
    }
  };

  return (
    <div>
      <input
        value={user.username}
        onChange={onUserNameChange}
        placeholder="username"
      />
      <input
        value={user.password}
        onChange={onPasswordChange}
        placeholder="password"
        type="password"
      />
      <button onClick={registerUser}>REGISTER</button>
    </div>
  );
};

const Login = ({ user, setUser, users, register }) => {
  const onUserNameChange = event => {
    setUser({ ...user, username: event.currentTarget.value });
  };
  const onPasswordChange = event => {
    setUser({ ...user, password: event.currentTarget.value });
  };

  const onClick = () => {
    const validUser = users
      .filter(checkUser => checkUser.username === user.username)
      .pop();

    if (validUser && validUser.password === user.password) {
      console.log(user.username + " has logged in");
      setUser({ ...user, isLoggedIn: true });
    } else {
      alert("invalid user");
    }
  };

  const signUp = () => {
    register(true);
  };

  return (
    <div>
      Login
      {/* value of input is its variable, add type == text, password will hide it*/}
      <input
        value={user.username}
        onChange={onUserNameChange}
        placeholder="username"
      />
      <input
        value={user.password}
        onChange={onPasswordChange}
        placeholder="password"
        type="password"
      />
      <button onClick={onClick}>LOGIN</button>
      {<button onClick={signUp}>Sign up</button>}
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([
    { username: "username", password: "password", isLoggedIn: false }
  ]);
  const [registerButton, setRegisterButton] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
    isLoggedIn: false
  });

  return (
    <div className="App">
      {!user.isLoggedIn && !registerButton && (
        <Login
          user={user}
          setUser={setUser}
          users={users}
          register={setRegisterButton}
        />
      )}
      {user.isLoggedIn && <Profile user={user} setUser={setUser} />}
      {!user.isLoggedIn && registerButton && (
        <Registration
          users={users}
          user={user}
          setUsers={setUsers}
          setUser={setUser}
          setRegister={setRegisterButton}
        />
      )}
    </div>
  );
};

export default App;
