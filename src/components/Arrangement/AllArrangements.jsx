import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllArrangements } from '../../lib/reducers/arrangementReducer';

import ListAllArrangements from './ListAllArrangements';
import Spinner from '../shared/Spinner';

// Komponent for å vise alle arrangementer
const AllArrangements = () => {
  const dispatch = useDispatch();
  const allArrangements = useSelector((state) => state.arrangements);

  // Dispatcher en funksjon for å hente inn alle arrangementer
  useEffect(() => {
    dispatch(getAllArrangements());
  }, [dispatch]);

  if (allArrangements === undefined) return <Spinner />;

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">
              Mine arrangementer
              {' '}
              <Link to="/arrangement/legg-til" className="btn btn-secondary btn-sm">Legg til</Link>
            </h1>
            <div className="text-left" />
            <p className="lead text-muted" />
            {allArrangements.length !== 0
              ? <ListAllArrangements arrangementer={allArrangements} />
              : <p>Her var det tomt</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllArrangements;
