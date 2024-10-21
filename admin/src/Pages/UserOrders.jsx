import React, { useEffect, useState } from 'react'
import './Css/UserOrders.css' // Create a CSS file for styling

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
    console.log(selectedOrder)
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
            status: 3,
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
    <div className="user-orders">
      <h2>Barcha Buyurtmalar</h2>
      {orders.length === 0 ? (
        <p>Buyurtmalaringiz yo'q.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h4>Ism familiya: {order.user?.full_name}</h4>
              <h4>Telefon raqami: {order.user?.phone_number}</h4>
              <p>Umumiy summa: {order.total_sum} so'm</p>
              <p>Status: {getStatusText(order.status)}</p>
              <p>
                To'lov holati:{' '}
                {order.payment_status === 0 ? "To'langan" : "To'lanmagan"}
              </p>
              <p>Yaratilgan: {new Date(order.created_at).toLocaleString()}</p>
              <h4>Mahsulotlar:</h4>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    {product.product.name} - {product.count} dona
                  </li>
                ))}
              </ul>
              <button onClick={() => openModal(order.id, order.status)}>
                statusni o'zgartirish
              </button>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Statusni tanlang</h3>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(parseInt(e.target.value))}
            >
              <option value={1}>Yuborilgan</option>
              <option value={2}>Qabul qilingan</option>
              <option value={3}>Yetqazib berilgan</option>
              <option value={4}>To'lov qilingan</option>
              <option value={0}>Bekor qilingan</option>
            </select>
            <button onClick={updateOrderStatus}>O'zgartirish</button>
            <button onClick={closeModal}>Yopish</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserOrders
