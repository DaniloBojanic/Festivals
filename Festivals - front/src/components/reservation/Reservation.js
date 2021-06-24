import React from 'react';
import Axios from '../../apis/Axios';
import {Form, Button, Row, Col, InputGroup } from "react-bootstrap";
class Reservation extends React.Component {

    constructor(props){
        super(props);

        let festival = {
            id : -1,
            name: null,
            dateStart : null,
            dateEnd : null,
            ticketPrice : 0,
            availableTickets : 0,
            place : {}
        }

    this.state = {id : 0, festival : festival, boughtTickets : 0};
}

    componentDidMount(){
        this.getFestivalById(this.props.match.params.id);
        
     
    }

    getFestivalById(festivalId) {
        Axios.get('/festivals/' + festivalId)
        .then(res => {
            // handle success
            console.log(res.data);
            let festival = {
                id : res.data.id,
                name: res.data.name,
                dateStart : res.data.dateStart,
                dateEnd : res.data.dateEnd,
                ticketPrice : res.data.ticketPrice,
                availableTickets : res.data.availableTickets,
                place : res.data.place
                
    
    
            }
            this.setState({festival : festival});
            
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error! Could not get festival')
         });
    }

    create(e){
        
    
        
        let reservationDTO = {
            boughtTickets : this.state.boughtTickets,
            festival : this.state.festival
            


        }

       
        Axios.post('/reservations' , reservationDTO)
        .then(res => {
            console.log(res);

            alert('Reservation was successfull');
            this.props.history.push('/festivals');
        
        })

        .catch(error => {
            console.log(error);

            alert('Error! Reservation was not successfull!');
        });
    }

    ticketsInputChanged(e) {
        let input = e.target;
    
        let name = input.name;
        let value = input.value;

        console.log(name + ", " + value);
    
        let boughtTickets = this.state.boughtTickets;
        boughtTickets = value;
    
        this.setState({ boughtTickets : boughtTickets });
      }


      render(){
        return (
            <>
            <Row>
                <h1>Tickets reservation for {this.state.festival.name}</h1>
            <Col></Col>
            <Col xs="14" sm="12" md="12">
            <Form>
              
                <Form.Label id="zbrojLjudi">Number of tickets you want to buy:</Form.Label>
                <Form.Control type="number" id="availableTickets" name="availableTickets" onChange={(e)=>this.ticketsInputChanged(e)}/> <br/>
                
               
    
                <br/>
                
               
         
                <Button style={{ marginTop: "25px" }}onClick={(e) => this.create(e)}>Reserve</Button>
            </Form>
            </Col>
    
            
            <Col></Col>
            </Row>
    
    
          
     
        </>
    
        
    
        )
    }
    




}
export default Reservation;