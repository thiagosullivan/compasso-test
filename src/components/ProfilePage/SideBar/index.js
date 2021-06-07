import React from 'react';

import { FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { CgNotes } from 'react-icons/cg';

function Sidebar({ user }){
  return (
    <aside className="sideBar">
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
    </aside>
  );
};

export default Sidebar;