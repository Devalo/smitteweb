import React, { useState } from 'react';

const AgeDist = ({ participants }) => {
  const ht = {
    '0-10': 0,
    '11-20': 0,
    '21-35': 0,
    '36-65': 0,
    '65+': 0,
  };
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
  return (
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th>Aldersgruppe</th>
            <th>Antall</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0-10</td>
            <td>{ht['0-10']}</td>
          </tr>
          <tr>
            <td>11-20</td>
            <td>{ht['11-20']}</td>
          </tr>
          <tr>
            <td>21-35</td>
            <td>{ht['21-35']}</td>
          </tr>
          <tr>
            <td>36-65</td>
            <td>{ht['36-65']}</td>
          </tr>
          <tr>
            <td>65+</td>
            <td>{ht['65+']}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ListAll = ({ participants }) => {
  const [ageDist, setAgeDist] = useState(false);
  const [ageDistName, setAgeDistName] = useState('Vis aldersfordeling');

  const handleBtnClick = () => {
    setAgeDist(!ageDist);
    if (ageDist === true) setAgeDistName('Vis aldersfordeling');
    if (ageDist === false) setAgeDistName('Skjul aldersfordeling');
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={() => handleBtnClick()}
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
};

export default ListAll;
