import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import About from "./About";

function Header(){
    return(
        <header>
            <h1>My Awesome Blog Portal</h1>
            <button className = "Headerbutton"onClick={() => alert('Hello!')}>Click Me</button>

            <nav>
                <ul>
                    <li><Link to='/'>Home</Link> </li>
                    <li><Link to ="/about">About</Link> </li>
                    <li><Link to ="/contact">contact</Link> </li>
                    <li><Link to='/profile'>Profile</Link> </li>
                    <li><Link to='/blog-posts'>Blog Posts</Link> </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
