import React from 'react'
import style from './LoginForm.module.css'

function LoginForm() {

    function handleSubmit(event){
        event.preventDefault();
    }
    return (
        <div className={style.loginForm}>
            <img className={style.bgkLogo} src='/icons/builders guide logo-01.png' alt='builders guide kenya logo' />
            <h5>Login</h5>
            <form className={style.form}>
                <p>
                    <label for='username'>email/username<span className={style.required}>*</span></label><br />
                    <input className={style.input}id='username' type='text' required/>
                </p>
                <p>
                    <label for='password'>password<span className={style.required}>*</span></label><br />
                    <input className={style.input} id='password' type='password' required />                
                </p>
                <a className={style.fPassword}href='#'>Forgot your password?</a><br /><br />
                <input className={'btn btn-primary btn-block'} type='submit' value='Login' onClick={(event) =>handleSubmit(event)}/>
                    
                <p className={style.signUp}>Not on buidersguidekenya yet?<a href='#'> sign up</a></p>
            </form>
        </div>
    )
}

export default LoginForm
