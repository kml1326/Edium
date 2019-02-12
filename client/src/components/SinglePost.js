import React, { Component } from "react";
import {
  getSinglePostAction,
  createCommentAction,
  getAllComments
} from "../action/action";
import { connect } from "react-redux";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      editComment: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleComment = e => {
    e.preventDefault();
    const data = {
      id: this.props.post._id,
      comment: this.state.comment
    };
    this.props.dispatch(createCommentAction(data));
    this.setState({ comment: "" });
  };
  handleEdit = e => {
    console.dir(e.target);
  };
  handleDelComment = id => {
    console.log("id", id, `/comment/${id}`);
    fetch(`/comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        postId: this.props.post._id
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: "ALL_CURRENT_COMMENTS",
          data
        });
      });
  };

  componentDidMount = () => {
    const id = this.props.location.pathname.split("/")[2];
    this.props.dispatch(getSinglePostAction(id));
    this.props.dispatch(getAllComments(id));
  };

  render() {
    const { post, comments } = this.props;
    return (
      <div>
        {post && (
          <div>
            <h3>{post.title}</h3>
            <h5>{post.description}</h5>
            <p>{post.body}</p>
          </div>
        )}
        <form onSubmit={this.handleComment}>
          <input
            type="text"
            name="comment"
            value={this.state.comment}
            placeholder="write Comment"
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Comment"
            className="btn"
            onClick={this.handleComment}
          />
        </form>
        <div>
          {comments &&
            comments.map(comment => {
              return (
                <div key={comment._id}>
                  <span>
                    <span contentEditable="true" onInput={this.handleEdit}>
                      {comment.comment}
                    </span>
                    <i
                      className="fas fa-edit"
                      onClick={() => this.handleCommentEdit}
                    />
                  </span>

                  <i
                    className="fas fa-trash-alt"
                    onClick={() => this.handleDelComment(comment._id)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.currentSinglePost,
    comments: state.currentComments
  };
}

export default connect(mapStateToProps)(SinglePost);
