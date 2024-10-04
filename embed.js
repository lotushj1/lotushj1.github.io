document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const date = urlParams.get('date');
    const timezone = urlParams.get('timezone');
    const language = urlParams.get('language');
    const textColor = '#' + urlParams.get('textColor');
    const bgColor = '#' + urlParams.get('bgColor');
    const borderRadius = urlParams.get('borderRadius');

    document.getElementById('previewTitle').textContent = title;
    const previewElement = document.getElementById('preview');
    previewElement.style.color = textColor;
    previewElement.style.backgroundColor = bgColor;
    previewElement.style.borderRadius = borderRadius + 'px';

    startCountdown(date, timezone, language);
});

function startCountdown(targetDate, timezone, language) {
    // 這裡放入之前的 startCountdown 函數的內容
    // ...
}
