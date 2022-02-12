import React, {useEffect, useState, useRef} from 'react';
import Head from 'next/head';
import Header from '../components/manufacturersandsuppliers/Header/Header';
import {useRouter} from 'next/router';

function cart() {

    const router = useRouter();

    return (
        <div>
            <Head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title> Shopping cart | Builders Guide Kenya</title>

            </Head>
            <Header title="Shopping cart" router={router} />
        </div>
    )
}

export default cart
