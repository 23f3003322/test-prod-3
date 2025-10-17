/* Minimal stub for highlight.js */
(function(){
  window.hljs = {
    highlightBlock: function(block){
      if (block && block.className.indexOf('hljs') === -1){
        block.className += ' hljs';
      }
    }
  };
})();