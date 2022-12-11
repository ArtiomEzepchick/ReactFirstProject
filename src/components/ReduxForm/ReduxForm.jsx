import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Accordion from '../Accordion/Accordion'
import Form from '../Form/Form'
import Button from '../Button/Button'
import ResultsData from '../ResultsData/ResultsData'
import Loader from '../Loader/Loader'
import { useWindowSize } from '../../hooks/useWindowSize'
import {
    initialState,
    asyncSubmit,
    incrementCounter,
    decrementCounter,
    focusTextArea,
    clearForm
} from '../../reducers/reduxReducer/reduxFormSlice'
import { generateResultData } from '../../helpers/formData/formData'
import { accordionReduxPageData } from '../../helpers/accordionData/accordionData'
import { chooseReduxAction } from '../../helpers/chooseReduxAction/chooseReduxAction'

const ReduxForm = () => {
    const dispatch = useDispatch()
    const formSelector = useSelector((state) => state.form)
    const prevCountRef = useRef(0)
    const { width, height } = useWindowSize()
    const resultData = generateResultData(formSelector, { width, height, prevCount: prevCountRef.current })

    useEffect(() => {
        prevCountRef.current = formSelector.count
    }, [formSelector.count])

    const handleFocusTextArea = e => (e.target.value === initialState.commentsField) && dispatch(focusTextArea())

    const handleChange = (e, name) => dispatch(chooseReduxAction(e, name))

    const handleIncreaseCounter = () => dispatch(incrementCounter())

    const handleDecreaseCounter = () => dispatch(decrementCounter())

    const handleReset = () => dispatch(clearForm())

    const handleAsyncSubmit = () => dispatch(asyncSubmit())

    const showResultsBlock = () => {
        if (formSelector.status === 'loading') return <Loader />
        if (formSelector.isLoaded) return <ResultsData data={resultData} counterValue={formSelector.count} />
    }

    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>
                Form using <span className='highlight-red'>Redux Toolkit</span>
            </h1>
            <hr />
            <div className="accordion">
                {accordionReduxPageData.map(({ title, content }) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </div>
            <hr />
            <div className='form-container'>
                <Form
                    formType='redux'
                    state={formSelector}
                    prevCountRef={prevCountRef}
                    isLoaded={formSelector.isLoaded}
                    handleFocusTextArea={handleFocusTextArea}
                    handleChange={handleChange}
                    handleIncreaseCounter={handleIncreaseCounter}
                    handleDecreaseCounter={handleDecreaseCounter}
                    handleAsyncSubmit={handleAsyncSubmit}
                />

                {showResultsBlock()}

                <Button
                    className='reset-button'
                    innerText='Reset'
                    handleClick={handleReset}
                />
            </div>
        </div>
    )
}

export default ReduxForm