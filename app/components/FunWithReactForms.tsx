import { useState } from "react"

export default function FunWithReactForms() {

    const [formData, setFormData] = useState({name:'', email:'', message:''})

    // 1. update form data event handler
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setFormData((previousFormData) => ({...previousFormData, [name]: value}))
    }

    // 2. do something with the form state values on submit
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log({formData})
    }

    // 3. markup for form
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}/>
            <p>Name entered: {formData.name}</p>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
            <p>Email entered: {formData.email}</p>

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange}/>
            <p>Msg entered: {formData.message}</p>

            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">Submit</button>
        </form>
    )
}