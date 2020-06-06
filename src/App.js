import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Song from './components/Song';


function App() {

  const [ searchLyrics, saveSearchLyrics ] = useState({});
  const [ lyrics, saveLyrics ] = useState('');
  const [ info, saveInfo ] = useState('');

  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;
    
    const callAPILyrics = async () => {
      const { artist, song } = searchLyrics;

      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`

      const [lyrics, info] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ]);

      saveLyrics(lyrics.data.lyrics);
      saveInfo(info.data.artists[0]);

      //saveLyrics(result.data.lyrics);
    }

    callAPILyrics();
  }, [searchLyrics])
  return (
    <Fragment>
      <Form 
        saveSearchLyrics={saveSearchLyrics}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">

          </div>
          <div className="col-md-6">
            <Song 
              lyrics={lyrics}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
