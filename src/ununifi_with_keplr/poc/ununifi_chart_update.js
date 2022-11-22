function(instance, properties, context) {
    function colorConvert(color) {
        let convertedColor
        if (color.match("rgba")) {
            const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
            convertedColor = `${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
        }
        else {
            convertedColor = properties.legend_color;
        }
        return '#' + convertedColor
    }

    function generateRandomColor() {
        const randomColor = 'color: #';
        for (const i = 0; i < 6; i++) {
            randomColor += (16 * Math.random() | 0).toString(16);
        }
        return randomColor
    }

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
            return [value.trim(), arrayNumber[i], colorConvert(properties.bar_color), arrayAnnotation[i]];
        } else {
            const arrayDate = values.map(function (value, i) {
                return (new Date(Number(value)));
            });
            return [value.trim(), arrayDate[i], colorConvert(properties.bar_color), arrayAnnotation[i]];
        }
    });

    // Set chart options  
    instance.data.options = {
        title: properties.title,
        titleTextStyle: { color: colorConvert(properties.title_color), fontSize: properties.title_font_size, bold: properties.title_bold },
        width: properties.width,
        height: properties.height,
        backgroundColor: 'none',
        legend: { position: properties.legend_position, textStyle: { color: colorConvert(properties.legend_color), fontSize: properties.legend_font_size, bold: properties.legend_bold } },
        vAxis: { title: properties.label_legend, titleTextStyle: { color: colorConvert(properties.vaxis_color), fontSize: properties.vaxis_font_size }, textStyle: { color: colorConvert(properties.vaxis_color) }, gridlines: { color: colorConvert(properties.vaxis_color) }, fontSize: properties.vaxis_font_size },
        hAxis: { title: properties.value_legend, titleTextStyle: { color: colorConvert(properties.haxis_color), fontSize: properties.haxis_font_size }, textStyle: { color: colorConvert(properties.haxis_color) }, gridlines: { color: colorConvert(properties.haxis_color) }, fontSize: properties.haxis_font_size },
        bar: { groupWidth: properties.bar_width + '%' },
        annotations: {
            alwaysOutside: true,
            highContrast: false,
            stem: {
                color: colorConvert(properties.annotation_stem_color), length: properties.annotation_stem_length
            },
            textStyle: {
                fontSize: properties.annotation_font_size, bold: true, color: colorConvert(properties.annotation_color), opacity: 0.8
            },

        }
    };
    instance.data.width = properties.bubble.width()
    instance.data.height = properties.bubble.height()
    instance.data.labelLegend = properties.label_legend
    instance.data.valueType = properties.value_type
    instance.data.valueLegend = properties.value_legend

    instance.data.drawChart(instance.data.myArray)
}