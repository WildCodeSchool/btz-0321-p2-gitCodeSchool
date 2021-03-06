import React from 'react';
import PropTypes from 'prop-types';
import { FOLLOWING_URL } from '../../api/endpoints';
import { useGetAll } from '../../api/useGet';
import './Profile.css';

import { Link } from 'react-router-dom';

export default function Following({ username }) {
  const endpoint = FOLLOWING_URL.replace('{username}', username);
  const following = useGetAll(endpoint);

  return (
    <div className="mt-4 w-64 h-32 overflow-auto ">
      {following.datas.map((following) => {
        return (
          <Link key={following.id} to={`/Profile/${following.login}`}>
            <div className="flex items-center">
              <img className="h-4 rounded-full " src={following.avatar_url} alt="" />
              <p className="text-white ml-2">{following.login}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
Following.propTypes = {
  username: PropTypes.string,
};
