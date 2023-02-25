import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { forgetPassword, resetPassword } from "../../../Services/authServices/index"
import Link from 'next/link';

const forgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [key, setKey] = useState('');
    const [err, setError] = useState(false);
    const [goToLogin, setGoToLogin] = useState(false);
    const [errPassword, setErrorPassword] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);

    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    async function ForgetPassword(event) {
        event.preventDefault();
        try {
            const success = await forgetPassword(email);
            if (!success) {
                setError(!success)
            }
            else {
                setDisplayBasic(true);
            }
            // Do something with the response data
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }
    async function ResetPassword(event) {
        console.log("ay wach!")
        event.preventDefault();
        if (password == confirmPassword) {
            try {
                const success = await resetPassword(email, key, password);
                if (!success) {
                    setError(!success)
                }
                else {
                    setGoToLogin(true)
                    setErrorPassword(false)
                }
                // Do something with the response data
            } catch (error) {
                console.error(error);
                // Handle errors
            }
        }
        else {
            setErrorPassword(true)
        }

    }
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Account recovery</div>
                            <div className='text-center'>
                                <p className="text-900"> To help keep your account safe, InternsApp  wants <br /> to make sure that it’s really you trying to sign in</p>
                            </div>
                        </div>
                        <div className='text-center'>
                            {err && <div className="text-red-500">Incorrect email</div>}
                        </div>
                        <div>
                            <form onSubmit={ForgetPassword}>
                                <div>
                                    <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                        Email
                                    </label>
                                    <InputText inputid="email" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} required />
                                </div>
                                <Button label="Recive Key" className="w-full p-3 text-xl" type='submit'></Button>
                            </form>
                        </div>

                        <Dialog header="Recover" visible={displayBasic} style={{ width: '30vw' }} modal onHide={() => setDisplayBasic(false)}>
                            <div className='text-center'>
                                {errPassword && <div className="text-red-500">Password dont match</div>}
                                {goToLogin && <div className="text-green-500">Reset Password Succesfully</div>}

                            </div>
                            <div className="card p-fluid">
                                <form onSubmit={ResetPassword} >
                                    <div className="field">
                                        <label htmlFor="name1">Key</label>
                                        <InputText id="name1" type="text" required value={key} onChange={(e) => setKey(e.target.value)} />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="email1">Password</label>
                                        <InputText id="email1" type="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="block">Confirm Password</label>
                                        <InputText id="block" type="Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <Button label="Recover" type='submit' ></Button>
                                </form>
                                <div className='text-center pt-2'>
                                    {goToLogin && <Link href="../../auth/login">
                                        <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                            Login
                                        </a>
                                    </Link>}

                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div >
    );
};

forgetPasswordPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default forgetPasswordPage;
