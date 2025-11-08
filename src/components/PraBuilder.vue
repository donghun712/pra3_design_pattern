<template>
  <div class="pra-card">
    <h2>🔨 빌더 패턴</h2>
    <form @submit.prevent="createUser">
      <input v-model.number="form.id" type="number" placeholder="ID" required />
      <input v-model="form.name" type="text" placeholder="이름" required />
      <input v-model="form.email" type="email" placeholder="이메일" required />
      <button type="submit">생성</button>
    </form>
    <div v-if="user" class="result">
      생성됨: {{ user.name }} ({{ user.email }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { UserBuilder } from '../patterns/builder/UserBuilder';
import type { User } from '../models/User';

const form = reactive({ id: 1, name: '', email: '' });
const user = ref<User | null>(null);

const createUser = () => {
  user.value = new UserBuilder()
    .setId(form.id++)
    .setName(form.name)
    .setEmail(form.email)
    .setStatus('active')
    .build();
  
  form.name = '';
  form.email = '';
};
</script>
