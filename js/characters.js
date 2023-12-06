  const list = document.querySelectorAll(".list");

  function activeLink() {
    list.forEach((item) =>
      item.classList.remove("active")
    );
    this.classList.add("active");
  }

  list.forEach((item) => {
    item.addEventListener("click", activeLink);
  });

  fetch('characters.json')
    .then(response => response.json())
    .then(characterData => {
      // TextMap.jsonのデータを取得
      fetch('TextMap.json')
        .then(response => response.json())
        .then(textMapData => {
          displayCharacterInfo(characterData, textMapData);
        })
        .catch(error => console.error('TextMap.jsonの読み込みに失敗しました', error));
    })
    .catch(error => console.error('characters.jsonの読み込みに失敗しました', error));

function displayCharacterInfo(characterData, textMapData) {
  var characterInfoElement = document.getElementById("characterInfo");

  for (var characterId in characterData) {
    if (characterData.hasOwnProperty(characterId)) {
      var character = characterData[characterId];

      var selectedLanguage = document.getElementById("charalanguage").value;

var characterName = textMapData[character.nameTextMapHash]?.JP;

      var starCount = character.qualityType === 'QUALITY_ORANGE' ? 5 : 4;
      var rarityClass = character.qualityType === 'QUALITY_ORANGE' ? 'rarityFifth' : 'rarityFourth';

      var costElemTypeIconPath = `./img/${character.costElemType}.png`;

      var avatarCard = document.createElement('div');
      avatarCard.innerHTML = `
        <a href="/www/Character/${characterId}" class="inline-block">
          <div name="Icon" class="h-26 w-24 md:w-32 lg:h-auto lg:w-32 xl:w-32 paimonHover relative m-2 inline-block rounded-lg bg-itemBGR">
            <div class="flex flex-row justify-center rounded-t-lg rounded-br-3xl bg-itemShade bg-${rarityClass}">
                <span>
                  <img loading="eager" src="${costElemTypeIconPath}" alt="Element Icon" class="absolute top-1 left-1 w-8">
                  <img loading="eager" src='https://enka.network/ui/${character.iconName}.png' alt='icon' class="h-24 rounded-t-lg rounded-br-3xl md:h-32 lg:h-32 xl:h-32">
                </span>
          <div class="absolute top-20.3 flex flex-row md:top-28 lg:top-28 xl:top-28">
            ${Array(starCount).fill().map(() => `
              <span class="text-paimonStarYellow drop-shadow-special filter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-4 w-4 fill-current lg:h-5 lg:w-5">
                  <path d="M381.2 150.3l143.7 21.2c11.9 1.7 21.9 10.1 25.7 21.6 3.8 11.6.7 24.2-7.9 32.8L438.5 328.1l24.6 146.6c2 12-2.9 24.2-12.9 31.3-9.9 7.1-23 8-33.7 2.3l-128.4-68.5-128.3 68.5c-10.8 5.7-23.9 4.8-33.8-2.3-9.9-7.1-14.9-19.3-12.8-31.3l24.6-146.6L33.58 225.9c-8.61-8.6-11.67-21.2-7.89-32.8 3.77-11.5 13.74-19.9 25.73-21.6L195 150.3l64.4-132.33C264.7 6.954 275.9-.04 288.1-.04c12.3 0 23.5 6.994 28.8 18.01l64.3 132.33z"></path>
                </svg>
              </span>
            `).join('')}
                </div>
              </div>
              <div class="items-center no-scrollbar flex h-9 justify-center overflow-auto rounded-b-lg bg-paimonItemBGR text-center text-xs text-paimonBlack lg:text-sm">
                <span class="font-whitney leading-none">${characterName}</span>
              </div>
          </div>
        `;
        characterInfoElement.appendChild(avatarCard);
      }
    }
  }