import React from 'react'

import { Link, Outlet } from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Home = () => {
  return (
    <Box sx={{
      width: 640,
      height: 'auto',
      transform: 'translateX(50%)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
        <div>
        gRPC web client demo
        </div>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 4,
      }}>
        <Link style={{ textDecoration: 'none'}} to="/echo">
          <Button variant="contained">Echo </Button>
        </Link>
        <Link style={{ textDecoration: 'none'}} to="/user">
          <Button variant="outlined">Search User</Button>
        </Link>
      </Box>

      <Box sx={{
        padding: 3,
        minHeight: 400,
      }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Home