const userServices = require('../services/user.services');

// create a new user
exports.createUser = async(req, res) => {
  try{
    const results = await userServices.createUser(req.body);
    res.status(201).send(results);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// fetch all users
exports.fetchAllUsers = async(req, res) => {
  try{
    const results = await userServices.fetchAllUsers();
    res.status(200).send(results);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// delete a user
exports.deleteUser = async(req, res) => {
  try{
    const results = await userServices.deleteUser(req.params.id);
    res.status(200).send(results);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};