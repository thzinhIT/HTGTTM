// scripts/capnhat_toado.js

import mysql from "mysql2/promise";
import { layToaDo } from "../src/app/utils/geocode.js";

async function capNhatToaDo() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // điền mật khẩu MySQL
    database: "bikerental",
  });

  const [rows] = await connection.execute(
    "SELECT id_tram, dia_chi FROM tram where dia_chi IS NOT NULL AND (vi_do IS NULL OR kinh_do IS NULL)"
  );

  for (const row of rows) {
    const toado = await layToaDo(row.dia_chi);
    if (toado) {
      await connection.execute(
        "UPDATE tram SET vi_do = ?, kinh_do = ? WHERE id_tram = ?",
        [toado.vi_do, toado.kinh_do, row.id_tram]
      );
      console.log(`✅ Đã cập nhật: ${row.id_tram} - ${row.dia_chi}`);
    } else {
      console.log(
        `❌ Không tìm thấy tọa độ cho: ${row.id_tram} - ${row.dia_chi}`
      );
    }

    // Tránh bị block bởi Nominatim, đợi 1 giây mỗi request
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  await connection.end();
}

capNhatToaDo();
