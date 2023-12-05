import {useState} from 'react'
 
export default function  CreateDrumMachineForm()  {

/**
 * 1. Define the initial value with the useState hook
 * 2. Set the value using the value attribute
 * 3. Handle the value changing and update the state
 * 
 * IF YOU WANT REACT TO MANAGE THE STATE, USE useState hook. 
 * IF YOU WANT THE DOM TO MANAGE THE STATE, USE useRef hook
 */

    const [inputValue, setInputValue] = useState('')
    const [selectedOption, setSelectedOption] = useState('option1')
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked)
    }

return  (
    <>
    <form>
        <label>Input Value
            <input type='text' value={inputValue} onChange={handleChange} />
        </label>
        <p>Input value {inputValue}</p>
        <label htmlFor="color">
            <input type="checkbox" name="color" checked={isChecked} onChange={handleCheckboxChange}/>Blue
        </label>
        {isChecked && <div>Blue is selected!</div>}
    </form>
    <div>
        <label>
            Select an option
            <select value={selectedOption} onChange={handleDropdownChange}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </select>
            <p>Selected value {selectedOption}</p>
        </label>
    </div>
    </>
)

}