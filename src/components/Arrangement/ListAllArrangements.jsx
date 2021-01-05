import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import fire from '../../config/fire';
import { setNotification } from '../../lib/reducers/notificationReducer';
import { deleteArrangement } from '../../lib/reducers/arrangementReducer';

const ListAll = ({ arrangementer }) => {
  const dispatch = useDispatch();
  const user = fire.auth().currentUser;

  const deleteList = (listId) => {
    if (window.confirm('Er du sikker?\nSletting av en liste er en permanent handling, og kan ikke reverseres.')) {
      dispatch(deleteArrangement(user.uid, listId));
      dispatch(setNotification('Slettet arrangement', 'success', 2));
    }
  };

  return (
    <div>
      <table className="table table-hoverable table-responsive">
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
                {' '}
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteList(arrangement.id)}
                >
                  Slett
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAll;
