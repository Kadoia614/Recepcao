import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {

    return(
        <>
        <div className="absolute h-full w-full l-0 t-0 flex justify-center items-center z-50 bg-background opacity-50">
            <ProgressSpinner></ProgressSpinner>
        </div>
        </>
    )
}

export default Loading;