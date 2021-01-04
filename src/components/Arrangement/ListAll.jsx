import React from 'react';

const ListAll = ({ arrangementer }) => {
  return (
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
            <tr>
              <td>
                {arrangement.name}
              </td>
              <td>
                {arrangement.participants}
              </td>
              <td>
                <button className="btn btn-primary btn-sm">Åpne</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAll;