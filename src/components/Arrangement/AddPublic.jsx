import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneArrangement } from '../../lib/services/arrangement';
import ParticipantForm from './Participants/ParticipantForm';

const AddPublic = () => {
  const params = useParams();
  const [arrangement, setArrangement] = useState();

  useEffect(() => {
    const getArrangement = async () => {
      const a = await getOneArrangement(params.id);
      setArrangement(a);
    };
    getArrangement();
  }, []);

  if (arrangement === undefined) return 'Kunne ikke finne noe her';

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{arrangement.name}</h1>
            <p className="lead text-muted">
              Vedrørende din deltakelse på
              {' '}
              {arrangement.name}
              , er det viktig at du registrerer deg i forhold til smittesporing.
            </p>
            <ParticipantForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddPublic;
