document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#tabs button');
  const contents = document.querySelectorAll('#content .tab-content');

  // 初期表示
  const initialTabId = window.location.hash ? window.location.hash.substring(1) : 'content1'; // ハッシュがあればそれを使う
  showTab(initialTabId);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.id.replace('tab', 'content');
      showTab(targetId);
      window.location.hash = targetId; // URLハッシュを更新
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
    if (activeTab) { // activeTab が null の可能性を考慮
      activeTab.classList.add('active');
    }

    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'tabChange',
      tabId: targetId.replace('content', 'tab')
    });
  }

  // 履歴操作
  window.addEventListener('popstate', () => {
    const targetId = window.location.hash ? window.location.hash.substring(1) : 'content1';
    showTab(targetId);
  });
});
