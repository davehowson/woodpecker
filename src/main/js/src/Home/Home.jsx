import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import '@/Home/Home.css';

const Home = () => {
    return (
        <div className="container h-100">
            <Helmet>
                <style>
                    {'body { background: #870000; background: -webkit-linear-gradient(to left, #190A05, #870000); background: linear-gradient(to left, #190A05, #870000);}'}
                </style>
                <style>
                    {'body, html, #app { height: 100% }'}
                </style>
            </Helmet>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col text-center">
                    <div className="row text-center">
                        <span className="main-header w-100">Woodpecker</span> 
                    </div>
                    <div className="row text-center mt-4">
                        <div className="col">
                            <Link to="/login">
                                <button className="btn btn-outline-light mx-1">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-outline-light mx-1">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}

export { Home };