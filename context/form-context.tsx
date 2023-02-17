// This follows the thinking from Kent C. Dodds on effective React Context.
// See https://kentcdodds.com/blog/how-to-use-react-context-effectively

import { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import FormStepType from '@/interfaces/form_step';

const FormContext = createContext({});

function FormProvider({ children }) {
  const [form, setForm] = useState({ sections: [] });

  const saveForm = (form) => {
    setForm(form);
    localStorage.setItem('form', JSON.stringify(form));
  };

  const addSectionToForm = (newFormSection) => {
    let newForm = {};
    // Check if the form section has been submitted before
    if (form.sections[newFormSection.sectionNumber]) {
      newForm = form;
      newForm.sections[newFormSection.sectionNumber].answers =
        newFormSection.answers;
    } else {
      newForm = {
        sections: [
          ...form.sections,
          {
            sectionNumber: newFormSection.sectionNumber,
            answers: newFormSection.answers,
          },
        ],
      };
    }
    saveForm(newForm);
  };

  const clearForm = () => {
    saveForm({});
  };

  const loadForm = () => {
    // Check localstorage for a form
    let formFromLocalStorage = localStorage.getItem('form');
    if (formFromLocalStorage) {
      saveForm(JSON.parse(formFromLocalStorage));
    }
  };

  // Ensures the form is synced with local storage on mount
  useEffect(() => {
    loadForm();
  }, []);

  return (
    <FormContext.Provider value={{ form, addSectionToForm, clearForm }}>
      {children}
    </FormContext.Provider>
  );
}

function useForm() {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }

  return context;
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FormProvider, useForm };
