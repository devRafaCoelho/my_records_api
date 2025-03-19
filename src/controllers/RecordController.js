const RecordModel = require("../models/RecordModel");

class RecordController {
  async createRecord(req, res) {
    try {
      const { id: id_user } = req.user;
      const { description, due_date, value, paid_out } = req.body;

      const record = new RecordModel({
        id_user,
        description,
        due_date,
        value,
        paid_out,
      });

      const newRecord = await record.create();

      return res.status(201).json(newRecord);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findAll(req, res) {
    try {
      const { id: id_user } = req.user;

      const records = await RecordModel.findAll(id_user);

      return res.status(200).json(records);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findById(req, res) {
    try {
      const record = req.record;

      return res.status(200).json(record);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateRecord(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedRecord = await RecordModel.update(id, updatedData);

      if (!updatedRecord) {
        return res.status(404).send("Record not found");
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteRecord(req, res) {
    try {
      const { id } = req.params;

      const deletedRecord = await RecordModel.delete(id);

      if (!deletedRecord) {
        return res.status(404).json({ message: "Record not found" });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = RecordController;
