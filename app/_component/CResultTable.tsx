import {convertToPercentage, getFloatingPointNumber} from "@/app/utils";

export default function CResultTable({ticketCount, expectedAmount, winPriceAmount, setWinPriceAmount, winRateList, totalPurchaseAmount}:
{ticketCount: number[], expectedAmount: number[], winPriceAmount: number[], setWinPriceAmount: any, winRateList: number[], totalPurchaseAmount: number}) {
    const length = ticketCount.length;
    return <div className={'flex flex-col items-start'}>
        <div className={'flex flex-row gap-x-4 mb-4'}>
            <div className={'text-sm font-medium w-[16px]'}>{'#'}</div>
            <div className={'text-sm font-medium w-[240px]'}>{'Expected Amount'}</div>
            <div className={'text-sm font-medium w-[120px]'}>{'Win Rate'}</div>
            <div className={'text-sm font-medium'}>{'Win Price Amount/Ratio'}</div>
        </div>
        {
            ticketCount.map((count, index) => {
            return <div
                key={`count_${length-index}`}
                className={'flex flex-row items-center gap-x-4 mb-2'}>
                <div className={'w-[16px]'}>{length - index}</div>
                <div className={'text-white px-2 py-1 w-[240px] bg-gray-700'}>
                    <span className={'mr-2'}>{expectedAmount[index] ? getFloatingPointNumber(expectedAmount[index], 0) : 0}</span>
                    <span className={'text-sm'}>{`(${expectedAmount[index] != 0 ? getFloatingPointNumber(expectedAmount[index]/totalPurchaseAmount*100, 5) : "0"}%)`}</span>
                </div>
                <div>
                    <div className={'w-[120px] text-sm'}>{`${convertToPercentage(winRateList[index])}`}</div>
                    <div className={'w-[120px] text-sm'}>{`(1 / ${getFloatingPointNumber(1/winRateList[index], 0)})`}</div>
                </div>
                <input
                    className={'text-black px-2 w-[120px]'}
                    value={winPriceAmount[index]}
                    onChange={(e: any) => {
                        e.preventDefault();
                        const newArray = [...winPriceAmount];
                        newArray[index] = e.target.value;
                        setWinPriceAmount(newArray);
                    }}
                />
            </div>
        })}
    </div>
}