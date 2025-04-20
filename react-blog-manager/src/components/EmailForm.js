import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailForm.css';
import WelcomeOverlay from './WelcomeOverlay';

function EmailForm({headerText, onAccessBlogs}){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:5001';

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            console.log('Attempting to create/verify user...');
            // Create or get existing user using the profile endpoint
            const userResponse = await fetch(`${API_BASE_URL}/api/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, name }),
            });

            if (!userResponse.ok) {
                const text = await userResponse.text();
                throw new Error(`User creation failed: ${text}`);
            }

            const userData = await userResponse.json();
            console.log('User created/verified successfully:', userData);

            // Store user data in localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('isAuthenticated', 'true');

            // Call the parent component's callback with the user data
            onAccessBlogs(email, [], { name: name, ...userData });

            // Show welcome overlay
            setShowWelcome(true);

            // Navigate to the main application after a delay
            setTimeout(() => {
                navigate('/blogposts');
            }, 3000);

        } catch(error) {
            console.error('Error details:', error);
            setError(error.message || 'Failed to access blogs. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <>
            {showWelcome && <WelcomeOverlay />}
            <div className="email-form-container">
                <h2>{headerText || 'Welcome to Blog Manager'}</h2>
                <p>Please enter your details to access your blog posts</p>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Please wait...' : 'Continue'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default EmailForm;