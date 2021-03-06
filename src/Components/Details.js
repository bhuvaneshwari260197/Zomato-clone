import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/details.css';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
    
    
const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'antiquewhite',
            border: 'solid 1px brown',
            width:"40%",
           height: "450px"
        },
    };

   {/*} const ImageBOXStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-49%, -49%)',
          backgroundColor: 'black',
          border: 'solid 1px brown',
          width: '80%',
        height: '90%',
        
        },
      };*/}
    
    class Details extends React.Component {
        constructor() {
            super();
            this.state = {
                restaurantData:{},
                resId: undefined,
                itemsModalIsOpen: false,
                galleryModalIsOpen:false,
                menuItems :[],
                subTotal:0,
                formModalIsOpen:false,
                name: undefined,
                email: undefined,
                conatctNumber: undefined,
                address: undefined,
                imageModalIsOpen:false,
                PaymentModalIsOpen:false
                
            }



        }
    
        componentDidMount() {
            const qs = queryString.parse(this.props.location.search);
            const resId = qs.restaurant;
    
            axios({
                method:'GET',
                url: `https://secret-eyrie-41384.herokuapp.com/restaurant/${resId}`,
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {
                    this.setState({ restaurantData: response.data.restaurant,resId:resId})
                })
                
                .catch()
        }
    handleOrder = () =>{
        const {resId} = this.state;
        
        axios({
            url: `https://secret-eyrie-41384.herokuapp.com/menuitems/${resId}`,
            method:'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(respone => {
                this.setState({ menuItems : respone.data.Items, itemsModalIsOpen: true } )
            })
            .catch()
        }
        handleModalState = (state, value) => {
            if (state == 'formModalIsOpen' && value == true) {
                this.setState({ itemsModalIsOpen: false });
            }
            this.setState({ [state]: value });
        }

        addItems = (index, operationType) => {
  
            let total = 0;
            
            const items = [...this.state.menuItems];
            
            const item = items[index];
         
            
            if (operationType === 'add') 
            { 
                 item.qty += 1; 
            
            }
            
            else {
            
            item.qty -=  1;
            
            }
            
            items[index]  =item;
            
            items.map((item) => {
            
           return total += item.qty * item.price;
            })
            
            this.setState({ itemsList: items, subTotal: total });
            
        }
        handleInputChange = (event, state) => {
            this.setState({ [state]: event.target.value });
        }
        isDate(val) {
            // Cross realm comptatible
            return Object.prototype.toString.call(val) === '[object Date]'
        }
    
        isObj = (val) => {
            return typeof val === 'object'
        }
    
        stringifyValue = (val) => {
            if (this.isObj(val) && !this.isDate(val)) {
                return JSON.stringify(val)
            } else {
                return val
            }
        }
    
        buildForm = ({ action, params }) => {
            const form = document.createElement('form')
            form.setAttribute('method', 'post')
            form.setAttribute('action', action)
    
            Object.keys(params).forEach(key => {
                const input = document.createElement('input')
                input.setAttribute('type', 'hidden')
                input.setAttribute('name', key)
                input.setAttribute('value', this.stringifyValue(params[key]))
                form.appendChild(input)
            })
            return form
        }
    
        post = (details) => {
            const form = this.buildForm(details)
            document.body.appendChild(form)
            form.submit()
            form.remove()
        }
    
        getData = (data) => {
            return fetch(`https://secret-eyrie-41384.herokuapp.com/payment`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).catch(err => console.log(err))
        }
    
        Payment = () => {
            const { subTotal, email } = this.state;
    
            const paymentObj = {
                amount: subTotal,
                email
            };
    
            this.getData(paymentObj).then(response => {
                var information = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: response
                }
                this.post(information)
            })
        }
        

        render() {
            const { restaurantData, PaymentModalIsOpen,  itemsModalIsOpen, menuItems, formModalIsOpen, galleryModalIsOpen, subTotal} = this.state;
            console.log(restaurantData);
            return (
                <div>
                    <div>
                  

<img className="Topimg" src={`../${restaurantData.image}`}alt="Sorry no img" />

                        <button class="button" onClick={() => this.handleModalState('galleryModalIsOpen', true)}>Click to see Image Gallery</button>
                    </div>
                    <div class="heading">{restaurantData.name}</div>
                    <button class="btn-order" onClick={this.handleOrder}>Place Online Order</button>
                    <div>
                    <a href="https://api.whatsapp.com/send?phone=918074545837&amp;text=." className="float" target="_blank">
<img src="./Assets/whatsappp.png"  width="50%" height="50px"/>
 
</a>
</div>
                    <div class="tabs">
                        <div class="tab">
                            <input type="radio" id="tab-1" name="tab-group-1" checked />
                            <label for="tab-2">Overview</label>
                            <div class="content">
                                <div class="about">About this place</div>
                                <div class="head">Cuisine</div>
                                <div class="value">{restaurantData && restaurantData.cuisine ? restaurantData.cuisine.map(item => `${item.name}, `):null}</div>
                                <div class="head">Average Cost</div>
                                <div class="value">&#8377; {restaurantData.min_price} for two people(approx)</div>
                            </div>
                        </div>
    
                        <div class="tab">
                            <input type="radio" id="tab-2" name="tab-group-1" />
                            <label for="tab-2">Contact</label>
                            <div class="content">
                                <div class="head">Phone Number</div>
                                <div class="value">{restaurantData.contact}</div>
                                <div class="head">{restaurantData.name}</div>
                                <div class="value">{`${restaurantData.locality}, ${restaurantData.city}`}</div>
                            </div>
                        </div>
                    </div>
                    <Modal
                    isOpen={itemsModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('itemsModalIsOpen', false)}></div>
                        <div >
                            <h3 className="restaurantData-name">{restaurantData.name}</h3>
                            <h3 className="item-total">SubTotal : {subTotal}</h3>
                            <button className="btn btn-danger order-button" onClick={() => this.handleModalState('formModalIsOpen', true)}> Pay Now</button>
                            {menuItems.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"> <img className="card-img-center title-img" src={`../${item.image}`} style={{ height: '75px', width: '75px', 'border-radius': '20px' }} />
                                                {item.qty == 0 ? <div><button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button></div> :
                                                    <div className="add-number"><button onClick={() => this.addItems(index, 'subtract')}>-</button><span style={{ backgroundColor: 'white' }}>{item.qty}</span><button onClick={() => this.addItems(index, 'add')}>+</button></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div>
                        </div>
                        </div>
                    </Modal>

                    <Modal
                            isOpen={formModalIsOpen}
                               style={customStyles}
                           >
                               <div  className="model">
                                   <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('formModalIsOpen', false)}></div>
                                   <h2>{restaurantData.name}</h2>
                                  <label>Name</label>
                                   <input style={{ width: '300px' }} type="text" placeholder="Enter your name"  className="form-control" onChange={(event) => this.handleInputChange(event, 'name')}required/>
                                   <label>Email</label>
                                   <input style={{ width: '300px' }} type="text" placeholder="Enter your email" className="form-control" onChange={(event) => this.handleInputChange(event, 'email')} required/>
                                   <label>Mobile Number</label>
                                   <input style={{ width: '300px' }} type="text" placeholder="Enter your number" className="form-control" onChange={(event) => this.handleInputChange(event, 'contactNumber')}required/>
                                   <label>Address</label>
                                   <textarea  style={{ width: '300px' }}  placeholder="Enter your address" className="form-control" onChange={(event) => this.handleInputChange(event, 'address')}required/>
                                   <button style={{ float: 'right', marginTop: '10px' }} className="btn btn-danger" onClick={this.Payment}>Proceed</button>
                               </div>
                           </Modal>

                          <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('galleryModalIsOpen', false)}></div>
                        <Carousel
                            infiniteLoop={false}
                            showThumbs={false}
                            autoPlay={false}
                        >
                          {restaurantData && restaurantData.thumb && restaurantData.thumb.map((image) => {
                                return <div>
                                    <img src={image} height="240px" width="100px" />
                                </div>
                            })}
                            

                        </Carousel>
                        
                    </div>
                </Modal>



                        

</div>
    
            )
        }
    }
    
    export default Details;
