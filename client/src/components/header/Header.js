import * as React from 'react';
import { useSelector } from 'react-redux';

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Link
} from '@mui/material';

import MenuBar from './Menu';
import SearchComponent from './Search';

export default function HeaderBar() {

    const { theme } = useSelector(state => state)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        noWrap
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link href="/" underline="none">
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img style={{ width: '32px', height: '32px' }} src='https://res.cloudinary.com/mayurkamble/image/upload/v1636887085/icon/bptheulgfynt1npaui36.png' />
                                </div>
                                <div>
                                    <div style={{ margin: '5px', fontFamily: "'Chocolate', sans-serif", fontSize: '20px', fontWeight: 'bolder', letterSpacing: '4px', color: 'white' }}>FunBook</div>
                                </div>
                            </div>
                        </Link>
                    </Typography>
                    <MenuBar />
                </Toolbar>
            </AppBar>
        </Box>
    )
}