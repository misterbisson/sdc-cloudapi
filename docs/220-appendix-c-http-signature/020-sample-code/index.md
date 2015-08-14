Title: Sample Code
---
Text:


Sample code for generating the `Authorization` header (and `Date` header):

    var crypto = require('crypto');
    var fs = require('fs');
    var https = require('https');



    /**
     * Simply pads a number < 10 with a leading 0.
     *
     * @param {String} val a numeric string.
     * @return {String} a new value that may have a leading 0.
     */
    function pad(val) {
      if (parseInt(val, 10) < 10)
        val = '0' + val;
      return val;
    }


    /**
     * Generates an RFC 1123 compliant Date String
     *
     * @return {String} RFC 1123 date string.
     */
    function httpDate() {
      var now = new Date();
      var months = ['Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'];
      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return days[now.getUTCDay()] + ', ' +
                  pad(now.getUTCDate()) + ' ' +
                  months[now.getUTCMonth()] + ' ' +
                  now.getUTCFullYear() + ' ' +
                  pad(now.getUTCHours()) + ':' +
                  pad(now.getUTCMinutes()) + ':' +
                  pad(now.getUTCSeconds()) +
                  ' GMT';
    }


    ///--- Mainline

    // Read in an SSH key from the "usual" location.
    var file = process.env.HOME + '/.ssh/id_rsa';
    var key = fs.readFileSync(file, 'ascii');
    if (!key)
      throw new Error(file + ' was not a valid RSA key');

    var date = httpDate();
    var signer = crypto.createSign('RSA-SHA256');
    signer.update(date);
    authz = 'Signature keyId="/mark/keys/rsa-1",algorithm="rsa-sha256" ' + signer.sign(key, 'base64');

    var request = {
      host: 'api.example.com',
      path: '/my/machines',
      headers: {
        'x-api-version': '~7.0',
        'Date': date,
        'Authorization': authz
      }
    };
    https.get(request, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers, null, 2));
      res.setEncoding('utf8');
      res.body = '';
      res.on('data', function(chunk) {
        res.body += chunk;
      });
      res.on('end', function() {
        console.log('BODY: ' + JSON.stringify(res.body, null, 2));
      });
    }).end();


