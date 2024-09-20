import api from './api';


const service = {
    async fetchProductss() {
        const response = await api.get('/products');
        return response.data.data;
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
    }
};

export default service;
