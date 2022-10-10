import React, { useState } from 'react'

import { Box, TextField, Button,  Snackbar, Alert } from '@mui/material'

import us_pb from '../../pb_js/user/v1/user_service_pb'

import User from './User'

import { newUserService } from './user_service'

import { useSelector, useDispatch } from 'react-redux'

const FindUserByNamePanel = () => {

  const grpcServer = useSelector((state) => state.grpcSettings.grpcServer)


  const [name, setName] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

 

  const handleClose = () => {
    setError(null)
  }

  const findUserByName = () => {
    console.log("Find name: ", name, "grpc server:", grpcServer)
    const service = newUserService(grpcServer)
    const request = new us_pb.SearchByNameRequest()

    request.setUsername(name)
    service.searchByName(request, {}, (err, res) => {

      /**===============================================
       * IMPORTANT: res is SearchByNameResponse obj 
       *================================================*/
      if (!err) {
        console.log("[DEBUG] : ", res.getUser().toObject())
        setUser(res.getUser().toObject())
      } else {
        console.log("[DEBUG] error: ", err)
        setError(err)
      }
    })
  }

  return (
    <Box sx={{}}>

      <Box sx={{}}>
        <TextField onChange={(event) => { setName(event.target.value); setUser(null) }} label="Name" size="small" value={name} />
        <Button onClick={findUserByName} sx={{ marginLeft: 3 }} variant="contained">Find</Button>
      </Box>

      {
        user && <User user={user}/>
      
      }

      <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: 500 }}>
          { error?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default FindUserByNamePanel