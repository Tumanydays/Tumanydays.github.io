/* ═══════════════════════════════════════════
   阅读进度条 — 共享组件
   长文页面在 </body> 前引用即可：
     <script src="../../progress-bar.js"></script>
   路径随文章目录深度调整
   ═══════════════════════════════════════════ */
(function() {
    var bar = document.createElement('div');
    bar.id = 'progress-bar';
    document.body.appendChild(bar);

    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrollTop / docHeight * 100) + '%';
    });
})();
