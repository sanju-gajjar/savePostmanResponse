var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' })); // Body parser use JSON data
var fieldsValue = '';
var fieldsKeys = '';

app.post('/save', function (req, res) {
  var outputFilename = req.body.fileName + ".json";// path of the file to output
  var mydata = req.body.payload;

  fs.readFile(outputFilename, 'utf8', function (err, contents) {
    if (contents && contents.length > 0) {
      fs.writeFileSync(outputFilename, contents + '\r\n' + mydata); // write to the file system
    } else {
      fs.writeFileSync(outputFilename, mydata);
      fieldsValue = '';
      fieldsKeys = '';
    }
  });
  res.send('Saved to ' + outputFilename);
});
app.post('/*/jsontocsv', function (req, res) {
  var outputFilename = req.params[0] + ".csv";/// path of the file to output
  getFields(JSON.parse(req.body.payload));
  fs.readFile(outputFilename, 'utf8', function (err, contents) {
    if (contents && contents.length > 0) {
      fs.writeFileSync(outputFilename, contents + '\r\n' + fieldsValue); // write to the file system
      fieldsValue = '';
      fieldsKeys = '';
    } else {
      fs.writeFileSync(outputFilename, fieldsKeys + '\r\n' + fieldsValue);
      fieldsValue = '';
      fieldsKeys = '';
    }
  });
  res.send('Saved to ' + outputFilename);

});
function getFields(data) {
  Object.keys(data).forEach(function (key1) {
    try {
      if (typeof (data[key1]) == 'object') {
        getFields(data[key1])
      } else {
        fieldsValue = fieldsValue + '|' + data[key1]
        fieldsKeys = fieldsKeys + '|' + key1;
      }
    } catch (e) {
      var a = data[key1];
      var b = key1;
      fieldsValue = fieldsValue + '|' + a;
      fieldsKeys = fieldsKeys = '|' + b;
    }
  })
}

var port = 3000;
app.listen(port);
console.log('Express started on port %d ...', port);