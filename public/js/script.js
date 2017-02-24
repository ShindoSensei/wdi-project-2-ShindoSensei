/* global $ */
$(document).ready(function () {
// upvote
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
        // $this.load(currentUrl + ' .' + subid + ' > *')
      }
    })
  }

  // Click event handler to all votebuttons
  $('.voteButton').click(upVote)

// jquery ajax-form plugin
  var options = {
    target: '.commentsDiv',
    clearForm: true,
    replaceTarget: true // Replace target fully (instead of just its contents)with server res
  }

  $('.newCommentsForm').ajaxForm(options)

// x-editable
  $.fn.editable.defaults.mode = 'inline'
  $('.editClass').editable()
})
