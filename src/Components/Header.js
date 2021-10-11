import React from 'react';
import '../Styles/headers.css';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'solid 1px brown',
        margin:'10px'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: undefined,
            createAccountModalIsOpen:false,
            email: '',
            pwd: '',
            FN: '',
            LN: '',

        }
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false })
    }

    responseFacebook = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.name, loginModalIsOpen: false })
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined });
    }

    handlecreateaccount=() =>{
        this.setState({ loginModalIsOpen: true });

    }
    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    signUp = () => {
        this.setState({ signUpModalIsOpen: true });
    }

    login = () => {
        this.setState({ loginModalIsOpen: true });
    }

    handleCancelSignUp = () => {
        this.setState({ signUpModalIsOpen: false });
    }

    handleCancelLogin = () => {
        this.setState({ loginModalIsOpen: false });
    }

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }


    handleSignUp = () => {
        const { email, pwd, FN, LN } = this.state;
        const signUpObj = {
            email: email,
            password: pwd,
            firstname: FN,
            lastname: LN
        };
        axios({
            method: 'POST',
            url: 'http://localhost:1997/user',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
        })
            .then(response => {
                if (response.data.message == 'User SignedUp Sucessfully') {
                    this.setState({
                        signUpModalIsOpen: false,
                        email: '',
                        pwd: '',
                        FN: '',
                        LN: ''
                    });
                    alert(response.data.message);
                }
            })
            .catch(err => console.log(err))
    }
  
    handelInputChange=(event,state)=>{
        this.setState({[state]:event.target.value})
    }
    handleSignUp = () => {
        const { email, password,firstName,lastName } = this.state;
        const signUpObj = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        axios({
            method: 'POST',
            url: 'http://localhost:1997/user',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
        })
            .then(response => {
                if (!email || !password || !firstName || !lastName) {
                   toast.info("Please provide all details");
                }
                if (response.data.Message === 'User Signed Sucessfully') {
                    this.setState({
                        createAccountModalIsOpen: false,
                        isLoggedIn:true,
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: ''
                    });
                  
                    toast.success(response.data.Message,{position:"top-center"});
                }
            })
            .catch(err => console.log(err))
}
signUpClick=()=>{
    this.setState({loginModalIsOpen:false,createAccountModalIsOpen:true})
}
loginClick=()=>{
    this.setState({loginModalIsOpen:true,createAccountModalIsOpen:false})
}

    render() {
        const { loginModalIsOpen, isLoggedIn, loggedInUser,email, pwd, FN, LN,createAccountModalIsOpen } = this.state;
        return (
            <div>
                <div className="app-header">
                    <div className="header-logo">
                        <b>e!</b>
                    </div>
                    {isLoggedIn ? <div className="user-button-gp">
                        <div className="user-login">{loggedInUser}</div>
                        <div className="user-signup" onClick={this.handleLogout}>Logout</div>
                    </div> :
                        <div className="user-button-gp">
                            <div className="user-login" onClick={this.handleLogin}>Login</div>
                            <div className="user-signup" onClick={this.handlecreateaccount}>Create an account</div>
                            

                        </div>
                        
                    }
                     <Modal

style={customStyles}
>
<div>
    <h3>SignUp User</h3>
    <div><span>Email : </span><input type="text" value={email} onChange={(event) => this.handleChange(event, 'email')} /></div>
    <div><span>Password : </span><input type="password" value={pwd} onChange={(event) => this.handleChange(event, 'pwd')} /></div>
    <div><span>First Name: </span><input type="text" value={FN} onChange={(event) => this.handleChange(event, 'FN')} /></div>
    <div><span>Last Name: </span><input type="text" value={LN} onChange={(event) => this.handleChange(event, 'LN')} /></div>
    <button onClick={this.handleSignUp} class="btn btn-sm btn-primary">SignUp</button>
    <button class="btn btn-sm btn-primary" onClick={this.handleCancelSignUp}>Cancel</button>
</div>
</Modal>
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                    <div class="login-heading">Sign Up</div>
                        <div style={{ marginBottom: '15px', }}>
                        <GoogleLogin
                            clientId="548912805946-15dujdr9f8pnghrtb76iqhtj1qm148bd.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        </div>
                        <div>
                        <div class="login-heading"></div>
                        <div style={{ marginBottom: '15px' }}>
                        <FacebookLogin
                            appId="175579314718394"
                            textButton="Continue with Facebook"
                            size="metro"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn-md fb"
                            icon="fa-facebook-square"
                        />
                        </div><br />
                        <div style={{ marginBottom: '15px' }}>
                        <button className="btn normal-login">
                        
                            <span className="glyphicon glyphicon-user user-icon"></span>  
                            Login with Credentials</button>
                            </div>
                        <hr />
                       
                 <span style={{marginLeft:"65px"}}>Don’t have account?  </span><a style={{color:"blue"}} onClick={()=>this.signUpClick()} style={{color:"#dc3545"}}>Sign UP</a>

                    </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={createAccountModalIsOpen}
                    style={customStyles}
                    overlayClassName="Overlay"
                >
                     <div>
                        <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('createAccountModalIsOpen', false)}></div>
                        <h3 className="restaurant-name rest-Name">Sign up</h3>
                        <span className="form">  <input className="fname" type="text" placeholder="Enter first name" id="fName" onChange={(event)=>this.handelInputChange(event,'firstName')} /></span>
                        <span className="form"> <input className="lname" type="text" placeholder="Enter last name" id="lName" onChange={(event)=>this.handelInputChange(event,'lastName')}/></span>
                        <div></div>
                        <div className="form"><input className="input-acc" type="text" placeholder="Enter your email" id="email" onChange={(event)=>this.handelInputChange(event,'email')}/></div>
                        <div className="form">   <input className="input-acc" type="password" id="" placeholder="Enter your password"  onChange={(event)=>this.handelInputChange(event,'password')}/></div>
                        <div><button className="btn btn-danger create" onClick={this.handleSignUp} >Create Account</button></div>
                        <div className="login-divider"></div>
                    <div className="text-center OR">or</div>

                        
                       <br/> <span style={{marginLeft:"95px"}}>Already have an account? </span><span style={{color:"#dc3545"}} onClick={()=>this.loginClick()}>Login</span>

                    </div>
                </Modal>


                
            </div>
        )
    }
}

export default Header;