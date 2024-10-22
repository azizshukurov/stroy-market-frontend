import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'https://qizildasturchi.uz/api/admin/orders',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Include user token for authentication
            },
          }
        )
        const data = await response.json()
        if (data.success) {
          setOrders(data.data.records)
        } else {
          console.error('Failed to fetch orders:', data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const updateOrderStatus = async () => {
    if (!selectedOrder) return
    try {
      const response = await fetch(
        `https://qizildasturchi.uz/api/admin/orders/status/${selectedOrder}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: selectedStatus,
          }),
        }
      )
      const data = await response.json()
      if (data.success) {
        // Update the orders state with the new status
        setOrders(
          orders.map((order) =>
            order.id === selectedOrder
              ? { ...order, status: selectedStatus }
              : order
          )
        )
        setIsModalOpen(false)
        setSelectedOrder(null)
      } else {
        console.error('Failed to update status:', data)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const openModal = (orderId, currentStatus) => {
    setSelectedOrder(orderId)
    setSelectedStatus(currentStatus)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  if (loading) {
    return <p>Loading orders...</p>
  }

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Yangi'
      case 2:
        return 'Qabul qilingan'
      case 3:
        return 'Yetqazib berilgan'
      case 4:
        return "To'lov qilingan"
      case 0:
        return 'Bekor qilingan'
      default:
        return "Noma'lum"
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Barcha Buyurtmalar</h2>
      {orders.length === 0 ? (
        <p className="text-center">Buyurtmalaringiz yo'q.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">
                    Ism familiya: {order.user?.full_name}
                  </h4>
                  <h5 className="card-subtitle mb-2">
                    Telefon raqami: {order.user?.phone_number}
                  </h5>
                  <p className="card-text">
                    Umumiy summa: {order.total_sum} so'm
                  </p>
                  <p>Status: {getStatusText(order.status)}</p>
                  <p>
                    To'lov holati:{' '}
                    {order.payment_status === 0 ? "To'langan" : "To'lanmagan"}
                  </p>
                  <p>
                    Yaratilgan: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <h5>Mahsulotlar:</h5>
                  <ul className="list-group mb-3">
                    {order.products.map((product) => (
                      <li key={product.id} className="list-group-item">
                        {product.product.name} - {product.count} dona
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal(order.id, order.status)}
                  >
                    Statusni o'zgartirish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Statusni tanlang</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(parseInt(e.target.value))}
                >
                  <option value={1}>Yuborilgan</option>
                  <option value={2}>Qabul qilingan</option>
                  <option value={3}>Yetqazib berilgan</option>
                  <option value={4}>To'lov qilingan</option>
                  <option value={0}>Bekor qilingan</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={updateOrderStatus}>
                  O'zgartirish
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserOrders
