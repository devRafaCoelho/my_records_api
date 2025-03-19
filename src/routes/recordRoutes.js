const express = require("express");
const RecordController = require("../controllers/RecordController");
const validateAuthentication = require("../middlewares/validateAuthentication");
const validateSchema = require("../middlewares/validateSchema");
const validateRecordData = require("../middlewares/validateRecordData");
const recordSchema = require("../schemas/recordSchema");

const setRecordRoutes = (app) => {
  const router = express.Router();
  const recordController = new RecordController();

  const protectedRouter = express.Router();

  protectedRouter.use(validateAuthentication);

  protectedRouter.post(
    "/records",
    validateSchema(recordSchema),
    recordController.createRecord.bind(recordController)
  );

  protectedRouter.get(
    "/records",
    recordController.findAll.bind(recordController)
  );

  protectedRouter.get(
    "/records/:id",
    validateRecordData({ checkRecordExists: true }),
    recordController.findById.bind(recordController)
  );

  protectedRouter.put(
    "/records/:id",
    validateSchema(recordSchema),
    validateRecordData({ checkRecordExists: true }),
    recordController.updateRecord.bind(recordController)
  );

  // Rota para deletar um registro
  protectedRouter.delete(
    "/records/:id",
    validateRecordData({ checkRecordExists: true }), // Middleware para validar o registro
    recordController.deleteRecord.bind(recordController)
  );

  router.use(protectedRouter);

  app.use("/api", router);
};

module.exports = setRecordRoutes;
