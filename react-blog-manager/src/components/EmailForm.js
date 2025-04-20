import React, { useState, useEffect } from "react";



function EmailForm({headerText, onAccessBlogs}){
    

    const [email, setEmail] = useState('');


    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!email.trim()) return;

        try{
            const blogResponse = await fetch('http://localhost:5000/api/blog-list',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({email}),
            });
            const blogList = await blogResponse.json();
            console.log('Blog list:',blogList);

            const profileResponse = await fetch('http://localhost:5000/api/profile',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            const profileData = await profileResponse.json();
            console.log('Profile data:',profileData);
            onAccessBlogs(email,blogList,profileData);

        } catch(error){
            console.error('Error fetching blog list:', error);
        }
    };

    return(
        <div className="email-form-container">
            <h2>{headerText || 'Welcome to Blog Manager'}</h2>
            <p>Please enter your email to access your blog posts</p>
            <form onSubmit={handleSubmit}>
                <input
                type = 'email'
                value = {email}
                onChange={(e) =>setEmail(e.target.value)}
                placeholder="enter your email"
                required
                />
                <button type = 'submit'>Continue</button>

            </form>
        </div>
    );

}

export default EmailForm;