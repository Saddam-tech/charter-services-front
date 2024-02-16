import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WorkIcon from '@mui/icons-material/Work';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const navigation = [
    { name: "Home", icon: <AccountCircleIcon />, path: '/admin' },
    { name: "Orders", icon: <StickyNote2Icon />, path: '/admin/orders' },
    { name: "Blogs", icon: <BookIcon />, path: '/admin/blogs' },
    { name: "Services", icon: <HomeRepairServiceIcon />, path: '/admin/services' },
    { name: "Fleet", icon: <DirectionsCarIcon />, path: '/admin/fleet' },
    { name: "Careers", icon: <WorkIcon />, path: '/admin/careers' },
    { name: "Contact Info", icon: <ContactSupportIcon />, path: '/admin/contact-info' },
]

export default function BasicList() {
    const navigate = useNavigate();
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {navigation.map((el, i) => (
                        <ListItem onClick={() => navigate(el.path)} key={i} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {el.icon}
                                </ListItemIcon>
                                <ListItemText primary={el.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}