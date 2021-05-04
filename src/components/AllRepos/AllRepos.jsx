/* eslint-disable jsx-a11y/no-onchange */
import { FolderIcon, StarIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { PROFIL_REPOS } from '../../api/endpoints';
import { useGetAll } from '../../api/useGet';
import './AllRepos.css';

export default function AllRepos() {
  const { username } = useParams();
  const endpoint = PROFIL_REPOS.replace(`{username}`, username);
  const allRepos = useGetAll(endpoint);

  const [changeLang, setChangeLang] = useState('');
  const [languages, setLanguages] = useState([]);

  const haveTheColor = (language) => {
    switch (language) {
      case 'JavaScript':
        return 'bg-yellow-200';
      case 'HTML':
        return 'bg-red-700';
      case 'CSS':
        return 'bg-purple-700';
      case 'Vue':
        return 'bg-green-900';
      case 'PHP':
        return 'bg-blue-900';
      default:
        return 'bg-green-200';
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setChangeLang(e.target.value);
  }

  useEffect(() => {
    const reducedLanguages = allRepos.datas.reduce((acc, curr) => {
      const cache = [...acc];
      if (cache.includes(curr.language) || !curr.language) {
        return cache;
      } else {
        cache.push(curr.language);
        return cache;
      }
    }, []);
    setLanguages(reducedLanguages);
  }, [allRepos.datas]);

  return (
    <>
      <div className="mb-5 mt-14 ">
        <div className="demo-1 mt-2">
          <h1 className=""> Les Repos de {`${username}`} </h1>
        </div>
        <div className="flex flex-row items-baseline">
          <p className="text-white mt-2">Language:</p>
          <select
            onChange={handleChange}
            value={changeLang}
            name="language"
            id="language-selection"
            className="text-gray-900 border rounded-full text-center">
            <option value="">--Sélection du language-</option>
            {languages.map((language, i) => {
              return (
                <option key={i} value={language}>
                  {language}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {allRepos.datas
        .filter((repo) => {
          if (changeLang === '') {
            return true;
          } else {
            return repo.language === changeLang;
          }
        })
        .map((repo) => {
          return (
            <Link className="w-full md:w-3/4 " key={repo.id} to={`/repo/${username}/${repo.name}`}>
              <div className="border-2 border-white bg-gold-hover hover:bg-gold-dark rounded-md mx-8 mb-5">
                <div className="text-white flex pl-6 pt-2 items-center justify-between text-center mb-5 md:text-xl">
                  <FolderIcon className="h-10 w-10 md:h-20 md:w-20 " />
                  <p className="text-white text-2xl md:text-3xl ">{repo.name}</p>
                  <div className="flex justify-around items-center mr-4">
                    <p className="text-white px-2">{repo.stargazers_count}</p>
                    <StarIcon className="h-6" />
                  </div>
                </div>
                <h1 className="text-white mb-2 pl-6">Description: </h1>
                <p className="text-white mb-2 pl-6 pr-4">{repo.description}</p>
                <p className="text-white mb-4 mx-6 flex items-center pl-36 md:justify-end">
                  <span className={`${haveTheColor(repo.language)} w-4 h-4 rounded-full mx-3`} />
                  {repo.language}
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
}
