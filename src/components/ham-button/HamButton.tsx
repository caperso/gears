import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

const HamButton = () => {
  const showMenu = () => {};

  return (
    <>
      <i className="g-ham-button" onClick={showMenu} aria-label="menu"></i>
      <div className="g-ham-container">
        <Link to="/gallery" className="header-link">
          MINNIE's GALLERY
        </Link>
        <Link to="/home" className="header-link">
          HOME
        </Link>
      </div>
    </>
  );
};

export default HamButton;
