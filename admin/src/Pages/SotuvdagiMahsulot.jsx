import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Css/Sotuvdagi_Mahsulot.css'
import log from '../assets/Chat_alt_add_fill.png'

function SotuvdagiMahsulot() {
  const [products, setProducts] = useState([]) // Store products
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState('') // Error state
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null) // Selected product for editing
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://qizildasturchi.uz/api/products'
        )
        console.log(response.data.data.records)
        setProducts(response.data.data.records) // Set the fetched products
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch products')
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

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

  const handleEdit = (product) => {
    setSelectedProduct(product) // Set the selected product for editing
    setIsModalOpen(true) // Open the modal
  }

  const closeModal = () => {
    setIsModalOpen(false) // Close the modal
    setSelectedProduct(null) // Clear the selected product
  }

  const handleSave = async () => {
    if (!selectedProduct) return

    const updatedProductData = {
      name: selectedProduct.name,
      price: parseInt(selectedProduct.price),
      count: parseInt(selectedProduct.count),
    }

    console.log(updatedProductData)

    try {
      const token = localStorage.getItem('userToken')
      await axios.put(
        `https://qizildasturchi.uz/api/admin/products/${selectedProduct.id}`,
        updatedProductData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Product updated successfully')
      setIsModalOpen(false)
      // Refetch the products to see the updated list
      const response = await axios.get('https://qizildasturchi.uz/api/products')
      setProducts(response.data.data.records)
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    }
  }

  const handleDelete = async (productId) => {
    try {
      console.log(productId)
      const token = localStorage.getItem('userToken')
      await axios.delete(
        `https://qizildasturchi.uz/api/admin/products/${productId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Product deleted successfully')

      const response = await axios.get('https://qizildasturchi.uz/api/products')
      setProducts(response.data.data.records)
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="productlist">
      <div className="background2">
        <h2>Sotuvdagi mahsulotlar</h2>
      </div>

      <div className="saleproduct">
        {products.map((product) => (
          <div className="info" key={product.id}>
            <div className="border">
              <img
                src={product.image}
                alt=""
                style={{ width: '280px', height: '300px' }}
              />
            </div>
            <div className="input">
              <div className="h200">
                <h2>{product.name}</h2>
              </div>

              <div className="h100">
                <h2>Narxi {product.price} so'm</h2>
              </div>
              <div className="h100">
                <h2>Hozir {product.count} ta bor</h2>
              </div>

              <div className="btn1">
                <button onClick={() => handleEdit(product)}>Tahrirlash</button>
                <button
                  className="buttonx"
                  onClick={() => handleDelete(product.id)}
                >
                  Olib tashlash
                </button>
              </div>
              <img className="imgone" src={log} alt="" />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h2>Mahsulotni tahrirlash</h2>
            <div style={styles.inputGroup}>
              <label>Name:</label>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.inputGroup}>
              <label>Price:</label>
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.inputGroup}>
              <label>Count:</label>
              <input
                type="number"
                value={selectedProduct.count}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    count: e.target.value,
                  })
                }
              />
            </div>
            <button style={styles.saveButton} onClick={handleSave}>
              Saqlash
            </button>
            <button style={styles.cancelButton} onClick={closeModal}>
              Bekor qilish
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
  close: {
    fontSize: '24px',
    cursor: 'pointer',
    float: 'right',
  },
  inputGroup: {
    margin: '10px 0',
  },
  saveButton: {
    backgroundColor: 'green',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}

export default SotuvdagiMahsulot
