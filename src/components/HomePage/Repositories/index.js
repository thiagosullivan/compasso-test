import React from 'react';

import { BiGitRepoForked, BiShow } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';

function RepoHome({ repositories }) {
  return (
    <div>
      {repositories.map(repo => (
        <div className='repositories__list' key={repo.id}>
          <div className='list__infos'>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <div className="list__infos__bottom">
              <p className={`${repo.language} language`}><span></span>{repo.language === null ? "No language" : repo.language}</p>
              <p><FaStar />{repo.stargazers_count}</p>
              <p><BiGitRepoForked />{repo.forks_count}</p>
              <p>< BiShow />{repo.watchers}</p>
            </div>
          </div>
        </div>
      ))};
    </div>
  );
};

export default RepoHome;
