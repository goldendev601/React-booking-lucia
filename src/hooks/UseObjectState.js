import {useCallback, useState} from 'react';

export const useObjectState = () => {
    const [data, setData] = useState();
    const onSetData = useCallback(
        (newData) => setData((prev) => ({...prev || {}, ...newData || {}})),
        []
    );
    const onClear = useCallback(() => setData({}), []);
    return [data, onSetData, onClear];
};