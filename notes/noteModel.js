const { DataTypes } = require('sequelize');

const { sequelize } = require('./database');

const Note = sequelize.define('note', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

const noteMethods = {
    getNotes: async (req, res) => {
        try {
            const notes = await Note.findAll();
            res.status(200).send({
                success: true,
                data: notes,
                error: null
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                data: null,
                error: e
            })
        }
    },
    getNote: async (req, res) => {
        try {
            const { noteId } = req.params;
            const note = await Note.findByPk(noteId);
            res.status(200).send({
                success: true,
                data: note,
                error: null
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                data: null,
                error: e
            })
        }
    },
    addNote: async (req, res) => {
        try {
            const note = {
                text: req.body.text,
                userId: req.body.userId
            }
            const createdNote = await Note.create(note);
            res.status(200).send({
                success: true,
                data: createdNote,
                error: null
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                data: null,
                error: e
            })
        }
    },
    editNote: async (req, res) => {
        try {
            const { noteId } = req.params;
            const note = await Note.findByPk(noteId);
            if (!note) {
                return res.status(500).send({
                    success: false,
                    data: 'Note not found',
                    error: null
                })
            }
            const updatedNote = await Note.update({ ...req.body }, { where: { id: noteId } });
            res.status(200).send({
                success: true,
                data: updatedNote,
                error: null
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                data: null,
                error: e
            })
        }
    },
    deleteNote: async (req, res) => {
        try {
            const { noteId } = req.params;
            const note = await Note.findByPk(noteId);
            if (!note) {
                return res.status(500).send({
                    success: false,
                    data: 'Note not found',
                    error: null
                })
            }
            await Note.destroy({ where: { id: noteId } });
            res.status(200).send({
                success: false,
                data: 'User successfully deleted',
                error: null
            });
        } catch (e) {
            res.status(500).send({
                success: false,
                data: null,
                error: e
            })
        }
    },
    deleteUserNotes: (userId) => {
        return Note.destroy({
            where: { userId }
        })
    }
};

module.exports = {
    model: Note,
    methods: noteMethods,
}
