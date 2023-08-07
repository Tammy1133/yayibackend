const router = require("express").Router();
const empowermentModel = require("../models/empowermentModel");
const fileUpload = require("express-fileupload");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../utils/cloudinary");

router.use(fileUpload());

router.get("/getempowerment", async (req, res) => {
  try {
    const data = await empowermentModel.find({});
    res.status(200).send(data);
  } catch (error) {
    res.status(405).send(error.message);
    console.log(error);
  }
});

router.put("/changestatus", async (req, res) => {
  const { newStatus, _id } = req.body;
  try {
    const data = await empowermentModel.findByIdAndUpdate(
      { _id },
      { status: newStatus }
    );
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(405).send(error.message);
    console.log(error);
  }
});

router.post("/apply", async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    gender,
    maritalStatus,
    dateOfBirth,
    telephone,
    email,
    address,
    formOfIdentification,
    identificationNumber,
    stateOfOrigin,
    localGovernmentOfOrigin,
    stateOfResidence,
    localGovernmentOfResidence,
    yearsOfExperience,
    haveAnExistingBusiness,
    whatTypeOfBusiness,
    accountName,
    accountNumber,
    empowermentProgramme,
    passport,
  } = req.body;
  console.log(req.body);
  try {
    const saveImage = await cloudinary.uploader.upload(passport, {
      folder: "Empowerment",
    });
    const data = await new empowermentModel({
      firstName,
      lastName,
      middleName,
      gender,
      maritalStatus,
      dateOfBirth,
      telephone,
      email,
      address,
      formOfIdentification,
      identificationNumber,
      stateOfOrigin,
      localGovernmentOfOrigin,
      stateOfResidence,
      localGovernmentOfResidence,
      yearsOfExperience,
      haveAnExistingBusiness,
      whatTypeOfBusiness,
      accountName,
      accountNumber,
      empowermentProgramme,
      passport: {
        public_id: saveImage.public_id,
        url: saveImage.secure_url,
      },
      status: "Not reviewed",
    });
    await data.save();

    res.status(200).json({ message: "Application received" });
    // res.status(200).send("Application received");
  } catch (error) {
    res.status(405).send(error?.message);
    // console.log(error);
  }
});

module.exports = router;
