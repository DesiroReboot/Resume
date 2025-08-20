// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有技能按钮和内容
    const skillButtons = document.querySelectorAll('.skill-btn');
    const skillContents = document.querySelectorAll('.skill-content');
    
    // 为每个按钮添加点击事件
    skillButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSkill = this.getAttribute('data-skill');
            
            // 移除所有按钮的激活状态
            skillButtons.forEach(btn => btn.classList.remove('active'));
            
            // 隐藏所有技能内容
            skillContents.forEach(content => content.classList.remove('active'));
            
            // 激活当前按钮
            this.classList.add('active');
            
            // 显示对应的技能内容
            const targetContent = document.getElementById(targetSkill);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // 添加滚动动画，确保内容可见
                targetContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加按钮悬停效果增强
    skillButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // 添加页面加载完成后的动画效果
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.querySelector('.container').style.transform = 'translateY(0)';
    }, 100);
    
    // 为高亮内容添加闪烁效果
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        setInterval(() => {
            highlight.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
            setTimeout(() => {
                highlight.style.boxShadow = '0 4px 20px rgba(255, 215, 0, 0.6)';
            }, 500);
        }, 1000);
    });
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.skill-btn.active');
        if (!activeButton) return;
        
        let nextButton;
        switch(e.key) {
            case 'ArrowLeft':
                nextButton = activeButton.previousElementSibling;
                if (!nextButton || !nextButton.classList.contains('skill-btn')) {
                    nextButton = document.querySelector('.skill-btn:last-child');
                }
                break;
            case 'ArrowRight':
                nextButton = activeButton.nextElementSibling;
                if (!nextButton || !nextButton.classList.contains('skill-btn')) {
                    nextButton = document.querySelector('.skill-btn:first-child');
                }
                break;
            default:
                return;
        }
        
        if (nextButton) {
            nextButton.click();
        }
    });
    
    // 添加触摸设备支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activeButton = document.querySelector('.skill-btn.active');
            if (!activeButton) return;
            
            let nextButton;
            if (diff > 0) { // 向左滑动
                nextButton = activeButton.nextElementSibling;
                if (!nextButton || !nextButton.classList.contains('skill-btn')) {
                    nextButton = document.querySelector('.skill-btn:first-child');
                }
            } else { // 向右滑动
                nextButton = activeButton.previousElementSibling;
                if (!nextButton || !nextButton.classList.contains('skill-btn')) {
                    nextButton = document.querySelector('.skill-btn:last-child');
                }
            }
            
            if (nextButton) {
                nextButton.click();
            }
        }
    }
    
    // 添加打印样式支持
    const printButton = document.createElement('button');
    printButton.textContent = '打印简历';
    printButton.className = 'print-btn';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // 添加打印样式
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            body { background: white !important; }
            .container { box-shadow: none !important; margin: 0 !important; }
            .print-btn { display: none !important; }
            .skill-content { display: block !important; }
            .skill-content:not(.active) { display: none !important; }
        }
    `;
    document.head.appendChild(printStyle);
});
