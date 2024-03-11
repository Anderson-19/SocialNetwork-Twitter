import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
/* import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'; */
import {
    IoHeartOutline,
    IoChatbubbleOutline,
    IoRemoveOutline,
    IoSync,
    IoEllipsisVerticalSharp
} from 'react-icons/io5'

import { dayAndMonth } from "../../helpers";
import { useUIStore, useUserStore } from '../../store';
import { addForwarded, addLike, deleteForwarded, disLike, getForwardedByPostId, getLikesByPostId } from '../../api';

//import { addLike, deletePost, disLike } from '../../services/actions';

interface Props {
    post: any;
}

interface Interactions {
    likes: boolean;
    forwarded: boolean;
    quantityLikes: number;
    quantityForwarded: number;
}

export const Card = ({ post }: Props) => {

    const [showDrowDown, setShowDrowDown] = useState(false);
    const [changeOfInteraction, setChangeOfInteraction] = useState<Interactions>({
        likes: false,
        forwarded: false,
        quantityLikes: 0,
        quantityForwarded: 0
    });
    const [forwardedByPost, setForwardedByPost] = useState<any[]>();
    const [likesByPost, setLikesByPost] = useState<any[]>();
    const nav = useNavigate();
    const user = useUserStore(state => state.user);
    const { setTypePost, openModalPost } = useUIStore(state => state);

    useEffect(() => {
        getLikesByPostId(user.token, post.post_id)
            .then(res => setLikesByPost(res.likes))
            .catch(console.log)
    }, []);

    useEffect(() => {
        getForwardedByPostId(user.token, post.post_id)
            .then(res => setForwardedByPost(res.forwarded))
            .catch(console.log)
    }, []);

    const interaction = (type: string) => {

        if (type === "likes") {
            setChangeOfInteraction({
                ...changeOfInteraction,
                likes: !changeOfInteraction.likes,
                quantityLikes: Number(post["likes"]) + changeOfInteraction.quantityLikes
            });
        } else if (type === "forwarded") {
            setChangeOfInteraction({
                ...changeOfInteraction,
                forwarded: !changeOfInteraction.forwarded,
                quantityForwarded: Number(post["forwarded"]) + changeOfInteraction.quantityForwarded
            });
        }
    }

    const isLike = likesByPost?.find(like => like.pl_uid === user.uid);
    const isForwarded = forwardedByPost?.find(forwarded => forwarded.pf_uid === user.uid);

    return (
        <ul className="list-none">
            <li>
                <article className="hover:bg-gray-50 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-shrink-0 p-4 pb-0">
                        <a className="flex-shrink-0 group block">
                            <div className="flex items-center" onClick={() => nav(`/profile`, { state: { user_id: post.user_id } })}>
                                <div>
                                    <img className="inline-block h-10 w-10 rounded-full" src={post.avatar} alt="" />
                                </div>
                                <div className="ml-3 cursor-pointer">
                                    <p className="text-base leading-6 font-medium text-black">
                                        {post.name} {post.lastname}
                                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150 ml-2">
                                            @{post.username} . {dayAndMonth(post.created_at)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="pl-16">
                        <p className="text-base width-auto font-medium text-black flex-shrink">
                            {post.content}
                        </p>

                        {
                            post.img && (
                                <div className="md:flex-shrink pr-6 pt-3">
                                    <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64" style={{ height: '200px', backgroundImage: `url(${post.img})` }} >
                                        <img className="opacity-0 w-full h-full" src={post.img} alt="" />
                                    </div>
                                </div>
                            )
                        }

                        <div className="flex items-center py-4 px-6 mb-2">
                            <div
                                onClick={() => {
                                    setTypePost("comment");
                                    openModalPost();
                                }}
                                className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out cursor-pointer">
                                <IoChatbubbleOutline className="mr-2" size={25} />
                                {post["comments"] ?? 0}
                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-green-400 transition duration-350 ease-in-out cursor-pointer">

                                {changeOfInteraction.forwarded || isForwarded
                                    ? (
                                        <>
                                            <IoSync
                                                className="mr-2 text-green-400"
                                                size={25}
                                                onClick={() => {
                                                    interaction("forwarded");
                                                    deleteForwarded(user.token, post.post_id);
                                                }}
                                            />
                                            {(changeOfInteraction.quantityForwarded + 1) || ''}
                                        </>
                                    )
                                    : (
                                        <>
                                            <IoSync
                                                className="mr-2"
                                                size={25}
                                                onClick={() => {
                                                    interaction("forwarded");
                                                    addForwarded(user.token, post.post_id, post.user_id);
                                                }}
                                            />
                                            {(changeOfInteraction.quantityForwarded - 1) < 0 ? '' : (changeOfInteraction.quantityForwarded - 1) || ''}
                                        </>
                                    )
                                }

                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-red-600 transition duration-350 ease-in-out cursor-pointer">

                                {changeOfInteraction.likes || isLike
                                    ? (
                                        <>
                                            <IoHeartOutline
                                                className="mr-2 text-red-600"
                                                title='dislike'
                                                size={25}
                                                onClick={() => {
                                                    interaction("likes");
                                                    disLike(user.token, post.post_id);
                                                }}
                                            />
                                            {(changeOfInteraction.quantityLikes + 1) || ''}

                                        </>
                                    )
                                    : (
                                        <>
                                            <IoHeartOutline
                                                className="mr-2"
                                                title='like'
                                                size={25}
                                                onClick={() => {
                                                    interaction("likes");
                                                    addLike(user.token, post.post_id, post.user_id);
                                                }}
                                            />
                                            {(changeOfInteraction.quantityLikes - 1) < 0 ? '' : (changeOfInteraction.quantityLikes - 1) || ''}
                                        </>
                                    )
                                }

                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out cursor-pointer">
                                <a onClick={() => setShowDrowDown(!showDrowDown)}>
                                    <IoEllipsisVerticalSharp className="mr-2" size={25} />

                                    <div className={` ${showDrowDown ? 'flex items-center justify-center bg-gray-100' : 'hidden'}`}>
                                        <div className="relative inline-block text-left">
                                            <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2">
                                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Save</a>

                                                <div className={`${post.user_id === user.uid ? 'cursor-pointer' : 'hidden'}`} /* onClick={async () => await deletePost(user.token, post.post_id)} */>
                                                    <a className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100 rounded-md">
                                                        <IoRemoveOutline size={25} />  Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div >

                    </div >
                </article >
            </li >
        </ul >

    )
}
