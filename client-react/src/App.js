import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const hash= this.getHashParams();
    this.state={
      loggedIn:hash.access_token ? true : false,
      nowPlay:{
        name:"Music is not playing",
        image:''
      }
    }
    if(hash.access_token){
      spotifyWebApi.setAccessToken(hash.access_token)
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlay(){
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response)=>{
      this.setState({
        nowPlay:{
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
      <a href="http://localhost:8888">
        <button>Login with Spotify</button>
      </a>
      <div>Now playing: {this.state.nowPlay.name}</div>
      <div><img src={this.state.nowPlay.image} alt="" style={{width:100}}/></div>
      <button onClick={()=>this.getNowPlay()}>Check Now Playing</button>
      </div>
    );
  }
}

export default App;
