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

  $(document).on('click', '.voteButton', {}, upVote)

// jquery ajax-form plugin for new comments submission
  var createOptions = {
    target: '.commentsDiv',
    clearForm: true,
    resetForm: true,
    replaceTarget: true // Replace target fully (instead of just its contents)with server res
  }

  // jquery ajax-form plugin for deleting comments
  // var deleteOptions = {
  //   target: '.commentsDiv',
  //   beforeSubmit: function () {
  //     $('.deleteForm').clearForm()
  //   },
  //   replaceTarget: true,
  //   success: function () {
  //     window.alert('Success delete')
  //   },
  //   error: function () {
  //     console.log('delete via ajax failed!')
  //   }
  //
  // }

  // $('.deleteForm').ajaxForm(deleteOptions)
  $('.newCommentsForm').ajaxForm(createOptions)

  // Delete ajax
  function removeComment () {
    // do ajax to server to call increment function
    // var $this = $(this)
    var urlToDelete = $(this).data('deleteurl')
    // var currentUrl = $(this).data('currenturl')
    // var subid = $(this).data('subid')

    $.ajax({ // ajax to delete comments and partial render
      url: urlToDelete,
      method: 'POST',
      success: function (data) {
        $('.commentsDiv').html(data)
        // window.alert(data)
        // $this.load(currentUrl + ' .' + subid + ' > *')
      }
    })
  }

  $(document).on('click', '.deleteButton', {}, removeComment)

// x-editable
  $.fn.editable.defaults.mode = 'inline'
  $('.editClass').editable()
})
