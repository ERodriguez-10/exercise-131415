import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import useList from './hooks/useList';
import LEVELS from './models/levels.enum';

import './App.css';

const App = () => {
  const TaskSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    description: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
  });
  const defaultTask = {
    name: 'Formik',
    description: 'Formulario con Formik',
    level: LEVELS.URGENT,
    done: false,
  };
  const tasks = useList([defaultTask]);

  return (
    <div>
      <h1 className='App'>Task List</h1>
      <Formik
        initialValues={{
          name: '',
          description: '',
          level: LEVELS.NORMAL,
          done: false,
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            tasks.push(values);
            actions.resetForm({});
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={TaskSchema}
      >
        {({ errors }) => (
          <Form className='App-header'>
            <h6>Create a New Task</h6>
            <div>
              <Field name="name" placeholder="Task Name" className="name-text" />
              <p className='errors'>{errors && errors.name}</p>
            </div>
            <div className='errors-text'>
              <Field name="description" as="textarea" placeholder="Task Description" className="description-text" />
              <p className='errors'>{errors && errors.description}</p>
            </div>
            <Field as="select" name="level" className="select-option">
              <option value={LEVELS.NORMAL}>Normal</option>
              <option value={LEVELS.URGENT}>Urgent</option>
              <option value={LEVELS.BLOCKING}>Blocking</option>
            </Field>
            <button type="submit" className='submit-btn'>Submit</button>
          </Form>
        )}
      </Formik>
      {tasks.isEmpty() ? (
        <p className='App'>Task List is Empty</p>
      ) : (
        <div className='App-List'>
          {tasks.value.map((task, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input type="checkbox" onClick={() => tasks.remove(index)} checked={false} />
              <p style={{ fontWeight: 'bold', marginRight: '5px' }}>{task.name}</p>
              <p>{task.description}</p>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;