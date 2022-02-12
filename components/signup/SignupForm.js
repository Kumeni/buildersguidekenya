import style from './SignupForm.module.css'
import {useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Validator from 'validatorjs'
import axios from 'axios'
import {useRouter} from 'next/router'
import LoadingAnimation from '../loadingAnimation/LoadingAnimation'
import FormBody from '../login/FormBody'
import BgkLogo from '../login/BgkLogo'
import Heading1 from '../login/Heading1'

function SignupForm(props) {
    const [state1, setState1] = useState(0);
    const [state2, setState2] = useState(0);

    const input1 = useRef(null);
    const input2 = useRef(null);
    const loadingAnimation = useRef(null);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const router = useRouter();

    const data = {
        username:username,
        email:email,
        password:password,
    }

    const regExp =/-/;
    const rules = {
        username:'required|string',
        email:'required|email',
        password:'required'
    }

    //Start of functions dealing with form update
    const handleUsernameChange = event => {
        setUsername(event.target.value);
        setUsernameError('');
    }
    const handleEmailChange = event => {
        setEmail(event.target.value);
        setEmailError('');
    }
    const handlePasswordChange = event => {
        setPassword(event.target.value)
        setPasswordError('');
    }
    const handleConfirmPasswordChange = event => {
        console.log()
        setConfirmPassword(event.target.value)
        setPasswordError('');
    }
    //End of functions dealing with form update

    //Utility Functions
    const handleVisible1 = event => {
        if(state1){
            input1.current.type = 'password';
            event.target.style.color='black';
            setState1(0)
        } else {
            input1.current.type = 'text';
            event.target.style.color='blue';
            setState1(1);
        }
    }

    const handleVisible2 = (event) => {
        if(state2){
            input2.current.type = 'password';
            event.target.style.color='black';
            setState2(0)
        } else {
            input2.current.type = 'text';
            event.target.style.color='blue';
            setState2(1);
        }
    }
    //Utility functions

    //Sending Data to the server
    const handleSubmit = event => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            setPasswordError('Passwords not same!');
        } else {
            if(regExp.test(username)){
                setUsernameError('Invalid username, don\'t use [-]');
                return 0;
            }
            const validator = new Validator(data, rules);
            if(validator.passes()){
                loadingAnimation.current.style.zIndex = '0';
                axios({
                    url:props.baseURL + '/auth/local/register',
                    method:'post',
                    data:{
                        username:username,
                        email:email,
                        password:password
                    }
                })
                .then(res=>{
                    props.setLoginData(res.data);
                    return res;
                })
                .catch(error =>{
                    loadingAnimation.current.style.zIndex = '-1';
                    console.log(error.response.data);
                    if (error.response.data.message[0]){
                        if(error.response.data.message[0].messages[0].message === "Email is already taken."){
                            setEmailError(error.response.data.message[0].messages[0].message);
                        } else if (error.response.data.message[0].messages[0].message === "Username already taken"){
                            setUsernameError(error.response.data.message[0].messages[0].message);
                        }
                    }
                    return error;
                })
                .then(res=>{
                    if(res.status === 200 && res.statusText === 'OK'){
                        props.setLoginData(res.data);
                        let initialPathname = sessionStorage.getItem("initialPathname");
                        let initialQuery = sessionStorage.getItem("initialQuery");
                        if(initialPathname === undefined){
                            router.push("/")
                        } else {
                            sessionStorage.removeItem("initialPathname");
                            if(initialQuery == undefined){
                                router.replace(initialPathname);
                            } else {
                                sessionStorage.removeItem("initialQuery");
                                router.replace(initialPathname +"?v=" + initialQuery);
                            }
                        }
                    }
                })
            } else {
                setEmailError(validator.errors.first('email'));
                setUsernameError(validator.errors.first('username'));
                setEmailError(validator.errors.first('email'));
                setPasswordError(validator.errors.first('password'));
            }
        }
    }
    //Sending Data to the server

    return (
        <FormBody>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title>Sign up | Builders Guide Kenya</title>
            </Head>
            <BgkLogo />
            <Heading1 heading={"Sign up"} />
            <form className={style.signUpForm} onSubmit={(event)=>handleSubmit(event)}>
                <div className={style.inputContainer}>
                    <label htmlFor='username'>Username<span className={style.required}>*</span></label><br />
                    <input id='username' type='text' onChange={(event)=>handleUsernameChange(event)} required autoComplete='off' autoFocus/>
                    <span className={'text-danger ' + style.error}>{usernameError}</span>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor='email'>Email<span className={style.required}>*</span></label><br />
                    <input id='email' type='email' onChange={(event)=>handleEmailChange(event)} required autoComplete='off'/>
                    <span className={'text-danger ' + style.error}>{emailError}</span>
                </div>
                <div className={style.passwordContainer}>
                    <label htmlFor='password'>Password<span className={style.required}>*</span></label><br />
                    <div className={'d-flex ' + style.input}>
                        <input ref={input1} className={'flex-grow-1'} id='password' type='password' onChange={(event)=>handlePasswordChange(event)} required minLength='6'/>
                        <span onClick={(event)=>handleVisible1(event)}><i className={state1 ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                    </div>
                </div>
                <div className={style.passwordContainer}>
                    <label htmlFor='passwordConfirmation'>Confirm password<span className={style.required}>*</span></label> <br />
                    <div className={'d-flex ' +style.input}>
                        <input ref={input2} className={'flex-grow-1'} id='passwordConfirmation' onChange={(event)=>handleConfirmPasswordChange(event)} type='password' required minLength='6'/>
                        <span onClick={(event)=>handleVisible2(event)}><i className={state2 ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                    </div>
                    <span className={'text-danger ' + style.error}>{passwordError}</span>
                </div>
                <div className={style.submit}>
                    <input 
                        className={'btn btn-block btn-primary ' + style.btn} 
                        type='submit' 
                        value='signup'
                    />
                    <LoadingAnimation loadingAnimation={loadingAnimation} /> 
                </div>
                
                <p className={style.login}>Already in buildersguidekenya?<Link href={'/login'}><a> login</a></Link></p>
            </form>
        </FormBody>
    )
}

export default SignupForm
