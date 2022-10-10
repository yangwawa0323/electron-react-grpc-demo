import React from 'react'

import { Divider, Typography, Card, CardContent, Box } from '@mui/material'



const User = (props) => {
  const { user } = props
  return (
    <Box sx={{ marginTop: 3 }}>
      <Divider />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            user detail information
          </Typography>
          <Typography variant="h5" component="div">
            Name: {user.username}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Gender: {user.gender}
          </Typography>
          <Typography variant="body2">
            Firstname:{user.firstName}
            , Lastname:  {user.lastName}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default User