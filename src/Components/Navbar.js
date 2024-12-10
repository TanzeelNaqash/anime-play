import React, { useState } from 'react';  // Import useState
import { Link } from 'react-router-dom';

const Navbar = ({ resetSearch }) => {
  const [isOpen, setIsOpen] = useState(false);  

  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <nav>
           
            {!isOpen && (
              <div className="menu" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i> 
              </div>
            )}

            
            {isOpen && (
              <button className="close-btn-button" onClick={toggleSidebar}>
                <i className="fas fa-angle-left mr"></i> Close Menu
              </button>
            )}

            <ul>
            
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    resetSearch(); 
                    closeSidebar(); 
                  }}
                >
                  Home
                </Link>
              </li>

             
              <li><Link to="/search" onClick={closeSidebar}>Search</Link></li>
              <li><Link to="/trending" onClick={closeSidebar}>Trending</Link></li>
              <li><Link to="/random" onClick={closeSidebar}>Random</Link></li>
              <li><Link to="/manga" onClick={closeSidebar}>Manga</Link></li>
            </ul>
          </nav>
        </div>

       
        {isOpen && (
          <div className="overlay" onClick={toggleSidebar}></div>
        )}

        {/* Logo link: reset search when clicked */}
        <div className="logo">
          <Link
            to="/"
            onClick={() => {
              resetSearch(); 
            }}
          >
            <img src="../../images/logo.png" alt="Logo" />
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
