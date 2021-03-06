import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../Contexts';
import { useParams } from 'react-router';
import NavbarSearch from '../NavbarSearch/NavbarSearch';
import SearchRepos from './SearchRepos';
import SearchUsers from './SearchUsers';

function SearchPage() {
  const { query } = useParams();
  const { setModal, setModalOpen } = useContext(ModalContext);
  const [resultsRepos, setResultsRepos] = useState(0);
  const [resultsUsers, setResultsUsers] = useState(0);
  const [activePageRepos, setActivePageRepos] = useState(1);
  const [activePageUsers, setActivePageUsers] = useState(1);
  useEffect(() => {
    setModalOpen(false);
    if ((resultsRepos > 300 || resultsUsers > 300) && activePageRepos === 1 && activePageUsers === 1) {
      const totalResults = resultsUsers + resultsRepos;
      setModal({
        title: 'Wow 🤯',
        content: `Il y a ${totalResults} résultats 😵‍💫 ! Nous vous proposons les 300 premiers dans chaque catégorie. Pour plus de précision, ajoutez des critères`,
        buttons: [
          {
            content: 'Je comprends',
            color: 'bg-green-300 hover:bg-green-600',
          },
        ],
      });
      setModalOpen(true);
    }
  }, [resultsRepos, resultsUsers]);

  const handleSetRepos = (reposResults, active) => {
    setResultsRepos(reposResults);
    setActivePageRepos(active);
  };

  const handleSetUsers = (usersResults, active) => {
    setResultsUsers(usersResults);
    setActivePageUsers(active);
  };

  const PageContainerClasses = 'flex flex-col mt-14 w-full text-center text-gold-dark px-5 mb-10';
  const PageContainerClassesMd = 'content-around';
  const titleClasses = 'text-3xl mt-16';
  const subTitleClasses = 'text-xl mb-10';
  const searchResultsClasses = 'flex flex-col w-full';
  const searchResultsClassesMd = 'md:flex-row mt-16';
  const userContainerClass = 'border';
  const userContainerClassMd = 'mx-auto px-6 rounded-lg border-gold-dark md:w-1/3 w-3/4 bg-homeGray-dark';
  const repoContainerClass = 'border';
  const repoContainerClassMd = 'mx-auto px-6 rounded-lg border-gold-dark md:w-1/3 w-3/4 bg-homeGray-dark';

  return (
    <>
      <div className={`search-page ${PageContainerClasses} ${PageContainerClassesMd}`}>
        <h3 className={`${titleClasses}`}>Resultat de la recherche</h3>
        <h2 className={`${subTitleClasses}`}>{`"${query}"`}</h2>
        <NavbarSearch />
        <div className={`search-results ${searchResultsClasses} ${searchResultsClassesMd}`}>
          <div className={`${userContainerClass} ${userContainerClassMd}`}>
            <SearchUsers query={query} handleSetUsers={handleSetUsers} />
          </div>
          <div className="my-10 border border-gold-dark  "></div>
          <div className={`${repoContainerClass} ${repoContainerClassMd}`}>
            <SearchRepos query={query} handleSetRepos={handleSetRepos} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
