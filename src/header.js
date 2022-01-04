import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './kiswire.png'
const Header = () => {
    return (

        <div className="nav navbar navbar-dark bg-dark p-0 shadow">
            <div className="navbar-brand"><img src={Logo} height={24} alt='Logo'/> KISWIRE<small>.dev.test</small></div>
            <div className="nav">
                <Link className="nav-link" to="/" >Home</Link>
                <Link className="nav-link" to="/customers" >Customer</Link>
                <Link className="nav-link" to="/states" >State</Link>
                <Link className="nav-link" to="/districts" >District</Link>
                <Link className="nav-link" to="/invoices" >Invoice</Link>
            </div>
        </div >


        // <div className="nav navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        //     <div className="navbar-brand">KISWIRE<small>.dev.test</small></div>
        //     <ul className="navbar-nav">
        //         <li className="nav-item">
        //             <Link className="nav-link" to="/" >Home</Link>

        //         </li>
        //         <li className="nav-item">

        //             <Link className="nav-link" to="/customers" >Customer</Link>
        //             <Link className="nav-link" to="/states" >State</Link>
        //             <Link className="nav-link" to="/districts" >District</Link>
        //             <Link className="nav-link" to="/invoices" >Invoice</Link>
        //         </li>
        //     </ul>
        // </div>
        // //     <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        //   <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
        //   <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        //   <ul class="navbar-nav px-3">
        //     <li class="nav-item text-nowrap">
        //       <a class="nav-link" href="#">Sign out</a>
        //     </li>
        //   </ul>
        // </nav>

    )
}

export default Header
