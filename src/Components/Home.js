import React from 'react';
import axios from 'axios';
import Wallpaper from './Wallpaper';
import Quicksearch from './QuickSearch';


class Home extends React.Component{
    
    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }
    }
    componentDidMount(){
        sessionStorage.clear();
        axios({
            url:"https://secret-eyrie-41384.herokuapp.com/locations",
            method:'GET',
            header:{'Content-Type':'application/json'}
        })
        .then(response=>{ this.setState({ locations : response.data.locations}) })
        .catch()

        axios({
            url:"https://secret-eyrie-41384.herokuapp.com/mealtypes",
            method:'GET',
            header:{'Content-Type':'application/json'}
        })
        .then(response=>{this.setState({ mealtypes : response.data.mealtypes }) })
        .catch()



    }
    render(){
        const{  locations, mealtypes} = this.state;
        return(
<div> 
     <Wallpaper locationsData={locations} />
    <Quicksearch QuicksearchData={mealtypes}/>
</div>
        )
        }
} 
export default Home;

