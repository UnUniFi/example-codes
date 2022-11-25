function(instance, properties, context) {
    const label = properties.label
    const barColor = properties.bar_color
    let newArray = instance.data.myArray.slice()

    let sumLabel = properties.label
    let sumLabelAnnotation = 0
    let i = 0
    let j = 0

    while (sumLabel > 0 && i < newArray.length) {
        if (sumLabel > Number(newArray[i][0])) {
            sumLabelAnnotation += Number(newArray[i][0]) * Number(newArray[i][3].replace(instance.data.annotationSuffix, ''))
        } else {
            sumLabelAnnotation += sumLabel * Number(newArray[i][3].replace(instance.data.annotationSuffix, ''))
            newArray[i][2] = instance.data.colorConvert(barColor)
            j++
            break
        }
        newArray[i][2] = instance.data.colorConvert(barColor)
        sumLabel -= Number(newArray[i][0])
        i++
        j++
    }
    while (j < newArray.length) {
        newArray[j][2] = instance.data.colorConvert(instance.data.barColor)
        j++
    }
    const aveAnnotation = (instance.data.sumLabelAnnotation - sumLabelAnnotation) / (instance.data.sumLabel - label)
    instance.publishState('ave_annotation', aveAnnotation.toFixed(2))
    const minValue = newArray.slice(i).reduce((prev, curr) => prev < curr[1] ? prev : curr[1], instance.data.myArray[0][1])
    if (instance.data.valueType == 'number') {
        instance.publishState('min_value', minValue)
    } else {
        instance.publishState('min_value', minValue.toLocaleString())
    }
    instance.data.drawChart(newArray)
}