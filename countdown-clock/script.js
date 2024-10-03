document.addEventListener('DOMContentLoaded', function() {
    const updatePreviewBtn = document.getElementById('updatePreview');
    const generateEmbedBtn = document.getElementById('generateEmbed');
    const countdownElement = document.getElementById('countdown');
    const modal = document.getElementById('embedCodeModal');
    const closeModalBtn = document.getElementById('closeModal');
    const copyEmbedCodeBtn = document.getElementById('copyEmbedCode');
    const embedCodeTextarea = document.getElementById('embedCode');

    updatePreviewBtn.addEventListener('click', updatePreview);
    generateEmbedBtn.addEventListener('click', showEmbedCode);
    closeModalBtn.addEventListener('click', closeModal);
    copyEmbedCodeBtn.addEventListener('click', copyEmbedCode);

    function updatePreview() {
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const timezone = document.getElementById('timezone').value;
        const language = document.getElementById('language').value;
        const textColor = document.getElementById('textColor').value;
        const bgColor = document.getElementById('bgColor').value;
        const bgImage = document.getElementById('bgImage').value;
        const borderRadius = document.getElementById('borderRadius').value;

        countdownElement.style.color = textColor;
        countdownElement.style.backgroundColor = bgColor;
        countdownElement.style.backgroundImage = bgImage ? `url(${bgImage})` : 'none';
        countdownElement.style.backgroundSize = 'cover';
        countdownElement.style.backgroundPosition = 'center';
        countdownElement.style.borderRadius = `${borderRadius}px`;

        countdownElement.innerHTML = `
            <h3>${title}</h3>
            <div class="countdown-timer" id="timer">
                <!-- 倒數計時器內容將在這裡動態更新 -->
            </div>
        `;

        startCountdown(date, timezone, language);
    }

    function startCountdown(targetDate, timezone, language) {
        const timerElement = document.getElementById('timer');
        const targetTime = new Date(targetDate + 'T00:00:00').getTime();

        function updateTimer() {
            const now = new Date().getTime();
            const distance = targetTime - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const labels = language === 'zh-Hant' 
                ? ['天', '時', '分', '秒'] 
                : ['Days', 'Hours', 'Minutes', 'Seconds'];

            timerElement.innerHTML = `
                <div class="countdown-item"><span class="countdown-value">${days}</span><span class="countdown-label">${labels[0]}</span></div>
                <div class="countdown-item"><span class="countdown-value">${hours}</span><span class="countdown-label">${labels[1]}</span></div>
                <div class="countdown-item"><span class="countdown-value">${minutes}</span><span class="countdown-label">${labels[2]}</span></div>
                <div class="countdown-item"><span class="countdown-value">${seconds}</span><span class="countdown-label">${labels[3]}</span></div>
            `;

            if (distance < 0) {
                clearInterval(timerInterval);
                timerElement.innerHTML = language === 'zh-Hant' ? "倒數計時結束！" : "Countdown Finished!";
            }
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    function showEmbedCode() {
        const embedCode = generateEmbedCode();
        embedCodeTextarea.value = embedCode;
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function copyEmbedCode() {
        embedCodeTextarea.select();
        document.execCommand('copy');
        alert('嵌入代碼已複製到剪貼簿！');
    }

    function generateEmbedCode() {
        // 這裡需要實現生成實際的嵌入代碼的邏輯
        // 這只是一個示例
        return `<iframe src="https://your-countdown-url.com/embed?id=12345" width="300" height="150" frameborder="0"></iframe>`;
    }

    // 當用戶點擊模態框外部時關閉它
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});