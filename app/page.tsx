'use client';
import CTitle from "@/app/_component/CTitle";
import CTicketCount from "@/app/_component/CResultTable";
import {useState} from "react";
import CTotalPrice from "@/app/_component/CTotalPrice";
import CTicketPrice from "@/app/_component/CTicketPrice";
import CBallInfo from "@/app/_component/CBallInfo";
import CResultTable from "@/app/_component/CResultTable";

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [pickBallCount, setPickBallCount] = useState(6);
    const [totalBallCount, setTotalBallCount] = useState(40);
    const [bonus, setBonus] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(1000);


    const [ticketCount, setTicketCount] = useState([0, 0, 0, 0, 0, 0])
    const [expectedAmount, setExpectedAmount] = useState([0, 0, 0, 0, 0, 0])

    const [winPriceAmount, setWinPriceAmount] = useState([0.375, 0.065, 0.065, 2000000, 50000, 10000])

    function onCalculate() {
        if(loading) return;
        setLoading(true);

        const ticketCount = Math.floor(totalPrice/ticketPrice);
        const totalBoughtAmount = totalPrice - (totalPrice%ticketPrice);
        if(ticketCount < 0) {
            setLoading(false);
            return;
        }

        const winProbabilityList = winPriceAmount.map((_, index) => {
            let prob = 1;
            for(let i=0; i<=index; i++) {
                prob = prob * (1/(totalBallCount-i));
            }
            return prob;
        }).reverse();
        console.log(`## win probability list: ${winProbabilityList}`)

        const expectedAmountList = winPriceAmount.map((_, index) => {
            const amount = winPriceAmount[index] < 1 ?
                // 상금 배수 (고등수) => 기댓값
                winProbabilityList[index] * totalBoughtAmount * winPriceAmount[index]:
                // 상금 가격 (저등수)
                winProbabilityList[index] * winPriceAmount[index];
            console.log(`## expected amount: ${winPriceAmount[index] < 1 ? `${winProbabilityList[index]} * ${totalBoughtAmount}` : `${winProbabilityList[index]} * ${ticketPrice}`} => ${amount}`);
            return amount;
        })
        setExpectedAmount(expectedAmountList);
        setLoading(false);
    }

    return (
        <div className={'w-full h-auto flex flex-col justify-center items-center py-36'}>
            <CTitle/>
            <div className={'flex flex-col justify-start items-start gap-y-4 mb-12 p-6 border border-gray-400'}>
                <CBallInfo pickBallCount={pickBallCount} setPickBallCount={setPickBallCount}
                           totalBallCount={totalBallCount} totalPickBallCount={setTotalBallCount}
                           bonus={bonus} setBonus={setBonus}
                />
                <CTicketPrice ticketPrice={ticketPrice} setTicketPrice={setTicketPrice}/>
                <CTotalPrice totalCurrencyPrice={totalPrice} setTotalCurrencyPrice={setTotalPrice}/>
                <div className={'w-full flex flex-row justify-center mt-6'}>
                    <button
                        onClick={() => onCalculate()}
                        className={`px-4 py-2 border ${loading ? 'text-gray-400 border-gray-400 ' : 'text-white border-white '}`}
                        disabled={loading}
                    >Calculate</button>
                </div>
            </div>
            <CResultTable
                ticketCount={ticketCount} expectedAmount={expectedAmount} winPriceAmount={winPriceAmount} pickBallCount={pickBallCount}/>
        </div>
    )
}