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

    window.changeColor = function () {
        const newColor = getRandomColor();
        document.body.style.backgroundColor = newColor;
        colorHistory.push(newColor);
        updateColorHistory();
        updateCurrentColorInfo(newColor);
    };

    window.generateGradient = function () {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
        document.body.style.background = gradient;
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
                updateCurrentColorInfo(color);
            });

            colorHistoryContainer.appendChild(colorBox);
        });
    }

    function updateCurrentColorInfo(color) {
        const colorInfo = document.getElementById('currentColorInfo');
        colorInfo.textContent = `Current Color: ${color}`;
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
