import React, { useState, useEffect } from 'react'
import './Css/order.css'

function Buyurtmalar() {
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSend = async (id) => {
    setLoading(true)

    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch(
        `https://qizildasturchi.uz/api/admin/orders/status/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 3 }), // sending 'sent' as the updated status
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      const result = await response.json()
      console.log('Order status updated:', result)
      alert('Order status updated successfully!')
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Error updating order status.')
    } finally {
      setLoading(false)
    }
  }
  // Fetch order data when the component mounts
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const token = localStorage.getItem('userToken')
        const response = await fetch(
          'https://qizildasturchi.uz/api/admin/orders',
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response)
        const result = await response.json()
        if (result.success) {
          setOrderData(result.data.records) // Assuming you want to display the first order
        }
      } catch (error) {
        console.error('Error fetching order data:', error)
      }
    }

    fetchOrderData()
  }, [])

  if (!orderData) {
    return <div>Loading...</div> // Show loading while fetching data
  }
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  }

  const boxStyle = {
    border: '1px solid #ddd',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    width: '250px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  }

  const imageStyle = {
    maxWidth: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '12px',
  }

  const infoStyle = {
    width: '100%',
  }

  const nameStyle = {
    fontSize: '1.2em',
    marginBottom: '8px',
  }

  const priceStyle = {
    fontSize: '1.1em',
    color: '#333',
    marginBottom: '8px',
  }

  const countStyle = {
    fontSize: '1em',
    color: '#777',
    marginBottom: '12px',
  }

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  }
  console.log(orderData)
  return (
    <div
      className="productlist"
      style={{
        position: 'relative',
        left: '-700px',
      }}
    >
      <div className="background2">
        <div className="saleproduct">
          {orderData.map((order, orderIndex) => {
            const products = order.products

            return products.map((item, productIndex) => {
              const product = item.product
              return (
                <div
                  style={{
                    border: '1px solid #ddd',
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    width: '250px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                  key={`${orderIndex}-${productIndex}`}
                >
                  {/* Product Image */}
                  <div className="border">
                    <img
                      src={`https://qizildasturchi.uz/image/${product.image}`}
                      alt=""
                      style={{ width: '280px', height: '300px' }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.2em', marginBottom: '8px' }}>
                      {product.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '1.1em',
                        color: '#333',
                        marginBottom: '8px',
                      }}
                    >
                      Narxi: {product.price?.toLocaleString()} so'm
                    </p>
                    <p
                      style={{
                        fontSize: '1em',
                        color: '#777',
                        marginBottom: '12px',
                      }}
                    >
                      Qolgan: {product.count} ta
                    </p>

                    {/* Send Button */}
                    <button
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                      onClick={() => handleSend(order.id)} // Clicking will trigger the PUT request
                      disabled={loading}
                    >
                      {loading ? 'Yuklanmoqda...' : 'Jonatish'}
                    </button>
                  </div>
                </div>
              )
            })
          })}
        </div>
      </div>
    </div>
  )
}

export default Buyurtmalar
