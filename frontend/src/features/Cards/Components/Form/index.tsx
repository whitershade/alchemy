import React from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '../../../../components/TextFiled';
import './styles.css';

// @ts-ignore
const PlayerForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid, form }) => (
      <form onSubmit={handleSubmit} className="card-form">
        <div className="card-form-wrapper">
          <Field name="name" component={TextField} placeholder="Card name" className="card-form-field" />

          <button
            type="submit"
            disabled={pristine || invalid}
            onClick={() => {
              form.submit();
              form.reset();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    )}
  />
);

export default PlayerForm;