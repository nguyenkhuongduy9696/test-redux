import React from 'react';

import Filters from './Filters';
import SearchBar from './SearchBar';

const LeadScreenFilter = () => {
  return (
    <>
      <div className="w-full md:w-1/2 lg:flex items-center mb-4">
        <Filters />
        <SearchBar />
      </div>
    </>
  );
};

export default LeadScreenFilter;
