import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const ParticipantForm = () => {
  const params = useParams();
  const {
    register, handleSubmit, errors, reset,
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  }
  
  return (
    <div>
    hei
    </div>
  );
}

export default ParticipantForm;

