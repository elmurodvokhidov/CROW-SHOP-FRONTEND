import api from './api';
// import { useSession } from '@clerk/clerk-react';

// const { session } = useSession();

// const getToken = async () => {
//     if (session) {
//         const token = await session.getToken();
//         console.log("Token: ", token);
//         return token;
//     }
// };

// api.interceptors.request.use(async (req) => {
//     const token = await getToken(); 
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });

const service = {
    async fetchProductss() {
        const response = await api.get('/products');
        return response.data;
    },

    async fetchCategories() {
        const response = await api.get('/categories');
        return response.data;
    },

    async fetchProductById(id) {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    },

    async createProduct(productData) {
        const response = await api.post('/products/', productData);
        return response.data.data;
    },

    async updateProduct(id, updatedData) {
        const response = await api.put(`/products/${id}`, updatedData);
        return response.data.data;
    },

    async deleteProduct(id) {
        const response = await api.delete(`/products/${id}`);
        return response.data.data;
    },
    async addBasket(productId, count) {
        const response = await api.post(("/basket/add", {
            productId,
            count,
        }));
        return response.data.data;
    },

    async getAllBasket() {
        const response = await api.get('/basket');
        return response.data;
    },
};

export default service;
