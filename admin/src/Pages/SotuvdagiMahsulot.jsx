import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap'

function SotuvdagiMahsulot() {
  const [products, setProducts] = useState([]) // Store products
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState('') // Error state
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null) // Selected product for editing
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://qizildasturchi.uz/api/products'
        )
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
          setOrderData(result.data.records)
        }
      } catch (error) {
        console.error('Error fetching order data:', error)
      }
    }

    fetchOrderData()
  }, [])

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleSave = async () => {
    if (!selectedProduct) return

    const updatedProductData = {
      name: selectedProduct.name,
      price: parseInt(selectedProduct.price),
      count: parseInt(selectedProduct.count),
    }

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
      const response = await axios.get('https://qizildasturchi.uz/api/products')
      setProducts(response.data.data.records)
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    }
  }

  const handleDelete = async (productId) => {
    try {
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
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div className="container mt-4">
      <h2>Sotuvdagi mahsulotlar</h2>
      <Row className="mt-4">
        {products.map((product) => (
          <Col md={4} sm={6} key={product.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '300px' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Narxi:</strong> {product.price} so'm
                  <br />
                  <strong>Hozir:</strong> {product.count} ta bor
                </Card.Text>
                <Button variant="primary" onClick={() => handleEdit(product)}>
                  Tahrirlash
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Olib tashlash
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {isModalOpen && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'fixed', zIndex: 1050 }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Mahsulotni tahrirlash</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedProduct && (
                <>
                  <div className="mb-3">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedProduct.price}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Count:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedProduct.count}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          count: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Bekor qilish
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Saqlash
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  )
}

export default SotuvdagiMahsulot
