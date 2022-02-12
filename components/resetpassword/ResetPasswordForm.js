import style from './ResetPasswordForm.module.css'
import {useRef, useState} from 'react'
import axios from 'axios'
import BgkLogo from '../login/BgkLogo'
import Progress from '../Progress/Progress'
import Heading1 from '../login/Heading1'

function ResetPasswordForm(props) {

    const [email, setEmail] = useState();
    const [updateStatus, setUpdateStatus] = useState("UPDATE");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submitButton = useRef(null);
    const form = useRef(null);

    const handleEmail = event => {
        setError("");
        setSuccess("");
        setEmail(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setUpdateStatus("UPDATING");
        setError("");
        setSuccess("");
        submitButton.current.focus();
        axios.post(props.baseURL+"/auth/forgot-password", {
            email:email
        })
        .then( res=>{
            setUpdateStatus("DONE");
            setSuccess("An email with a link to reset your password has been sent to "+ email);
            setTimeout(()=>{setUpdateStatus("UPDATE")}, 2000);
            console.log("You received an email");
        })
        .catch(err => {
            setUpdateStatus("UPDATE");
            setError("An error occured, try again!");
            console.log(err.response);
        })
    }

    return (
        <form ref={form} className={style.ResetPasswordForm} onSubmit={event=>handleSubmit(event)}>
            {/* <img className={style.bgkLogo} src='/icons/builders guide logo small.png' alt='builders guide kenya logo' /> */}
            <BgkLogo />
            <Heading1 heading="Password reset" />
            {/* <h5>Password reset</h5> */}
            <p>
                <label htmlFor='username'>Email<span className={style.required}>*</span></label><br />
                <input value={email} onChange={event=>handleEmail(event)} className={style.input} id='email' type='email' required/>
            </p>
            {
                error != "" && error != undefined ?
                    <p className={"text-danger "+style.response}>{error}</p>
                :success != "" && success != undefined?
                    <p className={"text-success "+style.response}>{success}</p>
                :undefined
            }
            {
                updateStatus == "UPDATE"?
                    <input ref={submitButton} className={'btn btn-block btn-primary'} type='submit' value='Reset Password' />
                :
                    <button className={"btn btn-block btn-primary"}>
                        <Progress
                            updateStatus={updateStatus}
                        />
                    </button>
            }
            <br />
            {/* <input ref={submitButton} className={'btn btn-block btn-primary'} type='submit' value='Reset Password' /><br /> */}
            <p className={style.resend}>Haven't received an email?<a href="#" onClick={event=>{submitButton.current.click()}}> Resend</a></p>
        </form>
    )
}

export default ResetPasswordForm