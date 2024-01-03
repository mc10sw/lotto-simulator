'use client';
import CTitle from "@/app/_component/CTitle";
import CResultTable from "@/app/_component/CResultTable";
import {useEffect, useState} from "react";
import CTotalTicket from "@/app/_component/CTotalTicket";
import CTicketPrice from "@/app/_component/CTicketPrice";
import CBallInfo from "@/app/_component/CBallInfo";
import CResultValues from "@/app/_component/CResultValues";
import {combination} from 'js-combinatorics';

export default function Home() {

    const [loading, setLoading] = useState(false);

    // 입력 데이터
    const [당첨볼개수, set당첨볼개수] = useState(6);
    const [결과값개수, set결과값개수] = useState(6);
    const [총볼갯수, set총볼갯수] = useState(45);

    const [보너스여부, set보너스여부] = useState(false);

    const [티켓가격, set티켓가격] = useState(1000);
    const [총티켓구매수량, set총티켓구매수량] = useState(0);
    const [티켓가격비율여부목록, set티켓가격비율여부목록] = useState([true, true, true, false, false, false])
    const [보너스티켓가격비율여부목록, set보너스티켓가격비율여부목록] = useState([true, true, true, false, false, false])

    const [당첨확률목록, set당첨확률목록] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [보너스당첨확률목록, set보너스당첨확률목록] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [당첨금액목록, set당첨금액목록] = useState<number[]>([0.375, 0.065, 0.065, 100000, 5000, 0])
    const [보너스당첨금액목록, set보너스당첨금액목록] = useState<number[]>([0, 0, 0, 0, 0, 0]);


    // 결과값 상태
    const [총티켓구매금액, set총티켓구매금액] = useState(0);
    const [결과기대값목록, set결과기대값목록] = useState([0, 0, 0, 0, 0, 0]) // 기대값
    const [보너스결과기대값목록, set보너스결과기대값목록] = useState([0, 0, 0, 0, 0, 0]) // 기대값
    const [결과기대값총합, set결과기대값총합] = useState(0);

    const [공식, set공식] = useState('');
    const [show공식, setShow공식] = useState(true);

    useEffect(() => {
        init();
    }, [])

    function getWinRate(isBonus: boolean, length: number) {
        console.log(`## getWinRate() >> bonus: ${isBonus}, length: ${length}`);
        const totalCombinations = combination(총볼갯수, 당첨볼개수);
        let tempCalculation = '';

        const tempWinRateList = []
        try {
            for(let index=0; index<length; index++) {
                // console.log(`p(${당첨볼개수-index}) = (${당첨볼개수}C${당첨볼개수-index}*${isBonus ? 총볼갯수-당첨볼개수 - 1 : 총볼갯수-당첨볼개수}C${index})/${Number(totalCombinations)}`);
                const prob = combination(당첨볼개수, 당첨볼개수-index) * combination(isBonus ? 총볼갯수-당첨볼개수 - 1 : 총볼갯수-당첨볼개수, index);
                const probability = Number(prob) / Number(totalCombinations);
                tempCalculation += `p(${당첨볼개수-index}) = (${당첨볼개수}C${당첨볼개수-index}*${isBonus ? 총볼갯수-당첨볼개수 - 1 : 총볼갯수-당첨볼개수}C${index})/${Number(totalCombinations)} = ${Number(prob)}/${Number(totalCombinations)} = ${probability}\n`;
                tempWinRateList.push(probability);
            }
            set당첨확률목록(tempWinRateList);
        } catch(e: any) {
            console.log(`## getWinRate() >> tempWinRateList error: ${JSON.stringify(tempWinRateList)}`);
        }

        let tempBonusWinRateList = [];
        try {
            if(isBonus) {
                for(let index=0; index<length; index++) {
                    if (index === 0) {
                        tempBonusWinRateList.push(0);
                        continue;
                    }
                    // console.log(`p(${당첨볼개수 - index}+1) = (${당첨볼개수}C${당첨볼개수 - index}*${isBonus ? 총볼갯수 - 당첨볼개수 - 1 : 총볼갯수 - 당첨볼개수}C${isBonus ? index - 1 : index})/${Number(totalCombinations)}`)
                    const prob = combination(당첨볼개수, 당첨볼개수 - index) * combination(isBonus ? 총볼갯수 - 당첨볼개수 - 1 : 총볼갯수 - 당첨볼개수, isBonus ? index - 1 : index);
                    const probability = Number(prob) / Number(totalCombinations);
                    tempCalculation += `p(${당첨볼개수 - index}+1) = (${당첨볼개수}C${당첨볼개수 - index}*${isBonus ? 총볼갯수 - 당첨볼개수 - 1 : 총볼갯수 - 당첨볼개수}C${isBonus ? index - 1 : index})/${Number(totalCombinations)} = ${Number(prob)}/${Number(totalCombinations)} = ${probability}\n`;
                    tempBonusWinRateList.push(probability);
                }
                set보너스당첨확률목록(tempBonusWinRateList);
            }
        } catch(e: any) {
            console.log(`## getWinRate() >> tempBonusWinRateList error: ${JSON.stringify(tempBonusWinRateList)}`);
        }
        set공식(tempCalculation);
        return {
            tempWinRateList,
            tempBonusWinRateList
        };
    }

    function init() {
        getWinRate(false, 당첨볼개수);
    }

    function onCalculate(length: number) {
        if(loading) return;
        setLoading(true);

        try {
            set결과값개수(length);
            // 게임 볼 수 변경 시 배열 크기 변경
            console.log(`## onCalculate() >> 당첨볼갯수: ${당첨볼개수}, 결과기대값목록.length: ${결과기대값목록.length}`)
            if(length >= 결과기대값목록.length) {
                console.log(`## onCalculate() >> 1`)
                const new티켓가격비율여부목록 = [...티켓가격비율여부목록];
                const new보너스티켓가격비율여부목록 = [...보너스티켓가격비율여부목록];
                const new당첨확률목록 = [...당첨확률목록];
                const new보너스당첨확률목록 = [...보너스당첨확률목록];
                const new당첨금액목록 = [...당첨금액목록];
                const new보너스당첨금액목록 = [...보너스당첨금액목록];
                const new결과기대값목록 = [...결과기대값목록];
                const new보너스결과기대값목록 = [...보너스결과기대값목록];
                for(let i=결과기대값목록.length; i<length; i++) {
                    console.log(`## push >> ${i}`);
                    new티켓가격비율여부목록.push(false);
                    new보너스티켓가격비율여부목록.push(false);
                    new당첨확률목록.push(0);
                    new보너스당첨확률목록.push(0);
                    new당첨금액목록.push(0);
                    new보너스당첨금액목록.push(0);
                    new결과기대값목록.push(0);
                    new보너스결과기대값목록.push(0);
                }
                set티켓가격비율여부목록(new티켓가격비율여부목록)
                set보너스티켓가격비율여부목록(new보너스티켓가격비율여부목록)
                set당첨확률목록(new당첨확률목록)
                set보너스당첨확률목록(new보너스당첨확률목록)
                set당첨금액목록(new당첨금액목록)
                set보너스당첨금액목록(new보너스당첨금액목록)
                set결과기대값목록(new결과기대값목록)
                set보너스결과기대값목록(new보너스결과기대값목록)
            }
            else {
                console.log(`## onCalculate() >> 2`)
                set티켓가격비율여부목록([...티켓가격비율여부목록].slice(0, length))
                set보너스티켓가격비율여부목록([...보너스티켓가격비율여부목록].slice(0, length))
                set당첨확률목록([...당첨확률목록].slice(0, length))
                set보너스당첨확률목록([...보너스당첨확률목록].slice(0, length))
                set당첨금액목록([...당첨금액목록].slice(0, length))
                set보너스당첨금액목록([...보너스당첨금액목록].slice(0, length))
                set결과기대값목록([...결과기대값목록].slice(0, length))
                set보너스결과기대값목록([...보너스결과기대값목록].slice(0, length))
            }

            // @ts-ignore
            const {tempWinRateList, tempBonusWinRateList} = getWinRate(보너스여부, length);
            console.log(`## onCalculate() tempWinRateList: ${JSON.stringify(tempWinRateList)}`)
            console.log(`## onCalculate() tempBonusWinRateList: ${JSON.stringify(tempBonusWinRateList)}`)
            const 총구매금액 = 총티켓구매수량*티켓가격;
            console.log(`## onCalculate() >> 4`)
            set총티켓구매금액(총구매금액);
            if(총티켓구매수량 < 0) {
                setLoading(false);
                return;
            }

            console.log(`## onCalculate() >> 5`)
            let totalAmount = 0;
            const 기대값목록 = 당첨금액목록.map((_, index) => {
                console.log(`## onCalculate() >> 5 >> index: ${index}, 당첨금액목록[index]: ${당첨금액목록[index]}, 티켓가격비율여부목록[index]: ${티켓가격비율여부목록[index]}, 당첨금액목록[index]: ${당첨금액목록[index]}`);
                const amount = 티켓가격비율여부목록[index] ?
                    // 상금 배수 (고등수) => 기댓값
                    총구매금액 * 당첨금액목록[index] :
                    // 상금 가격 (저등수)
                    tempWinRateList[index] * 당첨금액목록[index] * 총티켓구매수량;
                console.log(`## onCalculate() >> 5 >> amount: ${amount}`);
                totalAmount += amount
                return amount;
            })
            console.log(`## onCalculate() >> 6`)
            const 보너스기대값목록 = 보너스당첨금액목록.map((_, index) => {
                const amount = 보너스티켓가격비율여부목록[index] ?
                    // 상금 배수 (고등수) => 기댓값
                    총구매금액 * 보너스당첨금액목록[index] :
                    // 상금 가격 (저등수)
                    tempBonusWinRateList[index] * 보너스당첨금액목록[index] * 총티켓구매수량;
                totalAmount += amount
                return amount;
            })
            console.log(`## onCalculate() >> 7`)
            set결과기대값목록(기대값목록);
            set보너스결과기대값목록(보너스기대값목록);
            set결과기대값총합(totalAmount);
            setLoading(false);
        } catch(e: any) {
            console.log(`## onCalculate() >> error: ${e}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={'w-full h-auto flex flex-col justify-center items-center pt-24 pb-36'}>
            <div
                style={{ whiteSpace: "pre-wrap" }}
                className={`absolute top-0 right-0 px-4 pb-4 pt-4 w-[600px] h-auto bg-white text-sm text-black ${show공식 ? 'hidden 2xl:flex' : 'hidden'}`}>
                {공식}
            </div>
            <button
                onClick={() => { setShow공식(!show공식)}}
                className={'absolute top-0 right-0 px-4 py-2 bg-gray-300 text-sm text-black hidden 2xl:flex'}>
                {show공식 ? "HIDE" : "POP"}
            </button>
            <CTitle/>
            <div className={'flex flex-col justify-start items-start gap-y-4 mb-12 p-6 border border-gray-400'}>
                <CBallInfo pickBallCount={당첨볼개수} setPickBallCount={set당첨볼개수}
                           totalBallCount={총볼갯수} totalPickBallCount={set총볼갯수}
                           bonus={보너스여부} setBonus={(value: boolean) => {
                    set보너스여부(value);
                    getWinRate(value, 당첨볼개수)
                }}
                />
                <CTicketPrice ticketPrice={티켓가격} setTicketPrice={set티켓가격}/>
                <CTotalTicket totalCurrencyPrice={총티켓구매수량} setTotalCurrencyPrice={set총티켓구매수량}/>
                <div className={'w-full flex flex-row justify-center mt-2'}>
                    <button
                        onClick={() => onCalculate(당첨볼개수)}
                        className={`px-4 py-2 border ${loading ? 'text-gray-400 border-gray-400 ' : 'text-white border-white '}`}
                        disabled={loading}
                    >Calculate</button>
                </div>
            </div>
            <CResultTable
                결과값개수={결과값개수}
                결과기대값목록={결과기대값목록}
                보너스결과기대값목록={보너스결과기대값목록}
                당첨금액목록={당첨금액목록}
                set당첨금액목록={set당첨금액목록}
                보너스당첨금액목록={보너스당첨금액목록}
                set보너스당첨금액목록={set보너스당첨금액목록}
                당첨확률목록={당첨확률목록}
                보너스당첨확률목록={보너스당첨확률목록}
                티켓가격비율여부목록={티켓가격비율여부목록}
                set티켓가격비율여부목록={set티켓가격비율여부목록}
                보너스티켓가격비율여부목록={보너스티켓가격비율여부목록}
                set보너스티켓가격비율여부목록={set보너스티켓가격비율여부목록}
                총티켓구매금액={총티켓구매금액}
                보너스여부={보너스여부}
                set보너스여부={set보너스여부}
            />
            <CResultValues totalTicketPurchaseAmount={총티켓구매금액} totalPrizeAmount={결과기대값총합}/>
        </div>
    )
}