import { useState, useEffect } from 'react'
import axios from 'axios'
import './Css/Category.css'

const Category = () => {
  const token = localStorage.getItem('userToken')

  const [categories, setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryInput, setNewCategoryInput] = useState('') // State for new category input

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
            Authorization: `Bearer ${token}`, // Add token in headers for deletion
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
      await axios.put(
        `https://qizildasturchi.uz/api/admin/category/${editingCategory.id}`,
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in headers for update
          },
        }
      )
      setCategories(
        categories.data?.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: newCategoryName }
            : category
        )
      )
      setEditingCategory(null) // Close edit modal
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const createCategory = async () => {
    try {
      const response = await axios.post(
        'https://qizildasturchi.uz/api/admin/category',
        { name: newCategoryInput },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in headers for creation
          },
        }
      )
      setNewCategoryInput('') // Clear the input field
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <div className="category">
      <h1>Categories</h1>

      {/* Table to display categories */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.data?.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => setEditingCategory(category)}>
                  Edit
                </button>
                <button onClick={() => deleteCategory(category.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create New Category Section */}
      <div className="create-category">
        <h2>Create New Category</h2>
        <input
          type="text"
          value={newCategoryInput}
          onChange={(e) => setNewCategoryInput(e.target.value)}
          placeholder="Enter new category name"
        />
        <button onClick={createCategory}>Create</button>
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
            </div>
            <div className="btn">
              <button onClick={updateCategory}>Save</button>
              <button onClick={() => setEditingCategory(null)}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Category
