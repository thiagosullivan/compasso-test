import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HeaderHome({userSearch, showError}) {
  return (
    <header>
      <div className="header__content">
        <Link to="/">
          <img src={logoImg} alt="GitFinder" />
        </Link>
        <form className="header__content__search" onSubmit={(event) => searchingData(event)}>
          <input
            className='search__input'
            placeholder='Search for an user...'
            value={userSearch}
            onChange={(event) => setUserSearch(event.target.value)}
          />
          <button className='search__button'>Search</button>
          { showError && <div className="error">{showError}</div> }
        </form>
      </div>
    </header>
  );
};

export default HeaderHome;