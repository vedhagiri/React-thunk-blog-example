import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // console.log(userIds);
  userIds.forEach(id => dispatch(fetchUser(id)));
}

export const fetchPosts = () => async (dispatch) => {
  try{
    const {data} = await jsonPlaceholder.get("/posts");
    dispatch({ type: "FETCH_POSTS", payload: data });
  }catch (err){
    console.log(err.message);
  }
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch ({type: 'FETCH_USER', payload: response.data});
}

// export const fetchUser = (id) => async (dispatch) => {
//   try{
//     const {data} = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: data});
//   }catch (err){
//     console.log(err.message);
//   }
// }

// export const fetchUser = function(id) { 
//   return async function(dispatch) {
//   try{
//     const {data} = _.memoize(await jsonPlaceholder.get(`/users/${id}`));
//     dispatch({type: 'FETCH_USER', payload: data});
//   }catch (err){
//     console.log(err.message);
//   }
// }
// }

// working version of memoize version.
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });

