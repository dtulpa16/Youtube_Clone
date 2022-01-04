import React from 'react';
import './SearchResults.css';

const SearchResults = (props) => {

    const handleClick = (event, id, title, description) => {
        event.preventDefault();
        props.getVideoInfo(id, title, description);
        props.getRelatedVideoList(title);
        props.getVideoComments()
    }

    return (
        <div className="searchResults">
            <div className="allRelatedVideos">
                {props.videos.map(videos => (
                    <span>
                        <div class="relatedVideo">
                        <input type="image"
                            onClick={(event) => handleClick(event, videos.id.videoId, videos.snippet.title, videos.snippet.description)}
                            src={videos.snippet.thumbnails.medium.url}
                             />
                            <div class="relatedVideoTitle">
                                {videos.snippet.title}
                            </div>
                        </div>
                    </span>
                ))}
            </div>
        </div> 
    );
}
 
export default SearchResults;