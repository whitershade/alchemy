import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '../../TextFiled';
import './styles.css';

// @ts-ignore
const PlayerForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid, values, form }) => (
      <form
        onSubmit={handleSubmit}
        className="player-form"
      >
        <div className="player-form-text-field-wrapper">
          <Field
            required
            name="name"
            type="text"
            placeholder="Player name"
            // @ts-ignore
            component={TextField}
          />
        </div>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => {
            form.submit();
            form.reset();
          }}
          disabled={pristine || invalid}
        >
          Add player
        </Button>
        { console.log(values) }
      </form>
    )}
  />
);

export default PlayerForm;