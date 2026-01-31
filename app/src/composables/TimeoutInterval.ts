// import TimeoutService from "@src/services/TimeoutService";

export default function useTimeoutInterval(callback: CallableFunction, interval: number) {
    let intervalTimerId: number | null = null;

    // TimeoutService.registerCallback((timeout: boolean) => handleInterval(timeout));

    handleInterval(true);

    function handleInterval(isTimeout: boolean) {
        if (isTimeout && !intervalTimerId) {
            if (intervalTimerId) {
                clearInterval(intervalTimerId);
            }

            intervalTimerId = setInterval(() => callback(), interval);
        }

        if (!isTimeout && intervalTimerId) {
            clearInterval(intervalTimerId);
            intervalTimerId = null;
        }
    }

    return {};
}