import React from 'react';
import "../Styles/home.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component {
        constructor(){
                super();
                this.state = {
                        restaurants : [],
                        searchText : undefined,
                        suggestions:[]
                }
        }
        handleLocationChange=( event) =>{
                const locId = event.target.value;
                sessionStorage.setItem('locationId', locId);

         axios({
                url:`https://secret-eyrie-41384.herokuapp.com/restaurants/${locId}`,
                method:'GET',
                header:{'Content-Type':'application/json'}
                
            
            })
            .then(response=>{ this.setState({ restaurants : response.data.restaurants  }) 
            })
            .catch()
        }
            handleInputChange  = (event)=>{
                    const{ restaurants }=this.state;
                    const searchText= event.target.value;

                    let searchRestaurants = [];
            if(searchText){
                    searchRestaurants= restaurants.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()));
            }
          this.setState({  suggestions: searchRestaurants, searchText })  }
     
          selectedText = (resitem) => {
                this.props.history.push(`/details?restaurant=${resitem._id}`);
            }

          renderSuggestions = ()=>{
          const { suggestions, searchText } =this.state;

          if(suggestions.length === 0 && searchText){
                  return <li>No items to display</li>;
          }

return(
        <div className="uldropdown">
        <ul>
        {
         suggestions.map((item,index)=> (<li key ={index} onClick ={()=> this.selectedText(item)}>{`${item.name} , ${item.city}`}</li> ))
        }
        </ul>
        </div>
);
}

        render() {
              
                const { locationsData }= this.props;
                return (
                        <div>
                                <div className="container-fluid background-image">

                                        <img src="./Assets/image.png" height="500" width="100%" alt="" />
                                        <div class="wallpaper-content">
                                             

                                                <div className="row text-center px-4">
                                                        <div className="col-12 pt-5 px-3 py-5 my-5">
                                                                <p className="hlogo">e!</p>
                                                        </div>
                                                        <div className="row text-center">
                                                                <div className="col-12 pt-4 my-0">
                                                                        <p className="header1">Find the best restaurants,cafes and bars</p>
                                                                </div>
                                                                <div className="row">
                                                                        <div className="col-lg-3 col-md-1 col-sm-0"></div>
                                                                        <div className="col-lg-3 col-md-4 col-sm-6 text-start pt-4">
                                                                                <select  className="dropdown1" onChange={this.handleLocationChange}>
                                                                                        <option value="1">Please select a location</option>
                                                                                        {locationsData.map((locations, index ) => {
                                return <option key={locations.location_id} value={locations.location_id}>{`${locations.name}, ${locations.city}`}</option>
                            })}
                                                                                        

                                                                                </select>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-4 col-sm-6 text-start pt-4">
      
                        <div>
                            <span className="glyphicon glyphicon-search search"></span>
                            <div>
                                <input  className="dropdown" type="text" placeholder="Please Enter Restaurant Name" onChange={this.handleInputChange} />
                                {this.renderSuggestions()}
                            </div>
                        </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-1 col-sm-0"></div>
                                                                </div>
                                                        </div>
                                                </div>

                                        </div>
                                </div>

                        </div>


        )
        }
}
export default withRouter(Wallpaper);