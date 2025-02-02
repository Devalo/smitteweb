/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteParticipant } from '../../../lib/reducers/participantReducer';
import { setNotification } from '../../../lib/reducers/notificationReducer';

const AgeDist = ({ participants }) => {
  // Initialisere hash table med relevante keys
  const ht = {
    '0-10': 0,
    '11-20': 0,
    '21-35': 0,
    '36-65': 0,
    '65+': 0,
  };

  // loop over deltakere, og putte i respektive keys
  for (let i = 0; i < participants.length; i += 1) {
    const { age } = participants[i];

    if (age <= 10) {
      ht['0-10'] += 1;
    } else if (age > 10 && age <= 20) {
      ht['11-20'] += 1;
    } else if (age >= 21 && age <= 35) {
      ht['21-35'] += 1;
    } else if (age >= 36 && age < 65) {
      ht['36-65'] += 1;
    } else {
      ht['65+'] += 1;
    }
  }

  // display hash table
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Aldersgruppe</th>
          <th>Antall</th>
        </tr>
      </thead>
      <tbody>
        {ht['0-10'] !== 0
            && (
            <tr>
              <td>0-10</td>
              <td>{ht['0-10']}</td>
            </tr>
            )}
        {ht['11-20'] !== 0
            && (
            <tr>
              <td>11-20</td>
              <td>{ht['11-20']}</td>
            </tr>
            )}
        {ht['21-35'] !== 0
            && (
            <tr>
              <td>21-35</td>
              <td>{ht['21-35']}</td>
            </tr>
            )}
        {ht['36-65'] !== 0
          && (
          <tr>
            <td>36-65</td>
            <td>{ht['36-65']}</td>
          </tr>
          )}
        {ht['65+'] !== 0
          && (
          <tr>
            <td>65+</td>
            <td>{ht['65+']}</td>
          </tr>
          )}
      </tbody>
    </table>
  );
};

const ListAll = ({ participants, listId, arrangement }) => {
  const dispatch = useDispatch();
  const [ageDist, setAgeDist] = useState(false);
  const [ageDistName, setAgeDistName] = useState('Vis aldersfordeling');

  // Setter navn på knapp alt ettersom om man ønsker å vise aldersfordeling eller deltakere
  const handleAgeDistClick = () => {
    setAgeDist(!ageDist);
    if (ageDist === true) setAgeDistName('Vis aldersfordeling');
    if (ageDist === false) setAgeDistName('Vis deltakere');
  };

  const handleDelete = (partId) => {
    if (window.confirm('Er du sikker?\nSletting av en deltaker er en permanent handling, og kan ikke reverseres.')) {
      dispatch(deleteParticipant(listId, partId));
      dispatch(setNotification('Slettet deltaker', 'success', 2));
    }
  };

  // Hvis ageDist er togglet, vis AgeDist, hvis ikke vis vanlig tabell.
  return (
    <div>
      <p className="lead text-muted">
        Antall registrerte deltakere på
        {' '}
        {arrangement.name}
        {' '}
        er:
        {' '}
        {participants.length}
      </p>
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={() => handleAgeDistClick()}
      >
        {ageDistName}
      </button>
      {ageDist
        ? <AgeDist participants={participants} />
        : (
          <table className="table">
            <thead>
              <tr>
                <th>
                  Navn
                </th>
                <th>
                  Alder
                </th>
                <th>
                  Telefonnummer
                </th>
                <th>
                  Handling
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr>
                  <td>
                    {p.name}
                  </td>
                  <td>
                    {p.age}
                  </td>
                  <td>
                    {p.phone}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Slett
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
};

export default ListAll;
