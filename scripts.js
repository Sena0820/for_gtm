document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#tabs button');
  const contents = document.querySelectorAll('#content .tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.id.replace('tab', 'content');

      // Hide all contents
      contents.forEach(content => content.classList.remove('active'));

      // Show the selected content
      document.getElementById(targetId).classList.add('active');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Push to dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'tabChange',
        tabId: tab.id
      });
    });
  });
}); 