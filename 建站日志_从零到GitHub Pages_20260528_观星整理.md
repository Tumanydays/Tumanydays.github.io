# 我的第一个网站：从零到上线（操作日志）

> 日期：2026 年 5 月 28 日  
> 目标：用 GitHub Pages 搭建个人网站  
> 结果：✅ 网站上线，掌握基本操作

---

## 关键词索引

| 关键词 | 一句话说明 |
|---|---|
| GitHub | 天上的公共硬盘，存放代码和网站文件 |
| Git | 你电脑上的搬运工，负责把文件打包送到 GitHub |
| SSH 密钥 | 电子身份证，让 GitHub 确认「是你本人在操作」 |
| 仓库（Repository） | GitHub 上存放一个项目的格子 |
| GitHub Pages | GitHub 的免费功能，把仓库自动变成网站 |
| index.html | 网站首页，也是访客看到的「目录牌」 |
| git add . | 打包所有改动（增/删/改） |
| git commit -m | 封箱贴标签，写一句说明 |
| git push | 把打包好的东西发到 GitHub |

---

## 一、准备工作（一次性，以后不用再做了）

### 1.1 注册 GitHub 账号

- 网址：**github.com**
- 用户名：**Tumanydays**
- 邮箱：**Tumanydays@outlook.com**
- 密码：自己记好

### 1.2 配置 Git 身份

打开终端，输入：

```bash
git config --global user.name "Tumanydays"
git config --global user.email "Tumanydays@outlook.com"
```

> 这是告诉 Git「你是谁」，每次推送都会带上这个签名。

### 1.3 生成 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "Tumanydays@outlook.com"
```

> 生成了一对钥匙：私钥（`~/.ssh/id_ed25519`）和公钥（`~/.ssh/id_ed25519.pub`）。
> **私钥绝不能给别人，公钥随便贴。**

### 1.4 把公钥贴到 GitHub

1. 打开 github.com → 右上角头像 → **Settings**
2. 左侧菜单 → **SSH and GPG keys**
3. 点 **New SSH key**，把 `~/.ssh/id_ed25519.pub` 的内容完整复制进去
4. 点 Add

### 1.5 在 GitHub 上创建仓库

1. github.com → 右上角 **+** → **New repository**
2. Repository name 填：**`Tumanydays.github.io`**（必须一模一样）
3. 选 **Public**
4. 不要勾选「Add a README file」
5. 点 Create

---

## 二、网站文件夹（本地）

### 位置

```
桌面 → my-website
```

里面有：

```
my-website/
├── index.html    ← 首页（目录牌）
├── xxx.md        ← 文章可以直接放这里
└── .git          ← 隐藏的，Git 用它追踪改动，别碰
```

### 初始化（第一次做，已完成）

```bash
cd ~/Desktop/my-website        # 进入文件夹
git init                       # 让 Git 开始盯住这个文件夹
git remote add origin git@github.com:Tumanydays/Tumanydays.github.io.git  # 告诉 Git 目的地
```

---

## 三、日常操作：网站更新三步舞

> 这是你每次改完网站要敲的命令。**贴显示器旁边。**

```bash
cd ~/Desktop/my-website        ← 进门（每次从这开始）
git add .                      ← 打包（增删改都管）
git commit -m "做了什么"        ← 贴标签
git push                       ← 发出去
```

推送成功后，等十几秒，刷新 `https://Tumanydays.github.io` 就能看到更新。

---

## 四、核心概念（说人话版）

### 4.1 GitHub、Git、你的电脑，三者的关系

```
你的电脑                           GitHub（天上）
─────────                        ────────────
my-website/                       Tumanydays.github.io
  ├─ index.html                        ├─ index.html
  └─ 文章.md                           └─ 文章.md
       │                                    ▲
       │   git add → commit → push         │
       └────────────────────────────────────┘
                  （SSH 加密通道）

访客在浏览器输入
https://Tumanydays.github.io  ────→  看到你的网页
```

### 4.2 放文件 ≠ 能被找到

| 操作 | 效果 |
|---|---|
| 把 md 文件放进 my-website + git push | ✅ 文件存上去了，知道完整网址的人能访问 |
| 改 index.html 里的链接 + git push | ✅ 首页目录牌更新，普通人能点进来 |

> **记住**：每次加新文章，两个动作都要做——放文件 + 改首页链接。缺一个，文章就「藏在书架深处，门口目录上找不到」。

### 4.3 删文件也是同样的三步舞

1. 在文件夹里删掉文件（扔废纸篓）
2. `git add .` → `git commit -m "删了xxx"` → `git push`
3. 如果首页有链接指向它，顺手把链接也删掉

---

## 五、今天的操作记录

| 时间节点 | 做了什么 | 命令/操作 |
|---|---|---|
| 1 | 注册 GitHub | 浏览器操作 |
| 2 | 配置 Git 身份 | `git config --global user.name/email` |
| 3 | 生成 SSH 密钥 | `ssh-keygen` |
| 4 | 贴公钥到 GitHub | GitHub Settings 页面 |
| 5 | 创建仓库 `Tumanydays.github.io` | GitHub 页面操作 |
| 6 | 本地初始化 | `git init` + `git remote add origin` |
| 7 | 写第一版 index.html | 创建文件 |
| 8 | 首次推送 | `git add .` → `commit` → `push` |
| 9 | 添加文章「灯下翻译者」 | 复制文件 + 改首页链接 + 推送 |
| 10 | 删除「灯下翻译者」 | 删文件 + 推送 |
| 11 | 添加文章「笼中拳手」 | 复制文件 + 推送（但忘了改首页链接） |
| 12 | 修复首页链接 | 改 index.html + 推送 |

---

## 六、重要提醒

| 注意事项 | 说明 |
|---|---|
| 私钥别弄丢 | `~/.ssh/id_ed25519`，换电脑才需要重新生成 |
| 别把私钥放进 my-website | push 出去就等于公开了 |
| 公开仓库里所有人都能看见你的代码 | 别放密码、手机号等隐私 |
| 文件夹别乱拖/改名 | `my-website` 里的 `.git` 目录是 Git 的命根子 |
| 每次推送只调三步 | `add .` → `commit` → `push`，别多也别少 |

---

## 七、明天继续时

1. 打开终端
2. `cd ~/Desktop/my-website`
3. 看看文件夹里现在有什么：`ls`
4. 想加新文章：放文件 → 改 index.html 链接 → 三步舞
5. 想改首页：编辑 index.html → 三步舞
6. 想删什么：删文件 → 三步舞

---

*日志结束。2026.5.28 观星整理*
