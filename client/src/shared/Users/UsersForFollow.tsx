import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces';
//import { getFollowingsById, getUsers, setFollowing, unFollow } from '../../services/actions';

import { getFollowersAndFollowing, getUsers } from '../../api';
import { useUserStore } from '../../store';

export const UsersForFollow = () => {

  const [users, setUsers] = useState<any[]>();
  const [follow, setFollow] = useState<any>();

  const nav = useNavigate();
  const user = useUserStore(state => state.user);

  useEffect(() => {
    getUsers()
      .then((res: any) => setUsers(res.users))
      .catch(console.log)
  }, []);

  useEffect(() => {
    getFollowersAndFollowing(user.token, user.uid)
      .then(res => setFollow(res))
      .catch(console.log)
  }, []);

  console.log(users);
  console.log(follow);


  return (
    <div className="max-w-sm rounded-lg m-4 bg-slate-50">
      <div className="flex">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl w-48 font-semibold text-black">Who to follow</h2>
        </div>
      </div>

      <hr className="bg-gray-50" />

      {/* <!--first person who to follow--> */}
      {
        users && users?.map(dataUser => (
          <>
            <div className={`${dataUser.user_id === user.uid ? 'hidden' : 'flex flex-shrink-0 hover:bg-slate-200 cursor-pointer'}`}>
              <div className="flex-1 ">
                <div className="flex items-center w-48" onClick={() => nav(`/profile`, { state: { user_id: dataUser.user_id } })}>
                  <div>
                    <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2" src={dataUser.avatar} alt="" />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium text-black">
                      {dataUser.name} {dataUser.lastname}
                    </p>
                    <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @{dataUser.username}
                    </p>
                  </div>
                </div>

              </div>

              <div className="px-4 py-2 m-2 text-lg font-medium text-slate-700 hover:text-blue-500 flex justify-center">

                {
                  (follow?.followings && dataUser)
                    && follow?.followings?.find((f: any) => f.following_id === dataUser.user_id) ? (

                    <button
                      className="max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                    /* onClick={async () => await unFollow(state?.user_id, user.uid!, user.token!)}  */
                    >
                      Following
                    </button>
                  ) : dataUser.user_id !== user.uid && (
                    <button
                      className="bg-blue-600 font-semibold py-2 px-4 text-white rounded-full hover:bg-blue-500 border border-white hover:border-transparent"
                    /* onClick={async () => await setFollowing(state?.user_id, user.uid!, user.token!)}  */
                    >
                      Follow
                    </button>
                  )
                }
              </div>
            </div>
          </>
        ))
      }

      {/* <!--show more--> */}
      <div className="flex">
        <div className="flex-1 p-4">
          <h2 className="px-4 ml-2 w-48 font-bold text-blue-400">Show more</h2>
        </div>
      </div>

    </div>
  )
}
