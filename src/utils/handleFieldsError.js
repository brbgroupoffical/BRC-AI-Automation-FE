export const handleFieldsError = (data) => {
    const fieldsError = {}
    if (typeof data === 'object') {
        Object.keys(data).forEach((field) => {
            if (Array.isArray(data[field])) {
                console.log('Handling array error for field:', field, data[field])
                fieldsError[field] = data[field].join(' ')
            }
            else {
                console.log('Handling string error for field:', field, data[field])
                fieldsError[field] = data[field]
            }
        })
    }
    return fieldsError
}



