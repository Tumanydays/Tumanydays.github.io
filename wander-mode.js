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

    function inWander() { return sessionStorage.getItem('wander-mode') === 'true'; }

    // 动态加载 ZCOOL XiaoWei 字体（全站统一，不依赖页面头部的 Google Fonts 链接）
    if (!document.querySelector('link[href*="ZCOOL+XiaoWei"]')) {
        var fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap';
        document.head.appendChild(fontLink);
    }

    // 迷失域小纸条：进入时生成，首次翻页必定显示
    var note = sessionStorage.getItem('wander-note');
    if (inWander() && !note) {
        var pool = ['此去经年', '良辰好景', '千种风情', '当时明月', '彩云归', '水穷处', '云起时', '倚危楼', '天际识归舟', '暮雨洒江天', '红衰翠减', '无语东流', '苒苒物华休', '争知我', '正恁凝愁', '拟把疏狂', '为伊消得', '人憔悴', '立尽斜阳', '黯黯生天际', '无言谁会', '怕上层楼', '聚散苦匆匆', '今年花胜去年红', '始共春风', '把酒祝东风', '离恨却如春草', '深闭门', '雨打梨花', '行也思君', '晓看天色', '旧游如梦', '断雁叫西风', '青山绿水', '白草红叶', '恨无穷', '伤流景', '往事后期空记省', '送尽黄昏', '灯影桨声', '孤光自照', '短发萧骚', '乾坤虽大', '难着许多愁', '寂寞无人见', '燕子楼空', '古今如梦', '夜茫茫', '重寻无处', '小舟从此逝', '江海寄余生', '烟柳断肠处'];
        var picked = [];
        var n = 2 + Math.floor(Math.random() * 2);
        for (var hi = 0; hi < n; hi++) {
            var idx = Math.floor(Math.random() * pool.length);
            var attempts = 0;
            while (picked.indexOf(pool[idx]) !== -1 && attempts < 20) { idx = Math.floor(Math.random() * pool.length); attempts++; }
            picked.push(pool[idx]);
        }
        sessionStorage.setItem('wander-note', picked.join(' '));
        note = sessionStorage.getItem('wander-note');
    }
    if (inWander() && note) {
        var noteEl = document.createElement('div');
        noteEl.textContent = note;
        noteEl.style.cssText = 'position:fixed;bottom:12px;right:16px;font-size:0.75rem;color:#bbb;z-index:9998;text-align:right;font-weight:300;letter-spacing:2px;line-height:1.7;pointer-events:none;font-family:ZCOOL XiaoWei,serif;';
        document.body.appendChild(noteEl);
        sessionStorage.removeItem('wander-note');
    }
    if (!inWander()) sessionStorage.removeItem('wander-note');

    // 注入隐形退出按钮（右下角，完全不可见）
    var exitEl = document.createElement('div');
    exitEl.id = 'wander-exit';
    exitEl.textContent = '迷失域';
    exitEl.style.cssText = 'position:fixed;bottom:12px;right:16px;font-size:0.6rem;color:transparent;z-index:9999;cursor:default;user-select:none;pointer-events:auto;';
    document.body.appendChild(exitEl);

    // 单击退出
    exitEl.addEventListener('click', function(e) {
        e.stopPropagation();
        if (inWander()) {
            sessionStorage.setItem('wander-mode', 'false');
            if (window._resetWanderTitle) window._resetWanderTitle();
        }
    });

    // 链接劫持（capture 阶段拦截）
    document.addEventListener('click', function(e) {
        if (!inWander()) return;
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
