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
import Collapse from '@mui/material/Collapse';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';

const navigation = [
    { name: "Home", icon: <AccountCircleIcon />, path: '/admin' },
    { name: "Orders", icon: <StickyNote2Icon />, path: '/admin/orders' },
    { name: "Banners", icon: <ViewCarouselIcon />, path: '/admin/banners' },
    { name: "Blogs", icon: <BookIcon />, path: '/admin/blogs' },
    { name: "Services", icon: <HomeRepairServiceIcon />, path: '/admin/services' },
    { name: "Fleet", icon: <DirectionsCarIcon />, path: '/admin/fleet' },
    { name: "Careers", icon: <WorkIcon />, path: '/admin/careers' },
    { name: "Contact Info", icon: <ContactSupportIcon />, path: '/admin/contact-info' },
]

const sub_orders = [
    { name: "Incoming", icon: <MoveToInboxIcon />, path: '/admin/orders/incoming' },
    { name: "Accepted", icon: <PlaylistAddCheckIcon />, path: '/admin/orders/accepted' },
    { name: "Rejected", icon: <HighlightOffIcon />, path: '/admin/rejected' },
]

export default function BasicList() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {navigation.map((el, i) => {
                        return el.name === "Orders" ? (
                            <ListItem sx={{ display: 'inline' }} key={i} disablePadding>
                                <ListItemButton onClick={handleClick}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={el.name} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {sub_orders.map((el, i) => (
                                            <ListItemButton key={i} sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    {el.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={el.name} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </ListItem>
                        ) : (<ListItem onClick={() => navigate(el.path)} key={i} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {el.icon}
                                </ListItemIcon>
                                <ListItemText primary={el.name} />
                            </ListItemButton>
                        </ListItem>
                        )
                    })}
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