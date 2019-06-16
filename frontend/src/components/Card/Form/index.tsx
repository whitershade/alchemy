import React from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '../../TextFiled';
import './styles.css';

// @ts-ignore
const PlayerForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit} className="card-form">
        <div className="card-form-wrapper">
          <Field name="name" component={TextField} placeholder="Card name" className="card-form-field" />

          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>
        </div>
      </form>
    )}
  />
);

export default PlayerForm;