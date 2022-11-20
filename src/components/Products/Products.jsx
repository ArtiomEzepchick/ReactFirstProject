import React, { useReducer, useEffect, useRef, useMemo } from 'react'
import { formReducer, initialValues } from '../../components/Form/formReducer'
import Form from '../Form/Form'
import Input from '../Input/Input'
import Button from '../Button/Button'
import TextArea from '../TextArea/TextArea'
import Select from '../Select/Select'
import ResultsData from '../ResultsData/ResultsData'

const Products = () => {
    const [state, dispatch] = useReducer(formReducer, initialValues)
    const userRef = useRef(null)
    const countRef = useRef(0)

    const getRefCount = (ref) => ref.current

    const memoCount = useMemo(() => getRefCount(countRef), [state.count])

    useEffect(() => {
        countRef.current = state.count
    }, [state.count])

    return (
        <div className='products-layout'>
            <h1>This is the <span className='color-red'>Products</span> page</h1>
            <div className='products-container'>
                <Form className='products-form'>
                    <Input
                        id='name'
                        type='text'
                        labelText='Name'
                        value={state.name}
                        handleChange={e => dispatch({ type: 'nameChange', payload: e.target.value })}
                    />
                    <Input
                        id='surname'
                        type='text'
                        labelText='Surname'
                        value={state.surname}
                        handleChange={e => dispatch({ type: 'surnameChange', payload: e.target.value })}
                    />
                    <Input
                        id='password'
                        type='password'
                        labelText='Password'
                        value={state.password}
                        handleChange={e => dispatch({ type: 'passwordChange', payload: e.target.value })}
                    />
                    <Input
                        id='email'
                        type='email'
                        labelText='E-mail'
                        value={state.email}
                        handleChange={e => dispatch({ type: 'emailChange', payload: e.target.value })}
                    />
                    <Input
                        id='tel'
                        type='tel'
                        labelText='Tel.'
                        value={state.tel}
                        handleChange={e => dispatch({ type: 'telChange', payload: e.target.value })}
                    />
                    <Input
                        id='age'
                        type='number'
                        labelText='Age'
                        value={state.age}
                        handleChange={e => dispatch({ type: 'ageChange', payload: e.target.value })}
                    />
                    <Select
                        value={state.carBrands}
                        handleChange={e => dispatch({ type: 'carBrandsChange', payload: e.target.value })}
                    >
                        <option value="mitsubishi">Mitsubishi</option>
                        <option value="nissan">Nissan</option>
                        <option value="bmw">BMW</option>
                        <option value="mercedes">Mercedes</option>
                    </Select>
                    <TextArea
                        value={state.commentsField}
                        handleChange={e => dispatch({ type: 'commentsFieldChange', payload: e.target.value })}
                    />
                    <div className='counter-actions'>
                        <h3>Change Counter</h3>
                        <Button
                            innerText='Increase'
                            handleClick={() => dispatch({ type: 'increment' })}
                        />
                        <Button
                            innerText='Decrease'
                            handleClick={() => dispatch({ type: 'decrement' })}
                        />
                    </div>
                </Form>

                <ResultsData values={state} userRef={userRef.current} countRef={memoCount}/>

                <Button
                    className='reset-button'
                    innerText='Reset'
                    handleClick={() => dispatch({ type: 'reset' })}
                />
            </div>
        </div>
    )
}

export default Products