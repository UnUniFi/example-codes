function(instance, properties, context) {
    const sumLabelTmp = properties.sum_label
    const barColor = properties.bar_color
    let newArray = instance.data.myArray.slice()

    let sumLabel = properties.sum_label
    let minValue = newArray[newArray.length - 1][1]
    let sumLabelAnnotation = 0
    let i = 1

    while (sumLabel > 0 && newArray.length >= i) {
        if (sumLabel - Number(newArray[newArray.length - i][0]) > 0) {
            sumLabelAnnotation += Number(newArray[newArray.length - i][0]) * Number(newArray[newArray.length - i][3].replace(instance.data.annotationSuffix, ''))
        } else {
            sumLabelAnnotation += sumLabel * Number(newArray[newArray.length - i][3].replace(instance.data.annotationSuffix, ''))
        }
        if (minValue > newArray[newArray.length - i][1]) {
            minValue = newArray[newArray.length - i][1]
        }
        newArray[newArray.length - i][2] = instance.data.colorConvert(barColor)
        sumLabel -= Number(newArray[newArray.length - i][0])
        i++
    }
    while (newArray.length >= i) {
        newArray[newArray.length - i][2] = instance.data.colorConvert(instance.data.barColor)
        i++
    }

    if (instance.data.valueType == 'number') {
        instance.publishState('min_value', minValue)
    } else {
        instance.publishState('min_value', minValue.toLocaleString())
    }
    instance.publishState('ave_annotation', (sumLabelAnnotation / sumLabelTmp).toFixed(2))
    instance.data.drawChart(newArray)
}