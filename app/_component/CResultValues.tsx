import {getFloatingPointNumber, numberToKoreanWords, numberToWords} from "@/app/utils/utils";

export default function CResultValues({ totalTicketPurchaseAmount, totalPrizeAmount}:
{totalTicketPurchaseAmount: number, totalPrizeAmount: number}) {
    const margin = totalTicketPurchaseAmount-totalPrizeAmount;
    return <div className={'w-full flex flex-col items-center'}>
        <div className={'flex flex-col w-screen md:w-[560px] mt-4 pb-4 border-b border-gray-400 px-6'}>
            <div className={'flex flex-row justify-between'}>
                <span>{`Total Sales Amount: `}</span>
                <span>{getFloatingPointNumber(totalTicketPurchaseAmount,0)}</span>
            </div>
            <div className={'text-xs text-end'}>{`(${numberToWords(totalTicketPurchaseAmount).slice(0, 40)}, ${numberToKoreanWords(totalTicketPurchaseAmount)})`}</div>
            <div className={'flex flex-row justify-between mt-4'}>
                <span>Total Prize Amount: </span>
                <span>{getFloatingPointNumber(totalPrizeAmount,0)}</span>
            </div>
            <div className={'text-xs text-end'}>{`(${numberToWords(totalPrizeAmount).slice(0, 40)}, ${numberToKoreanWords(totalPrizeAmount)})`}</div>
        </div>
        <div className={'flex flex-col w-screen md:w-[560px] mt-4 pb-4 border-b border-gray-400 px-6'}>
            <div className={`flex flex-row justify-between mt-4`}>
                <span>Margin </span>
                <span className={`${margin > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <span className={'text-sm mr-4'}>{`(${getFloatingPointNumber(100 - (totalPrizeAmount/totalTicketPurchaseAmount*100),1)}%)`}</span>
                    <span className={'font-semibold'}>{`${getFloatingPointNumber(margin,0)}`}</span>
                </span>
            </div>
        </div>
    </div>
}