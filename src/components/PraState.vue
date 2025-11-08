<template>
  <div class="pra-card">
    <h2>🔄 상태 패턴</h2>
    <form @submit.prevent="createUser">
      <input v-model.number="form.id" type="number" placeholder="ID" required />
      <input v-model="form.name" type="text" placeholder="이름" required />
      <input v-model="form.email" type="email" placeholder="이메일" required />
      <button type="submit">사용자 생성</button>
    </form>

    <div v-if="context" class="state-control">
      <p>현재 상태: <strong>{{ context.getStatus() }}</strong></p>
      <p>{{ context.getUser().name }} ({{ context.getUser().email }})</p>
      <div class="buttons">
        <button @click="activate">활성화</button>
        <button @click="deactivate">비활성화</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { UserContext } from '../patterns/state/UserContext';
import type { User } from '../models/User';

const form = reactive({ id: 1, name: '', email: '' });
const context = ref<UserContext | null>(null);

const createUser = () => {
  const user: User = {
    id: form.id++,
    name: form.name,
    email: form.email,
    status: 'active'
  };
  context.value = new UserContext(user);
  form.name = '';
  form.email = '';
};

const activate = () => {
  context.value?.activate();
};

const deactivate = () => {
  context.value?.deactivate();
};
</script>
