<template>
  <div class="pra-bridge">
    <h2>🌉 브릿지 패턴</h2>

    <!-- 스토리지 선택 -->
    <div class="section">
      <h3>스토리지 선택</h3>
      <div class="storage-buttons">
        <button @click="setStorage('memory')" :class="{ active: storageType === 'memory' }">
          💾 메모리
        </button>
        <button @click="setStorage('local')" :class="{ active: storageType === 'local' }">
          💿 로컬스토리지
        </button>
      </div>
    </div>

    <!-- 사용자 추가 폼 -->
    <div class="section">
      <h3>새 사용자 추가</h3>
      <form @submit.prevent="saveUser" class="form">
        <div class="form-row">
          <input v-model.number="form.id" type="number" placeholder="ID" required />
          <input v-model="form.name" type="text" placeholder="이름" required />
          <input v-model="form.email" type="email" placeholder="이메일" required />
          <button type="submit">저장</button>
        </div>
      </form>
    </div>

    <!-- 저장된 사용자 -->
    <div class="section">
      <h3>저장된 사용자 ({{ users.length }}명)</h3>
      <div class="users-list">
        <div v-if="users.length === 0" class="empty">
          저장된 사용자가 없습니다
        </div>
        <div v-for="u in users" :key="u.id" class="user-item">
          <div class="user-info">
            <span class="user-id">#{{ u.id }}</span>
            <div>
              <div class="user-name">{{ u.name }}</div>
              <div class="user-email">{{ u.email }}</div>
            </div>
          </div>
          <span class="user-status" :class="u.status">{{ u.status }}</span>
        </div>
      </div>
    </div>

    <!-- 액션 버튼 -->
    <div class="section">
      <div class="action-buttons">
        <button @click="loadUsers" class="btn-load">🔄 불러오기</button>
        <button @click="clearUsers" class="btn-clear">🗑️ 초기화</button>
      </div>
    </div>
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

<style scoped>
.pra-bridge {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  color: #667eea;
  font-size: 28px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

h3 {
  color: #333;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: 600;
}

.section {
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

/* 스토리지 선택 */
.storage-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.storage-buttons button {
  padding: 14px;
  background: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.storage-buttons button:hover {
  background: #efefef;
  border-color: #667eea;
}

.storage-buttons button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 폼 */
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1.5fr auto;
  gap: 10px;
}

.form input, .form button {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form input {
  background: #fafafa;
  transition: all 0.2s;
}

.form input:focus {
  outline: none;
  border-color: #667eea;
  background: #f8f9ff;
}

.form button {
  background: #42b983;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.form button:hover {
  background: #35a372;
  transform: translateY(-1px);
}

/* 사용자 리스트 */
.users-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 8px;
}

.empty {
  text-align: center;
  padding: 30px 20px;
  color: #999;
  font-size: 14px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.2s;
}

.user-item:hover {
  background: #f0f2f5;
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.user-id {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.user-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 2px;
}

.user-email {
  color: #666;
  font-size: 12px;
}

.user-status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.user-status.active {
  background: #c8e6c9;
  color: #2e7d32;
}

.user-status.inactive {
  background: #ffccbc;
  color: #d84315;
}

/* 액션 버튼 */
.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn-load, .btn-clear {
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-load {
  background: #2196f3;
  color: white;
}

.btn-load:hover {
  background: #1976d2;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.btn-clear {
  background: #f44336;
  color: white;
}

.btn-clear:hover {
  background: #d32f2f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

/* 스크롤바 */
.users-list::-webkit-scrollbar {
  width: 6px;
}

.users-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.users-list::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 3px;
}

.users-list::-webkit-scrollbar-thumb:hover {
  background: #888;
}
</style>
