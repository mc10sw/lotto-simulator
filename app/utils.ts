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

export function addCommasToNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function calculateProbability(n: number, m: number) {
    // 팩토리얼을 계산하는 함수
    const factorial = (num: number): number => {
        if (num <= 1) return 1;
        return num * factorial(num - 1);
    };

    // 조합을 계산하는 함수
    const combination = (n: number, m: number) => {
        return factorial(n) / (factorial(m) * factorial(n - m));
    };

    // n개 중에서 m개를 뽑을 경우의 수 계산
    const numberOfCombinations = combination(n, m);

    // 전체 경우의 수는 n개 중에서 아무거나 선택하는 경우의 수와 같음
    const totalNumberOfOptions = Math.pow(2, n);

    // 확률 계산
    const probability = numberOfCombinations / totalNumberOfOptions;

    return probability;
}
