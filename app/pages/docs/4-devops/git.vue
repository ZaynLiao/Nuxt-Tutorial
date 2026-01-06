<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'setup', label: '初始設定' },
            { id: 'basics', label: '基礎指令' },
            { id: 'branching', label: '分支操作' },
            { id: 'remote', label: '遠端協作' },
            { id: 'advanced', label: '進階技巧' },
            { id: 'best-practices', label: '最佳實踐' }
        ]
    })

    useHead({
        title: 'Git 版本控制',
        meta: [
            { name: 'description', content: 'Git 版本控制完整教學：從基礎指令到進階 Rebase、Stash 與 Cherry-pick，掌握現代開發必備技能。' }
        ]
    })
</script>

<template>
    <TutorialPage title="Git 版本控制" description="Git 是現代軟體開發的基石。無論是個人開發還是團隊協作，掌握 Git 都能讓你更自信地管理程式碼變更、實驗新功能以及修復錯誤。"
        :badges="[{ label: 'Version Control', color: 'primary' }, { label: 'DevOps', color: 'neutral' }]">

        <!-- Section 1: Setup -->
        <TutorialSection id="setup" title="初始設定" icon="heroicons:cog-6-tooth" separator>
            <p class="text-slate-400 mb-6">
                在開始使用 Git 之前，請確保設定好你的使用者名稱與 Email，這將作為你提交紀錄的身份標識。
            </p>

            <AppCodeBlock language="bash" :code="`# 設定使用者名稱
git config --global user.name &quot;Your Name&quot;

# 設定 Email
git config --global user.email &quot;your.email@example.com&quot;

# 檢查設定
git config --list`" filename="Terminal" />
        </TutorialSection>

        <!-- Section 2: Basics -->
        <TutorialSection id="basics" title="基礎指令" icon="heroicons:command-line" separator>
            <p class="text-slate-400 mb-6">
                這是 Git 的日常工作流程：修改檔案 -> 加入暫存區 (Stage) -> 提交 (Commit)。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <h4 class="text-white font-medium mb-2">1. 初始化與狀態</h4>
                        <AppCodeBlock language="bash" :code="`# 初始化專案
git init

# 查看檔案狀態
git status`" filename="Terminal" />
                    </div>

                    <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <h4 class="text-white font-medium mb-2">2. 暫存與提交</h4>
                        <AppCodeBlock language="bash" :code="`# 加入所有變更
git add .

# 提交變更
git commit -m &quot;feat: initial project structure&quot;`" filename="Terminal" />
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <h4 class="text-white font-medium mb-2">3. 查看紀錄</h4>
                        <AppCodeBlock language="bash" :code="`# 查看提交歷史
git log --oneline --graph --all

# 查看檔案差異
git diff`" filename="Terminal" />
                    </div>

                    <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <h4 class="text-white font-medium mb-2">4. 撤銷變更</h4>
                        <AppCodeBlock language="bash" :code="`# 捨棄工作目錄的修改 (危險!)
git restore .

# 取消暫存 (Unstage)
git restore --staged .`" filename="Terminal" />
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- Section 3: Branching -->
        <TutorialSection id="branching" title="分支操作" icon="heroicons:arrows-pointing-out" separator>
            <p class="text-slate-400 mb-6">
                分支 (Branch) 讓你可以平行開發新功能，而不影響主程式碼 (main)。
            </p>

            <AppCodeBlock language="bash" :code="`# 建立並切換到新分支
git checkout -b feature/login-page
# 或者使用新語法
git switch -c feature/login-page

# 切換回主分支
git switch main

# 合併分支 (將 feature 合併進 main)
git merge feature/login-page

# 刪除分支
git branch -d feature/login-page`" filename="Terminal" />
        </TutorialSection>

        <!-- Section 4: Remote -->
        <TutorialSection id="remote" title="遠端協作" icon="heroicons:cloud" separator>
            <p class="text-slate-400 mb-6">
                與 GitHub 或 GitLab 等遠端倉庫同步。
            </p>

            <AppCodeBlock language="bash" :code="`# 複製遠端專案
git clone https://github.com/username/repo.git

# 加入遠端倉庫
git remote add origin https://github.com/username/repo.git

