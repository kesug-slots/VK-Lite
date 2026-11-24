import './style.css';
import * as VKID from '@vkid/sdk';

const ICONS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  community: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', heart: '<path d="M20.8 8.7c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3z"/>',
  comment: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
  share: '<path d="M12 16V3m0 0L7 8m5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>', more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  sliders: '<path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4"/>', 'chevron-down': '<path d="m6 9 6 6 6-6"/>', 'arrow-left': '<path d="m15 18-6-6 6-6M9 12h12"/>', send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>', edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>', lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>', zap: '<path d="m13 2-3 9h7L11 22l2-9H6z"/>', external: '<path d="M14 3h7v7m0-7L10 14"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', palette: '<path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.9 1.9 0 0 1 1.3-3.3H18a3 3 0 0 0 3-3 9 9 0 0 0-9-8.3Z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="11" cy="7" r=".8"/><circle cx="16" cy="8.5" r=".8"/>', shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>', 'check-circle': '<path d="M21 11.1V12a9 9 0 1 1-5.3-8.2"/><path d="m8 11 4 4L22 5"/>', close: '<path d="m18 6-12 12M6 6l12 12"/>', copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>', moon: '<path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.5 8.5 0 1 0 20.8 13Z"/>',
};

const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.info}</svg>`;
document.querySelectorAll('[data-icon]').forEach((node) => { node.innerHTML = icon(node.dataset.icon); });

const $ = (id) => document.getElementById(id);
const pageNames = { home: 'Новости', messages: 'Сообщения', friends: 'Друзья', communities: 'Сообщества', photos: 'Фотографии', videos: 'Видео', profile: 'Моя страница', settings: 'Настройки' };
let currentPage = 'home';
let accessTokenInMemory = null;
let connectedProfile = null;
let toastTimer = null;

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2400);
}

function navigate(page) {
  if (!pageNames[page]) return;
  currentPage = page;
  document.querySelectorAll('.page').forEach((node) => node.classList.toggle('active', node.id === `page-${page}`));
  document.querySelectorAll('[data-page]').forEach((node) => node.classList.toggle('active', node.dataset.page === page));
  $('crumbName').textContent = pageNames[page];
  $('globalSearch').value = '';
  document.body.classList.toggle('chat-open', page === 'messages' && window.matchMedia('(max-width: 760px)').matches);
  if (page === 'settings') $('redirectUrlText').textContent = redirectUrl();
}

document.querySelectorAll('[data-page]').forEach((node) => node.addEventListener('click', () => navigate(node.dataset.page)));

document.querySelectorAll('[data-toast]').forEach((node) => node.addEventListener('click', () => showToast(node.dataset.toast)));

document.querySelectorAll('[data-connect]').forEach((node) => node.addEventListener('click', openConnect));

function filterFeed(value) {
  const query = value.trim().toLocaleLowerCase('ru-RU');
  document.querySelectorAll('#feedList .post').forEach((post) => {
    post.hidden = Boolean(query) && !`${post.dataset.search || ''} ${post.textContent}`.toLocaleLowerCase('ru-RU').includes(query);
  });
}
$('globalSearch').addEventListener('input', (event) => {
  const query = event.target.value;
  if (query && currentPage !== 'home') navigate('home');
  filterFeed(query);
});
$('newPostFocus').addEventListener('click', () => { $('postText').focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
$('feedFilter').addEventListener('click', () => showToast('Пока показываются демонстрационные записи'));
$('notificationsButton').addEventListener('click', () => showToast('Уведомления появятся после проверки VK API'));

function initials(name = 'Гость') { return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || '').join('').toUpperCase() || 'Г'; }
function setAvatar(element, profile) {
  if (!element) return;
  element.textContent = initials(profile?.name || 'Гость');
  element.style.backgroundImage = '';
  let safeAvatar = '';
  try {
    const candidate = new URL(profile?.avatar || '', window.location.href);
    if (candidate.protocol === 'https:') safeAvatar = candidate.href;
  } catch { /* Ignore malformed external avatar URLs. */ }
  if (safeAvatar) {
    element.style.backgroundImage = `url("${safeAvatar}")`;
    element.classList.add('has-photo');
  } else element.classList.remove('has-photo');
}
function updateProfileUI(profile) {
  connectedProfile = profile || null;
  const name = profile?.name || 'Гость';
  ['sideAvatar', 'topAvatar', 'composerAvatar', 'profileAvatar'].forEach((id) => setAvatar($(id), profile));
  $('sideName').textContent = name;
  $('sideCaption').textContent = profile ? 'VK ID активен в этой вкладке' : 'Демо-режим';
  $('profileName').textContent = profile?.name || 'Гость VK Lite';
  $('profileStatus').textContent = profile ? 'Вход подтверждён через VK ID' : 'Аккаунт не подключён';
  $('profileId').textContent = profile?.id ? `ID ${profile.id}` : 'Демонстрационный режим';
  $('accountTag').textContent = profile ? 'VK ID' : 'Гость';
  $('connectWidgetText').textContent = profile ? `Подключён профиль ${name}.` : 'Подключи профиль VK ID, чтобы начать настройку аккаунта.';
  $('profileConnectButton').textContent = profile ? 'VK ID подключён' : 'Подключить VK ID';
  $('logoutButton').textContent = 'Отключить профиль';
  $('logoutButton').hidden = !profile;
}

function openConnect() {
  $('connectModal').hidden = false;
  document.body.classList.add('modal-open');
  const appId = getAppId();
  $('connectStatus').innerHTML = appId
    ? '<span class="status-dot ready"></span><span>APP ID сохранён. Можно перейти к VK ID.</span>'
    : '<span class="status-dot"></span><span>Сначала настрой APP ID в разделе «Настройки».</span>';
}
function closeConnect() {
  $('connectModal').hidden = true;
  document.body.classList.remove('modal-open');
}
$('closeConnect').addEventListener('click', closeConnect);
$('connectModal').addEventListener('click', (event) => { if (event.target === $('connectModal')) closeConnect(); });
$('openSettingsFromModal').addEventListener('click', () => { closeConnect(); navigate('settings'); $('appIdInput').focus(); });

function redirectUrl() {
  // Exact current URL without query/hash must also be registered in VK ID settings.
  return `${window.location.origin}${window.location.pathname}`;
}
function getAppId() {
  return localStorage.getItem('vklite-vkid-app-id') || import.meta.env.VITE_VK_APP_ID || '';
}
function saveAppId() {
  const value = $('appIdInput').value.trim();
  if (!/^\d{3,20}$/.test(value)) {
    showToast('Укажи числовой APP ID из кабинета VK ID');
    return false;
  }
  localStorage.setItem('vklite-vkid-app-id', value);
  showToast('APP ID сохранён на этом устройстве');
  return true;
}
$('saveAppId').addEventListener('click', saveAppId);
$('copyRedirect').addEventListener('click', async () => {
  const text = redirectUrl();
  try { await navigator.clipboard.writeText(text); showToast('Redirect URL скопирован'); }
  catch { $('redirectUrlText').textContent = text; showToast('Выдели адрес и скопируй его вручную'); }
});
$('appIdInput').value = getAppId();
$('redirectUrlText').textContent = redirectUrl();

function randomBase64Url(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function initVkIdSdk(appId, state, codeVerifier) {
  VKID.Config.init({
    app: Number(appId),
    redirectUrl: redirectUrl(),
    state,
    codeVerifier,
    mode: VKID.ConfigAuthMode.Redirect,
  });
}

async function startVkLogin() {
  const appId = getAppId();
  if (!appId) {
    closeConnect(); navigate('settings'); $('appIdInput').focus();
    showToast('Сначала добавь APP ID из кабинета VK ID');
    return;
  }
  const state = randomBase64Url(24);
  const codeVerifier = randomBase64Url(48);
  sessionStorage.setItem('vklite-auth-state', state);
  sessionStorage.setItem('vklite-auth-verifier', codeVerifier);
  try {
    if (!VKID?.Auth) throw new Error('VK ID SDK is available in the Node/Vite build only.');
    initVkIdSdk(appId, state, codeVerifier);
    await VKID.Auth.login({ lang: VKID.Languages.RUS });
  } catch (error) {
    console.error('VK ID login error:', error);
    showToast('Не удалось открыть VK ID. Проверь APP ID и Redirect URL.');
  }
}
$('startVkLogin').addEventListener('click', startVkLogin);
document.querySelectorAll('.profile-card [data-connect]').forEach((node) => node.addEventListener('click', openConnect));

async function handleVkCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const deviceId = params.get('device_id');
  const oauthError = params.get('error');
  if (oauthError) {
    history.replaceState({}, '', redirectUrl());
    showToast('VK ID не завершил авторизацию');
    return;
  }
  if (!code || !deviceId) return;
  const appId = getAppId();
  const state = sessionStorage.getItem('vklite-auth-state');
  const verifier = sessionStorage.getItem('vklite-auth-verifier');
  if (!appId || !state || !verifier) {
    history.replaceState({}, '', redirectUrl());
    showToast('Сессия входа истекла. Запусти авторизацию ещё раз.');
    return;
  }
  try {
    initVkIdSdk(appId, state, verifier);
    showToast('Проверяем ответ VK ID…');
    const tokens = await VKID.Auth.exchangeCode(code, deviceId, verifier);
    // Access and refresh tokens stay only in memory and are never written to localStorage.
    accessTokenInMemory = tokens.access_token;
    let user = { user_id: tokens.user_id };
    try {
      const result = await VKID.Auth.userInfo(accessTokenInMemory);
      user = { ...user, ...(result?.user || {}) };
    } catch (userError) {
      console.warn('VK ID user info unavailable:', userError);
    }
    const profile = {
      id: user.user_id || tokens.user_id,
      name: [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Пользователь VK',
      avatar: user.avatar || '',
    };
    // Store only basic profile display data, never OAuth tokens.
    updateProfileUI(profile);
    sessionStorage.removeItem('vklite-auth-state');
    sessionStorage.removeItem('vklite-auth-verifier');
    history.replaceState({}, '', redirectUrl());
    closeConnect();
    showToast('VK ID подключён. Получены базовые данные профиля.');
  } catch (error) {
    console.error('VK ID callback error:', error);
    sessionStorage.removeItem('vklite-auth-state');
    sessionStorage.removeItem('vklite-auth-verifier');
    history.replaceState({}, '', redirectUrl());
    showToast('Авторизация не завершилась. Проверь настройки приложения VK ID.');
  }
}

$('logoutButton').addEventListener('click', async () => {
  try {
    if (accessTokenInMemory) await VKID.Auth.logout(accessTokenInMemory);
  } catch (error) { console.warn('VK ID logout:', error); }
  accessTokenInMemory = null;
  updateProfileUI(null);
  showToast('Профиль отключён от VK Lite');
});

$('postForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const field = $('postText');
  const text = field.value.trim();
  if (!text) return showToast('Напиши что-нибудь перед публикацией');
  const article = document.createElement('article');
  article.className = 'post card';
  article.dataset.search = text.toLocaleLowerCase('ru-RU');
  const head = document.createElement('div');
  head.className = 'post-head';
  const avatar = document.createElement('span'); avatar.className = 'avatar'; avatar.textContent = initials(connectedProfile?.name || 'Гость');
  const byline = document.createElement('div'); byline.className = 'post-author';
  const author = document.createElement('strong'); author.textContent = connectedProfile?.name || 'Гость VK Lite';
  const date = document.createElement('small'); date.textContent = 'Только что · локальная запись';
  byline.append(author, date);
  const more = document.createElement('button'); more.className = 'more-btn'; more.type = 'button'; more.setAttribute('aria-label', 'Ещё'); more.innerHTML = icon('more');
  head.append(avatar, byline, more);
  const copy = document.createElement('p'); copy.className = 'post-copy'; copy.textContent = text;
  const note = document.createElement('div'); note.className = 'post-info'; note.textContent = 'Видно только в этой демоверсии';
  const actions = document.createElement('div'); actions.className = 'post-actions';
  actions.innerHTML = `<button class="post-action like-action" type="button">${icon('heart')}<span class="action-count">0</span></button><button class="post-action" type="button">${icon('comment')}<span>Комментарии</span></button><button class="post-action" type="button">${icon('share')}<span>Поделиться</span></button>`;
  actions.querySelector('.like-action').addEventListener('click', (e) => toggleLike(e.currentTarget));
  actions.querySelectorAll('button:not(.like-action)').forEach((button) => button.addEventListener('click', () => showToast('Действие станет доступно после интеграции VK API')));
  article.append(head, copy, note, actions);
  $('feedList').prepend(article);
  field.value = '';
  showToast('Запись добавлена локально — в VK она не отправлена');
});

function toggleLike(button) {
  const liked = button.classList.toggle('liked');
  const count = button.querySelector('.action-count');
  const current = Number(count.textContent) || 0;
  count.textContent = String(Math.max(0, current + (liked ? 1 : -1)));
}
document.querySelectorAll('.like-action').forEach((button) => button.addEventListener('click', () => toggleLike(button)));

const chatMessages = $('chatMessages');
const demoChats = {
  Алина: ['Привет! Как тебе новый VK Lite?', 'Выглядит гораздо легче.', 'Удобно и на телефоне, и на компьютере.'],
  Максим: ['Заценил новый интерфейс?', 'Да, выглядит аккуратно.'],
  Лера: ['Привет! Когда покажешь обновление?', 'Скоро будет тестовая версия.'],
};
function selectChat(button) {
  document.querySelectorAll('.chat-item').forEach((node) => node.classList.toggle('active', node === button));
  const name = button.dataset.chat;
  $('chatTitle').textContent = name;
  chatMessages.replaceChildren();
  const date = document.createElement('div'); date.className = 'chat-date'; date.textContent = 'Демо-диалог'; chatMessages.append(date);
  (demoChats[name] || []).forEach((text, index) => { const bubble = document.createElement('div'); bubble.className = `bubble${index % 2 ? ' mine' : ''}`; bubble.textContent = text; chatMessages.append(bubble); });
  document.body.classList.add('chat-open');
}
document.querySelectorAll('.chat-item').forEach((button) => button.addEventListener('click', () => selectChat(button)));
$('chatBack').addEventListener('click', () => document.body.classList.remove('chat-open'));
$('chatSearch').addEventListener('input', (event) => {
  const q = event.target.value.toLocaleLowerCase('ru-RU');
  document.querySelectorAll('.chat-item').forEach((item) => { item.hidden = !item.textContent.toLocaleLowerCase('ru-RU').includes(q); });
});
$('chatForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = $('chatInput'); const value = input.value.trim();
  if (!value) return;
  const bubble = document.createElement('div'); bubble.className = 'bubble mine'; bubble.textContent = value; chatMessages.append(bubble);
  input.value = ''; chatMessages.scrollTop = chatMessages.scrollHeight;
  showToast('Сообщение сохранено только в демо-чате');
});

function setToggle(id, key, defaultValue, onChange) {
  const button = $(id);
  const saved = localStorage.getItem(key);
  const enabled = saved === null ? defaultValue : saved === '1';
  button.setAttribute('aria-pressed', String(enabled));
  onChange(enabled);
  button.addEventListener('click', () => {
    const next = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(next));
    localStorage.setItem(key, next ? '1' : '0');
    onChange(next);
  });
}
setToggle('themeToggle', 'vklite-dark', false, (enabled) => document.documentElement.classList.toggle('dark-theme', enabled));
setToggle('compactToggle', 'vklite-compact', false, (enabled) => document.documentElement.classList.toggle('compact', enabled));
setToggle('motionToggle', 'vklite-reduce-motion', true, (enabled) => document.documentElement.classList.toggle('reduce-motion', enabled));

handleVkCallback();

// Do not run animations, polling loops, background image work or autoplay media.
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {}), { once: true });
}
