document.addEventListener('DOMContentLoaded', function () {
    let colorHistory = [];

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getFontColorForBackground(background) {
        // Calculate the relative luminance of the background color
        const rgb = parseInt(background.substr(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >>  8) & 0xff;
        const b = (rgb >>  0) & 0xff;
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Choose white or black based on the luminance
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    window.changeColor = function () {
        const newColor = getRandomColor();
        document.body.style.backgroundColor = newColor;
        const fontColor = getFontColorForBackground(newColor);
        document.body.style.color = fontColor;
        const h1Title = document.querySelector('h1');
        h1Title.style.color = fontColor;
        colorHistory.push(newColor);
        updateColorHistory();
        updateCurrentColorInfo(newColor);
    };

    window.generateGradient = function () {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
        document.body.style.background = gradient;
        const fontColor = getFontColorForBackground(gradient);
        document.body.style.color = fontColor;
        const h1Title = document.querySelector('h1');
        h1Title.style.color = fontColor;
        colorHistory.push(gradient);
        updateColorHistory();
        updateCurrentColorInfo(gradient);
    };

    function updateColorHistory() {
        const colorHistoryContainer = document.getElementById('colorHistory');
        colorHistoryContainer.innerHTML = '';

        colorHistory.forEach((color, index) => {
            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = color;

            colorBox.addEventListener('click', function () {
                document.body.style.background = color;
                const fontColor = getFontColorForBackground(color);
                document.body.style.color = fontColor;
                const h1Title = document.querySelector('h1');
                h1Title.style.color = fontColor;
                updateCurrentColorInfo(color);
            });

            colorHistoryContainer.appendChild(colorBox);
        });
    }

    function updateCurrentColorInfo(color) {
        const colorInfo = document.getElementById('currentColorInfo');
        const h1Title = document.querySelector('h1');

        colorInfo.textContent = `Current Color: ${color}`;
        h1Title.style.color = getFontColorForBackground(color);
    }

    window.copyToClipboard = function () {
        const colorToCopy = colorHistory.length > 0 ? colorHistory[colorHistory.length - 1] : '#ffffff';

        navigator.clipboard.writeText(colorToCopy).then(function () {
            alert(`Color code '${colorToCopy}' copied to clipboard!`);
        }).catch(function (err) {
            console.error('Unable to copy to clipboard', err);
        });
    };

    function fadeIn() {
        const colorHistoryContainer = document.getElementById('colorHistory');
        colorHistoryContainer.style.opacity = 1;
    }

    fadeIn();
});
