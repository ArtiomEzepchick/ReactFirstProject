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
    value: 'mitsubishi',
    label: 'Mitsubishi'
},
{
    value: 'nissan',
    label: 'Nissan'
},
{
    value: 'bmw',
    label: 'BMW'
},
{
    value: 'mercedes',
    label: 'Mercedes'
}]

export const generateResultData = (values, prevCount) => {
    const entries = Object.entries(values)
    const data = entries.map(item => ({
          label: item[0],
          value: item[1]
        })
    )

    return [...data, { label: 'Previous counter is', value: prevCount }]
}