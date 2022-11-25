function(instance, properties, context) {
    const labels = properties.labels.split(',');
    const values = properties.values.split(',');
    const annotations = properties.annotations.split(',');

    const arrayAnnotation = annotations.map(function (value, i) {
        return value.trim() + properties.annotation_suffix;
    });

    instance.data.myArray = labels.map(function (value, i) {
        if (properties.value_type == 'number') {
            const arrayNumber = values.map(function (value, i) {
                return Number(value);
            });
            return [value.trim(), arrayNumber[i], instance.data.colorConvert(properties.bar_color), arrayAnnotation[i]];
        } else {
            const arrayDate = values.map(function (value, i) {
                return (new Date(Number(value)));
            });
            return [value.trim(), arrayDate[i], instance.data.colorConvert(properties.bar_color), arrayAnnotation[i]];
        }
    });

    // Set chart options  
    instance.data.options = {
        title: properties.title,
        titleTextStyle: { color: instance.data.colorConvert(properties.title_color), fontSize: properties.title_font_size, bold: properties.title_bold },
        width: properties.width,
        height: properties.height,
        backgroundColor: 'none',
        legend: { position: properties.legend_position, textStyle: { color: instance.data.colorConvert(properties.legend_color), fontSize: properties.legend_font_size, bold: properties.legend_bold } },
        vAxis: { title: properties.label_legend, titleTextStyle: { color: instance.data.colorConvert(properties.vaxis_color), fontSize: properties.vaxis_font_size }, textStyle: { color: instance.data.colorConvert(properties.vaxis_color) }, gridlines: { color: instance.data.colorConvert(properties.vaxis_color) }, fontSize: properties.vaxis_font_size },
        hAxis: { title: properties.value_legend, titleTextStyle: { color: instance.data.colorConvert(properties.haxis_color), fontSize: properties.haxis_font_size }, textStyle: { color: instance.data.colorConvert(properties.haxis_color) }, gridlines: { color: instance.data.colorConvert(properties.haxis_color) }, fontSize: properties.haxis_font_size },
        bar: { groupWidth: properties.bar_width + '%' },
        annotations: {
            alwaysOutside: true,
            highContrast: false,
            stem: {
                color: instance.data.colorConvert(properties.annotation_stem_color), length: properties.annotation_stem_length
            },
            textStyle: {
                fontSize: properties.annotation_font_size, bold: true, color: instance.data.colorConvert(properties.annotation_color), opacity: 0.8
            },

        }
    };
    instance.data.width = properties.bubble.width()
    instance.data.height = properties.bubble.height()
    instance.data.labelLegend = properties.label_legend
    instance.data.valueType = properties.value_type
    instance.data.valueLegend = properties.value_legend
    instance.data.sortedBy = properties.sorted_by
    instance.data.annotationSuffix = properties.annotation_suffix
    instance.data.barColor = properties.bar_color
    instance.data.drawChart(instance.data.myArray)
    const minValue = instance.data.myArray.reduce((prev, curr) => prev < curr[1] ? prev : curr[1], instance.data.myArray[0][1])
    if (properties.value_type == 'number') {
        instance.publishState('min_value', minValue)
    } else {
        instance.publishState('min_value', minValue.toLocaleString())
    }
    const sumLabelAnnotation = instance.data.myArray.reduce((prev, curr) => prev + Number(curr[0]) * Number(curr[3].replace(instance.data.annotationSuffix, '')), 0)
    const sumLabel = instance.data.myArray.reduce((prev, curr) => prev + Number(curr[0]), 0)
    instance.data.sumLabelAnnotation = sumLabelAnnotation
    instance.data.sumLabel = sumLabel
    instance.publishState('ave_annotation', (sumLabelAnnotation / sumLabel).toFixed(2))
}