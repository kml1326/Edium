const baseUrl = "http://localhost:8000/api";

export function createPostAction(data) {
  return dispatch => {
    fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          dispatch({
            type: "CREATE_POST",
            data
          });
        }
      });
  };
}

export function getAllPostsAction() {
  return dispatch => {
    fetch(`${baseUrl}/posts`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.length) {
          dispatch({
            type: "ALL_POSTS",
            data
          });
        }
      });
  };
}

export function getSinglePostAction(id) {
  return dispatch => {
    fetch(`${baseUrl}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          dispatch({
            type: "SINGLE_POST",
            data
          });
        }
      });
  };
}

export function createCommentAction(data) {
  return dispatch => {
    fetch(`${baseUrl}/posts/${data.id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          dispatch({
            type: "ALL_CURRENT_COMMENTS",
            data
          });
        }
      });
  };
}
export function getAllComments(id) {
  return dispatch => {
    fetch(`${baseUrl}/${id}/comments`)
      .then(res => res.json())
      .then(data => {
        console.log(data, "comments");
        if (data) {
          dispatch({
            type: "ALL_CURRENT_COMMENTS",
            data
          });
        }
      });
  };
}
