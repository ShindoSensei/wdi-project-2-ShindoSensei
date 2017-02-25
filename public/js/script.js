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
    resetForm: true
    // replaceTarget: true
  }

  $('.minuteForm').ajaxForm(viewOptions)

// jquery ajax-form plugin for new comments submission
  var createOptions = {
    // target: '.commentsDiv',
    success: function (data) {
      $('.commentsDiv').html(data)
    },
    clearForm: true,
    resetForm: true
    // replaceTarget: true // Replace target fully (instead of just its contents)with server res

  }

  $('.newCommentsForm').ajaxForm(createOptions)

  // Delete ajax
  function removeComment () {
    // do ajax to server to call increment function
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

  // Comments sort filter
  function sortByVotes (e) {
    e.preventDefault()
    var $commentDivs = $('.commentBox')
    var sortedByVoteDivs = $commentDivs.sort(function (a, b) {
      return parseInt($(b).find('.voteButton').text()) - parseInt($(a).find('.voteButton').text())
    })
    $('.commentsPanel').html(sortedByVoteDivs)
  }

  $(document).on('click', '.mostVoted', {}, sortByVotes)

  function sortAscMin (e) {
    e.preventDefault()
    var $commentDivs = $('.commentBox')
    var sortedAscMinDivs = $commentDivs.sort(function (a, b) {
      return parseInt($(a).find('.minSort').text()) - parseInt($(b).find('.minSort').text())
    })
    $('.commentsPanel').html(sortedAscMinDivs)
  }

  $(document).on('click', '.ascMin', {}, sortAscMin)

  function sortDescMin (e) {
    e.preventDefault()
    var $commentDivs = $('.commentBox')
    var sortedDescMinDivs = $commentDivs.sort(function (a, b) {
      return parseInt($(b).find('.minSort').text()) - parseInt($(a).find('.minSort').text())
    })
    $('.commentsPanel').html(sortedDescMinDivs)
  }

  $(document).on('click', '.descMin', {}, sortDescMin)

  function sortAscSec (e) {
    e.preventDefault()
    var $commentDivs = $('.commentBox')
    var sortedAscSecDivs = $commentDivs.sort(function (a, b) {
      return parseInt($(a).find('.secSort').text()) - parseInt($(b).find('.secSort').text())
    })
    $('.commentsPanel').html(sortedAscSecDivs)
  }

  $(document).on('click', '.ascSec', {}, sortAscSec)

  function sortDescSec (e) {
    e.preventDefault()
    var $commentDivs = $('.commentBox')
    var sortedDescSecDivs = $commentDivs.sort(function (a, b) {
      return parseInt($(b).find('.secSort').text()) - parseInt($(a).find('.secSort').text())
    })
    $('.commentsPanel').html(sortedDescSecDivs)
  }

  $(document).on('click', '.descSec', {}, sortDescSec)
})
