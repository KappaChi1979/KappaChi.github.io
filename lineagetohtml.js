var fs = require('fs');

fs.readFile('./message.json', (req, json) => {
  var file = '<section id="cd-timeline" class="cd-container">'
  json = JSON.parse(json.toString());
  json.forEach((line) => {

    var html = html1(line) + html2(line.info) + html3(line);
    file += html;
  })
    fs.writeFile('./html.html', file += '</section> <!-- cd-timeline -->', (err, res)=> {
      if(!err) console.log('success');
    })
});




function html1(json) {
  var html1 =  `
		<div class="cd-timeline-block">
			<div class="cd-timeline-img cd-picture">
				<div class="text-center date">${json.date.replace(' ', '<br>')}</div>
			</div> <!-- cd-timeline-img -->

			<div class="cd-timeline-content">
        <div class="col-sm-12">
				  <h2 class="text-center">${json.line || ''}</h2>`

  if(json.image) {
    html1 += `
        <div class="col-sm-12">
          <img style="width:90%" src="${json.image}">
        </div>`
  }
  return html1
}

function html2(info) {
  if (info == null || info == '') return  '';
  return '<p class="text-center">' + info + '</p>'
}


function html3(json) {
  var members = json.members;
  var i = 1;
  var callback = '<table class="table"><tr>'
  members.forEach(function (member) {
    if(json.date !== 'Win 79') {
      callback += `<td>${i++}</td>`;
    };
    if(member.hasOwnProperty('lineName')) {
    callback += `<th>${member.lineName}</th>`;
    };
    callback +=`<td>${member.name}</td>
            </tr>`;
  });
  callback += `</table>
        </div>
			</div> <!-- cd-timeline-content -->
		</div> <!-- cd-timeline-block -->

	`;

  return callback;
}


