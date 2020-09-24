import style from './SignupForm.module.css'

function SignupForm() {
    function handleSubmit(event){
        event.preventDefault();
    }
    return (
        <form className={style.signUpForm}>
            <img className={style.bgkLogo} src='/icons/builders guide logo-01.png' alt='builders guide kenya logo' />
            <h5>Signup</h5>
            <p>
                <label for='username'>username<span className={style.required}>*</span></label><br />
                <input className={style.input} id='username' type='text' required/>
            </p>
            <p>
                <label for='email'>email<span className={style.required}>*</span></label><br />
                <input className={style.input} id='email' type='email' required/>
            </p>
            <p>
                <label for='password'>password<span className={style.required}>*</span></label><br />
                <input className={style.input} id='password' type='password' required/>
            </p>
            <p>
                <label for='passwordConfirmation'>confirm password<span className={style.required}>*</span></label> <br />
                <input className={style.input} id='passwordConfirmation' type='password' required/>
            </p>
            <input className={'btn btn-block btn-primary'}type='submit' value='signup' onClick={(event)=>handleSubmit(event)}/><br />
            <p className={style.login}>Already in buildersguidekenya?<a href='#'> login</a></p>
        </form>
    )
}

export default SignupForm
