import React, { useState } from 'react';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import ContactForm from './forms/ContactForm';
import InfoForm from './forms/InfoForm';

const FormGroup = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Tabs forceRenderTabPanel={ true }
        selectedIndex={ tabIndex }
        onSelect={ (index: number) => setTabIndex(index) }>
        <TabList>
          <Tab>Thông tin</Tab>
          <Tab>Người liên hệ</Tab>
        </TabList>
        <TabPanel>
          <InfoForm />
        </TabPanel>
        <TabPanel>
          <ContactForm />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default FormGroup;
