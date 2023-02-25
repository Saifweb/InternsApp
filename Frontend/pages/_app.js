import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { AuthProvider } from './AuthProvider';
export default function MyApp({ Component, pageProps }) {

    if (Component.getLayout) {
        return (
            <AuthProvider>
                <LayoutProvider>
                    {Component.getLayout(<Component {...pageProps} />)}
                </LayoutProvider>
            </AuthProvider>

        )
    } else {
        return (
            <AuthProvider>
                <LayoutProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LayoutProvider >
            </AuthProvider>

        );
    }
}
