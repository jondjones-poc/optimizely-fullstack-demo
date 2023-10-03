import Head from 'next/head'
import React from 'react';
import { clarity } from 'react-microsoft-clarity';
import { useEffect } from "react";

import Header from './Header'
import Footer from './Footer';

const Layout = ({children, clientId, ...props}) => {

    useEffect(() => {
        clarity.init("ektblhb8nt")
    })

    return (
        <>
            <Head>


            </Head>

            <style dangerouslySetInnerHTML={{ __html: props.stylesheet }} />

            <div id="page-wrapper">
                <Header clientId={clientId} />
                    <section id="main">
                        {children}
                    </section>
                <Footer clientId={clientId} />
            </div>

            <script type="text/javascript" src="assets/js/jquery.min.js"></script>
            <script type="text/javascript" src="assets/js/jquery.dropotron.min.js"></script>
            <script type="text/javascript" src="assets/js/browser.min.js"></script>
            <script type="text/javascript" src="assets/js/breakpoints.min.js"></script>
            <script type="text/javascript" src="assets/js/util.js"></script>
            <script type="text/javascript" src="assets/js/main.js"></script>
        </>
    );
};

export default Layout;
