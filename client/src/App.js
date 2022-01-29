import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MessagesState from "./context/messagesContext/messagesState";
import setToken from "./utils/setToken";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import UserChat from "./pages/UserChat";
import AdminChat from "./pages/AdminChat";

function App() {
  return (
    <div>
      <MessagesState>
        <Router>
          <Switch>
            <Route exact path="/" component={AdminLogin} />
            <Route exact path="/adminchat" component={AdminChat} />
            <Route exact path="/user" component={UserLogin} />
            <Route exact path="/userchat" component={UserChat} />
          </Switch>
        </Router>
      </MessagesState>
    </div>
  );
}

export default App;
