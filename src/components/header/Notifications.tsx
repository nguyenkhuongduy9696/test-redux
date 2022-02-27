import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'common/Dropdown';

const envelop: any = 'fa-regular fa-envelope';

const Notifications = () => {
  // eslint-disable-next-line no-unused-vars
  const [unread, setUnread] = useState(0);

  return (
    <>
      <Dropdown>
        <div className="cursor-pointer border-r pr-4 hover:text-primary-500 relative" title='Thông báo'>
          <span><FontAwesomeIcon icon={ envelop } size='lg' /></span>
          {
            unread === 0 &&
                <>
                  <div className="absolute -top-0.5 right-3 w-2.5 h-2.5 rounded-full bg-red-500 text-white font-10 flex items-center justify-center animate-ping"/>
                  <div className="absolute -top-0.5 right-3 w-2.5 h-2.5 rounded-full bg-red-500 text-white font-10 flex items-center justify-center"/>
                </>
          }
        </div>
        <div className='px-4 py-3' style={ { width: '300px' } }>
          sadasd
        </div>
      </Dropdown>
    </>
  );
};

export default Notifications;
