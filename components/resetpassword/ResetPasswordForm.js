import style from './ResetPasswordForm.module.css'

function ResetPasswordForm() {
    function handleSubmit(event){
        event.preventDefault();
    }

    return (
        <form className={style.ResetPasswordForm}>
            <img className={style.bgkLogo} src='/icons/builders guide logo-01.png' alt='builders guide kenya logo' />
            <h5>Forgot password</h5>
            <p>
                <label for='username'>Fill in your registered email address</label><br />
                <input className={style.input} id='username' type='text' placeholder="Email address" required/>
            </p>
            <input className={'btn btn-block btn-primary'} type='submit' value='Reset Password' onclick={(event) => handleSubmit(event)} /><br />
            <p className={style.resend}>Haven't received an email? <a href='#'>Resend</a></p>
        </form>
    )
}

export default ResetPasswordForm
