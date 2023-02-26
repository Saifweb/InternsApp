import React, { useContext, useRef } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Divider } from 'primereact/divider';
import AppConfig from '/layout/AppConfig';
import { LayoutContext } from '/layout/context/layoutcontext';

const LandingPage = () => {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const { layoutConfig } = useContext(LayoutContext);
    const menuRef = useRef();

    return (
        <div className="surface-0 flex justify-content-center">
            <div id="home" className="landing-wrapper overflow-hidden">
                <div className="py-5 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
                    <Link href="/">
                        <a className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                            <img src={`${contextPath}/layout/images/${layoutConfig.colorScheme === 'light' ? 'logo-dark' : 'logo-white'}.svg`} alt="footer sections" width="50" height="50" className="mr-2 ml-5" />
                            <span className="font-medium text-3xl text-900">InternsApp</span>
                        </a>
                    </Link>
                    <StyleClass nodeRef={menuRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick="true">
                        <i ref={menuRef} className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"></i>
                    </StyleClass>
                    <div className="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style={{ top: '100%' }}>
                        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                            <li>
                                <a href="#home" className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Home</span>
                                </a>
                                <Ripple />
                            </li>
                            <li>
                                <a href="#join" className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Join Us</span>
                                </a>
                                <Ripple />
                            </li>
                            <li>
                                <a href="#product" className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Products</span>
                                </a>
                                <Ripple />
                            </li>
                        </ul>
                        <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                            <Link href="./auth/login">
                                <Button label="Login" className="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"></Button>
                            </Link>
                        </div>
                    </div>
                </div>



                <div id="home" className="grid grid-nogutter surface-section text-800">
                    <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                        <section>
                            <span className="block text-6xl font-bold mb-1">Build the perfect platform for</span>
                            <div className="text-6xl text-primary font-bold mb-3">your startup's success</div>
                            <p className="mt-0 mb-4 text-700 line-height-3">At [startup name], we understand the challenges that startups face. That's why we offer a range of tools and services designed specifically to help your startup grow and succeed. Whether you need help with product design, marketing, or fundraising, we've got you covered.</p>

                            <Button label="Learn More" type="button" className="mr-3 p-button-raised"></Button>
                            <Button label="Contact Us" type="button" className="p-button-outlined"></Button>
                        </section>
                    </div>
                    <div className="col-12 md:col-6 overflow-hidden">
                        <img src="demo/images/entre.jpg" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                    </div>
                </div>





                <div id="join" className="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <div className="text-700 text-center">
                        <div className="text-blue-600 font-bold mb-3">&nbsp;POWERED BY INTERNSAPP</div>
                        <div className="text-900 font-bold text-5xl mb-3">Join Our Community</div>
                        <div className="text-700 text-2xl mb-5">Are you passionate about startups? Join our community and connect with like-minded individuals who are working to build the next big thing. Whether you're an entrepreneur, developer, designer, or just interested in learning more about startups, we'd love to have you on board.</div>
                        <Button label="Post Resume" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"></Button>
                    </div>
                </div>


                <div id="product" className="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
                    <div className="mb-3 font-bold text-2xl">
                        <span className="text-900">One Product, </span>
                        <span className="text-blue-600">Many Solutions</span>
                    </div>
                    <div className="text-700 text-sm mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
                    <div className="grid">
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-desktop text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Built for Developers</div>
                            <span className="text-700 text-sm line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-lock text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">End-to-End Encryption</div>
                            <span className="text-700 text-sm line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Easy to Use</div>
                            <span className="text-700 text-sm line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-globe text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Fast & Global Support</div>
                            <span className="text-700 text-sm line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-github text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Open Source</div>
                            <span className="text-700 text-sm line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
                        </div>
                        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
                            <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-shield text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Trusted Securitty</div>
                            <span className="text-700 text-sm line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
                        </div>
                    </div>
                </div>

                <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
                    <div className="grid justify-content-between">
                        <div className="col-12 md:col-2" style={{ marginTop: '-1.5rem' }}>
                            <Link href="/">
                                <a className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                                    <img src={`${contextPath}/layout/images/${layoutConfig.colorScheme === 'light' ? 'logo-dark' : 'logo-white'}.svg`} alt="footer sections" width="50" height="50" className="mr-2" />
                                    <span className="font-medium text-3xl text-900">InternsApp</span>
                                </a>
                            </Link>
                        </div>

                        <div className="col-12 md:col-10 lg:col-7">
                            <div className="grid text-center md:text-left">
                                <div className="col-12 md:col-3">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Company</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">About Us</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">News</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Investor Relations</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Careers</a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700">Media Kit</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Resources</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Get Started</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Learn</a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700">Case Studies</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Community</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Discord</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                                        Events
                                        <img src={`${contextPath}/demo/images/landing/new-badge.svg`} className="ml-2" />
                                    </a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">FAQ</a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700">Blog</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Legal</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Brand Policy</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Privacy Policy</a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LandingPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};

export default LandingPage;
