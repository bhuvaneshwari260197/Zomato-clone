import {BrowserRouter, Route,Switch} from 'react-router-dom'

import Home from './Home'
import Filter from './Filter'
import Details from './Details'
//import Error from './error'

import Headers from './Header'
//import Contact from './contact'
//import addRestaurant from './addRestaurant'

function Router(){
    return(
        <BrowserRouter>
        <Headers/>
        <Switch>
            
            <Route exact path='/' component={Home}></Route>
            <Route path='/filter' component={Filter}></Route>
            <Route path='/details' component={Details}></Route>
           
            
        </Switch>
        
        </BrowserRouter>
    )
}
export default Router;
{/*import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Header from './Header';
import Footer from './footer';



function Router(){
    return(

        <BrowserRouter>
        <Header />
        <Switch>
        <Route exact path="/" component={ Home  }></Route>
        <Route path="/filter" component={ Filter }></Route>
        <Route path="/details" component={ Details }></Route>
        <Switch/>
        <Footer />
        </BrowserRouter >
    )
}

export default Router;*/}

