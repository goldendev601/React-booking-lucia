import {useCallback, useState} from "react"

export const useInputState = () => {
    const [data, setData] = useState([]);

    const handleChange = useCallback((e, index) => {
        const {name, value} = e.target;

        // setData(prevState => ([...prevState, {[target.name]: target.value}]));
        const list = [...data];
        list[index][name] = value;
        setData(list);

    }, [data, setData]);

    const handleRemoveItem = useCallback((index) => {
        const list = [...data];
        list.splice(index, 1);
        setData(list);
    }, [data])

    const handleAddItem = useCallback((object) => {
        setData(prevState => [...prevState, {
            ...object
        }]);
    }, []);

    return [data, handleChange, handleRemoveItem, handleAddItem];
}