import {FormEvent, useState} from "react";
import './style.css'
import {IoIosWarning} from "react-icons/io";
import {BarLoader} from "react-spinners";

function App() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [data, setData] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handlePromise = async (data: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data === '') return reject('Promise rejected. You provided blank data.')
                return resolve()
            }, 1000)
        })
    }

    const handleModalSubmit = (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage('')

        handlePromise(data)
            .then(() => {
                setData('')
                setErrorMessage('')
                setIsModalOpen(false)
                setCurrentStep(step => step + 1)
            })
            .catch(e => {
                setErrorMessage(e)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <>
            <div id="container">
                <h1>Promise Modal</h1>
                <p>Current Step: {currentStep}</p>
                <p>Simple example for showing resolving/rejecting promise in a modal before closing it.</p>
                <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
            </div>

            {isModalOpen && (
                <>
                    <div id="overlay" onClick={() => setIsModalOpen(false)}></div>
                    <div id="modal" onClick={e => e.stopPropagation()}>
                        <header>
                            <h2>Fill Your Information</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)}>X</button>
                        </header>
                        {isLoading && <BarLoader speedMultiplier={0.75}/>}
                        <form onSubmit={handleModalSubmit}>
                            {errorMessage && (
                                <span id="errorMessage"><IoIosWarning/>{errorMessage}</span>
                            )}
                            <p>
                                Promise will be resolved if data is entered, otherwise it will be rejected.
                            </p>
                            <label>
                                Enter data:
                                <input value={data} onChange={e => setData(e.target.value)}/>
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}

export default App
