function(instance, properties, context) {
    const label = properties.label;
    const value = properties.value;
    const annotation = properties.annotation;
    const barColor = properties.bar_color;

    function colorConvert(color) {
        if (color.match("rgba")) {
            var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
            var convertedColor = `${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
        }
        else {
            var convertedColor = properties.legend_color;
        }
        return '#' + convertedColor
    }

    // initialize
    let newArray = instance.data.myArray
    console.log(label.trim(), value, colorConvert(barColor), annotation)
    newArray[newArray.length] = [label.trim(), value, colorConvert(barColor), annotation + '%']
    console.log(newArray)
    instance.data.drawChart(newArray)
}