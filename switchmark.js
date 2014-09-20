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

function createSwitchmarkFolder() {
  chrome.bookmarks.create({'parentId': "2", 'title': "Switchmark"}, function(newBookmark){
    chrome.bookmarks.create({'parentId': newBookmark.id, 'title': "My Bookmarks"}, function(newSubfolder){
      copyFromFolderToFolder("1", newSubfolder.id);
    });
  });
}

var folders = [];
function addBookmarkFolders(bookmarkNodes) {
  for(var i = 0; i< bookmarkNodes.length; i++) {
    if(!bookmarkNodes[i].url) {
      folders.push(bookmarkNodes[i]);
    }
  }
  var switchmarkFound = false;
  for(var j = 0; j < folders.length; j++) {
    console.debug(folders[j]);
    if(folders[j].title == 'Switchmark') {
      console.debug("Found switchmark folder.");
      switchmarkFound = true;
      break;
    }
  }
  if(!switchmarkFound){
    createSwitchmarkFolder();
  }
}

function findOrCreateSwitchmarkFolder() {
  chrome.bookmarks.getChildren("2", addBookmarkFolders);
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.bookmarks.MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE = 100000
  chrome.bookmarks.MAX_WRITE_OPERATIONS_PER_HOUR = 100000
  chrome.runtime.onStartup.addListener(findOrCreateSwitchmarkFolder);
  chrome.bookmarks.getTree(function(bookmarkNodes){
    displaySwitchmarkFolders(bookmarkNodes, false);
  });
  $('body').on('click', '.bookmark-folder', function() {
    copyFromFolderToFolder($(this).attr('id'), "1");
});
  //check for no content in switchmark folder to display info
});