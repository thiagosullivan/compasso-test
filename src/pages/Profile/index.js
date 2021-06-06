import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom';

import './styles.scss';

import { IoIosArrowBack } from 'react-icons/io';
import { FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { CgNotes } from 'react-icons/cg';

import logoImg from '../../assets/github-finder.png';
import { FaStar } from 'react-icons/fa';
import { BiGitRepoForked, BiBookBookmark } from 'react-icons/bi';

function Profile() {
  const { params } = useRouteMatch();

  useEffect(() => {
    fechtUser();
    fechtRepo();
  }, [])

  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);

  const fechtUser = async () => {
    const fetchUser = await fetch(`https://api.github.com/users/${params.username}`);
    const user = await fetchUser.json();
    setUser(user);
  }

  const fechtRepo = async () => {
    const fetchRepo = await fetch(`https://api.github.com/users/${params.username}/repos`);
    const repositories = await fetchRepo.json();
    console.log(repositories)

    setRepo(repositories);
  }

  return (
    <div className="profilePage">
      <header>
        <div className="header__content">
          <img className="logo" src={logoImg} alt="Github Finder logo" />
          <Link to="/">
            <IoIosArrowBack />
            <p>Go Back</p>
          </Link>
        </div>
      </header>
      <h1>{user.name} Profile</h1>
      <main>        
        <section className="sideBar">
          <div className="sideBar__img">
            <img src={user.avatar_url} alt="" />
          </div>          
          <div className="sideBar__infos">
            <h2>{user.name}</h2>
            <h3>{user.login}</h3>
            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopner">Go to Github</a>
            <p>{user.bio}</p>
            <div className="sideBar__infos__follows">
              <FiUsers style={{color: "#C9D1D9"}} />
              <p>{user.followers} followers</p>
              <span style={{color: "#C9D1D9"}}>●</span>
              <p>{user.following} following</p>
            </div>
            <div className="sideBar__infos__bottom">
                <p><HiOutlineOfficeBuilding />{user.company === null ? "User do not have a company" : user.company}</p>
                <p><CgNotes />{user.blog === "" ? "User do not have a blog" : user.blog}</p>
                <p><FiMapPin />{user.location === null ? "User do not have a location" : user.location}</p>
                <p><FiMail />{user.email === null ? "User do not have a email" : user.email}</p>
              </div>
          </div>
        </section>
        <section className="mainContent">
          { repo.map(repo => (
              <div className="repositories__list" key={repo.id}>
                <div className="list__infos">
                  <div className="list__info__title">
                    <BiBookBookmark />
                    <h3>{repo.name}</h3>
                  </div>
                  <p>{repo.description}</p>
                  <div className="list__infos__bottom">
                    <p className={`${repo.language} language`}><span></span>{repo.language}</p>
                    <p><FaStar />{repo.stargazers_count}</p>
                    <p><BiGitRepoForked />{repo.forks_count}</p>                    
                  </div>
                </div>
              </div>
            )) };
        </section>
      </main>
    </div>
  )
};

export default Profile;
