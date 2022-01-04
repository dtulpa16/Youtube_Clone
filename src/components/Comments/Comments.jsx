import React, { useState } from "react";
import "./Comments.css"
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

const Comments = (props) => {
    const [reply,setReply]=useState('')
    const [comment, setComment]=useState('')

    let replies = props.commentReplies

    const handleSubmitReply = async(event,id) => {
        event.preventDefault();
        let newReply ={
            comment_id:id,
            reply_content:reply
        }
        let response = await axios.post('http://127.0.0.1:8000/replies/', newReply)
        console.log(response.data);
        props.updateReplies();
       
    }
    const handleChangeReply=(event)=>{
        setReply(event.target.value)
    }

    const handleSubmitComment = async(event, videoId) => {
        event.preventDefault();
        let newComment ={
            video_id:videoId,
            comment_content:comment,
            likes:0,
            dislikes:0
        }
        let response = await axios.post('http://127.0.0.1:8000/comments/', newComment)
        console.log(response.data);
        props.updateComments()
       
    }
    const handleChangeComment=(event)=>{
        setComment(event.target.value)
    }

    const handleClickLikes = async(event, id, videoId, content, likes, dislikes) => {
        event.preventDefault();
        let plusLikes=(likes+1);
        let likesUpdate ={
            video_id:videoId,
            comment_content:content,
            likes:plusLikes,
        }
        let response = await axios.put('http://127.0.0.1:8000/comments/' + (id) + '/', likesUpdate)
        console.log(response.data);
        props.updateComments();
       }

       const handleClickDislikes = async(event, id, videoId, content, likes, dislikes) => {
        event.preventDefault();
        let plusDislikes=dislikes+1;
        let dislikesUpdate ={
            video_id:videoId,
            comment_content:content,
            dislikes:plusDislikes
        }
        let response = await axios.put('http://127.0.0.1:8000/comments/' + (id) + '/', dislikesUpdate)
        console.log(response.data);
        props.updateComments();
       }

    return (
        <div>
            <h1>Comments</h1>
                {props.commentDetails.map(comments => (
                    <div className="comment-section">
                        <div className="comment">
                            Comment: {comments.comment_content} 
                            <button className="comment-button" 
                            onClick={(e)=>handleClickLikes(e,comments.id,comments.video_id,comments.comment_content,comments.likes, comments.dislikes)}
                            >likes:</button> {comments.likes}
                            <button className="comment-button"
                            onClick={(e)=>handleClickDislikes(e,comments.id,comments.video_id,comments.comment_content,comments.likes, comments.dislikes)}
                            >dislikes:</button> {comments.dislikes}
                        </div>
                        {replies.filter(replies => replies.comment_id===comments.id).map(replies => (
                            <div className="reply">
                            Reply: {replies.reply_content}
                            </div>))}
                        <form name='reply' className="reply-box" onSubmit={(e)=>handleSubmitReply(e,comments.id)}>
                            <input name='reply' onChange={handleChangeReply} placeholder='Reply'/>
                            <button type='submit'>Reply</button>
                        </form>
                    </div>

                ))}

            <div >
                <form className="comment-box" name="comment" onSubmit={(e)=>handleSubmitComment(e, props.videoId)}>
                    <input name="comment" onChange={handleChangeComment} placeholder='Your Comment Here'/>
                    <button type='submit'>Comment</button>
                </form>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" class="commentButton" viewBox="0 0 16 16">
            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
        </div>
       
    )
}

export default Comments;