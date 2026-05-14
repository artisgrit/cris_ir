
export const SECTION_LICENSE_FORM_LAYOUT = {

  granted: {
    element: {
      container: 'form-check ps-1',
      control: 'form-check-input',
      label: 'form-check-label pt-1',
    },
  },
};

export const SECTION_LICENSE_FORM_MODEL = [
  {
    id: 'granted',
    label: 'submission.sections.license.granted-label',
    required: true,
    value: false,
    validators: {
      required: null,
    },
    errorMessages: {
      required: 'submission.sections.license.notgranted',
    },
    type: 'CHECKBOX',
  },
];
