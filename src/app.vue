<template>
  <div id="app">
    <h1>디자인 패턴 실습</h1>
    <div class="grid">
      <PraBuilder />
      <PraBridge />
      <PraState />
    </div>
  </div>
</template>

<script setup lang="ts">
import PraBuilder from './components/PraBuilder.vue';
import PraBridge from './components/PraBridge.vue';
import PraState from './components/PraState.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

#app h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 32px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.pra-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.pra-card h2 {
  color: #667eea;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  background-color: #35a372;
}

.result, .state-control {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 6px;
  border-left: 4px solid #42b983;
}

.storage-toggle {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.storage-toggle button {
  flex: 1;
  background-color: #6c757d;
}

.storage-toggle button.active {
  background-color: #667eea;
}

.users-list {
  max-height: 150px;
  overflow-y: auto;
  margin: 10px 0;
}

.user-item {
  padding: 8px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 13px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-load, .btn-clear {
  margin-top: 5px;
  background-color: #6c757d;
}
</style>
