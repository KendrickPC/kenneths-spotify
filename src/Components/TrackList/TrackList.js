import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export function TrackList() {
  return (
    <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        <Track />
    </div>
  )
};

