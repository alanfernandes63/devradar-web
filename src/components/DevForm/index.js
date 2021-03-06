import React, { useState, useEffect } from 'react';


function DevForm( { onSubmit }){

    const [ latitude, setLatitude ] = useState('');
    const [ longitude , setLongitude ] = useState('');
    const [ github_username, setUsernameGithub ] = useState('');
    const [ techs, setTechs ] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => { 
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
    
           },
          (error) => { console.log(error); },
          {
            timeout: 30000,
          }
        );
      }, []);

     async function handleSubmit(e){
        e.preventDefault();
        await onSubmit(
            {
                github_username,
                techs,
                latitude,
                longitude
            });

        setUsernameGithub('');
        setTechs('');
      }

    return(
        <form onSubmit={ handleSubmit }>

          <div className="input-block">
            <label htmlFor="username_github">Usuario do github</label>

            <input
            name="username_github"
            id="username_github"
            required
            value={ github_username }
            onChange={ (e) => { setUsernameGithub( e.target.value ) } }
            />

          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
            name="techs"
            id="techs"
            required
            value={ techs }
            onChange={ (e) => { setTechs( e.target.value ) } }
            />
          </div>

          <div className="input-group">

            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>

              <input
               name="latitude"
               type="number"
               id="latidude"
               required
               value={ latitude }
               onChange={ (e) => { setLatitude( e.target.value ) } }
               />
               
            </div>

            <div className="input-block">
              <label htmlFor="logitude">Longitude</label>

              <input
              name="longitude"
              type="number"
              id="longitude"
              required
              value={ longitude }
              onChange={ (e) => { setLongitude( e.target.value ) } }
              />

            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;