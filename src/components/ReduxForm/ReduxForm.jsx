import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Accordion from '../Accordion/Accordion'
import FormForStateManagers from '../FormForStateManagers/FormForStateManagers'
import Button from '../Button/Button'
import ResultsData from '../ResultsData/ResultsData'
import Loader from '../Loader/Loader'
import { useWindowSize } from '../../hooks/useWindowSize'
import {
    asyncSubmit,
    changeFormValue,
    incrementCounter,
    decrementCounter,
    clearForm
} from '../../reducers/reduxReducer/reduxFormSlice'
import { generateResultData } from '../../helpers/formHelpers/formStateManagersData'
import { accordionReduxPageData } from '../../helpers/accordionData/accordionData'
import './styles.css'

const ReduxForm = () => {
    const dispatch = useDispatch()
    const formData = useSelector((state) => state.form)
    const isLoading = useSelector((state) => state.form.isLoading)
    const isLoaded = useSelector((state) => state.form.isLoaded)
    const prevCountRef = useRef(0)
    const { width, height } = useWindowSize()
    const resultData = generateResultData(formData, { width, height, prevCount: prevCountRef.current })

    useEffect(() => {
        prevCountRef.current = formData.count
    }, [formData.count])

    const handleChange = (e) => dispatch(changeFormValue({ value: e.target.value, name: e.target.name }))

    const handleIncreaseCounter = () => dispatch(incrementCounter())

    const handleDecreaseCounter = () => dispatch(decrementCounter())

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(asyncSubmit())
    }

    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>
                Form using <span className='highlight-turk'>Redux Toolkit</span>
            </h1>
            <hr />
            <div className="accordion-container">
                {accordionReduxPageData.map(({ title, content }) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </div>
            <hr />
            <div className='main-container'>
                <FormForStateManagers
                    state={formData}
                    prevCountRef={prevCountRef}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleIncreaseCounter={handleIncreaseCounter}
                    handleDecreaseCounter={handleDecreaseCounter}
                />

                {isLoading ?
                    <Loader /> :
                    <ResultsData
                        isLoaded={isLoaded}
                        data={resultData}
                        counterValue={formData.count}
                    />
                }

                <Button className='reset-button' handleClick={() => dispatch(clearForm())}>Reset</Button>
            </div>
        </div>
    )
}

export default ReduxForm