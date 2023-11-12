import React, { useState } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";


interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const  CheckboxButtons = ({ items, checked, onChange }: Props) =>{
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === -1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(i => i !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel
                    key={item}
                    control={<Checkbox
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                    label={item} />
            ))}
        </FormGroup>
    )
}
export default CheckboxButtons;