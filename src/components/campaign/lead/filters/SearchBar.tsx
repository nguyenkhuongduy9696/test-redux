import React from 'react';

import BaseInput from 'common/BaseInput';

const SearchBar = () => {
  return (
    <div className="w-full flex-1-1-auto">
      <BaseInput placeholder='Tìm kiếm' baseInputClassName='mb-0'
        inputWrapperClassName='px-2 py-1.5 border rounded-md'
        iconLeft={ [{ icon: 'search', onClick: null }] }
        iconRight={ [{ icon: 'arrow-circle-right', onClick: null }] }/>
    </div>
  );
};

export default SearchBar;
