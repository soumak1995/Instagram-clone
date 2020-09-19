import React, { useState,useEffect } from 'react'
import '../css/Post.css'
import Avatar from "@material-ui/core/Avatar"
import { db } from '../firebase'
import firebase from 'firebase'


function Post({postId,username,caption,imageUrl,user}) {
    const[comments,setComments]=useState([]);
    const[comment,setComment]=useState('')
     console.log(comments)
    useEffect(() => {
        alert(postId)
        let unsubscribe;
     if(postId){
         unsubscribe=db
         .collection("posts")
         .doc(postId)
         .collection("comments")
         .orderBy('timestamp','desc')
         .onSnapshot((snapshot)=>{
             setComments(snapshot.docs.map(doc=>doc.data()));
         })
     };
     return ()=>{
         unsubscribe();
     };
       
    }, [postId]);
    const postComment=(e)=>{
     e.preventDefault();
     db.collection("posts").doc(postId).collection("comments").add({
         text:comment,
         username:user.displayName,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
     });
     setComment('');
    }
    return (
        
        <div className="post">
            
            <div className="post__header">
                    <Avatar 
                    className="post_avatar"
                    alt="souamk"
                    src="www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"/>
                      <h3>{username}</h3>
            </div>
           
          
            <img className="post__image"src={imageUrl} alt="soumak"/>
    <h4 className="post__text"><strong>{username} </strong>{caption}</h4>
    <div className="post__comments">
        {
            comments.map(comment=>(
            <p><strong>{comment.username}</strong>
            {comment.text}</p>

            ))
        }
    </div>
  {
      user &&   <form className="post__commentBox">
      <input
      className="post__input"
      type="text"
      placeholder="Add a comments.."
      value={comment}
      onChange={(e)=>setComment(e.target.value)}
      />
      <button
      className="post__button"
      disabled={!comment}
      type="submit"
      onClick={postComment}>
      Post
      </button>
  </form>
  }
        </div>
    )
}

export default Post
