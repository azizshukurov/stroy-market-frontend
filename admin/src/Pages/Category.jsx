import { useState, useEffect } from 'react'
import axios from 'axios'
import './Css/Category.css'
import { Button, Modal } from 'react-bootstrap'

const Category = () => {
  const token = localStorage.getItem('userToken')

  const [categories, setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryInput, setNewCategoryInput] = useState('')
  const [newCategoryImage, setNewCategoryImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)

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
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const updateCategory = async () => {
    try {
      const imageUrl = await uploadImage(imageFile)
      await axios.put(
        `https://qizildasturchi.uz/api/admin/category/${editingCategory.id}`,
        {
          name: newCategoryName,
          image: imageUrl.data,
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
      setEditingCategory(null)
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const uploadImage = async (file) => {
    if (!file) return null

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'https://qizildasturchi.uz/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
        { name: newCategoryInput, image: imageUrl?.data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCategories([...categories, response.data])
      setNewCategoryInput('')
      setImageFile(null)
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <div className="category">
      <h1>Mahsulot turlari</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Nomi</th>
            <th>Rasmi</th>
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
                  className="category-image"
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => setEditingCategory(category)}
                >
                  O'zgartirish
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(category.id)}
                >
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
          className="form-control"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="form-control mt-2"
        />
        <button className="btn btn-success mt-3" onClick={createCategory}>
          Yaratish
        </button>
      </div>

      {editingCategory && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'fixed', zIndex: 1050 }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Categoryni tahrirlash</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={editingCategory.name}
                className="form-control"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="form-control mt-2"
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setEditingCategory(null)}
              >
                Bekor qilish
              </Button>
              <Button variant="primary" onClick={updateCategory}>
                Saqlash
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  )
}

export default Category
