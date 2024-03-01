const db = require('../models/db');
const { Status } = require('@prisma/client');

exports.getByUser = async (req, res, next) => {
  try {
    const todos = await db.todo.findMany({
      where: { userId: req.user.id }
    });
    res.json({ todos });
  } catch (err) {
    next(err); // Forward error to error handling middleware
  }
};

exports.createTodo = async (req, res, next) => {
  const data = req.body; // Ensure data validation
  try {
    const rs = await db.todo.create({
      data: { ...data, userId: req.user.id }
    });
    res.json({ msg: 'Create OK', result: rs });
  } catch (err) {
    next(err); // Forward error to error handling middleware
  }
};

exports.updateTodo = async (req, res, next) => {
  const { id } = req.params; // Ensure params validation
  const data = req.body; // Ensure data validation
  try {
    const rs = await db.todo.update({
      data: { ...data },
      where: { id: +id, userId: req.user.id }
    });
    res.json({ msg: 'Update ok', result: rs });
  } catch (err) {
    next(err); // Forward error to error handling middleware
  }
};

exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params; // Ensure params validation
  try {
    const rs = await db.todo.delete({
      where: { id: +id, userId: req.user.id }
    });
    res.json({ msg: 'Delete ok', result: rs });
  } catch (err) {
    next(err); // Forward error to error handling middleware
  }
};

exports.getAllStatus = async (req, res, next) => {
  try {
    res.json({ status: Object.values(Status) });
  } catch (err) {
    next(err); // Forward error to error handling middleware
  }
};
