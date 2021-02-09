const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const FormFieldsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true
  },
  description: { type: String },
  readonly: { type: String },
  disabled: { type: String },
  process: { type: String, trim: true },
  type: { type: String },
  label: { type: String },
  inputType: { type: String },
  value: { type: String },
  value_api: { type: String },
  options: {},
  validations: [],
  html5_validation: [],
  order: { type: Number },
  placeholder: { type: String },
  field_arr: [],
  action: []
});

FormFieldsSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!'
});

FormFieldsSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      process: this.process,
      type: this.type,
      label: this.label,
      inputType: this.inputType,
      value: this.value,
      value_api: this.value_api,
      options: this.options,
      maxlength: this.maxlength,
      minlength: this.minlength,
      validations: this.validations,
      html5_validation: this.html5_validation,
      order: this.order,
      placeholder: this.placeholder,
      field_arr: this.field_arr,
      readonly: this.readonly,
      disabled: this.disabled,
      action: this.action
    };
  }
};

const FormFields = mongoose.model('Fields', FormFieldsSchema);
module.exports = FormFields;
