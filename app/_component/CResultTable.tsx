import {getFloatingPointNumber} from "@/app/utils";

export default function CResultTable({ticketCount, expectedAmount, winPriceAmount, pickBallCount}:
{ticketCount: number[], expectedAmount: number[], winPriceAmount: number[], pickBallCount: number}) {
    const length = ticketCount.length;
    return <div className={'flex flex-col items-start'}>
        <div className={'flex flex-row gap-x-2 mb-4'}>
            <div className={'text-sm font-medium w-[16px]'}>{'#'}</div>
            <div className={'text-sm font-medium w-[240px] me-4'}>{'Expected Amount (Per One Ticket)'}</div>
            <div className={'text-sm font-medium'}>{'Win Price Amount/Ratio'}</div>
        </div>
        {
            ticketCount.map((count, index) => {
            return <div
                key={`count_${length-index}`}
                className={'flex flex-row gap-x-2 mb-2'}>
                <div className={'w-[16px]'}>{length - index}</div>
                <input
                    className={'text-white px-2 w-[240px] me-4'}
                    value={getFloatingPointNumber(expectedAmount[index], 3)}
                    onChange={(e: any) => {
                        e.preventDefault();
                    }}
                    disabled={true}
                />
                <input
                    className={'text-black px-2 w-[120px]'}
                    value={winPriceAmount[index]}
                    onChange={(e: any) => {
                        e.preventDefault();
                    }}
                />
            </div>
        })}
    </div>
}