import React, {useState} from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box
} from '@mui/material'

import User from './User'

import { newUserService} from './user_service'

import us_pb from '../../pb_js/user/v1/user_service_pb'
import UserList from './UserList'

import { useSelector } from 'react-redux'

const FindUserByGenderPanel = () => {


  const grpcServer = useSelector((state)=> state.grpcSettings.grpcServer)

  const [gender, setGender] = useState('Female')
  const [users, setUsers] = useState([])
 
  const searchByGender = () => {
    console.log("[DEBUG] search by gender: ", gender)
    
    const service = newUserService(grpcServer)
    const request = new us_pb.SearchByGenderRequest()

    request.setGender(gender)

    service.searchByGender(request, {}, (err, res) => {
      if (!err) {
        // console.log("[DEBUG]", res.getUsersList())
        setUsers( res.getUsersList())
      } else {
        console.log("[DEBUG] error: ", err)
      }
    })
  }

  return (
    <Box sx={{}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' , alignItems : 'center' }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Female" control={<Radio onClick={()=> setGender('Female')} />} label="Female" />
            <FormControlLabel value="Male" control={<Radio />} onClick={()=> setGender('Male')} label="Male" />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={searchByGender} >Search</Button>
      </Box>
      <Box sx={{}}>
        <UserList users={users} />
      </Box>
    </Box>
  )
}

export default FindUserByGenderPanel