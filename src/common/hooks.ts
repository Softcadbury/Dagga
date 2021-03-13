import React, { ChangeEvent, useState } from 'react';

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
