import React from 'react';
import { Link } from 'react-router-dom';

const Frontpage = () => {
  return (
    <div>
        <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">SmitteWeb</h1>
        <p class="lead text-muted">
          Begrens smittespredning ved å la deltakere registrere seg på ditt arrangement.
        </p>
        <p>
          <Link to="/logg-inn" className="btn btn-primary my-2">Logg inn</Link>
          {' '}
          <Link to="/registrer" className="btn btn-secondary my-2">Registrer deg som arrangør</Link>
        </p>
      </div>
    </div>
  </section>
    </div>
  );
};

export default Frontpage;
