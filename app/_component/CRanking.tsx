export default function CRanking({ticketCount, setTicketCount}:
{ticketCount: number[], setTicketCount: any}) {
    return <div className={'flex flex-col items-start'}>
        { ticketCount.map((count, index) => {
            return <div
                key={`count_${index}`}
                className={'flex flex-row gap-x-2 mb-2'}>
                <div className={'w-[16px]'}>{index+1}</div>
                <input
                    className={'text-black px-2'}
                    value={ticketCount[index]}
                />
            </div>
        })}
    </div>
}