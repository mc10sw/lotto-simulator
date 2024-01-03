export default function CBallInfo(
    {pickBallCount, setPickBallCount, totalBallCount, totalPickBallCount, bonus, setBonus}:
        {
            pickBallCount: number,
            setPickBallCount: any,
            totalBallCount: number,
            totalPickBallCount: any,
            bonus: boolean,
            setBonus: any
        }) {
    return<div className={'flex flex-row gap-x-2'}>
        <div className={'w-[200px]'}>Game Rule: </div>
        <div className={'flex flex-col gap-y-2'}>
            <div className={'flex flex-row gap-x-2'}>
                <input
                    className={'w-[60px] text-black px-2'}
                    value={pickBallCount}
                    type={'number'}
                    onChange={(e: any) => {
                        e.preventDefault();
                        setPickBallCount(e.target.value);
                    }}
                />
                <div className={'px-2'}>/</div>
                <input
                    className={'w-[60px] text-black px-2'}
                    value={totalBallCount}
                    type={'number'}
                    onChange={(e: any) => {
                        e.preventDefault();
                        totalPickBallCount(e.target.value);
                    }}
                />
            </div>
            <div className={'flex flex-row'}>
                <div className={'me-4'}>Bonus</div>
                <input
                    type={'checkbox'}
                    checked={bonus}
                    onChange={(e: any) => {
                        console.log(`## e.target.checked: ${e.target.checked}`);
                        setBonus(e.target.checked);
                        // e.preventDefault();
                    }}
                />
            </div>
        </div>
    </div>
}