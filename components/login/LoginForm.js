import React, {useState, useRef, useEffect} from 'react'
import style from './LoginForm.module.css'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/router'
import Validator from 'validatorjs'
import LoadingAnimation from '../loadingAnimation/LoadingAnimation'
import BgkLogo from './BgkLogo'
import FormBody from './FormBody'
import Heading1 from './Heading1'

function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [identifierError, setIdentifierError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [state2, setState2] = useState(0);


    const router = useRouter();

    const input2 = useRef(null);
    const loadingAnimation = useRef(null);
    const submit = useRef(null)

    const regCheck =/\</;


    const handleUsername = (event) => {
        setIdentifierError('');
        setLoginError('');
        setUsername(`${event.target.value}`);
    }

    const handlePassword = (event) => {
        setPasswordError('');
        setLoginError('');
        setPassword(`${event.target.value}`);
    }

    const data = {
        identifier:username,
        password:password
    }

    const rules1 = {
        identifier:'required|string',
        password:'required'
    }

    const rules2 = {
        identifier:'required|email',
        password:'required'
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

    function handleSubmit(event){
        event.preventDefault();

        const validation1 = new Validator(data, rules1);
        const validation2 = new Validator(data,rules2)
        if(validation1.passes || validation2.passes){
            if(submit.current)
                submit.current.focus();
            loadingAnimation.current.style.zIndex = '0';
            axios({
                url:props.baseURL + '/auth/local',
                method:'post',
                data:{
                    identifier:username,
                    password:password
                }
            })
            .then(res => {
                if(res.status == 200 && res.statusText === 'OK'){
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
            .catch(err => {
                setLoginError('Invalid email/username or password');
                loadingAnimation.current.style.zIndex = '-1';
                console.log(err);
            })
        }
    }

    return (
        <FormBody>
            <Head>
                <title>Login</title>
            </Head>
            <BgkLogo />
            <Heading1 heading={"Login"}/>
            
            <form className={style.form} onSubmit={(event)=>handleSubmit(event)}>
                <div className={style.inputContainer}>
                    <label htmlFor='username'>Email/username<span className={style.required}>*</span></label><br />
                    <input  id='username' name='username'type='text' onChange={handleUsername} required autoComplete='off' autoFocus/>
                    <span className={'text-warning'}>{identifierError? identifierError + '!': ''}</span>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor='password'>Password<span className={style.required}>*</span></label><br />
                    <div className={'d-flex ' +style.input}>
                        <input ref={input2} className={'flex-grow-1'} name="password" id='password' onChange={(event)=>handlePassword(event)} type='password' required minLength='6'/>
                        <span onClick={(event)=>handleVisible2(event)}><i className={state2 ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                    </div>
                    <span className={'text-warning'}>{passwordError? passwordError + '!': ''}</span>
                </div>
                <Link href='/reset-password'><a className={style.fPassword}>Forgot your password?</a></Link>
                <div className={style.submit}>
                    <input 
                        ref={submit}
                        className={'btn btn-primary btn-block'}
                        type='submit'
                        value='Login'
                    />
                    <LoadingAnimation loadingAnimation={loadingAnimation} /> 
                </div>
                <span className={'text-danger '+ style.loginError}>{loginError? loginError+'!':''}</span>
                <p className={style.signUp}>Not on buidersguidekenya yet?<Link href='/signup'><a> sign up</a></Link></p>
            </form>
        </FormBody>
    )
}

export default LoginForm
