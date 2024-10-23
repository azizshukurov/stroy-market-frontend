import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Css/Buyurtmalar.css";
import { useNavigate } from "react-router-dom";

const Buyurtmalar = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetching orders with authorization token
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("userToken");

        // If token is not found, redirect to '/hisobim'
        if (!token) {
          setError("Authorization token not found.");
          navigate("/hisobim");
          setLoading(false);
          return;
        }

        // Set up headers with authorization token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Make the GET request with axios
        const response = await axios.get(
          "https://qizildasturchi.uz/api/orders",
          { headers }
        );

        if (response.status === 401) {
          // JWT expired or invalid token
          alert("Your session has expired. Please log in again.");
          navigate("/hisobim");
          return;
        }

        // Set orders data
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        navigate("/hisobim");
        console.error("Error fetching orders:", error);
        setError("Failed to load orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Yangi";
      case 2:
        return "Qabul qilingan";
      case 3:
        return "Yetqazib berilgan";
      case 4:
        return "To'lov qilingan";
      case 0:
        return "Bekor qilingan";
      default:
        return "Noma'lum";
    }
  };
  console.log(orders);
  return (
    <div className="buyurtmalar-page p-4">
      <div className="order-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.data.length === 0 ? (
          <h1 className="text-center text-lg text-gray-700">
            Sizda hozircha buyurtmalar mavjud emas
          </h1>
        ) : (
          orders.data.map((order) => (
            <div
              key={order.id}
              className="order-card bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-shadow duration-300 hover:shadow-xl flex flex-col">
              <div className="order-details flex-grow">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    Buyurtma holati: {getStatusText(order.status)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.payment_status === 1
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                    {order.payment_status === 1 ? "To'lanmagan" : "To'langan"}
                  </span>
                </div>
                <div className="text-gray-500 text-sm">
                  Buyurtma qilingan vaqt:{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
                <div className="font-bold text-lg text-green-600">
                  Umumiy summa: {order.total_sum.toLocaleString()} so'm
                </div>

                <div className="order-products mt-4">
                  <h3 className="text-md font-semibold text-gray-600 mb-2">
                    Mahsulotlar:
                  </h3>
                  {order.products.map((item) => (
                    <div
                      key={item.id}
                      className="product-item bg-gray-50 p-4 rounded-lg border flex items-center mb-4">
                      <img
                        src={
                          `https://qizildasturchi.uz/image${item.product.image}` ||
                          "placeholder.jpg"
                        }
                        alt={item.product.name}
                        className="w-32 h-32 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-700 text-lg">
                          {item.product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Miqdor: {item.count} ta
                        </div>
                        <div className="text-sm text-gray-600">
                          Jami summa:{" "}
                          {(item.product.price * item.count).toLocaleString()}{" "}
                          so'm
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Buyurtmalar;
