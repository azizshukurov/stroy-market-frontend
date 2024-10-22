import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Css/Mahsulot.css'

const productTemplate = {
  image: 'https://example.com/image1.jpg', // Mahsulot rasm
}

function MahsulotQoshish() {
  const [displayedProducts, setDisplayedProducts] = useState([productTemplate])
  const [productData, setProductData] = useState({
    name: '',
    category_id: '',
    count: '',
    price: '',
    image: '',
  })
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://qizildasturchi.uz/api/categories'
        )
        console.log('Fetched Categories:', response.data)
        setCategories(response.data.data)
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }
    fetchCategories()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setProductData((prevData) => ({
          ...prevData,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const imageFormData = new FormData()
      imageFormData.append('file', imageFile)

      const imageResponse = await axios.post(
        'https://qizildasturchi.uz/api/upload',
        imageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
        }
      )
      const uploadedImageUrl = imageResponse.data.data

      const productDataWithImage = {
        name: productData.name,
        category_id: selectedCategory,
        count: parseInt(productData.count, 10),
        price: parseInt(productData.price),
        image: uploadedImageUrl,
      }

      const response = await axios.post(
        'https://qizildasturchi.uz/api/admin/products',
        productDataWithImage,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('Product created:', response.data)
      alert('Product created successfully!')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
    }
  }

  return (
    <div className="container">
      <div className="text-center my-4">
        <h2>Mahsulot qo'shish</h2>
      </div>

      <div className="row">
        {displayedProducts.map((_, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card">
              <div className="bg">
                <img
                  src={
                    imagePreview ||
                    'https://static-00.iconduck.com/assets.00/add-square-light-icon-2048x2048-2pm9jm5u.png'
                  }
                  alt="Product"
                  className="image"
                  onClick={handleImageClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <div className="card-body">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Mahsulot Nomi"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                  >
                    <option value="">Kategoryani tanlang</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Miqdor"
                    name="count"
                    value={productData.count}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Narxi"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProduct}
                >
                  Yaratish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MahsulotQoshish
