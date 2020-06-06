import React, { useState } from 'react'

const Form = ({saveSearchLyrics}) => {

    const [ search, saveSearch] = useState({
        artist: '',
        song: ''
    });

    const [ error, saveError] = useState(false);

    const { artist, song } = search;

    // Read input content
    const updateState = e => {
        saveSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    // API Call
    const searchInfo = e => {
        e.preventDefault();

        // Validation
        if (artist.trim() === '' || song.trim() === ''){
            saveError(true);
            return;
        }

        // Send to main component

        saveError(false);

        saveSearchLyrics(search);
    }

    return ( 
        <div className="bg-info">
            { error 
                ? 
                    <p 
                        className="alert alert-danger text-center p-22"
                    >
                        All fields are required
                    </p>
                :
                    null
            }
            <div className="container">
                <div className="row">
                    <form 
                        onSubmit={searchInfo}
                        className="col card text-white bg-transparent mb-5 pt-5 pb-5"
                    >
                        <fieldset>
                            <legend className="text-center">
                                Lyrics Finder  ♪♪
                            </legend>

                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artist</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="artist"
                                            placeholder="Artist Name"
                                            onChange={updateState}
                                            value={artist}
                                        />
                                    </div>
                                </div>
    
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Song</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="song"
                                            placeholder="Song Name"
                                            onChange={updateState}
                                            value={song}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary float-right"
                            >
                                Search
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Form;