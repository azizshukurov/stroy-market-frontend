import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Css/Mahsulot.css'

const productTemplate = {
  image: 'https://example.com/image1.jpg', // Mahsulot rasm
}

function MahsulotQoshish() {
  const [displayedProducts, setDisplayedProducts] = useState([productTemplate]) // Initial product
  const [position, setPosition] = useState(0) // Rasm pozitsiyasi
  const [productData, setProductData] = useState({
    name: '',
    category_id: '',
    count: '',
    price: '',
    image: '', // Add image field to product data
  }) // Form state
  const [categories, setCategories] = useState([]) // Store categories from backend
  const [selectedCategory, setSelectedCategory] = useState('')
  const [imagePreview, setImagePreview] = useState(null) // To display image preview
  const [imageFile, setImageFile] = useState(null) // Store the image file

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://qizildasturchi.uz/api/categories') // Replace with your endpoint
        console.log('Fetched Categories:', response.data) // Check if categories are fetched
        setCategories(response.data.data) // Set categories from backend
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }
    fetchCategories()
  }, [])

  const handleClick = () => {
    // Add new product to the list and shift the image to the right
    setDisplayedProducts((prevProducts) => [...prevProducts, productTemplate])
    setPosition((prevPosition) => prevPosition + 200) // Move the image to the right by 200px
  }

  // Handle input changes for product details
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file) // Store the selected image file
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result) // Set the image preview
        setProductData((prevData) => ({
          ...prevData,
          image: reader.result, // Store the base64 image URL in the product data
        }))
      }
      reader.readAsDataURL(file) // Convert the image to base64 format
    }
  }

  // Send POST request to create a new product
  const handleCreateProduct = async (index) => {
    try {
      const token = localStorage.getItem('userToken')
      const imageFormData = new FormData()
      imageFormData.append('file', imageFile) // Append the image file

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
      const uploadedImageUrl = imageResponse.data.data // Get the uploaded image URL
      console.log(uploadedImageUrl)

      // Step 2: Create the order with the uploaded image URL
      // Get token from localStorage
      const orderData = {
        name: productData.name,
        category_id: selectedCategory,
        count: parseInt(productData.count, 10),
        price: parseInt(productData.price),
        image: uploadedImageUrl, // Use the uploaded image URL
      }

      const response = await axios.post(
        'https://qizildasturchi.uz/api/admin/products', // Your API endpoint for creating orders
        orderData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('Order created:', response.data)
      alert('Product created successfully!')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
    }
  }

  return (
    <div className="MahsulotQoshish">
      <div className="background1">
        <h2>Mahsulot qo'shish</h2>
      </div>

      {/* Add product image (clickable to add more products) */}
      <img
        src="https://static-00.iconduck.com/assets.00/add-ring-light-icon-2048x2046-uap7tigb.png"
        alt="Add Product"
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          transform: `translateX(${position}px)`, // Move image right on each click
          transition: 'transform 0.3s ease',
        }}
      />

      {/* List of added products with input fields */}
      <div className="messages">
        {displayedProducts.map((_, index) => (
          <div key={index} className="product">
            <img
              src={
                imagePreview ||
                'https://static-00.iconduck.com/assets.00/add-square-light-icon-2048x2048-2pm9jm5u.png'
              }
              alt="Product"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* Input fields for each product */}
            <input
              className="input1"
              type="text"
              placeholder="Mahsulot Nomi"
              name="name"
              value={productData.name}
              onChange={(e) => handleInputChange(e, index)}
            />
            <select
              className="input2"
              onChange={(e) => {
                setSelectedCategory(e.target.value)
              }}
              value={selectedCategory}
            >
              <option value="">Kategoryani tanlang</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              className="input2"
              type="text"
              placeholder="Miqdor"
              name="count"
              value={productData.count}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              className="input2"
              type="text"
              placeholder="Narxi"
              name="price"
              value={productData.price}
              onChange={(e) => handleInputChange(e, index)}
            />

            {/* Image upload */}

            <button
              className="button100"
              onClick={() => handleCreateProduct(index)}
            >
              Yaratish
            </button>
          </div>
        ))}
      </div>

      <div className="hr1"></div>
    </div>
  )
}

export default MahsulotQoshish
