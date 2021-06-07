import React from 'react';

import { BiGitRepoForked, BiShow } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';

function StarredHome({ starred }) {
  return (
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
            <p className={`${starred.language} language`}><span></span>{starred.language === null ? "No language" : starred.language}</p>
            <p><FaStar />{starred.stargazers_count}</p>
            <p><BiGitRepoForked />{starred.forks_count}</p>
            <p>< BiShow />{starred.watchers}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default StarredHome;
