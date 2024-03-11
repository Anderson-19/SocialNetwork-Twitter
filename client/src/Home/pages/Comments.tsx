import React, { useEffect, useState } from 'react'

import './styles.css';
import { getCommentsByPostId, getPostById } from '../../api';
import { useUserStore } from '../../store';
import { useLocation } from 'react-router-dom';
import { Card } from '../components';

export const Comments = () => {

    const [commentsByPost, setCommentsByPost] = useState<any[]>();
    const { state } = useLocation();
    const user = useUserStore(state => state.user);

    useEffect(() => {
        if (state === null && !state.post) return;

        getCommentsByPostId( user.token, state.post.post_id )
            .then( res => setCommentsByPost(res.comments) )
            .catch( console.log )

    }, [state]);

    console.log(commentsByPost);

    return (
        <div className="w-full h-full justify-center overflow-x-hidden overflow-y-scroll scroll-ui">
            <div>
                { (state !== null && state.post) &&
                    ( <Card post={state.post} /> )
                }
            </div>
            <div className="pt-3 flex justify-center items-start w-full divide-x divide-gray-800 divide-solid" />
            <div>
                {
                    (state !== null && state.post) &&
                        commentsByPost?.map( comments => <Card key={comments.post_comment_id} post={comments} /> )
                }
            </div>
        </div>
    )
}
