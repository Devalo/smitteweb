import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addArrangement } from '../../lib/reducers/arrangementReducer';

// Komponent som lagrer arrangement
const AddArrangement = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors,
  } = useForm();

  // Dispatche data fra skjema, samt en callback-funksjon for å hente
  // ID til det opprettede arrangementet, og redirecte til det.
  const onSubmit = (data) => {
    dispatch(addArrangement(data.name, (id) => {
      history.push(`/arrangement/${id}`);
    }));
  };

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Legg til nytt arrangement</h1>
            <p className="lead text-muted" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Navn på arrangementet</label>
              <input
                type="text"
                className="form-control"
                name="name"
                ref={register({ required: true })}
              />
              {errors.name && 'Feltet kan ikke være tomt'}
              <br />
              <button type="submit" className="btn btn-primary">Lagre</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddArrangement;
