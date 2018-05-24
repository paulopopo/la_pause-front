import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class CreatePage extends Component {
  state = {
    title: '',
    text: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Post</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Title"
            type="text"
            value={this.state.title}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ text: e.target.value })}
            placeholder="Content"
            rows={8}
            value={this.state.text}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.text &&
              this.state.title &&
              'dim pointer'}`}
            disabled={!this.state.text || !this.state.title}
            type="submit"
            value="Create"
          />
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { title, text } = this.state
    await this.props.createPostMutation({
      variables: { title, text },
    })
    this.props.history.replace('/')
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $text: String!) {
    createPost(title: $title, text: $text) {
      id
      title
      text
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_POST_MUTATION, {
  name: 'createPostMutation', // name of the injected prop: this.props.createPostMutation...
})(CreatePage)

export default withRouter(CreatePageWithMutation)