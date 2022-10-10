import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import FindUserByGenderPanel from './FindUserByGenderPanel';
import FindUserByNamePanel from './FindUserByNamePanel';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const UserPanel = () => {

  const [value, setValue] = useState(0)

  return (
    <Box sx={{
      width: '100%'
    }}>
      <Box sx={{ padding: 6 }}>
        <Typography variant="body2">
        This example has two different search method, search by name returns
        a single user message, search by gender returns repeated user messages
        </Typography>
        </Box>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider',
      }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value} onChange={(event, newValue) => setValue(newValue)}>
          <Tab label="Find by name" {...a11yProps(0)} />
          <Tab label="Find by gender" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FindUserByNamePanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FindUserByGenderPanel />
      </TabPanel>
    </Box>
  )
}

export default UserPanel