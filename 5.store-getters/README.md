观看顺序：
my-pinia.js ：检查缓存，有则返回，无则创建
store.js    ：创建了要共享的数据n
MyPage.vue  ：展示n
App.vue     ：展示组件被销毁时，n的值不管在哪个组件都不会被销毁，还是缓存的值