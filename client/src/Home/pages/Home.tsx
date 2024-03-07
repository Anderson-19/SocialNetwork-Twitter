import { useEffect, useState } from 'react'
import { useUserStore } from '../../store'
import { getPostsOfFollowings } from '../../api';
import { Card } from '../components';

import './styles.css';

export const Home = () => {
  const [posts, setPosts] = useState<any[]>();
  const user = useUserStore(state => state.user);

  useEffect(() => {
    getPostsOfFollowings(user.token)
      .then((res:any) => setPosts(res.posts))
      .catch(console.log)
  }, []);

  console.log(posts);

  return (
    <div className="w-full h-full justify-center overflow-x-hidden overflow-y-scroll scroll-ui">
      {posts &&
        posts.map((post: any) => (
          <div className={`${post.user_id === user.uid ? 'hidden' : ''}`}>
            <Card key={post.post_id} post={post} />
          </div>
        ))
      }
    </div>
  )
}
