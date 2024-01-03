import CResultTableItem from "@/app/_component/CResultTableItem";

export default function CResultTable(
    props:
        {
            결과기대값목록: number[]
            보너스결과기대값목록: number[]
            당첨금액목록: number[]
            set당첨금액목록: any
            보너스당첨금액목록: number[]
            set보너스당첨금액목록: any
            당첨확률목록: number[]
            보너스당첨확률목록: number[]
            티켓가격비율여부목록: boolean[]
            set티켓가격비율여부목록: any
            보너스티켓가격비율여부목록: boolean[]
            set보너스티켓가격비율여부목록: any
            보너스여부: boolean
            set보너스여부: any
            총티켓구매금액: number
        })
{
    return <div className={'flex flex-col items-start mb-8'}>
        <div className={'flex flex-row gap-x-4 mb-4'}>
            <div className={'text-sm font-medium w-[24px]'}>{'#'}</div>
            <div className={'text-sm font-medium w-[240px]'}>{'Expected Amount'}</div>
            <div className={'text-sm font-medium w-[120px]'}>{'Win Rate'}</div>
            <div className={'text-sm font-medium'}>{'Win Price Amount/Ratio'}</div>
        </div>
        {
            props.결과기대값목록.map((amount, index) => {
                return <div
                    key={`result_${index}`}
                    className={'flex flex-col'}>
                    { props.보너스여부 && index != 0 && <CResultTableItem
                        key={`result_${index}_bonus`}
                        index={index}
                        bonus={true}
                        결과기대값목록={props.보너스결과기대값목록}
                        당첨금액목록={props.보너스당첨금액목록}
                        set당첨금액목록={props.set보너스당첨금액목록}
                        당첨확률목록={props.보너스당첨확률목록}
                        티켓가격비율여부목록={props.보너스티켓가격비율여부목록}
                        set티켓가격비율여부목록={props.set보너스티켓가격비율여부목록}
                        보너스여부={props.보너스여부}
                        set보너스여부={props.set보너스여부}
                        총티켓구매금액={props.총티켓구매금액}
                    /> }
                    <CResultTableItem
                        key={`result_${index}_no_bonus`}
                        index={index}
                        결과기대값목록={props.결과기대값목록}
                        당첨금액목록={props.당첨금액목록}
                        set당첨금액목록={props.set당첨금액목록}
                        당첨확률목록={props.당첨확률목록}
                        티켓가격비율여부목록={props.티켓가격비율여부목록}
                        set티켓가격비율여부목록={props.set티켓가격비율여부목록}
                        보너스여부={props.보너스여부}
                        set보너스여부={props.set보너스여부}
                        총티켓구매금액={props.총티켓구매금액}
                    />
                </div>
            })}
    </div>
}