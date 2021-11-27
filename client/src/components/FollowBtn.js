import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Button } from '@mui/material';

import { follow, unfollow } from '../redux/actions/profileAction';

export default function FollowBtn({ user }) {
    const [followed, setFollowed] = useState(false);

    const { auth, profile, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (auth.user.following.find(item => item._id === user._id)) {
            setFollowed(true);
        }
        return () => setFollowed(false);
    }, [auth.user.following, user._id]);

    const handleFollow = async () => {
        if (load) return;

        setFollowed(true);
        setLoad(true);
        await dispatch(follow({ users: profile.users, user, auth, socket }));
        setLoad(false);
    }

    const handleUnFollow = async () => {
        if (load) return;
        setFollowed(false);
        setLoad(true);
        await dispatch(unfollow({ users: profile.users, user, auth, socket }));
        setLoad(false);
    }

    return (
        <Box>
            {followed ? <Button variant="outlined" color="error" onClick={handleUnFollow}>UnFollow</Button>
                : <Button variant="outlined" color="info" onClick={handleFollow}>Follow</Button>
            }
        </Box>
    );
}