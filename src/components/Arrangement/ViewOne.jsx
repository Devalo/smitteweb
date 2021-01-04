import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllParticipants } from '../../lib/reducers/participantReducer';
import { getOneArrangement } from '../../lib/services/arrangement';

import ListAllParticipants from './Participants/ListAllParticipants';

const ViewOne = () => {
  const params = useParams();
  const dispatch = useDispatch();
  
  const [arrangement, setArrangement] = useState();
  
  const arrangementState = useSelector((state) => state.arrangements.find((a) => a.id === params.id));
  const participants = useSelector((state) => state.participants);
  
  useEffect(() => {
    if (arrangementState) {
      setArrangement(arrangementState);
    }
  }, []);
  
  useEffect(() => {
    if (!arrangementState) {
      const fetchArrangementFromDB = async () => {
        const a = await getOneArrangement(params.id);
        setArrangement(a);
      } 
      fetchArrangementFromDB();
    } 
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getAllParticipants(params.id));
  }, []);
  
  
  
  if (arrangement === undefined) return null;
  
  return (
        <div>
        <section className="py-5 text-center container">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">{arrangement.name}</h1>
        <p className="lead text-muted">
          Deltakere på {arrangement.name}
        </p>
        
        {participants.length !== 0 ?  <ListAllParticipants participants={participants} /> : 'Ingen registrerte deltakere'}
       
      </div>
    </div>
  </section>
    </div>
  );
};

export default ViewOne;