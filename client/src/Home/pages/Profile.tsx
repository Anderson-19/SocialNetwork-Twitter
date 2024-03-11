import React, { useEffect, useState } from 'react';

import {
  IoArrowBack,
  IoCalendarOutline,
  IoGiftOutline,
  IoLinkOutline,
  IoLocationOutline
} from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore, useUserStore } from '../../store';
import { getFollowersAndFollowing, getForwardedByUserId, getLikesByUserId, getPostsByUserId, getUserById, logout } from '../../api';
import { User } from '../../interfaces';
import { Card, ModalUser } from '../components';
import { month } from '../../helpers';

export const Profile = () => {

  const [data, setData] = useState<User>();
  const [posts, setPosts] = useState<any[]>();
  const [follow, setFollow] = useState<any>();
  const [likes, setLikes] = useState<any[]>();
  const [forwarded, setForwarded] = useState<any[]>();

  const { state } = useLocation();
  const nav = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const { isSideModalPost, isSideModalEditUser, openModalEditUser, isSideModalUserImage } = useUIStore(state => state);
  const user = useUserStore(state => state.user);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getUserById(user.uid, user.token)
          .then(res => setData(res))
          .catch(console.log);
      } else {
        getUserById(state?.user_id, user.token)
          .then(res => setData(res))
          .catch(console.log);
      }
    } else {
      getUserById(user.uid, user.token)
        .then(res => setData(res))
        .catch(console.log);
    }
  }, [isSideModalEditUser, isSideModalUserImage, state]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getPostsByUserId(user.token, user.uid!)
          .then(res => setPosts(res.posts))
          .catch(console.log);
      } else {
        getPostsByUserId(user.token, state?.user_id)
          .then(res => setPosts(res.posts))
          .catch(console.log);
      }
    } else {
      getPostsByUserId(user.token, user.uid!)
        .then(res => setPosts(res.posts))
        .catch(console.log);
    }
  }, [isSideModalPost, isSideModalEditUser, state]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getFollowersAndFollowing(user.token, user.uid)
          .then(res => setFollow(res))
          .catch(console.log)
      } else {
        getFollowersAndFollowing(user.token, state?.user_id)
          .then(res => setFollow(res))
          .catch(console.log)
      }
    } else {
      getFollowersAndFollowing(user.token, user.uid)
        .then(res => setFollow(res))
        .catch(console.log)
    }
  }, [state]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getLikesByUserId(user.token, user.uid!)
          .then(res => setLikes(res.likes))
          .catch(console.log)
      } else {
        getLikesByUserId(user.token, state?.user_id)
          .then(res => setLikes(res.likes))
          .catch(console.log)
      }
    } else {
      getLikesByUserId(user.token, user.uid!)
        .then(res => setLikes(res.likes))
        .catch(console.log)
    }
  }, [state]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getForwardedByUserId(user.token, user.uid!)
          .then(res => setForwarded(res.forwarded))
          .catch(console.log)
      } else {
        getForwardedByUserId(user.token, state?.user_id)
          .then(res => setForwarded(res.forwarded))
          .catch(console.log)
      }
    } else {
      getForwardedByUserId(user.token, user.uid!)
        .then(res => setForwarded(res.forwarded))
        .catch(console.log)
    }
  }, [state]);

  return (

    <div className="w-full h-full pt-8 justify-center overflow-x-hidden overflow-y-scroll scroll-ui">
      <div>
        <section className="border border-y-0 border-gray-800">
          {/* <!--Content (Center)--> <!-- Nav back--> */}
          <div>
            <div className="flex bg-gray-100">
              <div className="justify-start px-4 py-2 mx-2">
                {/*                 <IoArrowBack /> */}
              </div>
              <div className="mx-2">
                <h2 className="mb-0 text-xl font-bold text-black">{data?.name} {data?.lastname}</h2>
                <p className="mb-0 w-48 text-xs text-gray-400">{posts?.length} Posts</p>
              </div>

              <button
                onClick={() => {
                  logout(user);
                  setUser({ uid: '', name: '', email: '', lastname: '', username: '', avatar: '', password: '', token: '', isLogged: false });
                  nav('/');
                }}
                className={`${state?.user_id === user.uid ? 'h-1/2 whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-2 mt-2 ml-auto' : 'hidden'}`} >
                Log Out
              </button>

            </div>

            <hr className="border-gray-800" />
          </div>
          {/* <!-- User card--> */}
          <div>
            <div className="w-full flex bg-cover bg-no-repeat bg-center cursor-pointer" style={{ height: '200px', backgroundImage: `url(${data?.banner})` }}>
            </div>
            <div className="p-4 bg-gray-100">
              <div className="relative flex w-full">
                {/* <!-- Avatar --> */}
                <div className="flex flex-1">
                  <div style={{ marginTop: '-6rem' }}>
                    <div style={{ height: '9rem', width: '9rem' }} className="md rounded-full relative avatar cursor-pointer">
                      <img style={{ height: '9rem', width: '9rem' }} className="md rounded-full relative border-4 border-gray-900" src={data?.avatar} alt="" />
                    </div>
                  </div>
                </div>
                {/* <!-- Follow Button --> */}
                <div className="flex flex-col justify-end">
                  <button
                    onClick={openModalEditUser}
                    className={`${state?.user_id === user.uid ? 'max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto' : 'hidden'}`}>
                    Edit Profile
                  </button>
                  {
                    (follow?.followers && state !== null)
                      && follow?.followers?.find((f: any) => f.follower_id === user.uid) ? (
                      <button
                        /* onClick={async () => await unFollow(state?.user_id, user.uid!, user.token!)} */
                        className="max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                      >
                        Following
                      </button>
                    ) : state?.user_id !== user.uid && (
                      <button
                        className="bg-blue-600 font-semibold py-2 px-4 text-white rounded-full hover:bg-blue-500 border border-white hover:border-transparent"
                      /* onClick={async () => await setFollowing(state?.user_id, user.uid!, user.token!)} */
                      >
                        Follow
                      </button>
                    )
                  }
                </div>
              </div>

              {/* <!-- Profile info --> */}
              <div className="space-y-1 justify-center w-full mt-3 ml-3">
                {/* <!-- User basic--> */}
                <div>
                  <h2 className="text-xl leading-6 font-bold text-black">{data?.name} {data?.lastname}</h2>
                  <p className="text-sm leading-5 font-medium text-gray-600">@{data?.username}</p>
                </div>
                <div className="flex">
                  <IoLocationOutline size={20} className="mt-5" /> <p className="text-8px mt-5 font-medium text-gray-800"> Maracaibo, Venezuela</p>
                  <IoCalendarOutline size={20} className="mt-5 ml-4" /> <p className="text-8px mt-5 font-medium text-gray-800 ml-2"> Joined {month(data?.created_at!)}</p>
                  <IoGiftOutline size={20} className="mt-5 ml-4" /> <p className="text-8px mt-5 font-medium text-gray-800 ml-2"> Born {month(data?.birthdate!)}</p>
                </div>
                {/* <!-- Description and others --> */}
                <div className="mt-3">
                  <p className="text-black leading-tight mb-2">{data?.biography}</p>
                  {/* <div className="text-gray-600 flex">
                    <IoLinkOutline size={20} /><span><a href="https://ricardoribeirodev.com/personal/" className="leading-5 ml-1 text-blue-400">www.RicardoRibeiroDEV.com</a></span>
                  </div> */}
                </div>

                <div className="pt-3 flex justify-center items-start w-full divide-x divide-gray-800 divide-solid">

                  <div className="text-center pr-3 cursor-pointer hover:bg-slate-200">
                    <span className="font-bold text-black">
                      {follow?.followings.length ?? 0}
                    </span>
                    <span className="text-gray-600"> Following</span>
                  </div>

                  <div className="text-center px-3 cursor-pointer">
                    <span className="font-bold text-black">
                      {follow?.followers.length ?? 0}
                    </span>
                    <span className="text-gray-600"> Followers</span>
                  </div>

                  <div className="text-center px-3 cursor-pointer">
                    <span className="font-bold text-black">
                      {likes?.length ?? 0}
                    </span>
                    <span className="text-gray-600"> Likes</span>
                  </div>

                  <div className="text-center px-3 cursor-pointer">
                    <span className="font-bold text-black">
                      {forwarded?.length ?? 0}
                    </span>
                    <span className="text-gray-600"> Forwarded</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <hr className="border-gray-800" />
          {posts &&
            posts?.map(post => <Card key={post.post_id} post={post} />)
          }
          {
            forwarded &&
            forwarded.map(forwarded => <Card key={forwarded.post_id} post={forwarded} />)
          }
        </section>
      </div>
      <ModalUser userData={data!} state={state} />
    </div >
  )
}
