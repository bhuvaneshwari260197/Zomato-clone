import React from 'react';
import queryString from 'query-string';
import "../Styles/Filter.css";
import axios from 'axios';

class Filter extends React.Component {
  constructor(){
    super();
    this.state = {
      restaurants: [],
      locations:[],
      page:[],
      location:undefined,
      mealtype:undefined,
      cuisine:[],
      lcost:undefined,
      hcost:undefined,
      sort:undefined,
      page:undefined
     
    }
  }
  componentDidMount(){
    const qs = queryString.parse(this.props.location.search);
    const { mealtype, location}=qs;

    const filterObj = {
      mealtype: mealtype,
      location: location
    };

    axios({
      url:'https://secret-eyrie-41384.herokuapp.com/filter',
      method:'POST',
      header:{'Content-Type':'application/json'},
      data: filterObj

  })
  .then(response=>{ this.setState({ restaurants : response.data.restaurants , mealtype:mealtype,  location:location, page: response.data.page }) 
})
  .catch()

  
  axios({
    url:"https://secret-eyrie-41384.herokuapp.com/",
    method:'GET',
    header:{'Content-Type':'application/json'}
})
.then(response=>{ this.setState({ locations : response.data.locations}) })
.catch()
  }

  handleLocationChange = (event)=> {
    const location = event.target.value;
    const {mealtype, cuisine, lcost, hcost, sort, page} = this.state
    const filterObj = {
          location: location,
           mealtype :mealtype,
           cuisine: cuisine.length == 0 ? undefined : cuisine,
           lcost:lcost,
           hcost:hcost,
           sort:sort, 
           page:page

    };
    axios({
      url:"https://secret-eyrie-41384.herokuapp.com/filter",
      method:'POST',
      header:{'Content-Type':'application/json'},
      data: filterObj

  })
  .then(response=>{ this.setState({ restaurants : response.data.restaurants, location}) 
})
  .catch()

  this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}`);
 }
 
 handleSortChange= (sort)=>{
  const {mealtype , location, cuisine, lcost,  hcost, page} = this.state
  const filterObj = {
        location: location,
         mealtype :mealtype,
         cuisine : cuisine.length == 0 ? undefined : cuisine,
         lcost:lcost,
         hcost:hcost,
         sort:sort, 
         page:page
         

  };
  axios({
    url:"https://secret-eyrie-41384.herokuapp.com/filter",
    method:'POST',
    header:{'Content-Type':'application/json'},
    data: filterObj

})
.then(response=>{ this.setState({ restaurants : response.data.restaurants , sort:sort,page: response.data.page }) 
})
.catch()
 }



handleCostChange = (lcost, hcost)=>{

  const {mealtype, location, sort, cuisine, page } = this.state;
    const filterObj = {
        location: location,
         mealtype :mealtype,
         cuisine : cuisine.length == 0 ? undefined : cuisine,
         lcost:lcost,
         hcost:hcost,
         sort:sort, 
         page:page

  };
  axios({
    url:"https://secret-eyrie-41384.herokuapp.com/filter",
    method:'POST',
    header:{'Content-Type':'application/json'},
    data: filterObj

})
.then(response=>{ this.setState({ restaurants : response.data.restaurants , lcost, hcost , page: response.data.page  }) 
})
.catch()
}

handlePageChange = (page)=>{

  const {mealtype, location, sort, cuisine, lcost, hcost } = this.state;
    const filterObj = {
        location: location,
         mealtype :mealtype,
         cuisine : cuisine.length == 0 ? undefined : cuisine,
         lcost:lcost,
         hcost:hcost,
         sort:sort, 
         page:page

  };
  axios({
    url:"https://secret-eyrie-41384.herokuapp.com/filter",
    method:'POST',
    header:{'Content-Type':'application/json'},
    data: filterObj

})
.then(response=>{ this.setState({ restaurants : response.data.restaurants , page : response.data.page }) 
})
.catch()
}


handleCuisineChange = (cuisineId)=>{
const {mealtype, location, cuisine, lcost, sort, hcost, page} = this.state;

const index= cuisine.indexOf(cuisineId) ;
if( index >=0 ){
  cuisine.splice( index, 1);
}
else{
  cuisine.push(cuisineId);
}


const filterObj = {
      location: location,
       mealtype :mealtype,
       cuisine : cuisine.length == 0 ? undefined : cuisine,
       lcost,
       hcost,
       sort, 
       page

};
axios({
  url:"https://secret-eyrie-41384.herokuapp.com/filter",
  method:'POST',
  header:{'Content-Type':'application/json'},
  data: filterObj

})
.then(response=>{ this.setState({ restaurants : response.data.restaurants,  cuisine }) 
})
.catch()
}

handleNavigate = (id) => {
  this.props.history.push(`/details?restaurant=${id}`);
}

render() {
    const { restaurants ,locations, page }=this.state;
    return (
      <div>
        
        <div className="container fluid">
          <div className="fheading">Breakfast Places in Mumbai</div>

          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <div className="collapse-filter-block">
                <div className="collapse-head">Filters/Sort</div>
                <div className="fas fa-chevron-down down-arrow me-3 mt-2 chervon"
                  data-bs-toggle="collapse" data-bs-target="#filter" aria-expanded="false"></div>
              </div>
              <div className="filtercontainer" id="filter">
                <div className="filter-heading">Filters</div>
                <div className="SelectLocation"> <label>Select Location</label></div>
                <select className="" onChange={this.handleLocationChange}>
                                                                                        <option value="0">Please select a location</option>
                                                                                        {locations.map((locations, index ) => {
                                return <option key={locations.location_id} value={locations.location_id}>{`${locations.name}, ${locations.city}`}</option>
                            })}
                                                                                        

                                                                                </select>
                <div className="subhead">Cuisine</div>
                <div className="checkbox">
                  <label><input type="checkbox" name="cuisine" onChange={()=> this. handleCuisineChange(1)}/>North Indian</label>
                </div>
                <div className="checkbox">
                  <label><input type="checkbox" name="cuisine" onChange={()=> this. handleCuisineChange(2)}/>South Indian</label>
                </div>
                <div className="checkbox">
                  <label><input type="checkbox" name="cuisine" onChange={()=> this. handleCuisineChange(3)}/>Chinese</label>
                </div>
                <div className="checkbox">
                  <label><input type="checkbox" name="cuisine"  onChange={()=> this. handleCuisineChange(4)} />Fast Food</label>
                </div>
                <div className="checkbox">
                  <label><input type="checkbox" name="cuisine"   onChange={()=> this. handleCuisineChange(5)}/>Street Food</label>
                </div>

                <div className="subhead">Cost for two</div>
                <div className="checkbox1">
                  <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(1, 500)} />Less than &#8377; 500</label>
                </div>
                <div className="checkbox1">
                  <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(500, 1000)} /> &#8377; 500 to  &#8377;1000</label>
                </div>
                <div className="checkbox1">
                  <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(1000, 1500)}/> &#8377; 1000 to  &#8377;1500</label>
                </div>
                <div className="checkbox1">
                  <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(1500, 2000)} /> &#8377; 1500 to  &#8377;2000</label>
                </div>
                <div className="checkbox1">
                  <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(20000, 50000)} /> &#8377; 2000+</label>
                </div>

                <div className="subhead">Sort</div>
                <div className="checkbox1">
                  <label><input type="radio" name="sort"  onChange={()=>this.handleSortChange(1)}/>Price low to high</label>
                </div>
                <div className="checkbox1">
                  <label><input type="radio" name="sort" onChange={()=>this.handleSortChange(-1)}/>Price high to low</label>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-sm-12">
              {restaurants.length > 0 ? restaurants.map((item, index)=>{
                return   <div className="item" key={item,index } onClick={()=> this.handleNavigate(item._id)}>  
                <div className="row">
                  <div className="col-3 col-sm-3 px-4 py-4">
                    <img className="img" src="./Assets/bakeshop.png" alt="image" />
                  </div>
                  <div className="col-9 col-sm-9">
                    <div className="head1">{item.name}</div>
                    <div className="head2">{item.locality}</div>
                    <div className="head3">{item.city}</div>
                  </div>
                  <div className="col-12">
                    <hr />
                  </div>
                  <div className="col-4 col-sm-4">
                    <div className="ms-4 mt-4 cuisine1">CUISINES:</div>
                    <div className="ms-4 cuisine">COST FOR TWO:</div>
                  </div>
                  <div className="col-8 col-sm-8">
                    <div className="mt-4 cuisine">{item.cuisine.map((val)=>`${val.name}, `)}</div>
                    <div className="cuisine">{item.min_price}</div>
                  </div>
                </div>
              </div>
              }) : <div className="records">No Records Found</div>}


             
              <div className="row">
                {restaurants.length > 0 ? <div className="mt-2 col-lg-12 col-sm-12">
                
                     <a class="active" className="page-item" href="#" onClick={() => {this.handlePageChange(1)}} >1</a>
                                <a  href="#" className="page-item" onClick={() => {this.handlePageChange(2)}}>2</a>
                                <a href="#"   className="page-item" onClick={() => {this.handlePageChange(3)}}>3</a>
                                <a href="#"   className="page-item" onClick={() => {this.handlePageChange(4)}}>4</a>
                                <a href="#"  className="page-item" onClick={() => {this.handlePageChange(5)}}>5</a>
                                <a href="#"   className="page-item"onClick={() => {this.handlePageChange(6)}}>6</a>
                                <a href="#"   className="page-item"> &raquo;</a>
                </div> : <div class="NotFound">Records Not Found...</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
  
    )
  }
}

export default Filter;
