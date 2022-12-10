import {
    changeName,
    changeSurname,
    changePassword,
    changeEmail,
    changeTel,
    changeAge,
    changeCarBrands,
    changeCommentsField,
} from '../../reducers/reduxReducer/reduxFormSlice'

export const chooseReduxAction = (name, targetValue) => {
    switch (name) {
        case 'name':
            return changeName(targetValue)
        case 'surname':
            return changeSurname(targetValue)
        case 'password':
            return changePassword(targetValue)
        case 'email':
            return changeEmail(targetValue)
        case 'tel':
            return changeTel(targetValue)
        case 'age':
            return changeAge(targetValue)
        case 'carBrands':
            return changeCarBrands(targetValue)
        case 'commentsField':
            return changeCommentsField(targetValue)
        default:
            throw new Error()
    }
}