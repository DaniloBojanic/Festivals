import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Navbar, Nav, Container,Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login"
import {logout} from './services/auth'
// import Festival from './components/festival/Festival';
// import CreateFestival from './components/festival/CreateFestival';
// import Reservation from './components/reservation/Reservation;
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';




class App extends React.Component {

    render() {
        return (
            
          <div>
          <Router>
            <Navbar expand bg="dark" variant="dark">
              <Navbar.Brand as={Link} to="/">
                  Home
              </Navbar.Brand>
             
              
              <Nav>
                <Nav.Link as={Link} to="/festivali">
                  Prikaz festivala
                </Nav.Link>
               
                {window.localStorage['jwt'] ? 
                          <Button onClick = {()=>logout()}>Logout</Button> :
                          <Nav.Link as={Link} to="/login">Login</Nav.Link>
                          }
              </Nav>
            </Navbar>
              <Container style={{paddingTop:"25px"}}>
                <Switch>
                  
                <Route exact path="/login" component={Login}/>
                {/* <Route exact path="/festival" component={Festival}/>
                <Route exact path="/festival/create" component={CreateFestival}/>
                <Route exact path="/festival/reserve/:id" component={Reservation}/> */}

                
                  
                  
                </Switch>
              </Container>
            </Router>
            
          </div>
        )
    }
};

let storeEnhancer = applyMiddleware(thunk);

ReactDOM.render(
 <Provider store={createStore(reducers, storeEnhancer)}>
    <App />
  </Provider>,
  document.querySelector("#root")
);