import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';

function App() {

  const [ searchLyrics, saveSearchLyrics ] = useState({});
  const [ lyrics, saveLyrics ] = useState('');

  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;
    
    const callAPILyrics = async () => {
      const { artist, song } = searchLyrics;

      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

      const result = await axios.get(url);

      saveLyrics(result.data.lyrics);
    }

    callAPILyrics();
  }, [searchLyrics])
  return (
    <Fragment>
      <Form 
        saveSearchLyrics={saveSearchLyrics}
      />
    </Fragment>
  );
}

export default App;
