import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllArrangements } from '../../lib/reducers/arrangementReducer';

import ListAll from './ListAll';

const AllArrangements = () => {
  const dispatch = useDispatch();
  const allArrangements = useSelector((state) => state.arrangements);
  
  useEffect(() => {
    dispatch(getAllArrangements());
  }, [dispatch]);
  
  console.log(allArrangements);
  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Mine arrangementer</h1>
            <p className="lead text-muted">
            </p>
            <p>
            {allArrangements.length !== 0 ? <ListAll arrangementer={allArrangements} /> : 'Her var det tomt'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllArrangements;
