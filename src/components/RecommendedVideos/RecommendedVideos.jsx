import React from 'react';
import './RecommendedVideos.css';

const RecommendedVideos = (props) => {
    
    const handleClick = (event, id, title, description) => {
        event.preventDefault()
        props.getVideoInfo(id, title, description)
        props.getVideoComments()
    }
    
    return (
        <div className="recommendedVideos">
            <h1>Related Videos</h1>
            <div className="allRecommendVideos">
                {props.videos.filter(videos => !videos.id.videoId.includes(props.videoId)).map(videos => (
                    <span>
                        <div class="recommendedVideo">
                        <input type="image" 
                            onClick={(event) => handleClick(event, videos.id.videoId, videos.snippet.title, videos.snippet.description)}
                            src={videos.snippet.thumbnails.medium.url}
                            width={videos.snippet.thumbnails.medium.width}
                            height={videos.snippet.thumbnails.medium.height} />
                            <div class="recommendedVideoTitle">
                                {videos.snippet.title}
                            </div>
                        </div>
                    </span>
                ))}
            </div>
        </div> 
    );
}
 
export default RecommendedVideos;