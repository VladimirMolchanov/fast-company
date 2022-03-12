import { useEffect, useState } from "react";
import profession from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../service/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "NotStarted",
        padding: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = profession.length + qualities.length + users.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && statusConsts.idle) {
            setStatus(statusConsts.padding);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of profession) {
                await httpService.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpService.put("quality/" + quality._id, quality);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put("users/" + user._id, user);
                incrementCount();
            }
        } catch (e) {
            setError(e);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
