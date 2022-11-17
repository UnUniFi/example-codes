function(instance, properties, context) {
    function colorConvert(color) {
        if (color.match("rgba")) {
            var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
            var converted_color = `${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
        }
        else {
            var converted_color = properties.legend_color;
        }
        return converted_color
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

    var arraynumber = values.map(function (value, i) {
        return Number(value);
    });

    var arrayannotation = annotations.map(function (value, i) {
        return value.trim() + properties.annotation_suffix;
    });

    var myarray = labels.map(function (value, i) {
        return [value.trim(), arraynumber[i], generateRandomColor(), arrayannotation[i]];
    });
    console.log(myarray)

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
            data.addColumn('number', properties.value_legend);
            data.addColumn({ type: 'string', role: 'style' });
            data.addColumn({ type: 'string', role: 'annotation' });
            data.addRows(myarray);

            // Set chart options        
            var options = {
                title: properties.title,
                titleTextStyle: { color: '#' + colorConvert(properties.title_color), fontSize: properties.title_font_size, bold: properties.title_bold },
                width: properties.width,
                height: properties.height,
                backgroundColor: 'none',
                legend: { textStyle: { color: '#' + colorConvert(properties.legend_color), fontSize: properties.legend_font_size, bold: properties.legend_bold } },
                vAxis: { textStyle: { color: '#' + colorConvert(properties.vaxis_color) }, gridlines: { color: '#' + colorConvert(properties.vaxis_color) }, fontSize: properties.vaxis_font_size },
                hAxis: { textStyle: { color: '#' + colorConvert(properties.haxis_color) }, gridlines: { color: '#' + colorConvert(properties.haxis_color) }, fontSize: properties.haxis_font_size },
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.BarChart(document.getElementById(chartID));
            chart.draw(data, options);
        }
    });
}