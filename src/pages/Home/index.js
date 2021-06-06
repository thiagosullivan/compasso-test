import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import { FiUsers, FiMapPin, FiMail } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { BiGitRepoForked, BiShow } from 'react-icons/bi';

import logoImg from '../../assets/github-finder.png';

import './styles.scss';

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

      {results ? (
        <section className="results">
          <div className='user'>
            <div className='user__avatar'>
              <img
                src={user.avatar_url}
                alt="Usuário"
              />
            </div>
            <div className="user__info">
              <h2>{user.name}</h2>
              <h3>{user.login}</h3>              
              <p className="user__bio">{user.bio === null ? "User do not have a bio" : user.bio} </p>              
              <div className="user__info__bottom">
                <p><HiOutlineOfficeBuilding />{user.company === null ? "User do not have a company" : user.company}</p>
                <p><CgNotes />{user.blog === "" ? "User do not have a blog" : user.blog}</p>
                <p><FiMapPin />{user.location === null ? "User do not have a location" : user.location}</p>
                <p><FiMail />{user.email === null ? "User do not have a email" : user.email}</p>
              </div>
              <div className="user__info__folower">
                <FiUsers style={{color: "#C9D1D9"}} />
                <p>{user.followers} followers</p>
                <span style={{color: "#C9D1D9"}}>●</span>
                <p>{user.following} following</p>
              </div>
            </div>''
            <Link className="user__link" to={`/${user.login}`}>
              <IoIosArrowForward />
              <p>Go to profile</p>
            </Link>
          </div>
          <div className="extraResults">
            <div className="repositories">
                <button onClick={() => setShowRepositories(!showRepositories)}>Repositories</button>
                {showRepositories ? null : 
                  <>
                    {repositories.map(repo => (
                        <div className='repositories__list' key={repo.id}>
                          <div className='list__infos'>
                            <h3>{repo.name}</h3>
                            <p>{repo.description}</p>
                            <div className="list__infos__bottom">
                              <p className={`${repo.language} language`}><span></span>{repo.language}</p>
                              <p><FaStar />{repo.stargazers_count}</p>
                              <p><BiGitRepoForked />{repo.forks_count}</p>
                              <p>< BiShow />{repo.watchers}</p>
                            </div>
                          </div>
                        </div>
                      ))};
                  </>
                }
            </div>

            <div className="starreds">
                <button onClick={() => setShowStarred(!showStarred)}>Starred</button>
                {showStarred ? null : 
                  <>
                    {starred.map(starred => (
                      <div className='starreds__list' key={starred.id}>
                        <div className='starreds__infos'>
                          <div className="starreds_img">
                            <img
                              src={starred.owner.avatar_url}
                              alt="User"
                            />
                          </div>
                          <div className="starreds_infos_txt">
                            <h3>{starred.name}</h3>
                            <p>{starred.owner.login}</p>
                            <p>{starred.description}</p>
                          </div>                          
                        </div>
                        <div className='starreds__list__bottom'>
                            <p><FaStar />{starred.stargazers_count}</p>
                            <p><BiGitRepoForked />{starred.forks_count}</p>
                            <p>< BiShow />{starred.watchers}</p>
                        </div>
                      </div>
                    ))}
                  </>
                }
            </div>
          </div>
        </section>
    ) : null}
    </main>
  );
}

export default HomePage;