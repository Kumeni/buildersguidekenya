import style from '../components/login/login.module.css'

function Signup(){
    return <div className={style.body}>
        <img alt='hunters-race-MYbhN8KaaEc-unsplash' src='/login/hunters-race-MYbhN8KaaEc-unsplash.jpg' className={style.backgroundImage}/>
        <div className={style.loginContainer}>
            <div className={style.signupOptions}>
                <div className={style.signupOption}>
                    <p>Create Account</p>
                    <button className={style.button}>Signup</button>
                </div>
                <div className={style.signupOption}>
                    <p>Have an Account</p>
                    <button className={style.button}>Login</button>
                </div>
            </div>
            <div className={style.loginForm}>
                <form className={style.logIn}>
                    <p>Login</p>
                    <label for='username'>Username or email address<span className={style.required}>*</span></label><br/>
                    <input type='text' id='username' required/><br/>
                    <label for='password'>Password<span className={style.required}>*</span></label><br/>
                    <input type='password' id='password' required/><br/>
                    <input type='submit' value='login'/><br/>
                    <a href='#'>signUp</a>/<a href='#'>Forgot Password?</a>
                </form>
                <form className={style.signUp}>
                    <p>Sign Up</p>
                    <div className={style.fNameLName}>
                    <span className={style.firstName}>
                        <label for='firstName'>Firstname<span className={style.required}>*</span></label><br/>
                        <input type='text' id='firstName' required />
                    </span>
                    <span className={style.lastName}>
                        <label for='lastName'>Lastname<span className={style.required}>*</span></label><br/>
                        <input type='text' id='lastName' reuired /><br/>
                    </span>
                    </div>
                    <label for='emailAddress'>Email address<span className={style.required}>*</span></label><br/>
                    <input type='text' id='emailAddress' required /><br/>
                    <label for='password'>Password<span className={style.required}>*</span></label><br/>
                    <input type='password' id='password' required /><br/>
                    <label for='confirmPassword'>Confirm Password<span className={style.required}>*</span></label><br/>
                    <input type='password' id='confirmPassword' required /><br/>

                </form>
            </div>
        </div>
    </div>
}

export default Signup