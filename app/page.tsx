'use client';
import CTitle from "@/app/_component/CTitle";
import CResultTable from "@/app/_component/CResultTable";
import {useEffect, useState} from "react";
import CTotalTicket from "@/app/_component/CTotalTicket";
import CTicketPrice from "@/app/_component/CTicketPrice";
import CBallInfo from "@/app/_component/CBallInfo";
import {getFloatingPointNumber, numberToKoreanWords, numberToWords} from "@/app/utils";
import CResultValues from "@/app/_component/CResultValues";

export default function Home() {

    const [loading, setLoading] = useState(false);

    // 입력 데이터
    const [당첨볼갯수, set당첨볼갯수] = useState(6);
    const [총볼갯수, set총볼갯수] = useState(45);

    const [보너스여부, set보너스여부] = useState(false);

    const [티켓가격, set티켓가격] = useState(1000);
    const [총티켓구매수량, set총티켓구매수량] = useState(0);


    const [당첨확률목록, set당첨확률목록] = useState([0, 0, 0, 0, 0, 0]);
    const [ticketCount, setTicketCount] = useState([0, 0, 0, 0, 0, 0])

    const [당첨금액목록, set당첨금액목록] = useState([0.375, 0.065, 0.065, 100000, 5000, 0])

    // 결과값 상태
    const [총티켓구매금액, set총티켓구매금액] = useState(0);
    const [결과기대값목록, set결과기대값목록] = useState([0, 0, 0, 0, 0, 0]) // 기대값
    const [결과기대값총합, set결과기대값총합] = useState(0);

    useEffect(() => {
        init();
    }, [])

    function getWinRate() {
        const tempWinRateList = 당첨금액목록.map((_, index) => {
            let prob = 1;
            for(let i=0; i<=index; i++) {
                console.log(`## ${i+1} matches: ${prob} * (${당첨볼갯수-i}/${총볼갯수-i}) = ${prob * ((당첨볼갯수-i)/(총볼갯수-i))}`)
                prob = prob * ((당첨볼갯수-i)/(총볼갯수-i));
            }
            return prob;
        }).reverse();
        set당첨확률목록(tempWinRateList);
        return tempWinRateList;
    }

    function init() {
        getWinRate();
    }

    function onCalculate() {
        if(loading) return;
        setLoading(true);

        const winRateList = getWinRate();
        const 총구매금액 = 총티켓구매수량*티켓가격;
        set총티켓구매금액(총구매금액);
        if(총티켓구매수량 < 0) {
            setLoading(false);
            return;
        }
        // console.log(`## win probability list: ${당첨확률목록}`)

        let totalAmount = 0;
        const 기대값목록 = 당첨금액목록.map((_, index) => {
            const amount = 당첨금액목록[index] < 1 ?
                // 상금 배수 (고등수) => 기댓값
                winRateList[index] * 당첨금액목록[index] * 총티켓구매수량 * 티켓가격:
                // 상금 가격 (저등수)
                winRateList[index] * 당첨금액목록[index] * 총티켓구매수량;
            console.log(`## expected amount: ${당첨금액목록[index] < 1 ? `${winRateList[index]} * ${당첨금액목록[index]} * ${총티켓구매수량} * ${티켓가격}` : `${winRateList[index]} * ${당첨금액목록[index]} * ${총티켓구매수량}`} => ${amount}`);
            totalAmount += amount
            return amount;
        })
        set결과기대값목록(기대값목록);
        set결과기대값총합(totalAmount);
        setLoading(false);
    }

    return (
        <div className={'w-full h-auto flex flex-col justify-center items-center pt-24 pb-36'}>
            <CTitle/>
            <div className={'flex flex-col justify-start items-start gap-y-4 mb-12 p-6 border border-gray-400'}>
                <CBallInfo pickBallCount={당첨볼갯수} setPickBallCount={set당첨볼갯수}
                           totalBallCount={총볼갯수} totalPickBallCount={set총볼갯수}
                           bonus={보너스여부} setBonus={set보너스여부}
                />
                <CTicketPrice ticketPrice={티켓가격} setTicketPrice={set티켓가격}/>
                <CTotalTicket totalCurrencyPrice={총티켓구매수량} setTotalCurrencyPrice={set총티켓구매수량}/>
                <div className={'w-full flex flex-row justify-center mt-6'}>
                    <button
                        onClick={() => onCalculate()}
                        className={`px-4 py-2 border ${loading ? 'text-gray-400 border-gray-400 ' : 'text-white border-white '}`}
                        disabled={loading}
                    >Calculate</button>
                </div>
            </div>
            <CResultTable
                ticketCount={ticketCount} expectedAmount={결과기대값목록} winPriceAmount={당첨금액목록} setWinPriceAmount={set당첨금액목록} winRateList={당첨확률목록} totalPurchaseAmount={총티켓구매금액}/>
            <CResultValues ticketCount={ticketCount} totalTicketPurchaseAmount={총티켓구매금액} totalPrizeAmount={결과기대값총합}/>
        </div>
    )
}