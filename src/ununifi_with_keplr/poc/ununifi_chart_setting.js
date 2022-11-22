// Header
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

// initialize
function(instance, context) {
    const chartID = "chart" + (Math.random() * Math.pow(3, 60)).toString();
    instance.data.id = chartID;

    instance.data.drawChart = (array) => {
        const div = $('<div id="' + chartID + '" style="width: ' + instance.data.width + 'px; height:' + instance.data.height + 'px;"></div>');
        $(instance.canvas[0]).html(div);

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
                const data = new google.visualization.DataTable();
                data.addColumn('string', instance.data.labelLegend);
                data.addColumn(instance.data.valueType, instance.data.valueLegend);
                data.addColumn({ type: 'string', role: 'style' });
                data.addColumn({ type: 'string', role: 'annotation' });
                data.addRows(array.sort((x, y) => x[1] - y[1]));

                // Instantiate and draw our chart, passing in some options.
                const chart = new google.visualization.BarChart(document.getElementById(chartID));
                chart.draw(data, instance.data.options);
            }
        });
    }
}