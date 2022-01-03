import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import UserHome from '../../components/HomePage/User/index';
import RepoHome from '../../components/HomePage/Repositories/index';
import StarredHome from '../../components/HomePage/Starred/index';

import './styles.scss';

import logoImg from '../../assets/github-finder.png';
import HomeTxt from '../../components/HomePage/HomeTxt';

function HomePage() {

  const [userSearch, setUserSearch] = useState([]);
  const [user, setUser] = useState([]);
  const [results, setResults] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [starred, setStarred] = useState([]);
  const [ showRepositories, setShowRepositories ] = useState(true);
  const [ showStarred, setShowStarred ] = useState(true);
  const [ showError, setShowError ] = useState('');

  async function searchingData(event) {
    event.preventDefault();

    if (!userSearch) {
      setShowError('You must inform a user name!');
      return;
    }

    try {
      const response = await api.get(`/${userSearch}`);
      setUser(response.data);
      setUserSearch('');
      setResults(true);
      setShowError('');
    } catch (err) {
      setShowError('User not found or not exist.');
      setUserSearch('');
    }
  }

  useEffect(() => {
    async function gettingRepo() {
        try {
          const response = await api.get(`/${user.login}/repos`);
          setRepositories(response.data);
          
        } catch (err) {
          setShowError('Repository not found or not exist.');
        }
    }
    gettingRepo();
  }, [user]);


  useEffect(() => {
    async function gettingStarred() {
        try {
          const response = await api.get(`/${user.login}/starred`);
          setStarred(response.data);
        } catch (err) {
          setShowError('Starred not found or not exist.');
        }
    }
    gettingStarred();
  }, [user]);


  return (
    <main>
      <header>
        <div className="header__content">
          <Link className='logo' to="/">
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

      {results ? (
        <section className="results">
          <UserHome user={user} />          
          <div className="secondResult">            
            <div className="repositories">
                <button onClick={() => setShowRepositories(!showRepositories)}>Repositories</button>
                {showRepositories ? null : 
                  <RepoHome repositories={repositories} />
                }
            </div>
            <div className="starreds">
                <button onClick={() => setShowStarred(!showStarred)}>Starred</button>
                {showStarred ? null : 
                  <StarredHome starred={starred} />
                }
            </div>
          </div>
        </section>
    ) : <HomeTxt />}
    </main>
  );
}

export default HomePage;