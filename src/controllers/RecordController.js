const RecordModel = require("../models/RecordModel");
const formatRecord = require("../helpers/formatRecord");

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

      return res.status(201).json(formatRecord(newRecord));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findAll(req, res) {
    try {
      const { id: id_user } = req.user;
      const { due_date, paid_out, status } = req.query;

      const filters = { id_user };
      if (due_date) {
        filters.due_date = due_date;
      }
      if (paid_out !== undefined) {
        filters.paid_out = paid_out === "true";
      }
      if (status) {
        filters.status = status;
      }

      const records = await RecordModel.findAllWithFilters(filters);

      const formattedRecords = records.map(formatRecord);

      return res.status(200).json(formattedRecords);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findById(req, res) {
    try {
      const record = req.record;

      return res.status(200).json(formatRecord(record));
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

      return res.status(200).json(formatRecord(updatedRecord));
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

      return res.status(200).json(formatRecord(deletedRecord));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = RecordController;
