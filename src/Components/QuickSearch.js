
import React from 'react';
import "../Styles/home.css";
import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component {
   
        render() {
            const { QuicksearchData }= this.props;
                return (
                        <div>
                            <div className="container ">
                    <div className="row">
                        <div className="col-12">

                            <p className="Quickksearches">Quick Searches</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">

                            <p className="discover">Discover Restaurents by type of Meal</p>
                        </div>

                    </div>

                    <div className="row">
                        { QuicksearchData.map((mealtypes)=>{
                            return <QuickSearchItem mealtypes={mealtypes}/>
                            
                        })}



                    </div>

                </div>
                        </div>
                )
         
                
}}
export default QuickSearch;