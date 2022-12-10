export const inputs = [{
    type: 'text',
    labelText: 'Name',
    name: 'name',
},
{
    type: 'text',
    labelText: 'Surname',
    name: 'surname',
},
{
    type: 'password',
    labelText: 'Password',
    name: 'password',
},
{
    type: 'email',
    labelText: 'E-mail',
    name: 'email',
},
{
    type: 'tel',
    labelText: 'Tel.',
    name: 'tel',
},
{
    type: 'number',
    labelText: 'Age',
    name: 'age',
}]

export const options = [{
    value: 'Mitsubishi',
    label: 'Mitsubishi'
},
{
    value: 'Nissan',
    label: 'Nissan'
},
{
    value: 'BMW',
    label: 'BMW'
},
{
    value: 'Mercedes',
    label: 'Mercedes'
}]

export const generateResultData = (values, additionalData) => {
    const { width, height, prevCount } = additionalData
    const entries = Object.entries(values)
    const data = entries.map(item => ({
          label: item[0],
          value: item[1]
        })
    )

    return [
        ...data, 
        { label: 'Previous count is', value: prevCount }, 
        { label: 'Current screen width', value: width }, 
        { label: 'Current screen height', value: height }
    ]
}