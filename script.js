// 일정 입력 시 폰트 크기 조절 /
function adjustFontSize(content) {
  const textLength = content.innerText.length;
  let fontSize = 48; // 기본 폰트 크기

  if (textLength > 25) {
    fontSize = 24; // 텍스트 길이가 22 이상일 경우
  } else if (textLength > 16) {
    fontSize = 36; // 텍스트 길이가 18 이상일 경우
  }

  // 입력된 텍스트의 크기 동적으로 변경
  content.style.fontSize = fontSize + 'px';

  // id를 기준으로 LocalStorage에 저장
  const inputId = content.id; // 입력 창의 id
  localStorage.setItem(inputId + '_text', content.innerText);
  localStorage.setItem(inputId + '_fontSize', fontSize + 'px');
};



// 페이지 로드 시, 저장된 텍스트와 폰트 크기 불러오기 /
window.onload = function () {
  const inputs = document.querySelectorAll('.func');
  inputs.forEach(content => {
    const inputId = content.id; // 입력 창의 id
    const savedText = localStorage.getItem(inputId + '_text');
    const savedFontSize = localStorage.getItem(inputId + '_fontSize');

    if (savedText) {
      content.innerText = savedText; // 텍스트 복원
    }
    if (savedFontSize) {
      content.style.fontSize = savedFontSize; // 폰트 크기 복원
    }
  });
};


// 초기화 기능 /
document.querySelector('.bttn-reset').addEventListener('click', (e) => {
  let msg = "모든 내용을 삭제할까요?";
  if (confirm(msg) == true) {
    const inputs = document.querySelectorAll('.func');
    inputs.forEach(inputs => {
      inputs.innerText = "";
    });
    localStorage.clear();
    
    location.reload();
}});



//휴뱅 입력 시 글씨 색 변경 /
function rest(content) {
  const matchtext = ["휴", "-휴-", "휴방", "-휴방-", "휴뱅", "-휴뱅-", "연어", "-연어-"];
  if (matchtext.includes(content.innerText)) {
    content.classList.add('rest');
  } else {
    content.classList.remove('rest');
}};



// 캡쳐 도구 /
document.querySelector('.bttn-save').addEventListener('click', (e) => {
  const element = document.getElementById("capture");
  element.style.background = "linear-gradient(#FFFAFA, #FFD6D6)";

  html2canvas(element, {
    allowTaint: true,
  }).then(canvas => {
    document.querySelector(".capturepreview").appendChild(canvas);
  });
  document.querySelector(".capturepreview").style.display = 'flex';
  element.style.removeProperty("background");
});



// 캡처 화면 닫기 /
document.addEventListener("click", (e) => {
  const capturePreview = document.querySelector(".capturepreview");
  const existingCanvas = capturePreview.querySelector('canvas');

  if (existingCanvas) {
    if (!existingCanvas.contains(e.target)) {
      capturePreview.removeChild(existingCanvas);
      document.querySelector(".capturepreview").style.display = 'none';
}}});



// 패치노트 열기 /
document.querySelector('.bttn-patch').addEventListener('click', (e) => {
  e.stopPropagation();
  document.querySelector(".patch").style.display = 'flex';
  document.body.style.overflow = 'hidden'; // body의 스크롤 비활성화
});


// 패치노트 내용 불러오기
fetch('patchnote.txt')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.patchnote').innerHTML = data;
  })
  .catch(error => console.log('Error:', error));


// 패치노트 닫기 /
document.addEventListener("click", (e) => {
  const patchnote = document.querySelector(".patch");
  if (document.querySelector(".patch").style.display === 'flex') {
    const existingPatchnote = patchnote.querySelector('.patchnote');
    if (!existingPatchnote.contains(e.target)) {
    document.querySelector(".patch").style.display = 'none';
    document.body.style.overflow = 'auto'; // body의 스크롤 복원
}}});



// 스크롤 시 헤더 속성 변경 /
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
