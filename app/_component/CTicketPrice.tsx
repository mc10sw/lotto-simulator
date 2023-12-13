export default function CTicketPrice(
    {ticketPrice, setTicketPrice}:
        {
            ticketPrice: number,
            setTicketPrice: any,
        }) {
    return<div className={'flex flex-row gap-x-2'}>
        <div className={'w-[200px]'}>Ticket Price: </div>
        <div className={'flex flex-col gap-y-1'}>
            <div className={'flex flex-row gap-x-2'}>
                <input
                    className={'text-black px-2'}
                    value={ticketPrice}
                    type={'number'}
                    onChange={(e: any) => {
                        e.preventDefault();
                        setTicketPrice(e.target.value);
                    }}
                />
            </div>
        </div>
    </div>
}