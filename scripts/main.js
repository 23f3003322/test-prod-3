(function(){
  var inputMdUri = "data:text/markdown;base64,IyBNYXJrZG93biBJbnB1dAoKVGhpcyBpcyBhIHRlc3Qgb2YgbWFya2Rvd24gcmVuZGVyaW5nLgoKIyMgQ29kZSBibG9jayBleGFtcGxlCmBgYGphdmFzY3JpcHQKZnVuY3Rpb24gZ3JlZXQobmFtZSkgewogIGNvbnNvbGUubG9nKCJIZWxsbywgIiArIG5hbWUgKyAiISIpOwp9CmdyZWV0KCJXb3JsZCIpOwoKLS0tCgoqKlRoaXMgdGV4dCBzaG91bGQgYmUgYm9sZC4qKgoKLSBCdWxsZXQgMQotIEJ1bGxldCAyCi0gQnVsbGV0IDMK";

  function renderFromMd(){
    fetch(inputMdUri)
      .then(function(res){ return res.text(); })
      .then(function(md){
        var html = marked(md);
        var output = document.getElementById('markdown-output');
        output.innerHTML = html;
        // highlight code blocks
        var blocks = output.querySelectorAll('pre code');
        blocks.forEach(function(block){
          if (typeof hljs !== 'undefined' && hljs.highlightBlock){
            hljs.highlightBlock(block);
          }
        });
      })
      .catch(function(err){
        console.error('Markdown render error:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFromMd);
  } else {
    renderFromMd();
  }
})();
