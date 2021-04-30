import React, { useState } from 'react';
import './Repo.css';
import { useParams } from 'react-router-dom';
import { useGetOne } from '../../api/useGet';
import { ONE_REPO_URL, CONTENT_REPO_URL, README_URL } from '../../api/endpoints';
import Files from './Files';
import ContentOverview from './ContentOverview';
import Spinner from '../Spinner/Spinner';

function Repo() {
  const { username, repo } = useParams();
  const repoEndpoint = ONE_REPO_URL.replace('{user}', username).replace('{repo}', repo);
  const [filesEndpoint, setFilesEndpoint] = useState(CONTENT_REPO_URL.replace('{user}', username).replace('{repo}', repo));
  const [fileEndPoint, setFileEndpoint] = useState(README_URL.replace('{user}', username).replace('{repo}', repo));
  const repoConsulted = useGetOne(repoEndpoint);
  const [directory, setDirectory] = useState('../');

  const handleClickFile = (type, fileName) => {
    if (type === 'file') {
      setFileEndpoint(`${filesEndpoint}/${fileName}`);
    } else if (type === 'dir') {
      setFilesEndpoint(`${filesEndpoint}/${fileName}`);
      setDirectory(`${fileName}/`);
    }
  };

  const handleClickPath = (endpoint) => {
    setFilesEndpoint(endpoint);
  };

  const headerContainer = 'flex flex-col items-center my-4';

  if (repoConsulted.isLoading) {
    return <Spinner />;
  }

  if (!repoConsulted.isLoading) {
    return (
      <>
        <div className={`header-repo-page ${headerContainer}`}>
          <h3 className="text-gold-dark text-3xl">{repoConsulted.datas.name}</h3>
          <p className="text-gold-dark text-l">auteur: {username}</p>
          <p className="text-gold-dark">{repoConsulted.datas.description}</p>
        </div>
        <Files filesEndpoint={filesEndpoint} handleClickFile={handleClickFile} handleClickPath={handleClickPath} directory={directory} />
        <ContentOverview fileEndPoint={fileEndPoint} />
      </>
    );
  }
}

export default Repo;
