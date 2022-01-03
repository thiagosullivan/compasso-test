import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom';

import Header from '../../components/ProfilePage/Header/';
import Sidebar from '../../components/ProfilePage/SideBar/';
import MainContent from '../../components/ProfilePage/MainContent';

import './styles.scss';

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
      <Header id="header_profile" />
      <h1>{user.name} Profile</h1>
      <main>
        <Sidebar user={user}/>
        <MainContent repo={repo}/>
      </main>
    </div>
  )
};

export default Profile;
