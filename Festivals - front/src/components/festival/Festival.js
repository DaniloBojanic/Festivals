import React from 'react';
import {Table, Button, Form,InputGroup} from 'react-bootstrap'
import Axios from '../../apis/Axios';
import getPlacesAction from "../../actions/GetPlaces";
import { connect } from "react-redux";

class Festival extends React.Component {

    constructor(props) {
        super(props);

        let festival = {
            id : -1,
            name: "",
            dateStart : "",
            dateEnd : "",
            ticketPrice : 0,
            availableTickets : 0,
            place : {}
        }

        this.state = {festival : festival,
            places: [], festivals: [], 
            pageNo : 0,totalPages : 0,
            placeId : null, name : "" }
    }

    componentDidMount(){
        this.getFestivals(0);
        this.getPlaces();
    }

    getFestivals(pageNo) {
        let config = {
            params: {
                pageNo: pageNo,
               
            },
          }
        Axios.get('/festivals', config)
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({festivals: res.data,  totalPages : res.headers["total-pages"]});
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error at loading festivals');
            });
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
                alert('Error at loading places.');
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

    placeChange(e,id,name,dateStart,dateEnd,ticketPrice,availableTickets){
        this.placeSelectionChanged(e);
        this.edit(id,name,dateStart,dateEnd,ticketPrice,availableTickets);
    }
    placeSelectionChanged(e){
        // console.log(e);

        let placeId= e.target.value;
        let place = this.state.places.find((placeDTO) => placeDTO.id == placeId);
        console.log(place);

        let festival = this.state.festival;
        festival.place = place;

        this.setState({festival : festival});
        this.setState({placeId : placeId});
                
    }

    nazivInputChanged(e) {
        let input = e.target;
    
        let name = input.name;
        let value = input.value;

        console.log(name + ", " + value);

        name = this.state.name;

        name = value;

        this.setState({name : name})
        this.search();
        console.log(name);
      }

      search() {
        var params = {
            'name' : this.state.name,
            'placeId' : this.state.placeId
        }

        Axios.get('/festivals/search', {params})
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({festivals : res.data});
                 
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error at searching');
            });
    }

    goToCreate(){
        this.props.history.push('/festivals/create');
    }



    delete(id) {
        Axios.delete('/festivals/' + id)
        .then(res => {
            // handle success
            console.log(res);
            alert('Festival deleted successfully');
            window.location.reload();
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Problem with deleting');
         });
    }

    goToReserve(id){
        this.props.history.push('/festivals/reserve/' + id);
    }

    

    renderFestivals() {
        return this.state.festivals.map((festival) => {
            return (
               <tr key={festival.id}>
                  <td>{festival.name}</td>
                  <td><InputGroup>
                    <Form.Control as="select" id="place" value={festival.place.id} name="place" onChange={e=> this.placeChange(e,festival.id,festival.name,festival.dateStart,festival.dateEnd,festival.ticketPrice,festival.availableTickets)}>
                        
                        {this.renderPlacesOptions()}
                    </Form.Control>
                    </InputGroup></td>
                  <td>{festival.dateStart}</td>
                  <td>{festival.dateEnd}</td>
                  <td>{festival.ticketPrice}</td>
                  <td>{festival.availableTickets}</td>
                  <td> <Button  hidden={festival.availableTickets < 1 || festival.finished == true} onClick={() => this.goToReserve(festival.id)}>Reserve</Button></td>
                  <td><Button  variant="danger" onClick={() => this.delete(festival.id)}>Delete</Button></td>

               
               </tr>
            )
         })
    }

    

    edit(id,name,dateStart,dateEnd,ticketPrice,availableTickets){
        let festival = this.state.festival;
        
        let festivalDTO = {

            id : id,
            name: name,
            dateStart : dateStart,
            dateEnd : dateEnd,
            ticketPrice : ticketPrice,
            availableTickets : availableTickets,
            place : festival.place

        }

        Axios.put('/festivals/' + id, festivalDTO)
        .then(res => {
            console.log(res);
    
            window.location.reload()
            
        })
    
        .catch(error => {
            console.log(error);
    
            alert('Error! Edit not successfull');
        });
    }



    render() {
     
        return (
            <div>
            <div>
                <Form>
                    <Form.Label  htmlFor="place">Place of event</Form.Label>
                    <InputGroup>
                    <Form.Control as="select" id="place" name="placeId" onChange={e=> this.placeSelectionChanged(e)}
                    onClick={e => this.search()}>
                       
                        {this.renderPlacesOptions()}
                    </Form.Control>
                    </InputGroup>

                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control id="name" placeHolder="name of festival" name="name" onChange={e=> this.nameInputChanged(e)}></Form.Control>
                </Form>
                <br/>
            </div>
             
             <Button variant="success" onClick={(e) => this.goToCreate()}>Create festival</Button>
             <div style={{float:"right"}}><Button disabled={this.state.pageNo==0} className="btn btn-primary" onClick={() =>this.getFestivals(this.state.pageNo = this.state.pageNo - 1)}>Previous</Button>
                        <Button disabled={this.state.pageNo==this.state.totalPages-1} className="btn btn-primary" onClick={() =>this.getFestivals(this.state.pageNo = this.state.pageNo + 1)}>Next</Button>
  </div>
            <Table className="table table-striped" style={{marginTop:5}}>
                <thead className="thead-dark">
                    <tr>
                        <th>Name of the festival</th>
                        <th>Place of event</th>
                        <th>Begining of the festival</th>
                        <th>End of the festival</th>
                        <th>Ticket price</th>
                        <th>Available tickets</th>
                        
                        <th></th>
                        <th></th>                        
                    </tr>
                </thead>
                <tbody>
                    {this.renderFestivals()}
                </tbody>                  
            </Table>
            
        </div>
    
    );
    
            
        
}

}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    return { places: state.places };
  };
  
  export default connect(mapStateToProps, {
    getPlaces: getPlacesAction,
  })(Festival);