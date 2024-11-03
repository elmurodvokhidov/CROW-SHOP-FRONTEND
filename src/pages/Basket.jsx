import React, { useEffect, useState } from 'react';
import { useAuthToken } from '../hooks/useAuthToken';
import { Service } from '../config/service';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = useAuthToken();
  const { getAllBasket } = Service(getToken);

  useEffect(() => {
    // Savatdagi mahsulotlarni olish
    const fetchBasket = async () => {
      setLoading(true);
      try {
        const response = await getAllBasket(); // URLni tekshiring
        // console.log(response.data); // Backenddan kelayotgan ma'lumotni tekshirish
        setBasketItems(response.products || []); // Mahsulotlarni olamiz
      } catch (err) {
        setError('Basketni olishda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchBasket();
  }, []);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Savatdagi Mahsulotlar</h2>

      {basketItems.length === 0 ? (
        <p>Savatda mahsulotlar yo'q.</p>
      ) : (
        basketItems.map((item) => (
          <div key={item.productId._id} className="border p-4 mb-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{item.productId.name}</h3>
            <p>Narxi: {item.productId.price} so'm</p>
            <p>Soni: {item.count}</p> {/* `count` maydoni `quantity` o'rniga ishlatilmoqda */}
            <img
              src={item.productId.image}
              alt={item.productId.name}
              className="w-16 h-16 object-cover"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Basket;
