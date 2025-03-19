const db = require("../config/db");

class RecordModel {
  constructor({ id, id_user, description, due_date, value, paid_out, status }) {
    this.id = id;
    this.id_user = id_user;
    this.description = description;
    this.due_date = due_date;
    this.value = value;
    this.paid_out = paid_out;
    this.status = status;
  }

  async create() {
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

  static async findAll(id_user) {
    const query = `SELECT * FROM records_view WHERE id_user = $1;`;
    const result = await db.query(query, [id_user]);
    return result.rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM records_view WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updatedData) {
    const fields = Object.keys(updatedData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const values = [id, ...Object.values(updatedData)];

    const query = `
      UPDATE records
      SET ${fields}
      WHERE id = $1
      RETURNING *;
    `;

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM records WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findAllWithFilters(filters) {
    const conditions = [];
    const values = [];

    conditions.push("id_user = $1");
    values.push(filters.id_user);

    if (filters.due_date) {
      conditions.push(`due_date = $${values.length + 1}`);
      values.push(filters.due_date);
    }
    if (filters.paid_out !== undefined) {
      conditions.push(`paid_out = $${values.length + 1}`);
      values.push(filters.paid_out);
    }
    if (filters.status) {
      conditions.push(`status = $${values.length + 1}`);
      values.push(filters.status);
    }

    const query = `
      SELECT * FROM records_view
      WHERE ${conditions.join(" AND ")};
    `;

    const result = await db.query(query, values);
    return result.rows;
  }
}

module.exports = RecordModel;
