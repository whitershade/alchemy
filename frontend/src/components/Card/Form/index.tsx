import React from 'react';
import { Form, Field } from 'react-final-form';
import './styles.css';

// @ts-ignore
const PlayerForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit} className="card-form">
        <div>
          <label>Card name</label>
          <Field name="name" component="input" placeholder="Name" />
        </div>

        <button type="submit" disabled={pristine || invalid}>
          Submit
        </button>
      </form>
    )}
  />
);

export default PlayerForm;