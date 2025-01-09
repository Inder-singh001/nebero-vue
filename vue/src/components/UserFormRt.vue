<script setup>
import { useUserStore } from '@/stores/user'
import '../assets/scss/components/userForm.scss'
import { inject, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength } from '@vuelidate/validators'

const toast = inject('toast')
const Id = defineProps({
  id: String,
})
let userId = Id.id
const router = useRouter()
let formData = ref({
  name: '',
  email: '',
  phone_no: '',
  address: '',
  age: '',
  gender: '',
  dob: '',
})
const userActions = useUserStore()

watch(
  () => userActions.isEditMode,
  async (newValue) => {
    if (newValue) {
      try {
        const userData = await userActions.getUserById(userId)
        formData.value = { ...userData.data }
      } catch (e) {
        console.log(`${userData.message}`)
      }
    } else {
      formData.value = {
        name: '',
        email: '',
        phone_no: '',
        address: '',
        age: '',
        gender: '',
        dob: '',
      }
    }
  },
  { immediate: true },
)
const birthDate = computed({
  get() {
    return formData.value.dob ? formData.value.dob.split('T')[0] : ''
  },
  set(value) {
    formData.value.dob = value
  },
})
const validationRules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    phone_no: { required, numeric, minLength: minLength(10) },
    address: { required },
    age: { required, numeric, minLength: minLength(2) },
    gender: { required },
    dob: { required },
  }
})

const v$ = useVuelidate(validationRules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    try {
      const UserData = {
        name: formData.value.name,
        email: formData.value.email,
        phone_no: formData.value.phone_no,
        address: formData.value.address,
        age: formData.value.age,
        gender: formData.value.gender,
        dob: formData.value.dob,
      }
      if (userActions.isEditMode) {
        const resp = await userActions.updateUser(UserData, userId)
        if (resp) {
          toast.value.showToast('User updated Successfully', 'success')
          userActions.disableEdit()
          router.push('/user')
        } else {
          toast.value.showToast('User Not Updated!', 'error')
        }
      } else {
        const resp = await userActions.addUser(UserData)
        if (resp.status) {
          userActions.recentUser({
            name: resp.data.name,
            email: resp.data.email,
            phone_no: resp.data.phone_no,
            address: resp.data.address,
            age: resp.data.age,
            gender: resp.data.gender,
            dob: resp.data.dob,
          })
          toast.value.showToast('User added Successfully', 'success')
          formData.value.name = ''
          formData.value.email = ''
          formData.value.phone = ''
          formData.value.address = ''
          formData.value.age = ''
          formData.value.gender = ''
          formData.value.dob = ''
          router.push('/user')
        } else {
          toast.value.showToast('User not added!', 'error')
        }
      }
    } catch (e) {
      toast.value.showToast('Form not submitted', 'error')
    }
  } else {
    toast.value.showToast('Form Fields are empty!', 'error')
  }
}
const resetForm = () => {
  if (userActions.isEditMode) {
    toast.value.showToast('User Not Updated!', 'info')
  } else {
    toast.value.showToast('User Not Added!', 'info')
  }
  formData.value = {
    name: '',
    email: '',
    phone_no: '',
    address: '',
    age: '',
    gender: '',
    dob: '',
  }
  userActions.disableEdit()
  router.push('/user')
}
</script>
<template>
  <RouterLink to="/user" class="btn">
    <button type="button" @click="resetForm">Back</button>
  </RouterLink>
  <div class="user-form">
    <h1>User Details</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" />
        <span v-for="error in v$.name.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" />
        <span v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          v-model="formData.phone_no"
          placeholder="Enter your phone number"
        />
        <span v-for="error in v$.phone_no.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>

      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="formData.age" placeholder="Enter your age" />
        <span v-for="error in v$.age.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="formData.gender">
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <span v-for="error in v$.gender.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" v-model="birthDate" />
        <span v-for="error in v$.dob.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <textarea
          id="address"
          v-model="formData.address"
          placeholder="Enter your address"
        ></textarea>
        <span v-for="error in v$.address.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <button type="submit">{{ userActions.isEditMode ? 'Update' : 'Submit' }}</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.btn button {
  position: absolute;
  top: 85px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}
</style>
