import React, { useState } from 'react'

const Menubar = ({toggleSideBar,sideBarVisible}) => {
 
  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <button className="btn btn-primary" id="sidebarToggle" onClick={toggleSideBar}>
                <i className={`bi bi-arrow-bar-${sideBarVisible ? 'left':'right'}`}></i>
                </button>
            </div>
        </nav>
    </div>
  )
}

export default Menubar