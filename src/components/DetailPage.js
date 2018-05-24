import React, {Component, Fragment} from 'react'
import {graphql, compose} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import {gql} from 'apollo-boost'

class DetailPage extends Component {
    
    componentDidMount() {
        this.props.subscribeToNewPost()
    }
    render() {
        if (this.props.postQuery.loading) {
            return (
                <div className="flex w-100 h-100 items-center justify-center pt7">
                    <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
                </div>
            )
        }
        
        const {post} = this.props.postQuery
        debugger
        let action = this._renderAction(post)
        
        return (
            <Fragment>
                <h1 className="f3 black-80 fw4 lh-solid">{post.title}</h1>
                <p className="black-80 fw3">{post.text}</p>
                {action}
                <span> Like By : {post.likes.map((elt,i) => <span key={i}>- {elt.name} -</span>)}</span>
            </Fragment>
        )
    }
    
    _renderAction = ({id}) => {
        return (
            <a
                className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
                onClick={() => this.deletePost(id)}
            >
                Delete
            </a>
        )
    }
    
    deletePost = async id => {
        await this.props.deletePost({
            variables: {id},
        })
        this.props.history.replace('/')
    }
    
    publishDraft = async id => {
        await this.props.publishDraft({
            variables: {id},
        })
        this.props.history.replace('/')
    }
}

const POST_QUERY = gql`
    query PostQuery($id: ID!) {
        post(id: $id) {
            id
            title
            text
            likes {
                name
            }
            author {
                name
            }
        }
    }
`
const POST_SUBSCRIPTION = gql`
    subscription PostSubscription {
        postSubscription {
            node {
                id
                title
                text
                likes {
                    name
                }
                author {
                    name
                }
            }
        }
    }
`

const DELETE_MUTATION = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`

export default compose(
    graphql(POST_QUERY, {
        name: 'postQuery',
        options: props => ({
            variables: {
                id: props.match.params.id,
            },
        }),
        
        props: props =>
            Object.assign({}, props, {
                subscribeToNewPost: params => {
                    return props.postQuery.subscribeToMore({
                        document: POST_SUBSCRIPTION,
                        updateQuery: (prev, {subscriptionData}) => {
                            if (!subscriptionData.data) {
                                return prev
                            }
                            
                            const newPost = subscriptionData.data.postSubscription.node
                            return Object.assign({}, prev, {
                                post: newPost
                            })
                        },
                    })
                },
            }),
        
    }),
    graphql(DELETE_MUTATION, {
        name: 'deletePost',
    }),
    withRouter,
)(DetailPage)
