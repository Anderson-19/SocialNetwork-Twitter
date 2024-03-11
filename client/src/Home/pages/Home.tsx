import { useEffect, useState } from 'react'
import { useUserStore } from '../../store'
import { getPostsOfFollowings } from '../../api';
import { Card } from '../components';

import './styles.css';

export const Home = () => {
  const [posts, setPosts] = useState<any[]>();
  /* const [ interactions, setInteractions ] = useState<boolean>(false); */
  const user = useUserStore(state => state.user);

  useEffect(() => {
    getPostsOfFollowings(user.token)
      .then((res:any) => setPosts(res.posts))
      .catch(console.log)
  }, [ /* interactions */ ]);

  return (
    <div className="w-full h-full justify-center overflow-x-hidden overflow-y-scroll scroll-ui">
      { posts &&
        posts?.map((post: any) => (
          <div key={post.post_id} className={`${post.user_id === user.uid ? 'hidden' : ''}`}>
            <Card post={post} /* setInteractions={setInteractions} *//>
          </div>
        ))
      }
    </div>
  )
}
