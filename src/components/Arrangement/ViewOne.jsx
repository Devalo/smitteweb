import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllParticipants } from '../../lib/reducers/participantReducer';
import { setNotification } from '../../lib/reducers/notificationReducer';
import { getOneArrangement } from '../../lib/services/arrangement';

import ListAllParticipants from './Participants/ListAllParticipants';
import Spinner from '../shared/Spinner';
import QRModal from './QRModal';
import fire from '../../config/fire';

const ViewOne = () => {
  const user = fire.auth().currentUser;
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const [arrangement, setArrangement] = useState();

  const arrangState = useSelector((state) => state.arrangements.find((a) => a.id === params.id));
  const participants = useSelector((state) => state.participants);
  const url = `${window.location.protocol}//${window.location.host}/${params.id}`;

  useEffect(() => {
    if (arrangState) {
      setArrangement(arrangState);
    }
  }, [arrangState]);

  useEffect(() => {
    if (!arrangState) {
      const fetchArrangementFromDB = async () => {
        const a = await getOneArrangement(params.id);
        setArrangement(a);
      };
      fetchArrangementFromDB();
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllParticipants(params.id));
  }, []);

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    dispatch(setNotification('Delbar link ble kopiert til utklippstavlen', 'success', 2));
  };

  if (arrangement === undefined) return <Spinner />;
  if (participants === undefined) return <Spinner />;
  if (arrangement.belongsTo !== user.uid) {
    history.push('/');
  }

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{arrangement.name}</h1>
            <div className="row">
              <div className="col-md-4 mb-2">
                <Link to={`/arrangement/${params.id}/legg-til-deltaker/${arrangement.name}`} className="btn btn-primary btn-sm">Legg til deltaker</Link>
              </div>
              <div className="col-md-4 mb-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => copyToClipboard()}
                >
                  Kopier link til utklippstavle
                </button>
              </div>
              <div className="col-md-4 mb-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Generer QR-kode
                </button>
                <QRModal url={url} />
              </div>
            </div>
            <hr />

            {participants.length !== 0 ? <ListAllParticipants participants={participants} listId={params.id} arrangement={arrangement} /> : 'Ingen registrerte deltakere'}

          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewOne;
