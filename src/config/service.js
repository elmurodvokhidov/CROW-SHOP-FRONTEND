import api from './api';


const service = {
   
    // async createUser(user) {
    //     const res = await api.post('/clerk-webhook', {
    //         id: user.id,
    //         event: 'user.created',
    //         username: user.username,
    //         emailaddres: user.emailaddress[0].emailaddres,
    //         password: user.password
    //     });
    //     return res;
    // },

    async fetchProducts() {
        const response = await api.get('/');
        return response.data.data;
    },

    async fetchProductById(id) {
        const response = await api.get(`/${id}`);
        return response.data.data;
    },

    async createProduct(productData) {
        const response = await api.post('/', productData);
        return response.data.data;
    },

    async updateProduct(id, updatedData) {
        const response = await api.put(`/${id}`, updatedData);
        return response.data.data;
    },

    async deleteProduct(id) {
        const response = await api.delete(`/${id}`);
        return response.data.data;
    }
};

export default service;
