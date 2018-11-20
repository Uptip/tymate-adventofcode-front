import React from 'react';
import { Title, Kicker, Button, Buttons, Img } from 'ui';

const DayContent = ({ day }) => {
  if (!day) {
    return;
  }

  const { contentType, displayName, link, description } = day;

  return (
    <div>
      {displayName && <Title>{displayName}</Title>}

      {description && <Kicker>{description}</Kicker>}

      {(contentType || '').toUpperCase() === 'IMAGE' &&
        Boolean(link) && <Img src={link} />}

      {(contentType || '').toUpperCase() !== 'IMAGE' &&
        Boolean(link) && (
          <Buttons>
            <Button
              href={link}
              rel="noopener noreferrer"
              target="_blank"
              variant="primary"
            >
              Voir le lien
            </Button>
          </Buttons>
        )}

      {!displayName &&
        !link &&
        !description && (
          <>
            <Title style={{ marginTop: 16 }}>Perdu !</Title>
            <Kicker>Pas de contenu pour ce jour.</Kicker>
          </>
        )}
    </div>
  );
};

export default DayContent;
