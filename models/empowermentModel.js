const mongoose = require("mongoose");

const EmpowermentSchema = mongoose.Schema({
  passport: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  gender: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  formOfIdentification: {
    type: String,
  },
  identificationNumber: {
    type: String,
  },
  stateOfOrigin: {
    type: String,
  },
  localGovernmentOfOrigin: {
    type: String,
  },
  stateOfResidence: {
    type: String,
  },
  localGovernmentOfResidence: {
    type: String,
  },
  yearsOfExperience: {
    type: String,
  },
  haveAnExistingBusiness: {
    type: String,
  },
  haveAnExistingBusiness: {
    type: String,
  },
  whatTypeOfBusiness: {
    type: String,
  },
  accountName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  empowermentProgramme: {
    type: String,
  },
  status: {
    type: String,
  },
});

const EmpowermentModel = mongoose.model("empowerment", EmpowermentSchema);

module.exports = EmpowermentModel;
