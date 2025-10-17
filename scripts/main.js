(function(){
  var inputMdUri = "data:text/markdown;base64,IyBNYXJrZG93biBJbnB1dAoKVGhpcyBpcyBhIHRlc3Qgb2YgbWFya2Rvd24gcmVuZGVyaW5nLgoKIyMgQ29kZSBibG9jayBleGFtcGxlCmBgYGphdmFzY3JpcHQKZnVuY3Rpb24gZ3JlZXQobmFtZSkgewogIGNvbnNvbGUubG9nKCJIZWxsbywgIiArIG5hbWUgKyAiISIpOwp9CmdyZWV0KCJXb3JsZCIpOwoKLS0tCgoqKlRoaXMgdGV4dCBzaG91bGQgYmUgYm9sZC4qKgoKLSBCdWxsZXQgMQotIEJ1bGxldCAyCi0gQnVsbGV0IDMK";

  function renderFromMd(md){
    var html = marked(md || "");
    var output = document.getElementById('markdown-output');
    if (output) output.innerHTML = html;
    var blocks = (output && output.querySelectorAll) ? output.querySelectorAll('pre code') : [];
    blocks.forEach(function(block){
      if (typeof hljs !== 'undefined' && hljs.highlightBlock){
        hljs.highlightBlock(block);
      }
    });
  }

  function syncFromSource(){
     var mdEl = document.getElementById('markdown-source');
     if (!mdEl) return;
     var md = mdEl.textContent;
     renderFromMd(md);
  }

  fetch(inputMdUri)
    .then(function(res){ return res.text(); })
    .then(function(md){
       var source = document.getElementById('markdown-source');
       if (source) source.textContent = md;
       renderFromMd(md);
    })
    .catch(function(err){
       console.error('Markdown render error:', err);
    });

  var mdSource = document.getElementById('markdown-source');
  if (mdSource){
     mdSource.addEventListener('input', function(){
        // Debounce could be added; left as immediate
        syncFromSource();
     });
  }

  var tabs = document.querySelectorAll('#markdown-tabs .tab-btn');
  function showTab(target){
     var showOutput = (target === 'output');
     var outputEl = document.getElementById('markdown-output');
     var sourceEl = document.getElementById('markdown-source');
     if (outputEl) outputEl.style.display = showOutput ? '' : 'none';
     if (sourceEl) sourceEl.style.display = showOutput ? 'none' : '';
     tabs.forEach(function(btn){
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === target) btn.classList.add('active');
     });
  }
  if (tabs.length){
     tabs.forEach(function(btn){
        btn.addEventListener('click', function(){
            var t = this.getAttribute('data-tab');
            showTab(t);
        });
     });
  }
  showTab('output');
})();