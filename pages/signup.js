import SignupForm from '../components/signup/SignupForm'
import style from '../components/signup/Signup.module.css'
function Signup() {
    return (
        <div className={style.signupContainer}>
            <SignupForm />
        </div>
    )
}

export default Signup
