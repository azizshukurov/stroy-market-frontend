import { useState, useEffect } from 'react'
import axios from 'axios'
import './Css/Category.css'

const Category = () => {
  const token = localStorage.getItem('userToken')

  const [categories, setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryInput, setNewCategoryInput] = useState('') // State for new category input
  const [newCategoryImage, setNewCategoryImage] = useState(null) // State for new category image
  const [imageFile, setImageFile] = useState(null) // Store the image file for upload

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://qizildasturchi.uz/api/categories',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `https://qizildasturchi.uz/api/admin/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCategories(categories.filter((category) => category.id !== categoryId))
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const updateCategory = async () => {
    try {
      const imageUrl = await uploadImage(imageFile) // Upload the new image file
      await axios.put(
        `https://qizildasturchi.uz/api/admin/category/${editingCategory.id}`,
        {
          name: newCategoryName,
          image: imageUrl, // Include the uploaded image URL
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCategories(
        categories.data?.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: newCategoryName, image: imageUrl }
            : category
        )
      )
      setEditingCategory(null) // Close edit modal
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const uploadImage = async (file) => {
    if (!file) return null // If no image is selected, return null

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'https://qizildasturchi.uz/api/upload', // Replace with your image upload endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setImageFile(response.data)
      return response.data
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  const createCategory = async () => {
    try {
      const imageUrl = await uploadImage(imageFile)
      console.log(imageUrl)
      const response = await axios.post(
        'https://qizildasturchi.uz/api/admin/category',
        { name: newCategoryInput, image: imageUrl.data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response.data)

      setNewCategoryInput('')
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <div className="category">
      <h1>Mahsulot turlari</h1>

      <table>
        <thead>
          <tr>
            <th>Nomi</th>
            <th>Rasmi</th> {/* Add a column to display image */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.data?.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <img
                  src={`https://qizildasturchi.uz/image/${category.image}`}
                  alt={category.name}
                  width="50"
                  height="50"
                />
              </td>{' '}
              {/* Display category image */}
              <td>
                <button onClick={() => setEditingCategory(category)}>
                  O'zgartirish
                </button>
                <button onClick={() => deleteCategory(category.id)}>
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="create-category">
        <h2>Yangi Mahsulot turini yaratish</h2>
        <input
          type="text"
          value={newCategoryInput}
          onChange={(e) => setNewCategoryInput(e.target.value)}
          placeholder="Mahsulot turini nomini yozing"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])} // Save the selected image file
        />
        <button onClick={createCategory}>Yaratish</button>
      </div>

      {editingCategory && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <div className="header">
              <h2>Edit Category</h2>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={editingCategory.name}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])} // Save the selected image file
              />
            </div>
            <div className="btn">
              <button onClick={updateCategory}>Qo'shish</button>
              <button onClick={() => setEditingCategory(null)}>Chiqish</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Category
