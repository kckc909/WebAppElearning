import { CreateUserDto, UpdateUserDto } from "../types/cus_types";
import axiosInstance from "./api";

class AccountsService {
    // GET /api/accounts - Lấy danh sách accounts
    async getAll() {
        const response = await axiosInstance.get('/accounts');
        return response.data;
    }

    // GET /api/accounts/:id - Lấy user theo ID
    async getById(id: string) {
        const response = await axiosInstance.get(`/accounts/${id}`);
        return response.data;
    }

    // POST /api/accounts - Tạo user mới
    async create(data: CreateUserDto) {
        const response = await axiosInstance.post('/accounts', data);
        return response.data;
    }

    // PUT /api/accounts/:id - Cập nhật user
    async update(id: string, data: UpdateUserDto) {
        const response = await axiosInstance.put(`/accounts/${id}`, data);
        return response.data;
    }

    // DELETE /api/accounts/:id - Xóa user
    async delete(id: string) {
        const response = await axiosInstance.delete(`/accounts/${id}`);
        return response.data;
    }

    // login
    async login(username: string, password: string) {
        const data = { username, password }
        const res = await axiosInstance.post(`/accounts/login`, data)
        return res.data;
    }

    async register({ name, username, email, password }: any) {
        const res = await axiosInstance.post('/accounts/register',
            {
                full_name: name,
                username: username,
                email: email,
                password: password
            })
        return res.data
    }

    async sendEmailVertifyCode(email: string) {
        // tạm thời trả ra code 
        const res = await axiosInstance.post(`/email/vertify`, { email: email })
        console.log(res)
        return res.data
    }

    async isExists(email: string, username: string) {
        const res = await axiosInstance.post('/accounts/exists',
            {
                email: email,
                username: username
            })

        return res.data
    }
}
export const accService = new AccountsService();