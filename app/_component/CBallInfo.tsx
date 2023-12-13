export default function CTicketPrice(
    {ticketPrice, setTicketPrice}:
        {
            ticketPrice: number,
            setTicketPrice: any,
        }) {
    return<div className={'flex flex-row gap-x-2'}>
        <div className={'w-[200px]'}>Ticket Price: </div>
        <div className={'flex flex-col gap-y-1'}>
            <div className={'flex flex-row gap-x-2'}>
                <input
                    className={'text-black px-2'}
                    value={ticketPrice}
                    type={'number'}
                    onChange={(e: any) => {
                        e.preventDefault();
                        setTicketPrice(e.target.value);
                    }}
                />
            </div>
        </div>
    </div>
}

function numberToWords(num: number): string {
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