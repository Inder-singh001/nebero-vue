import { deleteApi, getApi, postApi, putApi, setToken } from "@/services/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        isEditMode: false,
        isShow: false,
        isAuthenticated: true,
        user: [],
    }),
    actions: {
        Authenticate() {
            this.isAuthenticated = !this.isAuthenticated
        },
        // async checkLogin() {
        //     try {
        //         const loginUser = await getApi('/')
        //         console.log(loginUser)
        //         if (loginUser.status) {
        //             return loginUser;
        //         }
        //         else {
        //             return loginUser
        //         }
        //     }
        //     catch (e) {
        //         console.log(e)
        //     }
        // },
        async loginUser(data) {
            try {
                console.log(data)
                const user = await postApi('/user/login', data)
                console.log(user)
                if (user.status) {
                    setToken('authtoken', user.data.token)
                    return user
                }
                else {
                    console.log(user)
                    return `${user.message}`
                }
            }
            catch (e) {
                console.log(e)
            }
        },
        async loginOutUser(data) {
            console.log(data)
            try {
                const user = await postApi('/user/logout')
                if (user.status) {
                    return user
                }
                else {
                    console.log(`${user.message}`)
                    return `${user.message}`
                }
            }
            catch (e) {
                console.log(e)
            }
        },
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
                let getUser = await deleteApi(`/user/delete/${id}`)
                if (getUser.status) {
                    // this.user = this.user.filter(user => user._id !== id);
                    console.log(getUser)
                    return getUser
                }
            } catch (e) {
                console.error('Error deleting user:', error);
            }
        },
        async updateUser(updatedUser, id) {
            try {
                const resp = await putApi('/user/update', updatedUser);
                console.log(resp)
                if (resp.status) {
                    console.log(resp)
                    return resp
                }
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
            this.isShow = true
        },
        disableEdit() {
            this.isEditMode = false
            this.isShow = false
        },
        showForm() {
            this.isShow = !this.isShow
        },
    }
})