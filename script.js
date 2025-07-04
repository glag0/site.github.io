
let menu = JSON.parse(localStorage.getItem('menu')) || ["my def", "def +42777", "def 2 tg://settings", 'print("Hello world")'];
let users = JSON.parse(localStorage.getItem('users')) || [];
let offline = JSON.parse(localStorage.getItem('offline')) || false;

function renderMenu() {
  const menuContainer = document.getElementById('menuContainer');
  menuContainer.innerHTML = '';
  menu.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerText = item;
    menuContainer.appendChild(div);
  });
}

function showLogin() { document.getElementById('loginModal').style.display = 'flex'; }
function hideLogin() { document.getElementById('loginModal').style.display = 'none'; }
function showRegister() { document.getElementById('registerModal').style.display = 'flex'; }
function hideRegister() { document.getElementById('registerModal').style.display = 'none'; }

function login() {
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPassword').value;
  if (email === 'qccuse@f5.si' && pass === '1q2w3easdzxc') {
    document.getElementById('adminPanel').style.display = 'block';
    hideLogin();
    renderUserList();
  } else {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      alert("Вход выполнен");
      hideLogin();
    } else {
      alert("Неверный логин или пароль");
    }
  }
}

function register() {
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPassword').value;
  if (users.find(u => u.email === email)) {
    alert("Пользователь уже существует");
    return;
  }
  users.push({ email, password: pass });
  localStorage.setItem('users', JSON.stringify(users));
  alert("Регистрация успешна!");
  hideRegister();
}

function renderUserList() {
  const list = document.getElementById('userList');
  list.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.innerText = u.email;
    list.appendChild(li);
  });
}

function addMenuItem() {
  const item = document.getElementById('newMenuItem').value;
  if (item) {
    menu.push(item);
    localStorage.setItem('menu', JSON.stringify(menu));
    renderMenu();
    document.getElementById('newMenuItem').value = '';
  }
}

function resetMenu() {
  menu = ["my def", "def +42777", "def 2 tg://settings", 'print("Hello world")'];
  localStorage.setItem('menu', JSON.stringify(menu));
  renderMenu();
}

function toggleSite() {
  offline = !offline;
  localStorage.setItem('offline', JSON.stringify(offline));
  document.getElementById('siteStatus').innerText = offline ? "Включить сайт" : "Выключить сайт";
  checkOffline();
}

function checkOffline() {
  const isAdmin = document.getElementById('adminPanel').style.display === 'block';
  if (offline && !isAdmin) {
    document.getElementById('menuContainer').style.display = 'none';
    document.getElementById('offlineWarning').style.display = 'block';
  } else {
    document.getElementById('menuContainer').style.display = 'block';
    document.getElementById('offlineWarning').style.display = 'none';
  }
}

window.onload = function () {
  renderMenu();
  checkOffline();
}
