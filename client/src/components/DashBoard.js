import React, { Component } from "react";
import { getAllPostsAction, createPostAction } from "../action/action";
import { connect } from "react-redux";

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCreate = e => {
    e.preventDefault();
    const { title, description, body } = this.state;
    const data = {
      title,
      description,
      body
    };
    this.props.dispatch(createPostAction(data));
    this.setState({
      title: "",
      description: "",
      body: ""
    });
  };
  handleDelPost = id => {
    fetch(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: "ALL_POSTS",
          data
        });
      });
  }

  componentDidMount = () => {
    this.props.dispatch(getAllPostsAction());
  };

  render() {
    const { title, description, body } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="title"
            placeholder="title"
            className="input"
            onChange={this.handleChange}
            value={title}
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            className="input"
            onChange={this.handleChange}
            value={description}
          />
          <textarea
            className="text-area"
            name="body"
            placeholder="write post"
            onChange={this.handleChange}
          >
            {body}
          </textarea>
          <input
            type="submit"
            value="Create Post"
            placeholder=""
            className="btn"
            onClick={this.handleCreate}
          />
        </form>

        <div>
          {this.props.posts.length
            ? this.props.posts.map(post => {
              return (
                <div>
                  <a
                    href={`/posts/${post._id}`}
                    key={post._id}
                    className="post"
                  >
                    {post.title}
                  </a>
                  <i
                    className="fas fa-edit"
                    onClick={() => this.handlePostEdit}
                  />

                <i
                  className="fas fa-trash-alt"
                  onClick={() => this.handleDelPost(post._id)}
                /></div>
          );
        })
      : ""}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.allPosts ? state.allPosts : []
  };
}

export default connect(mapStateToProps)(DashBoard);
