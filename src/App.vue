<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/users">Users</router-link> |
    <router-link to="/todos">Todos</router-link> |
    <router-link to="/about">About</router-link>
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
</style>
