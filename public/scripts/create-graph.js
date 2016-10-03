$(document).ready(function() {
  let voteresult = [];
  let votechoice = [];
  let title = "";
  let winner = "";
  $('#history').on('click','.panel-primary', function(ev) {
    let question = $(this)['0'].attributes['1'].value;
    $.ajax({
      url: '/graph',
      method: 'post',
      data: question
    }).done(function(data) {
      voteresult = data[0];
      votechoice = data[1];
      title = data[2];
      winner = data[3];
      $('div.poll-container').empty();
      let $graph = $(`
        <div id="myDiv" style="width: 480px; height: 400px;"></div>
      `);
      $('div.poll-container').append($graph);
      var data = [{
        x: votechoice,
        y: voteresult,
        type: 'bar',
        marker: {
          color: 'rgb(52,28,173)'
        }
      }];

      var layout = {
        title: title.toUpperCase(),
        height: 500,
        width: 600,
        font: {
          family: 'Courier New, monospace',
          size: 15,
          color: 'teal'
        },
        margin: {
          l: 100,
          r: 150,
          b: 200,
          t: 100,
          pad: 4
        },
        paper_bgcolor: '#eceef7',
        plot_bgcolor: 'white'
      }
      setTimeout(() => Plotly.newPlot('myDiv', data, layout));
    });
  })
})
