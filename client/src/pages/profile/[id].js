import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import { getProfileUsers } from '../../redux/actions/profileAction'

export default function Profile() {
    const { profile, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [saveTab, setSaveTab] = useState(false);

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }));
        }
    }, [id, auth, dispatch, profile.ids]);

    return (<Box>
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
        {auth.user._id === id && <div className="profile_tab">
            <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
            <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
        </div>}
        {profile.loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box> : <>
            {saveTab ? <Saved auth={auth} dispatch={dispatch} />
                : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />}
        </>}
    </Box>);
}
