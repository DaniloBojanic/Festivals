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
            search: {name:"", placeId: null},
            pageNo: 0, totalPages: 0,
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

        if (this.state.search.name != "") {
            config.params.name = this.state.search.name;
        }  
        if (this.state.search.placeId != null) {
            config.params.placeId = this.state.search.placeId;
        }

        Axios.get('/festivals', config)
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({
                     festivals: res.data, 
                      totalPages : res.headers["total-pages"]});
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

    placeChange(e,id,name,dateStart,dateEnd,ticketPrice,availableTickets){
        this.placeSelectionChanged(e);
        this.edit(id,name,dateStart,dateEnd,ticketPrice,availableTickets);
    }

    searchValueInputChange(event) {
        let control = event.target;
    
        let name = control.name;
        let value = control.value;
    
        let search = this.state.search;
        search[name] = value;
    
        this.setState({ search: search });
        this.getFestivals(0);
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
                        
                    <option value={-1}></option>
          {this.state.places.map((place) => {
            return (
              <option value={place.id} key={place.id}>
                {place.city}
              </option>
            );
          })}
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
            alert('Festival location successfully edited');
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
                    <Form.Control as="select" id="place" name="placeId" onChange={(e)=> this.searchValueInputChange(e)}>
                       <option value={-1}></option>
                         {this.state.places.map((place) => {
                         return (
                            <option value={place.id} key={place.id}>
                             {place.city}, {place.country}
                      </option>
                                  );
                                  })} 
                       
                    </Form.Control>
                    </InputGroup>

                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control id="name" placeholder="name of festival" name="name" onChange={e=> this.searchValueInputChange(e)}></Form.Control>
                </Form>
                <br/>
            </div>
             
             <Button variant="success" onClick={(e) => this.goToCreate()}>Create festival</Button>
             <div style={{float:"right"}}>
                        <Button disabled={this.state.pageNo==0} className="btn btn-primary" onClick={() =>this.getFestivals(this.state.pageNo = this.state.pageNo - 1)}>Previous</Button>
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