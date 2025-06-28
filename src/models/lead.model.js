import pool from "../db/db.js";
export const Lead = {
  async getAllLeads() {
    const [rows] = await pool.query("SELECT * FROM leadTable");
    return rows;
  },

  // Create a new product
  async AddLead({
    name,
    phone,
    altPhone,
    email,
    altEmail,
    status,
    qualification,
    interestField,
    source,
    assignedTo,
    jobInterest,
    state,
    city,
    passoutYear,
    heardFrom,
  }) {
    const [result] = await pool.query(
      `INSERT INTO leadTable (
      name, phone, altPhone, email, altEmail,
      status, qualification, interestField, source,
      assignedTo, jobInterest, state, city,
      passoutYear, heardFrom
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        altPhone,
        email,
        altEmail,
        status,
        qualification,
        interestField,
        source,
        assignedTo,
        jobInterest,
        state,
        city,
        passoutYear,
        heardFrom,
      ]
    );

    return result.insertId;
  },

  async updateLead(
    id,
    {
      name,
      phone,
      altPhone,
      email,
      altEmail,
      status,
      qualification,
      interestField,
      source,
      assignedTo,
      jobInterest,
      state,
      city,
      passoutYear,
      heardFrom,
    }
  ) {
    const [result] = await pool.query(
      `UPDATE leadTable SET
      name = ?, phone = ?, altPhone = ?, email = ?, altEmail = ?,
      status = ?, qualification = ?, interestField = ?, source = ?,
      assignedTo = ?, jobInterest = ?, state = ?, city = ?,
      passoutYear = ?, heardFrom = ?
    WHERE id = ?`,
      [
        name,
        phone,
        altPhone,
        email,
        altEmail,
        status,
        qualification,
        interestField,
        source,
        assignedTo,
        jobInterest,
        state,
        city,
        passoutYear,
        heardFrom,
        id,
      ]
    );
    return result.affectedRows;
  },
  async getLeadById(id) {
    const [rows] = await pool.query("SELECT * FROM leadTable WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },
  async getLeadByName(name) {
    const [rows] = await pool.query("SELECT * FROM leadTable WHERE name = ?", [
      name,
    ]);
    return rows[0];
  },
  async deleteLead(id) {
    const [result] = await pool.query("DELETE FROM leadTable WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  },
  async findLeadByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM leadTable WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
};
