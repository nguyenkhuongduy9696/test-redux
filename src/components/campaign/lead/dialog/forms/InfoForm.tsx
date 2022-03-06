import React from 'react';

import UploadImage from 'common/UploadImage';

const InfoForm = () => {
  return (
    <>
      <div className="k-dialog-body flex flex-wrap">
        <div className="w-full lg:w-1/5">
          <UploadImage />
        </div>
      </div>
    </>
  );
};

export default InfoForm;
