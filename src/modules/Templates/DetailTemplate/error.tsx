import { Button, Result } from "antd"
import * as React from "react"
import { useNavigate } from "react-router-dom"

export default function ErrorDetailTemplate() {
  const navigate = useNavigate()

  return (
    <Result
      status="warning"
      title="Không có dữ liệu"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Trở lại trang trước
        </Button>
      }
    />
  )
}
