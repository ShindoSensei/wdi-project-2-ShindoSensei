const request = require('request')
const crypto = require('crypto')

module.exports = function vikiAuth (req, res) {
  // Accessing Viki API
  // Viki authentication
  var appId = '100642a'
  var vikiSecret = 'ae241ae5ccf13f0a7bd182759e35ad985588c6998d40038566fa3a0d107ee2292c428faf1ec0'
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
    sort: 'trending',
    subtitle_completion: 'en',
    with_paging: 'true',
    page: '1',
    per_page: '16'
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
        res.render('homepage', {videoArr: videoArray})
        // console.log(body)
      }
    })
}
