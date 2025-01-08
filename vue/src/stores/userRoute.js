import { getApi, postApi } from "@/services/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        isEditMode: false,
        user: [],
    }),
    actions: {
        async getUsers() {
            try {
                const detail = await getApi('/user')
                this.user = detail.data
            } catch (e) {
                console.log(e)
            }
        },
        async addUser(data) {
            try {
                let resp = await postApi('/user/add', data)
                if (resp.status) {
                    return resp
                }
                else {
                    return `${resp.message}`
                }
            } catch (e) {
                console.log(e)
            }
        },
        async deleteUser(id) {
            try {
                let getUser = await postApi(`/user/delete/${id}`)
                console.log(getUser)
                this.user = this.user.filter(user => user._id !== id);
                console.log('User deleted successfully');
            } catch (e) {
                console.error('Error deleting user:', error);
            }
        },
        async updateUser(updatedUser, id) {
            try {
                const resp = await postApi(`/user/update/${id}`, updatedUser);
                console.log('response', resp)
                const index = this.user.findIndex(user => user._id === id);
                if (index !== -1) {
                    this.user.splice(index, 1, resp.data);
                    console.log('User updated successfully');
                }
                return resp
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
        async getUserById(id) {
            try {
                const user = await getApi(`/user/${id}`)
                return user
            } catch (e) {
                console.log('User not Found!', e)
            }
        },
        recentUser(newUser) {
            this.user.push(newUser)
        },
        enableEdit() {
            this.isEditMode = true
        },
        disableEdit() {
            this.isEditMode = false
        },
    }
})