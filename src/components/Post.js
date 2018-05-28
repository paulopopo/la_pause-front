import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Post extends Component {

  onLikeClick() {
    this.props.onLikeClick(this.props.post.id)
  }

  render() {
    let title = this.props.post.title
    let {id} = this.props.post
    console.log(this.props)
    return (
      <div className="column has-text-centered is-2">
        <div className="card">
          <Link to={`/post/${this.props.post.id}`}>
            <h1 className="card-header">{title}</h1>
          </Link>
          <p className="card-content">By {this.props.post.author.name}</p>
          <button className="button is-primary" onClick={this.onLikeClick.bind(this)}>
            Like
          </button>
          {/*<span> Like By : {this.props.post.likes.map((elt,i) => <span key={i}>- {elt.name} -</span>)}</span>*/}
          <span> Likes {this.props.post.likes.length}</span>
        </div>
      </div>
    )
  }
}
