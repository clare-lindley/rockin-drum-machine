import {useForm} from 'react-hook-form'

export default function ReactHookForm(){


    const { register, handleSubmit, formState } = useForm()

    const onSubmit = (data: any) => {
        console.log({formState})
        console.log({data})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>A THING</label>
                <input type="athing" {...register("athing", { required: true, pattern: /^\S+@\S+$/i })}/>
                {formState.errors.athing && <p>athing is required and must be valid</p>}
            </div>


            <div>
                <label>ANOTHER THING</label>
                <input type="anotherthing" {...register("anotherthing", { required: true })} />
                {formState.errors.anotherthing && <p>anotherthing is required</p>}
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
        </form>
    )

}