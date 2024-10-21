import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Css/Buyurtmalar.css'

const Buyurtmalar = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  // Fetching orders with authorization token
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('userToken')

        // If token is not found, throw error
        if (!token) {
          setError('Authorization token not found.')
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

        // Set orders data
        setOrders(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setError('Failed to load orders.')
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('userToken')
        orders.data?.map((order) =>
          order.products?.map(async (product) => {
            const response = await axios.get(
              `https://qizildasturchi.uz/api/products/${product.product_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )

            setProducts(response.data)
          })
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  console.log(products)
  return (
    <div className="buyurtmalar-page">
      <h1>Sizning barcha buyurtmalaringiz</h1>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders available</p>
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
                  <h4>Products:</h4>
                  {order.products.map((product) => (
                    <div key={product.id} className="product-item">
                      <div>
                        <span>Nomi: {products.data?.name}</span>
                      </div>
                      <div>
                        <span>Miqdor: {product.count} ta</span>
                      </div>
                      <div>
                        <span>Jami summa: {products.data?.price} so'm</span>
                      </div>
                      <img src={products.data?.image} alt="" className="" />
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
