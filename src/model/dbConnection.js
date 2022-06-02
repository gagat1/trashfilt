const mysql = require("mysql");
const db = mysql.createConnection({
  host: "34.101.194.79",
  user: "root",
  password: "abcd1234",
  database: "trafiltdatabase",
  multipleStatements: true,
});
// koneksi database
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});
exports.db = db;