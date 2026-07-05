interface Props {
    value: string;
    onChange: (value: string) => void;
}

function TextInput({ value, onChange, }: Props) {
    return (
        <textarea
            className="w-fullrounded-lgborderp-4text-lgoutline-nonefocus:border-blue-500"
            rows={6}
            placeholder="Type something..."
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
    );
}

export default TextInput;