document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("language");
  let languageData;

  languageSelect.addEventListener("change", function () {
    const selectedLanguage = languageSelect.value;

    fetch(`./lang/${selectedLanguage}.json`)
      .then(response => response.json())
      .then(data => {
        languageData = data;
        updatePageText();
      })
      .catch(error => console.error('言語ファイルの読み込みに失敗しました', error));
  });

  fetch(`./lang/${languageSelect.value}.json`)
    .then(response => response.json())
    .then(data => {
      languageData = data;
      updatePageText();
    })
    .catch(error => console.error('デフォルトの言語ファイルの読み込みに失敗しました', error));

  function updatePageText() {
    // メニューのテキストを更新
    updateMenuText();

    // 他のテキストも同様に更新する
    const characterHeaderText = languageData.characterHeaderText;
    document.getElementById("characterText").textContent = characterHeaderText;
  }

  // メニューのテキストを更新する関数
  function updateMenuText() {
    const menuItems = document.querySelectorAll(".menu .title");

    menuItems.forEach((menuItem, index) => {
      const menuItemKey = `menu${index + 1}`;
      if (languageData[menuItemKey]) {
        menuItem.textContent = languageData[menuItemKey];
      }
    });
  }
});

   // 以下の2つの関数を修正しました
    function openSettingsettings() {
      document.getElementById('settings').style.display = 'block';
    }

    function closeSettingsettings() {
      document.getElementById('settings').style.display = 'none'; // 'none'に変更
    }

    // メニューの設定リンクにクリックイベントを追加
    document.getElementById('settingLink').addEventListener('click', openSettingsettings);