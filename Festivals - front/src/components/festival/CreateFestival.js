import React from 'react';
import Axios from '../../apis/Axios';
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import getPlacesAction from "../../actions/GetPlaces";
import { connect } from "react-redux";
class CreateFestival extends React.Component {

    constructor(props){
        super(props);

        let festival = {
            id : -1,
            name: null,
            dateStart : null,
            dateEnd : null,
            ticketPrice : 0,
            availableTickets : 0,
            place : null
        }

    this.state = {festival: festival, places : []};
}
create = this.create.bind(this);

componentDidMount(){
    this.getPlaces();
}
getPlaces(){
        Axios.get('/places')
        .then(res => {
             // handle success
             console.log(res);
             this.setState({places: res.data});
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Problem with getting places');
        });
}
renderPlacesOptions() {
    return this.state.places.map(place => {
        return (
            <option key={place.id} value={place.id}>
                {place.city} , {place.country}
            </option>
        )
    });
}
placeSelectionChanged(e){
    // console.log(e);

    let placeId= e.target.value;
    let place = this.state.places.find((placeDTO) => placeDTO.id == placeId);
    console.log(place);

    let festival = this.state.festival;

    festival.place = place;
    

    this.setState({festival : festival});
            
}

valueInputChanged(e){
    let input = e.target;

    let name = input.name;

    let value = input.value;

    console.log(name + ", " + value);

    let festival = this.state.festival;

    festival[name] = value;

    this.setState({festival : festival});

}

create(e) {
    let festival = this.state.festival;
    let festivalDTO = {
        name: festival.name,
        dateStart : festival.dateStart,
        dateEnd : festival.dateEnd,
        ticketPrice : festival.ticketPrice,
        availableTickets : festival.availableTickets,
        place : festival.place

    }

    Axios.post('/festivals', festivalDTO)
    .then(res => {
        console.log(res);

        alert('Festival succsessfully created');
        this.props.history.push("/festivals");
    })

    .catch(error => {
        console.log(error);

        alert('Error! Problem with creating festival');
    });

}
render(){
    return (
        <>
        {window.localStorage['role']=="ROLE_ADMIN"?
        [<Row>
        <Col></Col>
        <Col xs="14" sm="12" md="12">
        <Form>
            <Form.Label htmlFor="zname">Festival name</Form.Label>
            <Form.Control id="zname" name="name" onChange={(e)=>this.valueInputChanged(e)}/> <br/>
            <Form.Label htmlFor="zDatumP">Start of the festival</Form.Label>
            <Form.Control type="date" id="zDatumP" name="dateStart" onChange={(e)=>this.valueInputChanged(e)}/> <br/>
            <Form.Label id="zDatumZ">End of the festival</Form.Label>
            <Form.Control type="date" id="zDatumZ" name="dateEnd" onChange={(e)=>this.valueInputChanged(e)}/> <br/>
            <Form.Label id="zTicketPrice">Ticket price</Form.Label>
            <Form.Control type="number" id="zTicketPrice" name="ticketPrice" onChange={(e)=>this.valueInputChanged(e)}/> <br/>
            <Form.Label id="zAvailebleTickets">Available tickets</Form.Label>
            <Form.Control type="number" id="zAvailebleTickets" name="availableTickets" onChange={(e)=>this.valueInputChanged(e)}/> <br/>

            <Form.Label htmlFor="pPlace">Place of event</Form.Label>
            <InputGroup>
            <Form.Control as="select" id="pPlace" name="place" onChange={(e)=>this.placeSelectionChanged(e)}>
            <option>Choose place</option>
            {this.renderPlacesOptions()}
            </Form.Control>

            </InputGroup>
           

       
            <Button style={{ marginTop: "25px" }}onClick={(e) => this.create(e)}>Create</Button>
        </Form>
        </Col>

        
        <Col></Col>
        </Row>]: null}


      
 
    </>

    

    )
}
}
const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    return { places: state.places };
  };
  
  export default connect(mapStateToProps, {
    getPlaces: getPlacesAction,
  })(CreateFestival);