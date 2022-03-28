import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import styledComponents from 'styled-components'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidenav({ children, items }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [submenus, setSubMenus] = React.useState()
    const [currentPage, setCurrentPage] = React.useState('')
    const { firstItems, secondItems } = items
    React.useEffect(() => {
        setCurrentPage(firstItems[0])
        let submenu_obj = {}
        if (firstItems) {
            firstItems.forEach(item => {
                if ('subItems' in item) {
                    submenu_obj[item.name] = false
                }
            })
        }
        if (secondItems) {
            secondItems.forEach(item => {
                if ('subItems' in item) {
                    submenu_obj[item.name] = false
                }
            })
        }
        setSubMenus(submenu_obj);
    }, [])
    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        let obj = {}
        Object.keys(submenus).forEach(key => {
            obj[key] = false
        })
        setSubMenus(obj)
    };

    const handleOpenSubmenu = (submenu) => {
        setOpen(true);
        setSubMenus({
            ...submenus,
            [submenu]: !submenus[submenu]
        })
        

    }

    return (
        submenus ?
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            { currentPage.label ? currentPage.label : currentPage.name }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {firstItems && <List>
                        {firstItems.map(item =>
                            'subItems' in item ?
                                <NestedListItem key={item.name}>                                    
                                    <ListItemButton
                                        onClick={() => handleOpenSubmenu(item.name)}
                                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}
                                    >
                                        { open && <div className="caretDown"><KeyboardArrowDownIcon /></div> }
                                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label ? item.label : item.name} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                    {submenus[item.name] && <ul>
                                        {item.subItems.map(subitem => <li key={subitem.name}>{console.log(subitem)}<Link 
                                            to={subitem.url ? subitem.url : '/'} 
                                            onClick={() => handleCurrentPage(subitem)}>{subitem.label}</Link></li>)}
                                    </ul>}
                                </NestedListItem> :
                                <Link to={item.url ? item.url : '/'} key={item.name} onClick={() => handleCurrentPage(item)}>
                                    <ListItemButton
                                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label ? item.label : item.name} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </Link>
                        )}
                    </List>}
                    <Divider />
                    {secondItems && <List>
                        {secondItems.map(item =>
                            'subItems' in item ?
                                <NestedListItem>
                                    <ListItemButton
                                        onClick={() => handleOpenSubmenu(item.name)}
                                        key="Projects"
                                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}
                                    >
                                        { open && <div className="caretDown"><KeyboardArrowDownIcon /></div> }
                                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                    {submenus[item.name] && <ul>
                                        {item.subItems.map(subitem => <li key={subitem.name}><Link 
                                            to={subitem.url ? subitem.url : '/'} 
                                            onClick={() => handleCurrentPage(subitem)}>{subitem.label}</Link></li>)}
                                    </ul>}
                                </NestedListItem> :
                                <Link to={item.url ? item.url : '/'} onClick={() => handleCurrentPage(item)}>
                                    <ListItemButton
                                        key={item.name}
                                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label ? item.label : item.name} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </Link>
                        )}
                    </List>}
                </Drawer>
                <Container>
                    <DrawerHeader />
                    { children }
                </Container>
            </Box> :
            <div>Loading</div>
    );
}

const Container = styledComponents.div`
    text-align: unset;
    padding: 25px;
`

const NestedListItem = styledComponents.div`
    position: relative;    
    & > div {
        .caretDown {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-40%);
        }
    }
    ul {        
        margin-left: 10px;
        font-size: 0.7rem !important;
        list-style-type: none;
        li { 
            position: relative;
            display: flex;
            gap: 15px;
            font-size: 0.8rem;
            height: 30px;
            &::before {
                content: "";
                display: block;
                width: 2px;
                background-color: #d1d1d1;
            } 
            &::after {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                transform: translate(-35%,-50%);
                background-color: #d1d1d1;
                height: 7px;
                width: 7px;
                border-radius: 50%;
            }    
            a {
                flex: 1;
                display: flex;
                justfiy-content: flex-start;
                text-decoration: none;
                color: #8f8f8f;
                align-self: center;
                &:hover {
                color: #595959;
                }
            }
        }
    }
`
const ListConnector = styledComponents.div`
  height: 100%;
  width: 2px;
  background-color: #d1d1d1;
`
