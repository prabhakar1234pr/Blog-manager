
import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './components/Header';
import BlogBody from './components/BlogBody';
import Footer from './components/Footer';
import About from "./components/About";
import Contact from './components/Contact';
import Profile from './components/Profile';
import BlogPosts from './components/BlogPosts';
import FetchDemo from './components/FetchDemo';


function App() {
  return (
    <BrowserRouter>


    <Header />
    <Routes>
   
        <Route path = "/" element = {<BlogBody />} />
        <Route path="/about" element={<About/>} />
        <Route path = "/contact" element={<Contact/>}/>
        <Route path = "/profile" element={<Profile/>}/>
        <Route path = "/blog-posts" element={<BlogPosts/>}/>
        <Route path = "/FetchDemo" element={<FetchDemo/>}/>
    </Routes>
      <Footer />

    </BrowserRouter>
    

  );
}

export default App;
