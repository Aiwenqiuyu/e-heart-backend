const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(successResponse('Users retrieved', users));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(successResponse('User created', user));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }
    res.json(successResponse('User found', user));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }
    await user.update(req.body);
    res.json(successResponse('User updated', user));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }
    await user.destroy();
    res.json(successResponse('User deleted'));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};
