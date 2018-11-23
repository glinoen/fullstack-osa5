import React from 'react'


const Blog = ({blog}) => (
  <div onClick={() => console.log('guff')}>
    {blog.title} {blog.author}
  </div>  
)

export default Blog