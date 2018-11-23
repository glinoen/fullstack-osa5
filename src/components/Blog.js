import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showExtra: false,
      blogi: this.props.blog,
      currentUser: this.props.user
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

  delete = async () => {
    if(window.confirm('delete ' + this.state.blogi.title + ' by ' + this.state.blogi.author +'?'  )){
      try {
        await blogService.destroy(this.state.blogi)
        await this.props.action()
      } catch (exception) {
        console.log(exception)
      }
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
    } else if (this.state.blogi.user === undefined || this.state.blogi.user.username === this.state.currentUser.username ){
      blogiElement = <div>
      <div onClick={() => this.toggleVisibility()}>{blogi.title} {blogi.author}</div>
        <a href={blogi.url}>{blogi.url} </a>
        <p>{blogi.likes} likes  <button onClick={() => this.likeMe()}>like</button></p>
        <p>added by {blogi.user.name}</p>
        <button onClick={this.delete}>delete</button>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog