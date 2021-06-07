import React from 'react';

import { BiBookBookmark, BiGitRepoForked } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';

function MainContent({ repo }){
  return (
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
                <p className={`${repo.language} language`}><span></span>{repo.language === null ? "No language" : repo.language}</p>
                <p><FaStar />{repo.stargazers_count}</p>
                <p><BiGitRepoForked />{repo.forks_count}</p>                    
              </div>
            </div>
          </div>
        )) };
    </section>
  );
};

export default MainContent;