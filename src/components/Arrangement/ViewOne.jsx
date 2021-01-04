import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllParticipants } from '../../lib/reducers/participantReducer';

const ViewOne = () => {
  const params = useParams();
  const dispatch = useDispatch();
  
  const arrangement = useSelector((state) => state.arrangements.find((a) => a.id === params.id));
  
  useEffect(() => {
    dispatch(getAllParticipants(arrangement.id));
  }, [dispatch]);
  
  console.log(arrangement);
  return (
        <div>
        <section className="py-5 text-center container">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">{arrangement.name}</h1>
        <p className="lead text-muted">
          Deltakere på {arrangement.name}
          
        </p>
        <p>
        </p>
      </div>
    </div>
  </section>
    </div>
  );
};

export default ViewOne;