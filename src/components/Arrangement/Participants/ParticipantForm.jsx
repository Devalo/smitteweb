import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addParticipant } from '../../../lib/services/arrangement';
import fire from '../../../config/fire';


const ParticipantForm = () => {
  const user = fire.auth().currentUser;
  const params = useParams();
  const history = useHistory();
  const {
    register, handleSubmit, errors, reset,
  } = useForm();
  
  const onSubmit = (data) => {
    addParticipant(params.id, data);
    if (user === null) {
      history.push("/takk");
    }
  }
  
  return (
    <div>
<form class="row g-3 float-left" onSubmit={handleSubmit(onSubmit)}>
  <div class="col-md-6 float-left">
    <label htmlFor="nameInput" class="form-label">Fult navn *</label>
    <input
      type="text"
      className="form-control"
      id="nameInput"
      name="name"
      ref={register({ required: true })}
    />
    {errors.name && 'Dette feltet er påkrevd'}
  </div>
  <div class="col-md-6">
    <label for="ageInput" class="form-label">Alder *</label>
    <input
      type="text"
      className="form-control"
      id="ageInput"
      name="age"
      ref={register({ required: true })}
    />
    {errors.age && 'Dette feltet er påkrevd'}
  </div>
  <div class="col-12">
    <label for="phoneInput" class="form-label">Telefonnummer *</label>
    <input
      type="text"
      className="form-control"
      id="phoneInput"
      name="phone"
      ref={register({ required: true })}
    />
    {errors.phone && 'Dette feltet er påkrevd'}
  </div>
 
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
    </div>
  );
}

export default ParticipantForm;

