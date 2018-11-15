import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { UPDATE_DAY } from 'queries';
import { Button } from 'ui';

const useDayForm = defaultType => {
  const [kind, setKind] = useState(defaultType);
  const [URL, setURL] = useState('');
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const handleURLChange = e => {
    setURL(e.target.value);
  };

  const handleKindChange = e => {
    setKind(e.target.value);
  };

  const handleFileChange = file => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return {
    kind,
    setKind,
    URL,
    setURL,
    handleURLChange,
    handleKindChange,
    handleFileChange,
    file,
    setFile,
    image,
  };
};

const DayForm = ({ day }) => {
  if (!day) {
    return <Redirect to="/admin" />;
  }

  useEffect(
    () => {
      const { link } = day;
      setURL(link || '');
    },
    [day],
  );

  const {
    kind,
    // setKind,
    URL,
    setURL,
    handleURLChange,
    handleKindChange,
    // handleFileChange,
    file,
    // setFile,
    image,
  } = useDayForm('LINK');

  return (
    <Mutation
      mutation={UPDATE_DAY}
      variables={{
        updateDay: {
          userToken: 'W0Z4cbOgSFdhoime2sc-rmHNXBADiwqGNg',
          id: '25',
          displayName: 'Foobar',
          contentType: 'link',
          link: 'https://google.fr',
        },
      }}
      onCompleted={({ createAdmin }) => console.log(createAdmin)}
      onError={e => console.error(e)}
    >
      {(mutate, { data }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            mutate();
          }}
        >
          <div>
            <label>
              <input
                type="radio"
                name="kind"
                value="LINK"
                checked={kind === 'LINK'}
                onChange={handleKindChange}
              />
              Lien
            </label>
          </div>
          <input value={URL} onChange={handleURLChange} />

          <div>
            <label>
              <input
                type="radio"
                name="kind"
                value="IMAGE"
                checked={kind === 'IMAGE'}
                onChange={handleKindChange}
              />
              Image
            </label>
          </div>
          <img src={image} alt="" />

          <input type="file" />

          <Button variant="primary" type="submit" onClick={mutate}>
            Enregistrer
          </Button>
        </form>
      )}
    </Mutation>
  );
};

export default DayForm;
