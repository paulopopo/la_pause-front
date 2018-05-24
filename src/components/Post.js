import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Post extends Component {
    
    onLikeClick() {
        this.props.onLikeClick(this.props.post.id)
    }
    
    render() {
        let title = this.props.post.title;
        let {id} = this.props.post;
        console.log(this.props);
        return (
            <div>
                <Link className="no-underline ma1" to={`/post/${this.props.post.id}`}>
                <article className="bb b--black-10">
                    <div className="flex flex-column flex-row-ns">
                        <div className="w-100 w-60-ns pl3-ns">
                            <h1 className="f3 fw1 baskerville mt0 lh-title">{title}</h1>
                            <p className="f6 f5-l lh-copy">{this.props.post.text}</p>
                            <p className="f6 lh-copy mv0">By {this.props.post.author.name}</p>
                        </div>
                    
                    </div>
                </article>
            </Link>
                <button onClick={this.onLikeClick.bind(this)}>
                    Like
                </button>
                {/*<span> Like By : {this.props.post.likes.map((elt,i) => <span key={i}>- {elt.name} -</span>)}</span>*/}
                <span> Likes {this.props.post.likes.length}</span>
            </div>
        )
    }
}
