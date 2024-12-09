function adjustFontSize(content) {
  const textLength = content.value.length;
  let fontSize = 48; // 기본 폰트 크기

  if (textLength >= 22) {
    fontSize = 24; // 텍스트 길이가 22 이상일 경우
  } else if (textLength >= 18) {
    fontSize = 36; // 텍스트 길이가 18 이상일 경우
  }

  // 입력된 텍스트의 크기 동적으로 변경
  content.style.fontSize = fontSize + 'px';

  // id를 기준으로 LocalStorage에 저장
  const inputId = content.id; // 입력 창의 id
  localStorage.setItem(inputId + '_text', content.value);
  localStorage.setItem(inputId + '_fontSize', fontSize + 'px');
}

// 페이지 로드 시, 저장된 텍스트와 폰트 크기 불러오기
window.onload = function () {
  const inputs = document.querySelectorAll('.func');
  inputs.forEach(content => {
    const inputId = content.id; // 입력 창의 id
    const savedText = localStorage.getItem(inputId + '_text');
    const savedFontSize = localStorage.getItem(inputId + '_fontSize');

    if (savedText) {
      content.value = savedText; // 텍스트 복원
    }
    if (savedFontSize) {
      content.style.fontSize = savedFontSize; // 폰트 크기 복원
    }
  });
};

function reset() {
  let msg = "모든 내용을 삭제할까요?";
  if (confirm(msg) == true) {
    const inputs = document.querySelectorAll('.func');
    inputs.forEach(inputs => {
      inputs.value = "";
    });
    localStorage.clear();
  };
}

function patch() {
  const msg = "아직이요";
  alert(msg);
}
