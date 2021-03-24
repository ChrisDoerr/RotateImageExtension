
/* NAMESPACE */
const ROTATE_IMAGE = {
  menuId      : "ROTATE_IMAGE_MENU_ID",
  browser     : ( "object" === typeof chrome ? chrome : browser ),
  sendCommand : function( info, tab ) {
  
    // Send message to content script
    ROTATE_IMAGE.browser.tabs.sendMessage(
      tab.id,
      {
        command : "rotateImage"
      },
      function( response ) {
        // console.log( response );
      }
  );
  }
};

/**
 * Register a new context menu item "Rotate Image".
 * But only on <img> elements!
 */
ROTATE_IMAGE.browser.contextMenus.create({
  id        : ROTATE_IMAGE.menuId,
  title     : "Rotate Image",
  contexts  : [
    "image"
  ]
});

// Send the "rotateImage" command/message when
// the context menu item has been selected.
ROTATE_IMAGE.browser.contextMenus.onClicked.addListener( ROTATE_IMAGE.sendCommand );
