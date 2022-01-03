import React from 'react'
import { Link } from 'react-router-dom';

import logoImg from '../../../assets/github-finder.png';
import { IoIosArrowBack } from 'react-icons/io';


function HeaderProfile() {
  return (
      <header>
        <div className="header__content header__profile">
          <Link className="logo" to="/">
            <img src={logoImg} alt="Github Finder logo" />
          </Link>
          <Link className='goBackLink' to="/">
            <IoIosArrowBack />
            <p>Go Back</p>
          </Link>
        </div>
      </header>
  );
};

export default HeaderProfile;
