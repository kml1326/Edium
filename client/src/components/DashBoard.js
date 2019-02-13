import React, { Component } from "react";
import { getAllPostsAction, createPostAction,updatePostAction } from "../action/action";
import { connect } from "react-redux";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      editPost:{},
      editId:"",
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleEditChange = e =>{
    let name = e.target.name;
    let value = e.target.value;
    this.setState(state =>{
      return{
        editPost: {
          ...state.editPost, [name] : value}
      }
    })
  }

  handleCreate = e => {
    e.preventDefault();
    const { title, description, body, editId } = this.state;
    const data = {
      id:editId,
      title,
      description,
      body
    };
    this.props.dispatch(createPostAction(data));
    this.setState({
      title: "",
      description: "",
      body: "",
    });
  };

  handleUpdate = e =>{
    e.preventDefault();
    const { title, description, body } = this.state.editPost;
    const data = {
      id: this.state.editId,
      title,
      description,
      body
    };
    this.props.dispatch(updatePostAction(data));
    this.setState({
      editId:"",
      editPost:{}
    });
  }

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
    this.setState({editPost:{...obj},editId:obj._id});
  }

  componentDidMount = () => {
    this.props.dispatch(getAllPostsAction());
  };

  render() {
    const { editId,title, description, body,editPost } = this.state;
    return (
      <div className="main">
        <form className=" post-form col-1-2">
          <input
            type="text"
            name="objectId"
            className="input none"
            value={editId}
          /> 
          <input 
            type="text"
            name="title"
            value={(editId) ? editPost.title : title}
            placeholder="title"
            className="input title"
            onChange={(editId) ? this.handleEditChange :this.handleChange}
          />
          <input
            type="text"
            name="description"
            value={(editId) ? editPost.description : description}
            placeholder="description"
            className="input desc"
            onChange={(editId) ? this.handleEditChange :this.handleChange}
          />
          <textarea
            className="text-area body"
            name="body"
            placeholder="write post"
            onChange={(editId) ? this.handleEditChange :this.handleChange}
            value={(editId) ? editPost.body : body}
          >
            {(editId) ? editPost.body : body}
          </textarea>
          <input
            type="submit"
            value={(editId) ? "Update Post" :"create Post" }
            placeholder=""
            className="btn"
            onClick={(editId) ? this.handleUpdate :this.handleCreate}
          />
        </form>

        <div className="post-list col-1-2">
          {this.props.posts.length
            ? this.props.posts.map(post => {
              if(post._id == editId) return null;
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
                        onClick={() => this.handlePostEdit(post)}
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
