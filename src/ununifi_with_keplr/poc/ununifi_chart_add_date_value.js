function(instance, properties, context) {
    const label = properties.label;
    const value = properties.value;
    const annotation = properties.annotation;
    const barColor = properties.bar_color;

    // initialize
    let newArray = instance.data.myArray.slice()
    newArray[newArray.length] = [label.trim(), value, instance.data.colorConvert(barColor), annotation + '%']
    instance.data.drawChart(newArray)
}