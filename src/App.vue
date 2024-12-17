<template>
  <nav>
    <router-link aria-label="home"  to="/"  >Home</router-link> |
    <router-link aria-label="userList" to="/users" >User</router-link> |
    <router-link aria-label="todoList" to="/todos" >Todo list</router-link>|
    <router-link aria-label="mail" to="/mail" >Mail inbox</router-link>|
    <router-link aria-label="about" to="/about" >About</router-link>
  </nav>
  <router-view/>
</template>

<style>

*,
*::before,
*::after {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}
html {
  font-size: 100%;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  overflow-wrap: break-word;
}

body {
  font-family: 'PT Mono', monospace;
  font-size: 100%;
  background-color: #fefef9;
}

ul {
  padding: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Global Styles */

button {
  font-size: 16px;
  padding: 8px;
  border-radius: 3px;
  margin: 5px 10px 5px 0px;
  cursor: pointer;
}

button:disabled {
  cursor: auto;
}

button.selected {
  cursor: auto;
  color: #42b983;
  border-color: #42b983;
  border-width: 2px;
}

.clickable {
  cursor: pointer;
}

input[type='checkbox'] {
  -webkit-appearance:none;
  cursor: pointer;
  width:24px;
  height:24px;
  background:white;
  border-radius: 2px;
  border: 1px solid #555;
  position: relative;
  vertical-align: middle;
  padding: 10px;
}

input[type='checkbox'].partial-check {
  background: #ABC;
}

input[type='checkbox']:checked {
  background: #679;
}

.mb-0 {
  margin-bottom: 0;
}

/* Modal */

.modal, .overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}

/* Email Modal */

.email-display {
  text-align: left;
}

</style>
