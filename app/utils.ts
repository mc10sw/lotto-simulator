export function numberToWords(num: number): string {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertThreeDigits(n: number): string {
        const hundred = Math.floor(n / 100);
        const remainder = n % 100;
        const str = [];

        if (hundred !== 0) {
            str.push(`${units[hundred]} Hundred`);
        }

        if (remainder !== 0) {
            if (remainder < 10) {
                str.push(units[remainder]);
            } else if (remainder < 20) {
                str.push(teens[remainder - 10]);
            } else {
                const ten = Math.floor(remainder / 10);
                const unit = remainder % 10;
                str.push(tens[ten]);
                if (unit !== 0) {
                    str.push(units[unit]);
                }
            }
        }

        return str.join(' ');
    }

    const suffixes = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion']; // 등급에 따른 단위

    if (num === 0) {
        return 'Zero';
    }

    let i = 0;
    let words = '';

    while (num > 0) {
        if (num % 1000 !== 0) {
            words = `${convertThreeDigits(num % 1000)} ${suffixes[i]} ${words}`;
        }
        num = Math.floor(num / 1000);
        i++;
    }

    return words.trim();
}

export function numberToKoreanWords(num: number): string {
    const units = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const largeUnits = ['', '만', '억', '조', '경']; // 원하는 단위로 변경 가능

    function convertFourDigits(n: number): string {
        const thousand = Math.floor(n / 1000);
        const remainder = n % 1000;
        const str = [];

        if (thousand !== 0) {
            str.push(`${units[thousand]}천`);
        }

        const hundred = Math.floor(remainder / 100);
        if (hundred !== 0) {
            str.push(`${units[hundred]}백`);
        }

        const ten = Math.floor((remainder % 100) / 10);
        if (ten !== 0) {
            str.push(`${units[ten]}십`);
        }

        const unit = remainder % 10;
        if (unit !== 0) {
            str.push(units[unit]);
        }

        return str.join('');
    }

    if (num === 0) {
        return '영';
    }

    let i = 0;
    let words = '';

    while (num > 0) {
        if (num % 10000 !== 0) {
            const converted = convertFourDigits(num % 10000);
            words = `${converted ? converted + largeUnits[i] : ''}${words}`;
        }
        num = Math.floor(num / 10000);
        i++;
    }

    return words.trim();
}

export function getFormattedNumber(value: number, fraction: number = 6): string {
    return value.toLocaleString(undefined, { minimumFractionDigits: fraction });
}

// 소수점 아래의 숫자를 특정 자릿수까지 표시. 만약에 아래에 0이 있다면 제거하여 표시
export function getFloatingPointNumber(num: number, fractionDigits: number): string {
    if(num === undefined || !num) return '';
    try {
        let formatted = num.toFixed(fractionDigits);
        while (formatted.includes('.') && (formatted.endsWith('0') || formatted.endsWith('.'))) {
            formatted = formatted.slice(0, -1);
        }

        if(formatted.includes('.')) {
            let integer = formatted.split('.')[0];
            let fraction = formatted.split('.')[1];
            let formattedInteger = getFormattedNumber(parseInt(integer), 0);
            return `${formattedInteger}.${fraction}`;
        }
        return getFormattedNumber(parseInt(formatted), 0);
    } catch(e) {
        return '';
    }
}

function calculateSpecificBallsProbability(totalBalls: number, ballsToPick: number, specificBalls: number[]) {
    // 특정한 공을 뽑을 경우의 수 계산
    const specificCombinations = specificBalls.reduce((acc, ball) => {
        const remainingBalls = totalBalls - ball;
        const remainingBallsToPick = ballsToPick - specificBalls.length + 1;
        return (acc * remainingBallsToPick) / remainingBalls;
    }, 1);

    // 전체 경우의 수
    const totalPossibilities = Math.pow(totalBalls, ballsToPick);

    // 확률 계산
    const probability = specificCombinations / totalPossibilities;

    return probability;
}
