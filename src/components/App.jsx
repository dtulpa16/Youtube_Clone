import React, { Component } from 'react';
import TitleBar from './TitleBar/TitleBar';
import SearchBar from './SearchBar/SearchBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Comments from './Comments/Comments';
import axios from 'axios';
import SearchResults from './SearchResults/SearchResults';
import RecommendedVideos from './RecommendedVideos/RecommendedVideos';
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultVideos:[],
            relatedVideos:[],
            videoComments:[],
            commentReplies:[]
    }
        this.videoId = "M7lc1UVf-VE";
        this.videoTitle = "YouTube Developers Live: Embedded Web Player Customization"
        this.videoDescription = "Default Video"
}
    getResultVideoList = async (searchFor) => {
        let response = await axios.get('https://www.googleapis.com/youtube/v3/search?key=' + (searchFor))
        console.log(response.data.items)
        this.setState({
            resultVideos: response.data.items
        })
    }

    getRelatedVideoList = async (videoTitle) => {
        let response = await axios.get('https://www.googleapis.com/youtube/v3/search?key=' + (videoTitle));
        console.log(response.data.items);
        this.setState({
            relatedVideos: response.data.items
        })
    }

    getVideoComments = async () => {
        let response = await axios.get('http://127.0.0.1:8000/comments/' + (this.videoId) + '/');
        console.log(response.data);
        this.setState({
            videoComments: response.data
        })
    }

    getCommentReplies = async () => {
        let response = await axios.get('http://127.0.0.1:8000/replies/');
        console.log(response.data);
        this.setState({
            commentReplies: response.data
        })
    }

    getVideoInfo = (videoId, videoTitle, videoDescription) => {
        this.videoId = videoId;
        this.videoTitle = videoTitle;
        this.videoDescription = videoDescription;
        console.log(this.videoId);
        this.setState({
            resultVideos: []
        });
    }

    componentDidMount() {
        this.getRelatedVideoList(this.videoTitle);
        this.getVideoComments();
        this.getCommentReplies();
    }

    updateReplies = () => {
        this.getCommentReplies();
    }

    updateComments = () => {
        this.getVideoComments();
    }

    render(){
        return (
            <div className="container-fluid">
                <TitleBar />
                <div className="videoCommentsRecommended">
                    <div className="videoComments">
                        <VideoPlayer
                            videoId={this.videoId}
                            videoTitle={this.videoTitle}
                            videoDescription={this.videoDescription}/> 
                        <Comments 
                            commentDetails={this.state.videoComments}
                            videoId={this.videoId}
                            commentReplies={this.state.commentReplies}
                            updateReplies={this.updateReplies}
                            updateComments={this.updateComments}/>
                    </div>
                    <div className="recommended">
                        <RecommendedVideos 
                            videos={this.state.relatedVideos}
                            videoId={this.videoId}
                            getVideoInfo={this.getVideoInfo}
                            getVideoComments={this.getVideoComments}/>
                    </div>
                </div>
                <SearchBar getVideoList={this.getResultVideoList}/>
                <SearchResults
                    videos={this.state.resultVideos}
                    getRelatedVideoList={this.getRelatedVideoList}
                    getVideoInfo={this.getVideoInfo}
                    getVideoComments={this.getVideoComments}/>
            </div>
        )
    }
}
export default App;