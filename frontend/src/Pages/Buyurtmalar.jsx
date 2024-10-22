import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Css/Buyurtmalar.css'
import { useNavigate } from 'react-router-dom'

const Buyurtmalar = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Fetching orders with authorization token
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('userToken')

        // If token is not found, redirect to '/hisobim'
        if (!token) {
          setError('Authorization token not found.')
          navigate('/hisobim')
          setLoading(false)
          return
        }

        // Set up headers with authorization token
        const headers = {
          Authorization: `Bearer ${token}`,
        }

        // Make the GET request with axios
        const response = await axios.get(
          'https://qizildasturchi.uz/api/orders',
          { headers }
        )

        if (response.status === 401) {
          // JWT expired or invalid token
          alert('Your session has expired. Please log in again.')
          navigate('/hisobim')
          return
        }

        // Set orders data
        setOrders(response.data)
        setLoading(false)
      } catch (error) {
        navigate('/hisobim')
        console.error('Error fetching orders:', error)
        setError('Failed to load orders.')
        setLoading(false)
      }
    }

    fetchOrders()
  }, [navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
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
  console.log(orders)
  return (
    <div className="buyurtmalar-page">
      <div className="order-list">
        {orders.data.length === 0 ? (
          <h1>Sizda hozircha buyurtmalar mavjud emas</h1>
        ) : (
          orders.data?.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-details">
                <span>Buyurtma holati: {getStatusText(order.status)}</span>
                <span>
                  To'lov holati:{' '}
                  {order.payment_status === 1 ? "To'lanmagan" : "To'langan"}
                </span>

                <span>
                  Buyurtma qilingan vaqt:{' '}
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
                <span>Umumiy summa: {order.total_sum} so'm</span>

                <div className="order-products">
                  <h3>Mahsulotlar:</h3>
                  {order.products.map((item) => (
                    <div key={item.id} className="product-item">
                      <div>
                        <span>Nomi: {item.product.name}</span>
                      </div>
                      <div>
                        <span>Miqdor: {item.count} ta</span>
                      </div>
                      <div>
                        <span>
                          Jami summa: {item.product.price * item.count} so'm
                        </span>
                      </div>
                      <img
                        src={
                          `https://qizildasturchi.uz/image${item.product.image}` ||
                          'placeholder.jpg'
                        }
                        alt={item.product.name}
                        className=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Buyurtmalar
