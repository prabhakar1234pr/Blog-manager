import React from "react";
import "./Footer.css";
import Contact from "./Contact";

function Footer(){
    return(
        <footer>
            <p> ©{new Date().getFullYear()} My Blog. All rights reserved.</p>
            <p>Fun Fact: If you have a mole inside your nose,You would never Know!!</p>
            <a href = "https://www.linkedin.com/feed/" >Contact</a>
            

        </footer>
    );
}

export default Footer;