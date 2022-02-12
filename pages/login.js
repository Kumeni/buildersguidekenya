import LoginForm from '../components/login/LoginForm'
import Head from 'next/head'
import {useState, useEffect, useRef} from 'react'
import style from '../components/signup/Signup.module.css'
import {useRouter} from 'next/router'

function Login(props) {

    const router = useRouter();
    const container = useRef(null);
    
    useEffect(()=>{
        if(container.current)
                container.current.style.minHeight = window.innerHeight+"px";
        window.addEventListener( "resize", event=> {
            if(container.current)
                container.current.style.minHeight = window.innerHeight+"px";
        })
    }, [])

    return (
        <div ref={container} className={style.container}>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title>Login - Builders Guide Kenya</title>
            </Head>
            <div className={style.signupContainer}>
                <div>
                    <LoginForm
                        loginData = {props.loginData}
                        setLoginData = { data => props.setLoginData(data)}
                        baseURL = { props.baseURL}
                        setNoProfile = { data => setNoProfile(data)}
                    />
                </div>
            </div>  
        </div>
    )
}

export default Login
