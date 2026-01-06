<script setup lang="ts">
  definePageMeta({
    layout: 'docs',
    toc: [
      { id: 'why-usefetch', label: '為什麼需要 useFetch？' },
      { id: 'basic-usage', label: '基本用法' },
      { id: 'advanced-features', label: '進階特性' },
      { id: 'useasyncdata', label: 'useAsyncData' },
      { id: 'fetch-vs-usefetch', label: '$fetch vs useFetch' },
      { id: 'live-demo', label: '實戰演練' }
    ]
  })

  useHead({
    title: '資料獲取 (Data Fetching)',
    meta: [
      { name: 'description', content: '深入了解 Nuxt 4 的資料獲取機制，掌握 useFetch、useAsyncData 與 $fetch 的最佳實踐。' }
    ]
  })

  const basicUsageCode = `const { data, status, error, refresh } = await useFetch('/api/users')

// data: 回傳的資料 (Ref<T>)
// status: 請求狀態 'idle' | 'pending' | 'success' | 'error'
// error: 錯誤物件
// refresh: 重新執行請求的函式`

  const asyncDataCode = `// 當你需要執行非 fetch 的異步操作 (例如 CMS SDK 或 GraphQL)
const { data } = await useAsyncData(
  'unique-key-for-caching', // [重要] 必須提供唯一的 key
  async () => {
    const cmsData = await myCmsClient.getPosts()
    return cmsData.filter(post => post.published)
  }
)`

  const lazyCode = `<script setup>
// 啟用 lazy: true，不會阻塞頁面導航
const { data, status } = await useFetch('/api/posts', {
  lazy: true
})
<\/script>

<template>
  <!-- 透過 status 處理載入狀態 -->
  <div v-if="status === 'pending'">
    載入中...
  </div>
  <div v-else>
    {{ data }}
  </div>
</template>`

  const watchCode = `const page = ref(1)
const search = ref('')

const { data } = await useFetch('/api/users', {
  // query 參數會自動解包 ref
  query: { 
    page, 
    q: search 
  },
  // 當 page 或 search 改變時，自動重新發送請求
  watch: [page, search]
})`

  const demoScriptCode = `type User = { id: number; name: string; email: string }

// [實戰範例] 結合 Lazy Loading 與資料轉換
const { data: users, status, error, refresh } = await useFetch<User[]>(
  'https://jsonplaceholder.typicode.com/users', 
  {
    lazy: true, // 非阻塞模式
    // [重點] 只取前 4 筆，減少前端處理負擔
    transform: (users) => users.slice(0, 4),
    // [重點] 設定唯一的 key，避免水合不一致
    key: 'users-list-demo'
  }
)`
</script>

