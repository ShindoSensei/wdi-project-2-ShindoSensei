/* global $ */
$(document).ready(function () {
// upvote

  // console.log(document.domain)
  function upVote () {
    // do ajax to server to call increment function
    var $this = $(this)
    var urlToUpVote = $(this).data('url')
    var currentVoteCount = $(this).text()

    $.ajax({ // ajax to update number of votes
      url: urlToUpVote,
      method: 'POST',
      data: {votecount: currentVoteCount},
      success: function (data) {
        $this.text(data)
      }
    })
  }
  // Click event handler on doc. Event delegation to listen for any event bubbling up.
  $(document).on('click', '.voteButton', {}, upVote)

// jquery ajax-form plugin for minute view submission
  var viewOptions = {
    success: function (data) {
      $('.commentsDiv').html(data)
    },
    clearForm: true,
    resetForm: true,
    replaceTarget: true
  }

  $('.minuteForm').ajaxForm(viewOptions)

// jquery ajax-form plugin for new comments submission
  var createOptions = {
    // target: '.commentsDiv',
    success: function (data) {
      $('.commentsDiv').html(data)
    },
    clearForm: true,
    resetForm: true,
    replaceTarget: true // Replace target fully (instead of just its contents)with server res

  }

  $('.newCommentsForm').ajaxForm(createOptions)

  // Delete ajax
  function removeComment () {
    // do ajax to server to call increment function
    // var $this = $(this)
    var urlToDelete = $(this).data('deleteurl')

    $.ajax({ // ajax to delete comments and partial render
      url: urlToDelete,
      method: 'POST',
      success: function (data) {
        $('.commentsDiv').html(data)
        // $this.load(currentUrl + ' .' + subid + ' > *')
      }
    })
  }

  $(document).on('click', '.deleteButton', {}, removeComment)

// x-editable
  $.fn.editable.defaults.mode = 'inline'
  // $('.editClass').editable()
  $(document).editable({selector: '.editClass'})

  // HTML5 Video subtitle extraction

  // make a seeking event -> check current time -> extract text track data , partial render left div
// vid.textTracks['0'].cues
//   function showSub (e) {
// // on play, set interval per second, check current time e.currentTime, extract text data, send data to ajax and partial render left div with returned html containing text track
// // $('#video-caption').fadeIn(400)
// // remember to JSON.parse(cue.text)
//     console.log('showsub activated!')
//     // var $trackElm = $(this)
    // var cueSub = $trackElm.track.activeCues['0'].text
    // var cueId = $trackElm.track.activeCues['0'].id
    // var cueStartTime = (Math.floor($trackElm.track.activeCues['0'].startTime / 60)) + ':' + ($trackElm.track.activeCues['0'].startTime % 60)
    // var cueEndTime = (Math.floor($trackElm.track.activeCues['0'].endTime / 60)) + ':' + ($trackElm.track.activeCues['0'].endTime % 60)
  // }

  // function suspendSub () {
  //   // Attach event handler for this closer to video tag, so it runs first before seekSub() .
  //   // on pause, clear set interval.
  //
  // }
  //
  // function seekSub (e) {
  //   // on seek, assuming NO autoplay, check current time e.currentTime, extract text data, send data to ajax and partial render left div with returned html containing text track
  // }
  // var vid = $('#video')
  // $(document).on('play', vid, {}, showSub)
  // var iframe = $('#iframe').contents()
  // console.log(iframe)

  // $('iframe').on('cuechange', 'track', {}, showSub)
  // $('iframe').on('enter', 'track', {}, showSub) // Checking to see if cue enters active state
})
