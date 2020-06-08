import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Song from './components/Song';
import Info from './components/Info';
import Spinner from './components/Spinner';

function App() {

  const [ searchLyrics, saveSearchLyrics ] = useState({});
  const [ lyrics, saveLyrics ] = useState('');
  const [ info, saveInfo ] = useState('');
  const [ error, saveError ] = useState(false);
  const [ loading, saveLoading ] = useState(false);



  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;
    saveLoading(true);
    
    const callAPILyrics = async () => {
      const { artist, song } = searchLyrics;

      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`

      

      await Promise.all([axios(url), axios(url2)])
      .then((values) => {
        const lyrics = values[0];
        const info = values[1];
        saveLyrics(lyrics.data.lyrics);
        saveInfo(info.data.artists[0]);
        saveError(false);
        saveLoading(false);
      })
      .catch((err) => {
        saveError(true);
        saveLoading(false);
        return;
      });

    }

    callAPILyrics();
  }, [searchLyrics]);

  const component = (loading) 
    ? 
      <Spinner /> 
    :
      <Fragment>
        <div className="col-md-6">
          <Info 
            info={info}
          />
        </div>
        <div className="col-md-6">
          <Song 
            lyrics={lyrics}
          />
        </div>
      </Fragment>
  ; 


  return (
    <Fragment>
      <Form 
        saveSearchLyrics={saveSearchLyrics}
      />

      <div className="container mt-5">
        <div className="row">

          {error 
            ? 
              <div className="col-md-12">
                <h2>Song or Group not found</h2>
              </div>
            :
              component
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;