# 推送分支
git push -u origin main

# 拉取更新
git pull origin main`" filename="Terminal" />
        </TutorialSection>

        <!-- Section 5: Advanced -->
        <TutorialSection id="advanced" title="進階技巧" icon="heroicons:sparkles" separator>
            <div class="space-y-8">
                <!-- Stash -->
                <div>
                    <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Icon name="heroicons:archive-box" class="w-6 h-6 text-yellow-400" />
                        暫存工作 (Stash)
                    </h3>
                    <p class="text-slate-400 mb-4">
                        當你正在開發功能 A，突然需要切換去修復 Bug，但又不想提交半成品的程式碼時，Stash 非常好用。
                    </p>
                    <AppCodeBlock language="bash" :code="`# 暫存當前修改
git stash

# 查看暫存列表
git stash list

# 恢復最近一次暫存
git stash pop`" filename="Terminal" />
                </div>

                <!-- Reset -->
                <div>
                    <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Icon name="heroicons:arrow-uturn-left" class="w-6 h-6 text-red-400" />
                        時光倒流 (Reset)
                    </h3>
                    <p class="text-slate-400 mb-4">
                        Reset 可以用來撤銷 Commit。請小心使用 <code class="text-red-400">--hard</code>。
                    </p>
                    <AppCodeBlock language="bash" :code="`# Soft Reset: 撤銷 Commit，但保留檔案修改 (回到暫存區)
git reset --soft HEAD~1

# Hard Reset: 徹底捨棄修改，回到上一個版本 (危險!)
git reset --hard HEAD~1`" filename="Terminal" />
                </div>

                <!-- Cherry Pick -->
                <div>
                    <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Icon name="heroicons:cursor-arrow-rays" class="w-6 h-6 text-purple-400" />
                        摘櫻桃 (Cherry-pick)
                    </h3>
                    <p class="text-slate-400 mb-4">
                        將某個特定的 Commit 複製到當前分支。
                    </p>
                    <AppCodeBlock language="bash" :code="`# 複製特定 Commit
git cherry-pick <commit-hash>`" filename="Terminal" />
                </div>

                <!-- Rebase -->
                <div>
                    <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Icon name="heroicons:arrows-right-left" class="w-6 h-6 text-blue-400" />
                        變基 (Rebase)
                    </h3>
                    <p class="text-slate-400 mb-4">
                        Rebase 可以讓提交歷史變成一直線，比 Merge 更整潔。但<strong>絕對不要在多人共用的分支上使用 Rebase</strong>。
                    </p>
                    <AppCodeBlock language="bash" :code="`# 將當前分支的基底移到 main 的最新狀態
git rebase main

# 互動式 Rebase (整理 Commit，例如合併多個 Commit)
git rebase -i HEAD~3`" filename="Terminal" />
                </div>
            </div>
        </TutorialSection>

        <!-- Section 6: Best Practices -->
        <TutorialSection id="best-practices" title="最佳實踐" icon="heroicons:check-badge" separator>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-slate-950 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-3">Conventional Commits</h4>
                    <p class="text-sm text-slate-400 mb-4">
                        使用統一的格式撰寫 Commit Message，有助於自動化生成 Changelog。
                    </p>
                    <ul class="space-y-2 text-sm font-mono text-slate-300">
                        <li><span class="text-emerald-400">feat:</span> 新增功能</li>
                        <li><span class="text-blue-400">fix:</span> 修復 Bug</li>
                        <li><span class="text-yellow-400">docs:</span> 文件修改</li>
                        <li><span class="text-purple-400">style:</span> 格式調整 (不影響程式碼)</li>
                        <li><span class="text-pink-400">refactor:</span> 重構</li>
                        <li><span class="text-slate-500">chore:</span> 建置過程或輔助工具的變動</li>
                    </ul>
                </div>

                <div class="p-5 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-3">.gitignore</h4>
                    <p class="text-sm text-slate-400 mb-4">
                        務必忽略不需要進入版本控制的檔案，例如依賴套件、環境變數檔與建置產物。
                    </p>
                    <AppCodeBlock language="plaintext" :code="`node_modules/
.output/
.nuxt/
.env
dist/
*.log`" filename=".gitignore" />
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>