document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#tabs button');
  const contents = document.querySelectorAll('#content .tab-content');
  let isHashChangeFromClick = false; // クリックによるハッシュ変更を追跡

  // 初期表示
  const initialTabId = window.location.hash ? window.location.hash.substring(1) : 'content1';
  showTab(initialTabId);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.id.replace('tab', 'content');
      isHashChangeFromClick = true; // クリックによるハッシュ変更をフラグで記録
      window.location.hash = targetId; // URLハッシュを更新
      showTab(targetId);
      isHashChangeFromClick = false; // フラグをリセット
    });
  });

  function showTab(targetId) {
    // Hide all contents
    contents.forEach(content => content.classList.remove('active'));

    // Show the selected content
    document.getElementById(targetId).classList.add('active');

    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.getElementById(targetId.replace('content', 'tab'));
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'tabChange',
      tabId: targetId.replace('content', 'tab'),
      screen_name: activeTab.textContent
    });
  }

  // 履歴操作
  window.addEventListener('popstate', () => {
    if (isHashChangeFromClick) return; // クリックによるハッシュ変更の場合は処理をスキップ
    const targetId = window.location.hash ? window.location.hash.substring(1) : 'content1';
    showTab(targetId);
  });
});
