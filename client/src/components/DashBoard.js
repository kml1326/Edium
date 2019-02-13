import React, { Component } from "react";
import { getAllPostsAction, createPostAction } from "../action/action";
import { connect } from "react-redux";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      editPost:{}
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
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: "ALL_POSTS",
          data
        });
      });
  };

  handlePostEdit(obj){
    this.setState({editPost:{...obj}});
  }

  componentDidMount = () => {
    this.props.dispatch(getAllPostsAction());
  };

  render() {
    const { title, description, body,editPost } = this.state;
    return (
      <div className="main">
        <form className=" post-form col-1-2">
          <input
            type="text"
            name="objectId"
            className="input"
            value= {editPost._id || ""}
          /> 
          <input 
            type="text"
            name="title"
            value={editPost.title || title}
            placeholder="title"
            className="input title"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            value={editPost.description || description}
            placeholder="description"
            className="input desc"
            onChange={this.handleChange}
          />
          <textarea
            className="text-area body"
            name="body"
            placeholder="write post"
            onChange={this.handleChange}
            value={body}
          >
            {editPost.description || body}
          </textarea>
          <input
            type="submit"
            value="Create Post"
            placeholder=""
            className="btn"
            onClick={this.handleCreate}
          />
        </form>

        <div className="post-list col-1-2">
          {this.props.posts.length
            ? this.props.posts.map(post => {
                return (
                  <div key={post._id} className="post">
                    <a
                      href={`/posts/${post._id}`}
                      key={post._id}
                      className="post-title"
                    >
                      {post.title}
                    </a>
                    <span>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.handlePostEdit}
                      />
                      <span>&nbsp;</span>
                      <span>&nbsp;</span>
                      <i
                        className="fas fa-trash-alt"
                        onClick={() => this.handleDelPost(post._id)}
                      />
                    </span>
                  </div>
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
