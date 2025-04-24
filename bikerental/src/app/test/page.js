'use client'

import { useEffect, useState } from 'react'

export default function TestViTriKhach() {
  const [nearestStation, setNearestStation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Trình duyệt không hỗ trợ lấy vị trí.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        try {
          const res = await fetch('/api/station/nearest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latitude, longitude })
          })

          const data = await res.json()
          setNearestStation(data)
        } catch (err) {
          setError('Lỗi khi gửi yêu cầu đến máy chủ.')
        }
      },
      () => setError('Không thể lấy được vị trí.')
    )
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Vị trí hiện tại</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {nearestStation ? (
        <div>
          <p><strong>Tên trạm:</strong> {nearestStation.ten_tram}</p>
          <p><strong>Địa chỉ:</strong> {nearestStation.dia_chi}</p>
          <p><strong>Khoảng cách:</strong> {Math.round(nearestStation.distance)} mét</p>
        </div>
      ) : !error ? (
        <p>Đang lấy vị trí...</p>
      ) : null}
    </div>
  )
}
