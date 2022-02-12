import React from 'react'
import Link from 'next/link'
import style from './Signupsignin.module.css'
import {useRouter} from 'next/router'

function Signupsignin(props) {

    const router = useRouter();

    const handleSign = event => {
        sessionStorage.setItem("initialPathname", router.pathname);
    }

    if(props.loginData == undefined)
        return (
            <span onClick = {event => handleSign(event)} className={style.links}>
                <Link href="/signup">
                    <a>Sign up</a>
                </Link>|
                <Link href="/login">
                    <a>Sign in</a>
                </Link>
            </span>
        )
    
    return (
        <span className={style.userProfile}>
            {props.loginData.user.username}
        </span>
    )
}

export default Signupsignin
