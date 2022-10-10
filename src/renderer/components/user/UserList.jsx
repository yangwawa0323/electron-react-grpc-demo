import { Box, Typography } from '@mui/material'
import React, {useEffect, useState } from 'react'
import User from './User'




const UserList = (props) => {
	const { users } = props


	return (
		<Box sx={{}}>
			<Typography>User List</Typography>
			{users && 
				users.map((user, idx) => {
					const userObj = user.toObject()
					return (
						<User key={idx} user={userObj}/>
					)
				} )
			}
	  </Box >
  )
}

export default UserList