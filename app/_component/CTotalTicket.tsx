import {getFloatingPointNumber, getFormattedNumber, numberToKoreanWords, numberToWords} from "@/app/utils/utils";

export default function CTotalTicket(
    {totalCurrencyPrice, setTotalCurrencyPrice}:
        {
            totalCurrencyPrice: number,
            setTotalCurrencyPrice: any
        }) {
    return <div className={'flex flex-col items-center'}>
        <div className={'flex flex-row gap-x-2 mb-2'}>
            <div className={'w-[200px]'}>Total Purchased Ticket: </div>
            <div className={'flex flex-row gap-x-2'}>
                <input
                    className={'text-black px-2'}
                    value={totalCurrencyPrice}
                    type={'number'}
                    onChange={(e: any) => {
                        e.preventDefault();
                        if(parseInt(e.target.value) < 0) setTotalCurrencyPrice(0);
                        setTotalCurrencyPrice(parseInt(e.target.value));
                    }}
                    onSubmit={(e: any) => {
                        e.preventDefault();
                    }}
                />
            </div>
        </div>
        <div className={'text-xs'}>
            {`${getFloatingPointNumber(totalCurrencyPrice, 0)} (${numberToWords(totalCurrencyPrice).slice(0, 40)}, ${numberToKoreanWords(totalCurrencyPrice)})`}
        </div>
    </div>
}