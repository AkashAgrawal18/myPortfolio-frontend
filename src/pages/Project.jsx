import React, { useEffect, useState } from 'react'
import { Container, PostCard, PostForm } from '../Components'
import authService from "../apis/auth.js";
import { useParams } from 'react-router-dom';
import { serverProjectImage } from '../imageUrl.js';
function Project() {
  const { ProjectId } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.myProject().then((postdata) => {
      if (postdata) {
        setPosts(postdata.data.data)
      }
    }).finally(() => setLoading(false));
  }, [])

  // console.log(ProjectId)
  return !loading ? (
    <div className='py-8'>
      <Container>
        <div className='row py-5 d-flex flex-column-reverse flex-md-row'>
          <h4 className='text-white'> My Projects List</h4>

          <div className="col-12 col-md-6 projectListDiv">
            {
              posts.length > 0 ? (
                <div className="row g-0 g-md-3 w-100 text-center">
                  {posts.map((item, index) => {
                    return (<div className="col-12 col-md-6 mb-3" key={index}>
                      <PostCard
                        id={item._id}
                        title={item.title}
                        image={`${serverProjectImage}/${item.coverImage}`}
                        shortDesc={item.shortDesc}
                        owner={item.owner}
                        domain={item.domain}
                        created_at={new Date(item.createdAt)}
                        status={item.status} />
                    </div>)
                  })}


                </div>
              ) : (
                <div className='loadingdiv'>
                  <h1 className='text-white p-5'>No Data Found</h1>
                </div>
              )
            }
          </div>
          <div className="col-12 col-md-6">
            {ProjectId == '' || ProjectId == undefined || ProjectId == null ? <PostForm /> : <PostForm projectId={ProjectId} />}
          </div>
        </div>
      </Container>
    </div>
  ) :
    <div className='loadingdiv'>
      <h1 className='text-white p-5'>Loading...</h1>
    </div>
}

export default Project

// import React from 'react'

// const AddPost = () => {
//   return (
//     <div>AddPost</div>
//   )
// }

// export default AddPost