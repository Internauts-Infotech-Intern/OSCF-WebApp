import React from 'react'
import "./navbar.css";
const Navbar = () => {
    return(
        <header>
            <div id="l_nav">
            <ul>
            <p>OSCF</p>
                <li><a href="/#">Resourse</a></li>
                <li><a href="/#">Support</a></li>
                <li><a href="/#">Blog</a></li>
                <li><a href="/#">Project</a></li>
            </ul>
            </div>
            <div id="u_nav">
            
            <div class="searchbox">
                <table class="element">
                    <tr>
                        <td>
                            <input type="text" placeholder="Search" class="search"></input>
                        </td>
                        <td>
                            <a href="#"><i class="icon">search</i></a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="btn">
                <a href="#">Contact_Us </a>
                <a href="#">Login/SingUp</a>
            </div>
            </div>
        </header>
       
    );
};

export default Navbar