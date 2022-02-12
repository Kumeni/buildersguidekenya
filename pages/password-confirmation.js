import React, {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import style from '../components/PasswordConfirmation/PasswordConfirmation.module.css'
import FormBody from '../components/login/FormBody'
import BgkLogo from '../components/login/BgkLogo'
import Heading1 from '../components/login/Heading1'

function PasswordConfirmation(props) {

    const [code, setCode] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [state1, setState1] = useState();
    const [state2, setState2] = useState();
    const [passwordError, setPasswordError] = useState();

    const router = useRouter();

    const input1 = useRef(null);
    const input2 = useRef(null);
    const container = useRef(null);

    useEffect(()=>{
        if(router.query){
            setCode(router.query.code);
        }
    }, [router])

    useEffect(()=>{
        if(container.current)
                container.current.style.minHeight = window.innerHeight+"px";
        window.addEventListener( "resize", event=> {
            if(container.current)
                container.current.style.minHeight = window.innerHeight+"px";
        })
    }, [])

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

    const handleSubmit = event =>{
        axios
            .post(props.baseURL+"/auth/reset-password", {
                code:code,
                password:password,
                passwordConfirmation:passwordConfirmation,
            })
            .then( res => {
                console.log("Your password has been reset!");
            })
            .catch( err => {
                console.log("An error occurred", error.response);
            })
    }

    return (
        <body>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title>Password reset | Builders Guide Kenya</title>
            </Head>
            <div ref={container} className={style.container}>
                <FormBody>
                    <BgkLogo />
                    <Heading1 heading="Password reset" />
                    <form>
                        <div className={style.passwordContainer}>
                            <label htmlFor='password'>New password<span className={style.required}>*</span></label><br />
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
                                value='Reset password'
                            />
                            {/* <LoadingAnimation loadingAnimation={loadingAnimation} />  */}
                        </div>
                    </form>
                </FormBody>
            </div>
        </body>
    )
}

export default PasswordConfirmation
