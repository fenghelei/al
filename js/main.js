/* ===== Nemo社区 - 公共JS ===== */

// 主题切换
(function() {
  const savedTheme = localStorage.getItem('nemo-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      updateThemeIcon();
      themeBtn.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('nemo-theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    }

    function updateThemeIcon() {
      const isDark = document.body.classList.contains('dark');
      themeBtn.textContent = isDark ? '☀' : '☾';
      themeBtn.title = isDark ? '切换到亮色模式' : '切换到暗色模式';
    }
  });
})();

// 移动端菜单
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('open');
        menuBtn.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
      });

      // 点击页面其他地方关闭菜单
      document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
          mobileMenu.classList.remove('open');
          menuBtn.textContent = '☰';
        }
      });
    }
  });
})();

// Tab 切换
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(function(tab) {
      tab.addEventListener('click', function() {
        const tabGroup = this.closest('.tab-nav');
        const targetId = this.getAttribute('data-tab');
        
        // 切换 tab 按钮状态
        if (tabGroup) {
          tabGroup.querySelectorAll('.tab-item').forEach(function(t) {
            t.classList.remove('active');
          });
        }
        this.classList.add('active');
        
        // 切换内容
        const tabContainer = this.closest('.card, .profile-tab-wrap, .ranking-wrap') || document;
        const tabContents = tabContainer.querySelectorAll('.tab-content');
        tabContents.forEach(function(content) {
          content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
})();

// 关注按钮交互
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-follow').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.classList.contains('followed')) {
          this.classList.remove('followed');
          this.textContent = '+ 关注';
        } else {
          this.classList.add('followed');
          this.textContent = '已关注';
        }
      });
    });

    // 圈子加入按钮
    document.querySelectorAll('.circle-join-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.classList.contains('joined')) {
          this.classList.remove('joined');
          this.textContent = '+ 加入圈子';
        } else {
          this.classList.add('joined');
          this.textContent = '✓ 已加入';
        }
      });
    });
  });
})();

// 点赞/收藏交互
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const likeBtn = document.getElementById('like-btn');
    const favBtn = document.getElementById('fav-btn');

    if (likeBtn) {
      likeBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const countEl = this.querySelector('.count');
        if (countEl) {
          let count = parseInt(countEl.textContent);
          count = this.classList.contains('active') ? count + 1 : count - 1;
          countEl.textContent = count;
        }
      });
    }

    if (favBtn) {
      favBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const countEl = this.querySelector('.count');
        if (countEl) {
          let count = parseInt(countEl.textContent);
          count = this.classList.contains('active') ? count + 1 : count - 1;
          countEl.textContent = count;
        }
      });
    }
  });
})();

// 评论提交（模拟）
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.comment-submit-btn');
    const textarea = document.querySelector('.comment-textarea');
    const commentList = document.querySelector('.comment-list');

    if (submitBtn && textarea && commentList) {
      submitBtn.addEventListener('click', function() {
        const text = textarea.value.trim();
        if (!text) return;

        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
          <div class="avatar a1">我</div>
          <div class="comment-content">
            <div class="comment-author">
              我
              <span class="comment-time">刚刚</span>
            </div>
            <div class="comment-text"></div>
            <div class="comment-actions">
              <button>👍 0</button>
              <button>💬 回复</button>
            </div>
          </div>
        `;
        commentItem.querySelector('.comment-text').textContent = text;
        commentList.insertBefore(commentItem, commentList.firstChild);
        textarea.value = '';
      });
    }
  });
})();

// 初始化主题图标（确保DOM加载后）
document.addEventListener('DOMContentLoaded', function() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀' : '☾';
  }
});
