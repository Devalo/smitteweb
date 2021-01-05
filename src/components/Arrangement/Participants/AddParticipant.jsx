import React from 'react';
import { useParams } from 'react-router-dom';
import ParticipantForm from './ParticipantForm';

// Viser skjema for å legge til deltakere til den innloggede brukeren.
const AddParticipant = () => {
  const params = useParams();

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">
              {params.listName}
            </h1>
            <p className="lead text-muted">
              Legg til deltaker
            </p>
            <ParticipantForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddParticipant;
