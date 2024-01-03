import {convertToPercentage, getFloatingPointNumber} from "@/app/utils";

export default function CResultTable({ 결과기대값목록, 당첨금액목록, set당첨금액목록, 당첨확률목록, 총티켓구매금액, 티켓가격비율여부목록, set티켓가격비율여부목록}:
{
    결과기대값목록: number[],
    당첨금액목록: number[],
    set당첨금액목록: any,
    당첨확률목록: number[],
    총티켓구매금액: number
    티켓가격비율여부목록: boolean[]
    set티켓가격비율여부목록: any
})
{
    const length = 당첨금액목록.length;
    return <div className={'flex flex-col items-start mb-8'}>
        <div className={'flex flex-row gap-x-4 mb-4'}>
            <div className={'text-sm font-medium w-[16px]'}>{'#'}</div>
            <div className={'text-sm font-medium w-[240px]'}>{'Expected Amount'}</div>
            <div className={'text-sm font-medium w-[120px]'}>{'Win Rate'}</div>
            <div className={'text-sm font-medium'}>{'Win Price Amount/Ratio'}</div>
        </div>
        {
            당첨금액목록.map((amount, index) => {
            return <div
                key={`count_${length-index}`}
                className={'flex flex-row items-center gap-x-4 mb-2'}>
                <div className={'w-[16px]'}>{length - index}</div>
                <div className={'text-white px-2 py-1 w-[240px] bg-gray-700'}>
                    <span className={'mr-2'}>{결과기대값목록[index] ? getFloatingPointNumber(결과기대값목록[index], 0) : 0}</span>
                    <span className={'text-sm'}>{`(${결과기대값목록[index] != 0 ? getFloatingPointNumber(결과기대값목록[index]/총티켓구매금액*100, 5) : "0"}%)`}</span>
                </div>
                <div>
                    <div className={'w-[120px] text-sm'}>{`${convertToPercentage(당첨확률목록[index])}`}</div>
                    <div className={'w-[120px] text-sm'}>{`(1 / ${getFloatingPointNumber(1/당첨확률목록[index], 0)})`}</div>
                </div>
                {/* 당첨금 */}
                <div className={'flex flex-row'}>
                    <input
                        className={'text-black px-2 w-[100px]'}
                        value={당첨금액목록[index]}
                        onChange={(e: any) => {
                            e.preventDefault();
                            const newArray = [...당첨금액목록];
                            newArray[index] = e.target.value;
                            set당첨금액목록(newArray);
                        }}
                    />
                    <button
                        className={`px-2 ml-2 ${티켓가격비율여부목록[index] ? `bg-blue-950` : `bg-gray-700`} border border-white/30`}
                        onClick={() => {
                            const existingRatioList = 티켓가격비율여부목록;
                            existingRatioList[index] = !existingRatioList[index];
                            set티켓가격비율여부목록([...existingRatioList]);
                        }}
                    >
                        {티켓가격비율여부목록[index] ? `RATIO` : `FIXED`}
                    </button>
                </div>
            </div>
        })}
    </div>
}