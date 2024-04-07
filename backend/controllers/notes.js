const Note = require("../models/Note");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({ notes, count: notes.length });
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: noteId },
    } = req;

    const note = await Note.findOne({
      _id: noteId,
      createdBy: userId,
    });
    if (!note) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.OK).json({ note });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.userId;
    const note = await Note.create(req.body);
    res.status(StatusCodes.CREATED).json(note);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const {
      body: { title, description },
      user: { userId },
      params: { id: noteId },
    } = req;

    const note = await Note.findByIdAndUpdate(
      { _id: noteId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      throw new NotFoundError();
    } else if (title === "" || !title) {
      throw new BadRequestError();
    } else if (description === "" || !description) {
      throw new BadRequestError();
    }
    res.status(StatusCodes.OK).json({ note });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: noteId },
    } = req;

    const note = await Note.findByIdAndDelete({
      _id: noteId,
      createdBy: userId,
    });

    if (!note) {
      throw new NotFoundError(`Note with id: ${noteId} not found blah`);
    }

    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllNotes, getNote, createNote, updateNote, deleteNote };
