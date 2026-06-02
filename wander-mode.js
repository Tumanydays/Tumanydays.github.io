/* ═══════════════════════════════════════════
   迷失域 — 隐藏漫游模式
   入口：首页标题向右拖拽触发
   出口：所有页面右下角（隐形区域）单击
   每个页面在 </body> 前引用：
     <script src="../../wander-mode.js"></script>
   路径深度同 style.css
   ═══════════════════════════════════════════ */
(function() {
    var pages = [
        '/',                          // 首页
        '/logs/',                     // 日志大厅
        '/poetry/',                   // 诗笺·线性墙
        '/poetry/wall.html',          // 诗笺·环形墙
        '/poetry/文/',                // 文板块
        '/logs/Echo/',                // Echo
        '/logs/字渡/',                // 字渡
        '/logs/字渡/我没疯.html',     // 字渡·我没疯
        '/logs/浮光/',                // 浮光
        '/logs/浮光/250220.html',     // 浮光·随笔
        '/logs/观澜/',                // 观澜
        '/logs/观澜/笼中拳手与不飞编队的幽灵.html',
        '/logs/Salvatore/',           // Salvatore
        '/logs/光与影/',              // 光与影
        '/logs/月光/',                // 月光
        '/logs/棱镜/',                // 棱镜
        '/logs/棱镜/CS50/',           // CS50
        '/logs/棱镜/CS50/week0-1.html',
        '/logs/棱镜/CS50/week2-3.html',
        '/logs/棱镜/CS50/week4-5.html',
        '/logs/棱镜/CS50/week6-7.html',
        '/logs/棱镜/CS50/week8-10.html',
        '/logs/棱镜/一些知识/',       // 一些知识
        '/logs/棱镜/一些知识/从000000到FFFFFF：十六进制颜色码完全手册.html',
        '/logs/棱镜/一些知识/RSS完全了解指南：信息自主权的最后堡垒.html',
        '/logs/棱镜/一些知识/古旧铁轨与万国文字的车厢：ASCII与UTF-8编码的传承、困境与全球方案.html',
        '/images/',                   // 图片画廊
        '/secret.html',               // 留言本
        '/entrance.html'              // 假彩蛋
    ];

    var isOn = sessionStorage.getItem('wander-mode') === 'true';

    // 注入隐形退出按钮（右下角，完全不可见）
    var exitEl = document.createElement('div');
    exitEl.id = 'wander-exit';
    exitEl.textContent = '迷失域';
    exitEl.style.cssText = 'position:fixed;bottom:12px;right:16px;font-size:0.6rem;color:transparent;z-index:9999;cursor:default;user-select:none;pointer-events:auto;';
    document.body.appendChild(exitEl);

    // 单击退出
    exitEl.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isOn) {
            isOn = false;
            sessionStorage.setItem('wander-mode', 'false');
        }
    });

    // 链接劫持（capture 阶段拦截）
    document.addEventListener('click', function(e) {
        if (!isOn) return;
        var link = e.target.closest('a');
        if (link) {
            var href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('javascript:')) return;
            e.preventDefault();
            e.stopPropagation();
            var available = pages.filter(function(p) { return p !== window.location.pathname; });
            if (available.length === 0) available = pages;
            window.location.href = available[Math.floor(Math.random() * available.length)];
        }
    }, true);
})();
