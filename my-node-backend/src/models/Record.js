const db = require("../config/db");

class Record {
  constructor({ id, id_user, description, due_date, value, paid_out, status }) {
    this.id = id;
    this.id_user = id_user;
    this.description = description;
    this.due_date = due_date;
    this.value = value;
    this.paid_out = paid_out;
    this.status = status; // Adiciona o status
  }

  // Método para salvar o registro no banco de dados
  async save() {
    const query = `
            INSERT INTO records (id_user, description, due_date, value, paid_out)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
    const values = [
      this.id_user,
      this.description,
      this.due_date,
      this.value,
      this.paid_out,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Método para buscar um registro pelo ID (usando a view records_view)
  static async findById(id) {
    const query = `SELECT * FROM records_view WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Método para buscar todos os registros (usando a view records_view)
  static async findAll() {
    const query = `SELECT * FROM records_view;`;
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Record;
