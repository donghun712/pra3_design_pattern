<template>
  <div class="pra-builder">
    <h2>🔨 빌더 패턴</h2>

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

    <!-- 생성 결과 -->
    <div class="section" v-if="user">
      <h3>생성된 사용자</h3>
      <div class="result-card">
        <div class="result-header">
          <span class="result-id">#{{ user.id }}</span>
          <span class="result-status" :class="user.status">🟢 {{ user.status }}</span>
        </div>
        <div class="result-body">
          <div class="result-row">
            <span class="result-label">이름:</span>
            <span class="result-value">{{ user.name }}</span>
          </div>
          <div class="result-row">
            <span class="result-label">이메일:</span>
            <span class="result-value">{{ user.email }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 생성 결과 없을 때 -->
    <div class="section" v-else>
      <h3>생성된 사용자</h3>
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <p>위의 폼에서 사용자를 생성해보세요</p>
      </div>
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

<style scoped>
.pra-builder {
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

/* 폼 */
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

/* 결과 카드 */
.result-card {
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2f5 100%);
  border: 2px solid #667eea;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s;
}

.result-card:hover {
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
}

.result-id {
  background: #667eea;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
}

.result-status {
  font-weight: 600;
  font-size: 13px;
}

.result-status.active {
  color: #2e7d32;
}

.result-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.result-label {
  font-weight: 600;
  color: #666;
  font-size: 13px;
  min-width: 70px;
}

.result-value {
  color: #333;
  font-size: 15px;
  word-break: break-word;
}

/* 빈 상태 */
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

/* 반응형 */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .pra-builder {
    padding: 20px;
  }
}
</style>
