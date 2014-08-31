

function printBookmarks(bookmarks) {
  if(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      if (bookmark.children) {
        if(bookmark.parentId == "2"){
          console.debug(bookmark.id + ' - ' + bookmark.title);
          //folders.append(bookmark);
        }
        printBookmarks(bookmark.children);
      }
    });
  }
}


chrome.bookmarks.getTree(function(bookmarks) {
  printBookmarks(bookmarks);
});


// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks() {
  chrome.bookmarks.getTree(function(bookmarks) {
    printBookmarks(bookmarks);
  });
}

function printBookmarkBar() {

}

function showFolders() {
  $('#bookmark-bars').text("Hello!");
}

document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();
});


//Print bookmark bar:
chrome.bookmarks.getSubtree("1", function(bookmarks) {
  printBookmarks(bookmarks);
});


function findOrCreateSwitchmarkFolder() {
  var folders = [];
  //Switchmark folder should be placed in 'Other bookmarks folder'
  chrome.bookmarks.getSubtree("2", function(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      if(bookmark.children) {
        folders.append(bookmark);
      }
    });
  });
}

folders.forEach(function(bookmark) {
    console.debug(bookmark.id + ' - ' + bookmark.title);
  });


chrome.bookmarks.getSubtree("2", function(bookmarks) {
  for(i = 0; i< bookmarks.length; i++){
    if(bookmark.children) {
      console.debug(bookmark.id + ' - ' + bookmark.title);
    }
  }
});


function printBookmarks(bookmarks) {
  for(i = 0; i< bookmarks.length; i++){
    if(bookmark.children) {
      console.debug(bookmark.id + ' - ' + bookmark.title);
    }
  }
}  

chrome.bookmarks.getSubtree("2", printBookmarks);


function print5(bookmarks) {
  console.debug("5");
}


/////



function printBookmarkFolders(bookmarks) {
  if(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      if (bookmark.children) {
        console.debug(bookmark.id + ' - ' + bookmark.title);
      }
    });
  }
}

function isFolder(bookmark) {
  bookmark.getChildren(function(children) {
    return (children.length > 0);
  });
}

function printBookmarkFolders(bookmarks) {
  for(i = 0; i < bookmarks.length; i++) {
    if(isFolder(bookmarks[i])){
      console.debug(bookmarks[i].id + ' - ' + bookmarks[i].title);
    }
  }  
}





function printBookmarks(bookmarks) {
  if(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      //if (bookmark.children) {
        console.debug(bookmark.id + ' - ' + bookmark.title);
      //}
    });
  }
}

function printBookmarksHelper(bookmarks) {
  if(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      if(bookmark.children){
        console.debug(bookmark.id + ' - ' + bookmark.title);
      }
      // if (bookmark.children) {
      //   printBookmarks(bookmark.children);
      //   console.debug(bookmark.id + ' - ' + bookmark.title);
      // }
    });
  }
}
chrome.bookmarks.getChildren("2", function(bookmarks) {
  printBookmarksHelper(bookmarks);
});


chrome.bookmarks.b

/* The good stuff: */

function clearBookmarkBar() {
  chrome.bookmarks.getChildren("1", function(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      if(bookmark.children){
        chrome.bookmarks.removeTree(bookmark.id);
      }
      else {
        chrome.bookmarks.remove(bookmark.id);
      }
    });
  });
}

function copyFromFolderToFolder(fromBookmarkFolderId, toBookmarkFolderId) {
  chrome.bookmarks.getChildren(fromBookmarkFolderId, function(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      //Create a copy of the bookmark and place it under the appropriate bookmark bar folder
      var bm = chrome.bookmarks.create({'parentId': toBookmarkFolderId, 'title': bookmark.title, 'url': bookmark.url}, function(newBookmark){
        if(bookmark.children){
          copyFromFolderToFolder(bookmark.id, newBookmark.id);
        }
      });
    });
  });
}

clearBookmarkBar();


