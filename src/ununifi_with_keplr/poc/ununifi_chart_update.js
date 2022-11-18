function(instance, properties, context) {
    function colorConvert(color) {
        if (color.match("rgba")) {
            var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
            var convertedColor = `${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
        }
        else {
            var convertedColor = properties.legend_color;
        }
        return convertedColor
    }

    function generateRandomColor() {
        var randomColor = 'color: #';
        for (var i = 0; i < 6; i++) {
            randomColor += (16 * Math.random() | 0).toString(16);
        }
        return randomColor
    }

    var chartID = instance.data.id;
    var div = $('<div id="' + chartID + '" style="width: ' + properties.bubble.width() + 'px; height:' + properties.bubble.height() + 'px;"></div>');
    $(instance.canvas[0]).html(div);
    var labels = properties.labels.split(',');
    var values = properties.values.split(',');
    var annotations = properties.annotations.split(',');

    var arrayNumber = values.map(function (value, i) {
        return Number(value);
    });

    var arrayDate = values.map(function (value, i) {
        return (new Date(Number(value)));
    });

    var arrayAnnotation = annotations.map(function (value, i) {
        return value.trim() + properties.annotation_suffix;
    });

    var myArray = labels.map(function (value, i) {
        if (properties.value_type == 'number') {
            return [value.trim(), arrayNumber[i], generateRandomColor(), arrayAnnotation[i]];
        } else {
            return [value.trim(), arrayDate[i], generateRandomColor(), arrayAnnotation[i]];
        }
    });
    console.log(myArray)
    console.log(colorConvert(properties.annotation_color))

    $(document).ready(function () {
        // Load the Visualization API and the corechart package.
        google.charts.load('current', { 'packages': ['corechart'] });

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', properties.label_legend);
            data.addColumn(properties.value_type, properties.value_legend);
            data.addColumn({ type: 'string', role: 'style' });
            data.addColumn({ type: 'string', role: 'annotation' });
            data.addRows(myArray);

            // Set chart options        
            var options = {
                title: properties.title,
                titleTextStyle: { color: '#' + colorConvert(properties.title_color), fontSize: properties.title_font_size, bold: properties.title_bold },
                width: properties.width,
                height: properties.height,
                backgroundColor: 'none',
                legend: { position: properties.legend_position, textStyle: { color: '#' + colorConvert(properties.legend_color), fontSize: properties.legend_font_size, bold: properties.legend_bold } },
                vAxis: { title: properties.label_legend, titleTextStyle: { color: '#' + colorConvert(properties.vaxis_color), fontSize: properties.vaxis_font_size }, textStyle: { color: '#' + colorConvert(properties.vaxis_color) }, gridlines: { color: '#' + colorConvert(properties.vaxis_color) }, fontSize: properties.vaxis_font_size },
                hAxis: { title: properties.value_legend, titleTextStyle: { color: '#' + colorConvert(properties.haxis_color), fontSize: properties.haxis_font_size }, textStyle: { color: '#' + colorConvert(properties.haxis_color) }, gridlines: { color: '#' + colorConvert(properties.haxis_color) }, fontSize: properties.haxis_font_size },
                bar: { groupWidth: properties.bar_width + '%' },
                annotations: {
                    alwaysOutside: true,
                    highContrast: false,
                    stem: {
                        color: '#' + colorConvert(properties.annotation_stem_color), length: properties.annotation_stem_length
                    },
                    textStyle: {
                        fontSize: properties.annotation_font_size, bold: true, color: '#' + colorConvert(properties.annotation_color), opacity: 0.8
                    },

                }
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.BarChart(document.getElementById(chartID));
            chart.draw(data, options);
        }
    });
}