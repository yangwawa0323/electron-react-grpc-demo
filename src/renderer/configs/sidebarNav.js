import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NatOutlinedIcon from '@mui/icons-material/NatOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

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
        link: '/videoConvert',
        section: 'videoConvert',
        icon: <SwitchVideoIcon />,
        text: 'Video Convert'
    },
    {
        link: '/settings',
        section: 'settings',
        icon: <SettingsOutlinedIcon />,
        text: 'Settings'
    }
]

export default sidebarNav