// Header
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

// initialize
function(instance, context) {
    var chartID = "chart" + (Math.random() * Math.pow(3, 60)).toString();
    instance.data.id = chartID;
}