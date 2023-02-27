import getConfig from 'next/config';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { logout } from '../Services/authServices/index'
import { createUser } from '../Services/userServices/index'
import { Toast } from 'primereact/toast';

var Role = ""
var overlayMenuItems = [];
if (typeof window !== 'undefined') {
    // Perform localStorage action
    Role = localStorage.getItem('Role')
}
const AppTopbar = forwardRef((props, ref) => {
    //form to create User:
    const [block, setBlock] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(null);
    const toast = useRef();

    //to show state of the Create User is successfully or there is an error ? 
    //if its update it will show this toast 
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Updated Successfully', life: 3000 });
    };
    //error server it will show this toast 
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error,try again', life: 3000 });
    };

    //
    const [displayBasic, setDisplayBasic] = useState(false);

    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const menu = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const button = <a onClick={() => setDisplayBasic(true)}>Add Account</a>
    const logoutButton = <a onClick={logout}>Logout</a>
    if (Role == "admin") {
        overlayMenuItems = [
            {
                label: button,
                icon: 'pi pi-refresh',
            },
            {
                separator: true
            },
            {
                label: logoutButton,
                icon: 'pi pi-sign-out'
            }
        ];
    }
    else {
        overlayMenuItems = [
            {
                label: logoutButton,
                icon: 'pi pi-sign-out'
            }
        ];
    }


    const dropdownValues = [
        { name: 'employee', code: 'employee' },
        { name: 'admin', code: 'admin' },
        { name: 'intern', code: 'intern' },
        { name: 'supervisor', code: 'supervisor' },
    ];


    const toggleMenu = (event) => {
        menu.current.toggle(event);
    };
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    async function CreateUser(event) {
        event.preventDefault();
        try {
            const success = await createUser(email, name, role.code, block);
            if (success) {
                setEmail('');
                setName('');
                setRole('');
                setBlock('');
                showSuccess()
            }
            else {
                showError()
            }
            // Do something with the response data
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }

    return (
        <div className="layout-topbar">
            <Link href="/">
                <a className="layout-topbar-logo">
                    <>
                        <img src={`${contextPath}/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
                        <span>InternsApp</span>
                    </>
                </a>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <Link href="/InternsApp/MyProfil/">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </Link>
            </div>
            <Dialog header="Add Account" visible={displayBasic} style={{ width: '30vw' }} modal onHide={() => setDisplayBasic(false)}>
                <div className="card p-fluid">
                    <form onSubmit={CreateUser}>
                        <div className="field">
                            <label htmlFor="name1">Name</label>
                            <InputText id="name1" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Email</label>
                            <InputText id="email1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="field">
                            <label htmlFor="block">Block</label>
                            <InputText id="block" type="text" value={block} onChange={(e) => setBlock(e.target.value)} required />
                        </div>
                        <div className="field">
                            <label htmlFor="role">Role</label>
                            <Dropdown value={role} onChange={(e) => setRole(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" required />
                        </div>
                        <Button label="Create" type='submit'></Button>
                        <Toast ref={toast} />
                    </form>
                </div>
            </Dialog>
            <Menu ref={menu} model={overlayMenuItems} popup />
            <button type="button" className="p-link layout-topbar-button" onClick={toggleMenu} label="Options" >
                <i className="pi pi-cog"></i>
                <span>Settings</span>
            </button>

        </div>
    );
});

export default AppTopbar;
