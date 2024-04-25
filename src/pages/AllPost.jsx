import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../Components'

import authService from "../apis/auth.js";
import { serverProjectImage } from '../imageUrl.js';

function AllPost() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getAllProject().then((postdata) => {
      if (postdata) {
        setPosts(postdata.data.data)
      }
    }).finally(() => setLoading(false));
  }, [])

  return !loading ? (
    posts.length > 0 ? (
      <div className="row w-100 py-5 px-3 mx-0 text-center bg-dark">
        { posts.map((item,index) => {
         return (<div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3" key={index}>
          <PostCard
            id={item._id}
            title={item.title}
            image={`${serverProjectImage}/${item.coverImage}`} 
            shortDesc= {item.shortDesc}
            owner={item.owner}
            domain={item.domain}
            created_at={new Date(item.createdAt)}
            status={item.status}
            />
        </div>)
        })}
        

      </div>
    ) : (
      <div className='loadingdiv'>
        <h1 className='text-white p-5'>No Data Found</h1>
      </div>
    )

  ) :
    <div className='loadingdiv'>
      <h1 className='text-white p-5'>Loading...</h1>
    </div>
}

export default AllPost
