import React from 'react'
import './topnav.scss'
import UserInfo from '../user-info/UserInfo'
import { data } from '../../constants'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';


const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }

    return (
        <div className='topnav'>
            <UserInfo user={data.user} />
            <div className="sidebar-toggle" onClick={openSidebar}>
                <ListOutlinedIcon sx={{ fontSize: '40px'}} />
            </div>
        </div>
    )
}

export default TopNav
