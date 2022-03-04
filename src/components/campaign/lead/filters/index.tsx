import React from 'react';

import ButtonGroup from './buttons/ButtonGroup';
import Filters from './search/Filters';
import SearchBar from './search/SearchBar';
import SelectedItem from './search/SelectedItem';

const LeadScreenFilter = () => {
  return (
    <>
      <div className="lg:flex">
        <div className="w-full md:w-1/2 lg:flex items-center mb-4">
          <Filters />
          <SearchBar />
          <SelectedItem />
        </div>
        <div className="w-full md:w-1/2 lg:flex items-center justify-end mb-4">
          <ButtonGroup />
        </div>
      </div>
    </>
  );
};

export default LeadScreenFilter;
