// src/utils/geocode.js

export async function layToaDo(diaChi) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(diaChi)}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "bikerental-app" // bắt buộc với Nominatim
      }
    });

    const data = await response.json();
    if (data.length > 0) {
      return {
        vi_do: parseFloat(data[0].lat),
        kinh_do: parseFloat(data[0].lon),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Lỗi lấy tọa độ:", error);
    return null;
  }
}
