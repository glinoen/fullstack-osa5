import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showExtra: false,
      blogi: this.props.blog
    }
  }

  toggleVisibility = () => {
    this.setState({showExtra: !this.state.showExtra})
  }

  likeMe = async () => {
    
    let blogi = this.state.blogi
    blogi.likes = blogi.likes + 1
    

    try {
      await blogService.like(blogi)
      await this.props.action()
    } catch (exception) {

    }
  }

  render() {
    const showExtra = this.state.showExtra
    const blogi = this.state.blogi
    let blogiElement

    if (!showExtra) {
      blogiElement = <div onClick={() => this.toggleVisibility()}>
      {blogi.title} {blogi.author}
    </div> 
    } else {
      blogiElement = <div>
      <div onClick={() => this.toggleVisibility()}>{blogi.title} {blogi.author}</div>
      <p>{blogi.url}</p>
      <p>{blogi.likes} likes  <button onClick={() => this.likeMe()}>like</button></p>
      <p>added by {blogi.user.name}</p>
    </div> 
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} >
        {blogiElement}
      </div>
    )
  }
}

export default Blog