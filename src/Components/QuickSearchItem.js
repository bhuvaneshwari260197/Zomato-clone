import React from 'react';
import{ withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component {
    handleNavigate=(mealTypeId)=>{
        const locationId = sessionStorage.getItem('locationId')
        if(locationId){
            this.props.history.push(`/filter?mealtype=${mealTypeId}&location=${locationId}`);
        }else{
    
        this.props.history.push(`/filter?mealtype=${mealTypeId}`);
        }
    }
        render() {
            const {mealtypes}= this.props;
            return(
                <div  onClick={()=>this.handleNavigate(mealtypes.meal_type)} key={mealtypes.meal_type} className="col-sm-12 col-md-6 col-lg-4 box1 ">
                            <img src={`${mealtypes.image}`} className="bf" alt="" />
                            <p className="content">{mealtypes.name}</p>
                            <p className="content2">{mealtypes.content}</p>
                        </div>


            )
        }
    }
    export default withRouter(QuickSearchItem);