import style from '../components/resetpassword/ResetPassword.module.css'
import ResetPasswordForm from '../components/resetpassword/ResetPasswordForm'

function ResetPassword() {
    return (<div className={style.resetPasswordContainer}>
            <ResetPasswordForm />
        </div>
    )
}

export default ResetPassword
