import React from 'react';

const ListAll = ({ participants }) => (
  <div>
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
  </div>
);

export default ListAll;
