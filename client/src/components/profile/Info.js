import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Avatar, Button, Typography, Divider } from '@mui/material';

import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'

export default function Info({ id, auth, profile, dispatch }) {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);

    const _dispatch = useDispatch();
    const history = useHistory();

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        } else {
            const newData = profile.users.filter(user => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [showFollowers, showFollowing, onEdit, dispatch]);

    const handleAddUser = (user) => {
        _dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
        // dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
        return history.push(`/message/${user._id}`);
    }

    const isActive = (user) => {
        if (id === user._id) return 'active';
        return '';
    }

    return (<Box>
        {userData.map(user => (<Box key={user._id} >
            <Box sx={{ display: 'flex', mb: 1 }}>
                <Box sx={{ width: '100px', p: 1 }} >
                    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            alt=""
                            src={user.avatar}
                            sx={{ height: 86, width: 86 }}
                        ></Avatar>
                    </Box>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>{user.fullname}</Typography>
                </Box>
                <Box sx={{ width: 'calc(100% - 100px)', pr: 1 }}>
                    <Typography fullWidth component='div' sx={{ mt: 3, fontSize: '20px' }}>{user.username}</Typography>
                    {user._id === auth.user._id
                        ? <Button
                            fullWidth
                            size='small'
                            variant="outlined"
                            color='inherit'
                            // onClick={() => setOnEdit(true)}
                            href={`/editprofile/{auth.user._id}`}
                            sx={{ textTransform: 'none' }}
                        >Edit Profile</Button>
                        : <FollowBtn user={user} />}
                </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-around', color: 'darkgray', textAlign: 'center' }}>
                {/* <Box>
                    <Typography fullWidth sx={{ fontWeight: 'bold', color: 'black', fontSize: '14px' }} >{user.followers.length}</Typography>
                    <Typography fullWidth sx={{ fontSize: '14px' }}>Post</Typography>
                </Box> */}
                <Box sx={{ cursor: 'default' }} onClick={() => setShowFollowers(true)}>
                    <Typography fullWidth sx={{ fontWeight: 'bold', color: 'black', fontSize: '14px' }} >{user.followers.length}</Typography>
                    <Typography fullWidth sx={{ fontSize: '14px' }}>Follower</Typography>
                </Box>
                <Box sx={{ cursor: 'default' }} onClick={() => setShowFollowing(true)}>
                    <Typography fullWidth sx={{ fontWeight: 'bold', color: 'black', fontSize: '14px' }} >{user.following.length}</Typography>
                    <Typography fullWidth sx={{ fontSize: '14px' }}>Following</Typography>
                </Box>
            </Box>
            <Divider />

            {onEdit && <EditProfile setOnEdit={setOnEdit} />}

            {showFollowers && <Followers
                users={user.followers}
                setShowFollowers={setShowFollowers}
            />}
            {showFollowing && <Following
                users={user.following}
                setShowFollowing={setShowFollowing}
            />}


            {/* <div className="info_content">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}

            {/* <span>
                        <div key={user._id} className={`message_user ${isActive(user)}`}
                            onClick={() => handleAddUser(user)}>
                            <div style={{
                                borderRadius: '50%',
                                background: 'rgb(186 186 187)',
                                height: '40px',
                                width: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textDecoration: 'none'
                            }} >
                                <span
                                    class="material-icons"
                                    style={{ cursor: 'pointer' }}>
                                    near_me
                                </span>
                            </div>
                        </div>
                    </span> */}
            {/* 
                    <span>
                        {
                            user._id === auth.user._id
                                ? <button className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}>
                                    Edit Profile
                                </button>

                                : <FollowBtn user={user} />
                        }
                    </span>

                </div>


                <div className="info_content_title">
                    <h2>{user.username}</h2>
                </div>

                <div className="follow_btn">
                    <span className="mr-4" onClick={() => setShowFollowers(true)}>
                        {user.followers.length} Followers
                    </span>
                    <span className="ml-4" onClick={() => setShowFollowing(true)}>
                        {user.following.length} Following
                    </span>
                </div>



                <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                <p className="m-0">{user.address}</p>
                <h6 className="m-0">{user.email}</h6>
                <a href={user.website} target="_blank" rel="noreferrer">
                    {user.website}
                </a>
                <p>{user.story}</p>
            </div>

            {
                onEdit && <EditProfile setOnEdit={setOnEdit} />
            }

            {
                showFollowers &&
                <Followers
                    users={user.followers}
                    setShowFollowers={setShowFollowers}
                />
            }
            {
                showFollowing &&
                <Following
                    users={user.following}
                    setShowFollowing={setShowFollowing}
                />
            } */}

        </Box>))}
    </Box>);
}