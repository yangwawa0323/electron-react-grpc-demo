import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NatOutlinedIcon from '@mui/icons-material/NatOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const sidebarNav = [
    {
        link: '/',
        section: 'home',
        icon: <HomeOutlinedIcon />,
        text: 'Home'
    },
   
    {
        link: '/grpc',
        section: 'grpc',
        icon: <NatOutlinedIcon />,
        text: 'gRPC'
    },
    {
        link: '/settings',
        section: 'settings',
        icon: <SettingsOutlinedIcon />,
        text: 'Settings'
    }
]

export default sidebarNav