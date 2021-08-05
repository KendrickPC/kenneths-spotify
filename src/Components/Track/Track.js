import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return( 
        <div>
          {/* <audio controls id="player" src={this.props.track.preview}></audio> */}
          <button className="Track-action" onClick={this.removeTrack} > - </button>
        </div>
      )
    } else {
      return (
        <div>
          <button className="Track-action" onClick={this.addTrack} > + </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album} </p>
          <audio controls id="player" src={this.props.track.preview}></audio>
        </div>
        {this.renderAction()}
      </div>  
    )
  }
};

