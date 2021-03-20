import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

export type InputChangeCallbackType = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export function useTextField(
    initialValue: string
): [
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    onChangeCallback: InputChangeCallbackType
] {
    const [value, setValue] = useState(initialValue);

    const onChangeCallback = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.currentTarget.value);
    };

    return [value, setValue, onChangeCallback];
}

export type SliderChangeCallbackType = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
) => void;

export function useSlider(
    initialValue: number
): [
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    onChangeCallback: SliderChangeCallbackType
] {
    const [value, setValue] = useState(initialValue);

    const onChangeCallback = (
        event: React.ChangeEvent<{}>,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) {
            setValue(newValue[0]);
        } else {
            setValue(newValue);
        }
    };

    return [value, setValue, onChangeCallback];
}

export function useToggleState(
    defaultValue: boolean = false
): [boolean, () => void] {
    const [value, setValue] = useState(defaultValue);
    return [value, useCallback(() => setValue(!value), [value])];
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const debouncedSave = useRef(
        debounce(
            (newValue: T) =>
                window.localStorage.setItem(key, JSON.stringify(newValue)),
            400
        )
    ).current;

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            debouncedSave(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
