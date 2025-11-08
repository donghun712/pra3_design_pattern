<template>
  <div class="pra-card">
    <h2>🌉 브릿지 패턴</h2>
    <div class="storage-toggle">
      <button @click="setStorage('memory')" :class="{ active: storageType === 'memory' }">
        메모리
      </button>
      <button @click="setStorage('local')" :class="{ active: storageType === 'local' }">
        로컬스토리지
      </button>
    </div>
    
    <form @submit.prevent="saveUser">
      <input v-model.number="form.id" type="number" placeholder="ID" required />
      <input v-model="form.name" type="text" placeholder="이름" required />
      <input v-model="form.email" type="email" placeholder="이메일" required />
      <button type="submit">저장</button>
    </form>

    <div class="users-list">
      <div v-for="u in users" :key="u.id" class="user-item">
        {{ u.name }} - {{ u.email }}
      </div>
    </div>
    <button @click="loadUsers" class="btn-load">불러오기</button>
    <button @click="clearUsers" class="btn-clear">초기화</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Storage } from '../patterns/bridge/Storage';
import { MemoryStorage } from '../patterns/bridge/MemoryStorage';
import { LocalStorage } from '../patterns/bridge/LocalStorage';
import type { User } from '../models/User';

const form = reactive({ id: 1, name: '', email: '' });
const users = ref<User[]>([]);
const storageType = ref<'memory' | 'local'>('memory');
let storage: Storage = new MemoryStorage();

const setStorage = (type: 'memory' | 'local') => {
  storageType.value = type;
  storage = type === 'memory' ? new MemoryStorage() : new LocalStorage();
  loadUsers();
};

const saveUser = () => {
  const user: User = {
    id: form.id++,
    name: form.name,
    email: form.email,
    status: 'active'
  };
  storage.save(user);
  form.name = '';
  form.email = '';
  loadUsers();
};

const loadUsers = () => {
  users.value = storage.getAll();
};

const clearUsers = () => {
  storage.clear();
  loadUsers();
};
</script>
