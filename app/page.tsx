'use client';
import CTitle from "@/app/_component/CTitle";
import CTicketCount from "@/app/_component/CRanking";
import {useState} from "react";
import CTotalPrice from "@/app/_component/CTotalPrice";
import CTicketPrice from "@/app/_component/CTicketPrice";
import CBallInfo from "@/app/_component/CBallInfo";

export default function Home() {
    const [pickBallCount, setPickBallCount] = useState(6);
    const [totalBallCount, setTotalBallCount] = useState(40);
    const [bonus, setBonus] = useState(false);
    const [totalCurrencyPrice, setTotalCurrencyPrice] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(1000);
    const [ticketCount, setTicketCount] = useState([0, 0, 0, 0, 0, 0])

    function onCalculate() {
        alert(totalCurrencyPrice)
    }

    return (
        <div className={'w-full h-screen flex flex-col justify-center items-center'}>
            <CTitle/>
            <div className={'flex flex-col justify-start items-start gap-y-4 mb-12 p-6 border border-gray-400'}>
                <CBallInfo pickBallCount={pickBallCount} setPickBallCount={setPickBallCount}
                           totalBallCount={totalBallCount} totalPickBallCount={setTotalBallCount}
                           bonus={bonus} setBonus={setBonus}
                />
                <CTicketPrice ticketPrice={ticketPrice} setTicketPrice={setTicketPrice}/>
                <CTotalPrice totalCurrencyPrice={totalCurrencyPrice} setTotalCurrencyPrice={setTotalCurrencyPrice}/>
                <div className={'w-full flex flex-row justify-center mt-6'}><button className={'px-4 py-2 border border-gray-400'}>Calculate</button></div>
            </div>
            <CTicketCount ticketCount={ticketCount} setTicketCount={setTicketCount}/>
        </div>
    )
}