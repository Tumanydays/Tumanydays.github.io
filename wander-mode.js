/* ═══════════════════════════════════════════
   漫游模式 — 隐藏开关
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
    var clickCount = 0;
    var clickTimer = null;

    // 注入「漫游」触发器
    var dot = document.createElement('div');
    dot.id = 'wander-dot';
    dot.textContent = '漫游';
    dot.style.cssText = 'position:fixed;bottom:12px;right:16px;font-size:0.6rem;color:' + (isOn ? '#ccc' : '#eee') + ';z-index:9999;cursor:default;user-select:none;font-weight:300;letter-spacing:1px;transition:color 0.6s;pointer-events:auto;';
    document.body.appendChild(dot);

    // 点击触发器
    dot.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isOn) {
            // 漫游中 → 检测三击退出
            clickCount++;
            if (clickCount === 1) {
                clickTimer = setTimeout(function() { clickCount = 0; }, 800);
            } else if (clickCount >= 3) {
                isOn = false;
                clickCount = 0;
                clearTimeout(clickTimer);
                sessionStorage.setItem('wander-mode', 'false');
                dot.style.color = '#eee';
            }
        } else {
            // 进入漫游
            isOn = true;
            sessionStorage.setItem('wander-mode', 'true');
            dot.style.color = '#ccc';
        }
    });

    // 链接劫持（capture 阶段拦截，早于其他监听器）
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
