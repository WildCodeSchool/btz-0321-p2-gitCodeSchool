import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import File from './File';
import { useGetAll } from '../../api/useGet';
import './Repo.css';

export default function Files({ filesEndpoint, handleClickFile, handleClickPath, directory }) {
  const files = useGetAll(filesEndpoint);

  const [path, setPath] = useState([]);
  useEffect(() => {
    setPath([
      ...path,
      {
        directory: directory,
        endpoint: filesEndpoint,
      },
    ]);
  }, [directory]);

  const handleClickReturn = (index, endpoint) => {
    const clickPosition = index + 1;
    const n = path.length - clickPosition;
    path.splice(clickPosition, n);
    handleClickPath(endpoint);
  };

  return (
    <div className="content border border-gold-dark mb-6 py-4 rounded-md  flex flex-col px-8 bg-homeGray-dark">
      <div className="text-center ">
        {path.map((item, index) => {
          return (
            <button
              className="path-item cursor-pointer text-yellow-400 focus:outline-none px-1"
              key={index}
              onClick={() => handleClickReturn(index, item.endpoint)}>
              {item.directory}
            </button>
          );
        })}
      </div>
      <hr className="border-gold-dark w-1/4 mx-auto my-4" />
      <ul className=" overflow-auto text-center">
        {files.datas.map((file) => {
          return <File handleClickFile={handleClickFile} file={file} key={file.sha} />;
        })}
      </ul>
      <hr className="border-gold-dark w-1/4 mx-auto my-3" />
    </div>
  );
}

Files.propTypes = {
  filesEndpoint: PropTypes.string,
  handleClickFile: PropTypes.func,
  handleClickPath: PropTypes.func,
  directory: PropTypes.string,
};
