'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users.map(usersService.normalizeUser));
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  const user = await usersService.getbyId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(usersService.normalizeUser(user));
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const user = await usersService.getbyId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const user = await usersService.getbyId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(422);

    return;
  }

  const updatedUser = await usersService.update({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
