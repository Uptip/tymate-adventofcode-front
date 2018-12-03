import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { UPDATE_DAY } from 'queries';
import {
  Button,
  Buttons,
  Input,
  Field,
  Label,
  FileLabel,
  Img,
  Textarea,
} from 'ui';
import { history } from 'index';
import axios from 'axios';
import SegmentedControls from 'components/SegmentedControls';
import placeholder from 'images/placeholder.png';

const DayForm = ({ day, onSuccess }) => {
  if (!day) {
    return <Redirect to="/mon-calendrier" />;
  }

  useEffect(
    () => {
      const { link } = day;
      setURL(link || '');
    },
    [day],
  );

  const [userToken] = useState(localStorage.getItem('token'));
  const [URL, setURL] = useState(day.link || '');
  const [displayName, setDisplayName] = useState(day.displayName || '');
  const [description, setDescription] = useState(day.description || '');
  const [kind, setKind] = useState(
    (day.contentType || '').toUpperCase() || 'LINK',
  );

  const handleKindChange = kind => {
    setURL('');
    setKind(kind);
  };

  const handleFileChange = async e => {
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append('attachment[image]', file);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/v1/attachments`,
        formData,
      );

      setURL(data.url);
    } catch (e) {}
  };

  return (
    <div style={{ width: '100%' }}>
      <Mutation
        mutation={UPDATE_DAY}
        variables={{
          updateDay: {
            id: day.id,
            userToken,
            displayName,
            description,
            link: URL,
            contentType: kind.toLowerCase(),
          },
        }}
        onCompleted={({ createAdmin }) => {
          onSuccess();
          history.push('/mon-calendrier');
        }}
      >
        {(mutate, { data }) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              mutate();
            }}
          >
            <Field>
              <Label htmlFor="dayFormDisplayName">Titre</Label>

              <Input
                id="dayFormDisplayName"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="dayFormDescription">Description</Label>
            </Field>

            <Field>
              <Label>Contenu</Label>

              <div style={{ display: 'flex' }}>
                <SegmentedControls
                  activeValue={kind}
                  onSelect={handleKindChange}
                  values={[
                    {
                      value: 'LINK',
                      label: 'Lien',
                    },
                    {
                      value: 'IMAGE',
                      label: 'Image',
                    },
                    // {
                    //   value: 'VIDEO',
                    //   label: 'Vidéo YouTube',
                    // },
                  ]}
                />
              </div>

              {kind !== 'IMAGE' && (
                <Input value={URL} onChange={e => setURL(e.target.value)} />
              )}

              {kind === 'IMAGE' && (
                <FileLabel htmlFor="dayFormFile" imageURL={URL}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="dayFormFile"
                  />

                  {!Boolean(URL) && <Img src={placeholder} />}

                  {Boolean(URL) && <Img src={URL} />}
                </FileLabel>
              )}
            </Field>

            <Buttons>
              <Button variant="primary" type="submit" onClick={mutate}>
                Enregistrer
              </Button>
            </Buttons>
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default DayForm;
