import React from 'react';
import { useParams } from 'react-router-dom';
import ParticipantForm from './ParticipantForm';

const AddParticipant = () => {
  const params = useParams();

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">
              Legg deltaker til
              {' '}
              {params.listName}
            </h1>
            <p className="lead text-muted">
              hei
            </p>
            <ParticipantForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddParticipant;
