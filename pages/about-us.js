import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Header3 from '../components/Header3/Header3'
import Body from '../components/aboutUsPage/Body'
import style from '../components/aboutUsPage/AboutUsPage.module.css'
import Footer from '../components/footerComponent/Footer'
import Section from '../components/aboutUsPage/Section'

function AboutUs(props) {

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])

    return (
        <body>
            <Body>
                <Head>
                    {/* Global site tag (gtag.js) - Google Analytics */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>
                    
                    {/* FontAwesome icons */}
                    <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                    {/* FontAwesome icons */}
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                    integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                    crossOrigin="anonymous" />

                    <meta name="keywords" description={"about, buildersguidekenya, us, about us"} />

                    <meta name="content" description={"Building solutions online"} />

                    <title>About us | Builders Guide Kenya</title>
                </Head>
                <main>
                    <Header3 />
                    <div className={style.content}>
                        <section>
                            <h1>About Builders Guide Kenya</h1>
                            <div>
                                <Section>
                                    <h2>Our mission:</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Our vision:</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Our motto:</h2>
                                    <p>
                                        "Building solutions online"
                                    </p>
                                </Section>
                            </div>
                        </section>

                        <section>
                            <h1>What we offer</h1>
                            <div>
                                <Section>
                                    <h2>Manufacturers and suppliers</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Products and services</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Plants and machineries</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Transport vehicles</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Tips and advices</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Landscaping and gardening</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Furniture and furnishing</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                                <Section>
                                    <h2>Hardwares and yards</h2>
                                    <p>
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                                    </p>
                                </Section>
                            </div>
                        </section>

                        <section>
                            <h1>Our team</h1>
                            <div>
                                <p><strong>Tom Tambo</strong> - Manager</p>
                                <p><strong>Dennis Tambo</strong> - Technical representative</p>
                                <p><strong>Yosam Mulera</strong> - Technical representative</p>
                                <p><strong>Samson Kumeni</strong> - Technical representative</p>
                            </div>
                        </section>
                    </div>
                </main>
            </Body>
            <Footer />
        </body>
    )
}

export default AboutUs