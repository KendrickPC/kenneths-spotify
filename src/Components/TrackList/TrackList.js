import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
  render () {
    return (
      <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        {/* <Track /> */}
        {this.props.tracks.map( track => 
          <Track
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            isRemoval={this.props.isRemoval}
            onRemove={this.props.onRemove}
          />  
        )}
      </div>
    )
  }
}
