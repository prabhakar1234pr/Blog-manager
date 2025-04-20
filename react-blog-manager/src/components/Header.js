import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className="main-header">
            <div className="header-content">
                <h1>Blog Manager</h1>
                <nav className="header-nav">
                    <Link to="/blogposts" className="nav-link">Blog Posts</Link>
                    <Link to="/profile" className="nav-link">Profile</Link>
                    <Link to="/create" className="nav-link">Create Post</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <button onClick={handleLogout} className="header-button header-button-logout">
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
