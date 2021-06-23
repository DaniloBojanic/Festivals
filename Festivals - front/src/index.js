import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter as Router, Switch } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import {logout} from './services/auth';
import Login from './components/login/Login';

class App extends React.Component{
    render() {
        return (
            <div>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            Home
                        </Navbar.Brand>
                        <Nav>
{/*                             <Nav.Link as={Link} to="/zadaci">Zadaci</Nav.Link>
                            <Nav.Link as={Link} to="/stanja">Stanja</Nav.Link> */}


                            {window.localStorage['jwt'] ? 
                            <Button onClick = {()=>logout()}>Logout</Button> :
                            <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                            }
                        </Nav>
                    </Navbar> 
                    <Container style={{paddingTop:"25px"}}>
                    <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login}/>
{/*                             <Route exact path="/zadaci" component={Zadatak} />
                            <Route exact path="/zadaci/add" component={AddZadatak} />
                            <Route exact path="/zadaci/edit/:id" component={EditZadatak} />
                            <Route exact path="/stanja" component={Stanje} /> */}
                    </Switch>
                    </Container>
                    </Router>
            </div>
        )
    }

}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);