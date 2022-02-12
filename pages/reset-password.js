import style from '../components/resetpassword/ResetPassword.module.css'
import ResetPasswordForm from '../components/resetpassword/ResetPasswordForm'
import React, {useState, useEffect, useRef} from 'react'
import FormBody from '../components/login/FormBody';
import Head from 'next/head';


function ResetPassword(props) {
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
        <body ref={container} className={style.container}>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title>Reset password | Builders Guide Kenya</title>
            </Head>
            <div className={style.resetPasswordContainer}>
                <FormBody>
                    <ResetPasswordForm 
                        baseURL={props.baseURL}
                    />
                </FormBody>
            </div>
        </body>
    )
}

export default ResetPassword
