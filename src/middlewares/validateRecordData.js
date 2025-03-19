const RecordModel = require("../models/RecordModel");

const validateRecordData =
  (options = {}) =>
  async (req, res, next) => {
    const { id: id_user } = req.user;
    const { id } = req.params;
    const errors = [];

    if (options.checkRecordExists && id) {
      const record = await RecordModel.findById(id);

      if (!record || record.id_user !== id_user) {
        errors.push({
          message: "Record not found.",
          type: "record",
        });
      } else {
        req.record = record;
      }
    }

    if (errors.length > 0) {
      return res.status(404).json({ details: errors });
    }

    next();
  };

module.exports = validateRecordData;
