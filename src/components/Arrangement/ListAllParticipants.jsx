import React from 'react';
import { Link } from 'react-router-dom';

const ListAll = ({ arrangementer }) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th>
            Arrangement
          </th>
          <th>
            Deltakere
          </th>
          <th>
            Handling
          </th>
        </tr>
      </thead>
      <tbody>
        {arrangementer.map((arrangement) => (
          <tr key={arrangement.id}>
            <td>
              {arrangement.name}
            </td>
            <td>
              {arrangement.participantCount}
            </td>
            <td>
              <Link className="btn btn-sm btn-primary" to={`/arrangement/${arrangement.id}`}>
                Åpne
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ListAll;