<template>
  <TutorialPage title="資料獲取"
    description="Nuxt 4 提供了強大的資料獲取組合式函數 (Composables)，完美解決了 SSR 環境下的重複請求 (Double Fetching) 與水合不一致 (Hydration Mismatch) 問題。"
    :badges="[{ label: 'Core', color: 'primary' }, { label: 'SSR Ready', color: 'primary' }]">

    <!-- 1. Why useFetch -->
    <TutorialSection id="why-usefetch" title="為什麼不能直接用 fetch？" icon="heroicons:question-mark-circle" separator>
      <div class="space-y-12">
        <p>
          在傳統的 Vue SPA 中，我們習慣在 <code class="text-emerald-400">onMounted</code> 鉤子中呼叫 API。
          但在 Nuxt 的 <strong>SSR (伺服器端渲染)</strong> 模式下，這種做法會帶來兩個嚴重問題：
        </p>

        <!-- Comparison Grid -->
        <div class="grid md:grid-cols-2 gap-10 relative">
          <!-- VS Badge -->
          <div
            class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-900 items-center justify-center  z-20 shadow-2xl shadow-black">
            <span class="text-sm font-black text-slate-700 italic">VS</span>
          </div>

          <!-- Left: Traditional -->
          <div
            class="group relative rounded-3xl bg-slate-950 border border-slate-800/50 overflow-hidden hover:border-red-500/20 transition-all duration-500">
            <!-- Header -->
            <div class="p-8 border-b border-slate-800/50 bg-slate-900/20 flex items-center gap-5">
              <div
                class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 ring-1 ring-red-500/20 shadow-lg shadow-red-500/10">
                <Icon name="heroicons:globe-alt" class="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-200">Traditional Fetch</h3>
                <p class="text-xs text-slate-500 font-mono mt-1.5 tracking-wide">CLIENT-SIDE PATTERN</p>
              </div>
            </div>

            <!-- Timeline -->
            <div class="p-8 relative">
              <!-- Vertical Track -->
              <div
                class="absolute left-14 top-14 bottom-8 w-px bg-slate-800/50 border-l border-dashed border-slate-800">
              </div>

              <div class="space-y-10">
                <!-- Step 1 -->
                <div class="relative flex gap-8">
                  <div
                    class="ml-2 w-8 h-8 rounded-full bg-slate-900 border-4 border-slate-950 ring-1 ring-slate-800 flex items-center justify-center z-10 shrink-0 mt-1">
                    <div class="w-2 h-2 rounded-full bg-slate-600"></div>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span
                        class="text-xs font-bold bg-slate-900 text-slate-500 px-2 py-1 rounded-full uppercase tracking-wider border border-slate-800">Server</span>
                    </div>
                    <div class="text-base text-slate-500 line-through decoration-slate-700">onMounted()</div>
                    <div class="text-xs text-slate-600 mt-1.5">Lifecycle hook ignored</div>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="relative flex gap-8">
                  <div
                    class="ml-2 w-8 h-8 rounded-full bg-red-500/10 border-4 border-slate-950 ring-1 ring-red-500/30 flex items-center justify-center z-10 shrink-0 mt-1 shadow-lg shadow-red-500/10">
                    <div class="w-2 h-2 rounded-full bg-red-400"></div>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span
                        class="text-xs font-bold bg-red-500/10 text-red-400 px-2 py-1 rounded-full uppercase tracking-wider border border-red-500/20">Client</span>
                    </div>
                    <div class="text-base text-slate-200 font-medium">Re-fetching Data</div>
                    <div class="text-xs text-red-400/60 mt-1.5">Causes layout shift & delay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Nuxt useFetch -->
          <div
            class="group relative rounded-3xl bg-slate-950 border border-emerald-500/20 overflow-hidden shadow-lg shadow-emerald-500/5">
            <!-- Header -->
            <div class="p-8 border-b border-emerald-500/10 bg-emerald-500/5 flex items-center gap-5">
              <div
                class="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/10">
                <Icon name="heroicons:bolt" class="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Nuxt useFetch</h3>
                <p class="text-xs text-emerald-400/60 font-mono mt-1.5 tracking-wide">UNIVERSAL DATA FETCHING</p>
              </div>
            </div>

            <!-- Timeline -->
            <div class="p-8 relative">
              <!-- Vertical Track -->
              <div class="absolute left-14 top-14 bottom-8 w-px bg-emerald-500/20"></div>

              <div class="space-y-10">
                <!-- Step 1 -->
                <div class="relative flex gap-8">
                  <div
                    class="ml-2 w-8 h-8 rounded-full bg-emerald-500/10 border-4 border-slate-950 ring-1 ring-emerald-500/40 flex items-center justify-center z-10 shrink-0 mt-1 shadow-lg shadow-emerald-500/20">
                    <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span
                        class="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">Server</span>
                    </div>
                    <div class="text-base text-white font-bold">Prefetch & Cache</div>
                    <div class="text-xs text-emerald-400/50 mt-1.5">Data serialized into HTML</div>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="relative flex gap-8">
                  <div
                    class="ml-2 w-8 h-8 rounded-full bg-slate-900 border-4 border-slate-950 ring-1 ring-slate-800 flex items-center justify-center z-10 shrink-0 mt-1">
                    <div class="w-2 h-2 rounded-full bg-slate-500"></div>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span
                        class="text-xs font-bold bg-slate-900 text-slate-500 px-2 py-1 rounded-full uppercase tracking-wider border border-slate-800">Client</span>
                    </div>
                    <div class="text-base text-slate-300">Hydration</div>
                    <div class="text-xs text-slate-500 mt-1.5">Instant restore from payload</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Deep Dive: Data Flow -->
        <div class="pt-8 border-t border-slate-800/50">
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Icon name="heroicons:cpu-chip" class="w-4 h-4" />
              Under the Hood
            </h4>
            <span class="text-xs text-slate-600 font-mono">SSR Data Pipeline</span>
          </div>

          <div class="w-full bg-slate-950 rounded-xl border border-slate-800 p-8 relative overflow-hidden">
            <!-- Background Grid -->
            <div class="absolute inset-0 bg-slate-900/20"></div>

            <div class="relative z-10 grid md:grid-cols-3 gap-8 items-start">
              <!-- Connecting Line (Desktop) -->
              <div
                class="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-slate-800 via-emerald-500/20 to-slate-800">
              </div>

              <!-- Step 1 -->
              <div class="flex flex-col items-center text-center group">
                <div
                  class="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 shadow-lg group-hover:border-emerald-500/50 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all duration-300 z-10 relative">
                  <Icon name="heroicons:server-stack"
                    class="w-8 h-8 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  <div
                    class="absolute -bottom-2 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400">
                    API</div>
                </div>
                <h5 class="text-slate-200 font-bold mb-1">1. Prefetch</h5>
                <p class="text-xs text-slate-500 leading-relaxed max-w-48">
                  Server 執行請求並等待結果
                </p>
              </div>

              <!-- Step 2 -->
              <div class="flex flex-col items-center text-center group">
                <div
                  class="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 shadow-lg group-hover:border-amber-500/50 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-300 z-10 relative">
                  <Icon name="heroicons:code-bracket"
                    class="w-8 h-8 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  <div
                    class="absolute -bottom-2 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400">
                    JSON</div>
                </div>
                <h5 class="text-slate-200 font-bold mb-1">2. Serialize</h5>
                <p class="text-xs text-slate-500 leading-relaxed max-w-48">
                  資料嵌入 HTML <code class="text-amber-500/70">&lt;script&gt;</code>
                </p>
              </div>

              <!-- Step 3 -->
              <div class="flex flex-col items-center text-center group">
                <div
                  class="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 shadow-lg group-hover:border-sky-500/50 group-hover:shadow-lg group-hover:shadow-sky-500/10 transition-all duration-300 z-10 relative">
                  <Icon name="heroicons:bolt"
                    class="w-8 h-8 text-slate-500 group-hover:text-sky-400 transition-colors" />
                  <div
                    class="absolute -bottom-2 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400">
                    DOM</div>
                </div>
                <h5 class="text-slate-200 font-bold mb-1">3. Hydrate</h5>
                <p class="text-xs text-slate-500 leading-relaxed max-w-48">
                  前端直接還原狀態，零請求
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TutorialSection>

    <!-- 2. Basic Usage -->
    <TutorialSection id="basic-usage" title="基本用法" icon="heroicons:code-bracket-square">
      <p class="text-lg">
        <code class="text-emerald-400 font-bold">useFetch</code> 是 Nuxt 提供的全能型工具，它自動處理了上述所有問題。你只需要一行程式碼，就能獲得響應式的資料與請求狀態。
      </p>

      <AppCodeBlock :code="basicUsageCode" lang="ts" filename="app.vue" />

      <div class="grid sm:grid-cols-2 gap-4 mt-6">
        <!-- Data -->
        <div
          class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-4 hover:bg-slate-800/50 hover:border-slate-700 transition-all group">
          <div
            class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <Icon name="heroicons:circle-stack" class="w-5 h-5" />
          </div>
          <div>
            <div class="text-emerald-400 font-mono font-bold mb-1">data</div>
            <div class="text-sm text-slate-400">回傳的資料結果，型別為 <code
                class="text-xs bg-slate-800 px-1 py-0.5 rounded">Ref&lt;T&gt;</code>。若請求失敗則為 null。</div>
          </div>
        </div>

        <!-- Status -->
        <div
          class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-4 hover:bg-slate-800/50 hover:border-slate-700 transition-all group">
          <div class="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
            <Icon name="heroicons:signal" class="w-5 h-5" />
          </div>
          <div>
            <div class="text-sky-400 font-mono font-bold mb-1">status</div>
            <div class="text-sm text-slate-400">目前的請求狀態字串：<br /><span class="text-xs text-slate-500 font-mono">'idle' |
                'pending'
                | 'success' | 'error'</span></div>
          </div>
        </div>

        <!-- Error -->
        <div
          class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-4 hover:bg-slate-800/50 hover:border-slate-700 transition-all group">
          <div class="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition-colors">
            <Icon name="heroicons:exclamation-circle" class="w-5 h-5" />
          </div>
          <div>
            <div class="text-red-400 font-mono font-bold mb-1">error</div>
            <div class="text-sm text-slate-400">當請求失敗時的錯誤物件，包含 statusCode 與 message。</div>
          </div>
        </div>

        <!-- Refresh -->
        <div
          class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-4 hover:bg-slate-800/50 hover:border-slate-700 transition-all group">
          <div class="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
            <Icon name="heroicons:arrow-path" class="w-5 h-5" />
          </div>
          <div>
            <div class="text-amber-400 font-mono font-bold mb-1">refresh()</div>
            <div class="text-sm text-slate-400">一個函式，呼叫後會強制重新發送請求，常用於「重新整理」按鈕。</div>
          </div>
        </div>
      </div>
    </TutorialSection>

    <!-- 3. Advanced Features -->
    <TutorialSection id="advanced-features" title="進階特性" icon="heroicons:adjustments-horizontal" separator>
      <!-- Lazy Loading -->
      <div class="flex flex-col gap-8">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-slate-200 flex items-center gap-2">
            <Icon name="heroicons:clock" class="text-sky-400" />
            Lazy Loading (非阻塞導航)
          </h3>
          <p class="leading-relaxed">
            預設情況下，Nuxt 會等待所有 <code class="text-emerald-400">useFetch</code> 完成後才切換頁面 (Blocking Navigation)。
            <br><br>
            若 API 回應較慢，使用者會感覺點擊後「沒反應」。啟用 <code class="text-sky-400">lazy: true</code>
            後，頁面會<strong>立即切換</strong>，並在背景載入資料。這時你需要透過 <code class="text-sky-400">status</code> 來顯示 Loading 骨架屏。
          </p>
        </div>
        <AppCodeBlock :code="lazyCode" lang="vue" />
      </div>

      <div class="h-px bg-slate-800/50 w-full"></div>

      <!-- Watch & Params -->
      <div class="flex flex-col gap-8">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-slate-200 flex items-center gap-2">
            <Icon name="heroicons:eye" class="text-amber-400" />
            自動監聽與參數更新
          </h3>
          <p class="leading-relaxed">
            在製作搜尋、分頁功能時，我們希望當參數改變時自動重抓資料。
            <br><br>
            <code class="text-emerald-400">useFetch</code> 會自動解包 (Unwrap) 傳入 <code class="text-amber-400">query</code> 的
            ref。或者，你也可以使用 <code class="text-amber-400">watch</code> 選項來明確指定要監聽的變數。
          </p>
        </div>
        <AppCodeBlock :code="watchCode" lang="ts" />
      </div>
    </TutorialSection>

    <!-- 3.5 useAsyncData -->
    <TutorialSection id="useasyncdata" title="useAsyncData 的使用時機" icon="heroicons:circle-stack" separator>
      <div class="space-y-6">
        <p>
          <code class="text-emerald-400">useFetch</code> 其實是 <code class="text-emerald-400">useAsyncData</code> 加上 <code
            class="text-emerald-400">$fetch</code> 的語法糖。
          但在某些情況下，你必須直接使用 <code class="text-emerald-400">useAsyncData</code>：
        </p>

        <ul class="space-y-2 text-slate-400 ml-1">
          <li class="flex items-start gap-3">
            <Icon name="heroicons:code-bracket" class="w-5 h-5 text-emerald-500 mt-0.5" />
            <span>整合第三方 SDK (Firebase, CMS Clients, GraphQL)。</span>
          </li>
          <li class="flex items-start gap-3">
            <Icon name="heroicons:arrows-right-left" class="w-5 h-5 text-emerald-500 mt-0.5" />
            <span>需要串聯多個請求後才回傳單一結果。</span>
          </li>
        </ul>

        <AppCodeBlock :code="asyncDataCode" lang="ts" />

        <div class="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
          <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div class="text-sm text-amber-200/80">
            <strong class="text-amber-400 block mb-1">關於 Key 的重要性</strong>
            在使用 <code class="font-mono">useAsyncData</code> 時，務必提供一個唯一的 key。Nuxt 依賴這個 key 在 Server 與 Client 之間傳遞資料快取
            (Payload)。若 key 重複，可能導致資料汙染或水合錯誤。
          </div>
        </div>
      </div>
    </TutorialSection>

    <!-- 4. $fetch vs useFetch -->
    <TutorialSection id="fetch-vs-usefetch" title="$fetch vs useFetch" icon="heroicons:arrows-right-left">
      <p>Nuxt 提供了兩個長得很像的工具，初學者常混淆。請記住以下原則：</p>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- useFetch Card -->
        <div
          class="relative group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon name="heroicons:cube-transparent" class="w-24 h-24 text-emerald-500" />
          </div>
          <h3 class="text-xl font-bold text-emerald-400 mb-2">useFetch</h3>
          <p class="text-sm text-slate-500 mb-6 font-mono">Composable (Setup Context)</p>

          <div class="space-y-4">
            <div class="flex gap-3">
              <Icon name="heroicons:check-circle" class="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <strong class="text-slate-200 block">頁面初始化資料</strong>
                <span class="text-sm text-slate-400">進入頁面時就需要看到的資料 (SSR)。</span>
              </div>
            </div>
            <div class="flex gap-3">
              <Icon name="heroicons:check-circle" class="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <strong class="text-slate-200 block">自動去重 (Deduplication)</strong>
                <span class="text-sm text-slate-400">避免 Server 與 Client 重複發送請求。</span>
              </div>
            </div>
            <div class="flex gap-3">
              <Icon name="heroicons:check-circle" class="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <strong class="text-slate-200 block">需要狀態管理</strong>
                <span class="text-sm text-slate-400">需要 loading 狀態、錯誤處理、快取。</span>
              </div>
            </div>
          </div>
        </div>

        <!-- $fetch Card -->
        <div
          class="relative group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-all">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon name="heroicons:paper-airplane" class="w-24 h-24 text-sky-500" />
          </div>
          <h3 class="text-xl font-bold text-sky-400 mb-2">$fetch</h3>
          <p class="text-sm text-slate-500 mb-6 font-mono">Utility Function (Anywhere)</p>

          <div class="space-y-4">
            <div class="flex gap-3">
              <Icon name="heroicons:cursor-arrow-rays" class="w-6 h-6 text-sky-500 shrink-0" />
              <div>
                <strong class="text-slate-200 block">使用者互動觸發</strong>
                <span class="text-sm text-slate-400">點擊按鈕送出表單、登入、加入購物車。</span>
              </div>
            </div>
            <div class="flex gap-3">
              <Icon name="heroicons:server" class="w-6 h-6 text-sky-500 shrink-0" />
              <div>
                <strong class="text-slate-200 block">非元件環境</strong>
                <span class="text-sm text-slate-400">在 Middleware、Pinia Actions 或純 JS 檔中使用。</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TutorialSection>

    <!-- 5. Live Demo -->
    <TutorialSection id="live-demo" title="實戰演練" icon="heroicons:play" separator>
      <p>
        以下範例展示了如何從 JSONPlaceholder API 獲取使用者列表。我們使用了 <code class="text-emerald-400">lazy</code> 模式來優化載入體驗，並透過 <code
          class="text-emerald-400">transform</code> 只保留前 4 筆資料。
      </p>

      <div class="flex flex-col gap-8">
        <!-- Demo Component -->
        <div class="space-y-3">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Preview</div>
          <DataFetchingDemo />
        </div>

        <!-- Code Snippet -->
        <div class="space-y-3">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Core Logic</div>
          <AppCodeBlock :code="demoScriptCode" lang="ts" filename="DataFetchingDemo.vue" />

          <div class="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 text-sm text-slate-400 flex gap-3">
            <Icon name="heroicons:light-bulb" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong class="text-emerald-400 block mb-1">小技巧</strong>
              試著點擊範例右上角的「重新整理」按鈕，觀察 Skeleton Loading 的效果。這就是 <code class="text-slate-300">status === 'pending'</code>
              的實際應用。
            </div>
          </div>
        </div>
      </div>
    </TutorialSection>

  </TutorialPage>
</template>