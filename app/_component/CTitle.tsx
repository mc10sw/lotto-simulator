export default function CTitle() {
    return <div className={'flex flex-col justify-center items-center text-3xl font-medium mb-8'}>
        <div>Lotto Drawing Probability Simulator</div>
        <div className={'text-base font-light mt-2'}>{`v${process.env.NEXT_PUBLIC_VERSION} (${process.env.NEXT_PUBLIC_LAST_UPDATE})`}</div>
    </div>
}