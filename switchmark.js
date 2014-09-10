function clearBookmarkBar() {
  chrome.bookmarks.getChildren("1", function(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      chrome.bookmarks.removeTree(bookmark.id); 
      //chrome.bookmarks.remove(bookmark.id);
    });
  });
}

function copyFromFolderToFolder(fromBookmarkFolderId, toBookmarkFolderId) {
  if(toBookmarkFolderId == "1") {
    clearBookmarkBar();
  }
  chrome.bookmarks.getChildren(fromBookmarkFolderId, function(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      //Create a copy of the bookmark and place it under the appropriate bookmark bar folder
      var bm = chrome.bookmarks.create({'parentId': toBookmarkFolderId, 'title': bookmark.title, 'url': bookmark.url}, function(newBookmark){
        console.debug("New id is: " + newBookmark.id + " Title is: " + newBookmark.title);
        console.debug("Copying folder. New id is: " + newBookmark.id);
        copyFromFolderToFolder(bookmark.id, newBookmark.id);
      });
    });
  });
}

function displaySwitchmarkFolders(bookmarkNodes, parentIsSwitchmarkFolder) {
  if(parentIsSwitchmarkFolder) {
    bookmarkNodes.forEach(function(bookmark) {
      $('#bookmark-bars').append($("<button class='bookmark-folder' id=" + bookmark.id + ">" + bookmark.title + "</button>"));
    });
  }
  else if(bookmarkNodes) {
    bookmarkNodes.forEach(function(bookmark) {
      if(bookmark.title == "Switchmark") {
        displaySwitchmarkFolders(bookmark.children, true);
      }
      else {
        displaySwitchmarkFolders(bookmark.children, false);
      }
    });
  }
}


document.addEventListener('DOMContentLoaded', function () {
  chrome.bookmarks.MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE = 100000
  chrome.bookmarks.MAX_WRITE_OPERATIONS_PER_HOUR = 100000
  chrome.bookmarks.getTree(function(bookmarkNodes){
    displaySwitchmarkFolders(bookmarkNodes, false);
  });
  $('body').on('click', '.bookmark-folder', function() {
    copyFromFolderToFolder($(this).attr('id'), "1");
});
  //check for no content in switchmark folder to display info
});