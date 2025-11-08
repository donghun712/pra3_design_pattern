<template>
  <div class="pra-state">
    <h2>🔄 상태 패턴</h2>

    <!-- 사용자 생성 폼 -->
    <div class="section">
      <h3>새 사용자 생성</h3>
      <form @submit.prevent="createUser" class="form">
        <div class="form-row">
          <div class="form-group">
            <label>ID</label>
            <input v-model.number="form.id" type="number" placeholder="자동 증가" required />
          </div>
          <div class="form-group">
            <label>이름</label>
            <input v-model="form.name" type="text" placeholder="사용자 이름" required />
          </div>
          <div class="form-group">
            <label>이메일</label>
            <input v-model="form.email" type="email" placeholder="user@example.com" required />
          </div>
        </div>
        <button type="submit" class="btn-create">✨ 사용자 생성</button>
      </form>
    </div>

    <!-- 상태 제어 -->
    <div class="section" v-if="userState">
      <h3>사용자 상태 관리</h3>
      <div class="state-card">
        <div class="state-header">
          <div class="user-info">
            <span class="user-id">#{{ userState.id }}</span>
            <div>
              <p class="user-name">{{ userState.name }}</p>
              <p class="user-email">{{ userState.email }}</p>
            </div>
          </div>
          <span class="state-badge" :class="userState.status">
            {{ userState.status === 'active' ? '🟢 활성' : '🔴 비활성' }}
          </span>
        </div>

        <div class="state-buttons">
          <button @click="activate" class="btn-activate">
            🟢 활성화
          </button>
          <button @click="deactivate" class="btn-deactivate">
            🔴 비활성화
          </button>
        </div>
      </div>
    </div>

    <!-- 상태 없을 때 -->
    <div class="section" v-else>
      <h3>사용자 상태 관리</h3>
      <div class="empty-state">
        <div class="empty-icon">👤</div>
        <p>위의 폼에서 사용자를 생성해보세요</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { User } from '../models/User';
import { UserContext } from '../patterns/state/UserContext';

const form = reactive({ id: 1, name: '', email: '' });
const userState = ref<User | null>(null);
let context: UserContext | null = null;

const createUser = () => {
  const user: User = {
    id: form.id++,
    name: form.name,
    email: form.email,
    status: 'active'
  };
  context = new UserContext(user);
  userState.value = { ...user }; // ← 반응형 객체로 저장
  form.name = '';
  form.email = '';
};

const activate = () => {
  if (context && userState.value) {
    context.activate();
    // Vue 반응성 트리거
    userState.value = { ...context.getUser() };
  }
};

const deactivate = () => {
  if (context && userState.value) {
    context.deactivate();
    // Vue 반응성 트리거
    userState.value = { ...context.getUser() };
  }
};
</script>

<style scoped>
/* 스타일은 동일 - 위에서 제공한 스타일 유지 */
.pra-state {
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
  margin-bottom: 20px;
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

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 13px;
}

.form-group input {
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  background: #fafafa;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  background: #f8f9ff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-create {
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-create:active {
  transform: translateY(0);
}

.state-card {
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2f5 100%);
  border: 2px solid #667eea;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s;
}

.state-card:hover {
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.state-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.user-id {
  background: #667eea;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
}

.user-name {
  font-weight: 600;
  color: #333;
  font-size: 15px;
  margin: 0;
  margin-bottom: 3px;
}

.user-email {
  color: #666;
  font-size: 13px;
  margin: 0;
}

.state-badge {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.state-badge.active {
  background: #c8e6c9;
  color: #2e7d32;
}

.state-badge.inactive {
  background: #ffccbc;
  color: #d84315;
}

.state-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn-activate, .btn-deactivate {
  padding: 14px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-activate {
  background: #4caf50;
  color: white;
}

.btn-activate:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.btn-activate:active {
  transform: translateY(0);
}

.btn-deactivate {
  background: #f44336;
  color: white;
}

.btn-deactivate:hover {
  background: #da190b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
}

.btn-deactivate:active {
  transform: translateY(0);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #eee;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 14px;
  color: #bbb;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .state-buttons {
    grid-template-columns: 1fr;
  }
  
  .state-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .pra-state {
    padding: 20px;
  }
}
</style>
