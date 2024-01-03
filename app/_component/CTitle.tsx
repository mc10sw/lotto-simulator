import {APP_LAST_UPDATE, APP_VERSION} from "@/app/value";

export default function CTitle() {
    return <div className={'flex flex-col justify-center items-center text-3xl font-medium mb-8'}>
        <div className={'text-center'}>Lotto Drawing Probability Simulator</div>
        <div className={'text-base font-light mt-2'}>{`v${APP_VERSION} (${APP_LAST_UPDATE})`}</div>
    </div>
}