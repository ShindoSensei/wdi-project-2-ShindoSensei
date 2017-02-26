const request = require('request')
const crypto = require('crypto')

module.exports = function vikiAuth (req, res) {
  // Accessing Viki API
  // Viki authentication
  var appId = process.env.APPNUM
  var vikiSecret = process.env.APPSECRET
  var timeStamp = Math.floor(Date.now() / 1000)  // unix time stamp
  // Setting SHA1-HMAC signature
  var hmac = crypto.createHmac('sha1', vikiSecret)
  hmac.update('api.viki.io/v4/movies.json?app=' + appId + '&t=' + timeStamp)
  var hmacSig = hmac.digest('hex')
  // Setting up query string parameters to pass into request
  var qs = {
    app: appId,
    t: timeStamp,
    sig: hmacSig,
    // api filters
    origin_country: 'cn',
    // genre: '23g',
    sort: 'recent_views',
    subtitle_completion: 'en',
    with_paging: 'true',
    page: '1',
    per_page: '15'
  }
  // Fetching Viki API JSON data using request module
  request({
    url: 'https://api.viki.io/v4/movies.json',
    qs: qs
  },
    function (err, respond, body) {
      if (!err && respond.statusCode === 200) {
        // res.send(JSON.parse(body))
        var videoArray = JSON.parse(body).response // array of video objects
        res.render('homepage', {videoArr: videoArray, flash: req.flash('flash')[0]})
        // console.log(body)
      }
    })
}
