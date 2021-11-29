import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Grid, Box } from '@mui/material';

import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import RightSideBar from '../components/home/RightSideBar';

let scroll = 0;

export default function Home() {

    const { homePosts } = useSelector(state => state);

    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset
            return scroll;
        }
    });

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' })
        }, 100)
    }, []);

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <Status />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, padding: '10px 40px' }}>
                        <Box sx={{ width: '100%' }} >
                            <Status />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <RightSideBar />
                </Grid>
            </Grid>
        </div>
    );
}