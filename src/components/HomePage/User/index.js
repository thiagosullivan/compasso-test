import React from 'react'
import { Link } from 'react-router-dom';

import { CgNotes } from 'react-icons/cg';
import { FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';

function UserHome({ user }) {
  return (
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
  )
}

export default UserHome;