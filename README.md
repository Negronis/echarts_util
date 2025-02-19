## Echarts 可视化编辑工具

可实现Echarts实时渲染，数据可视化修改，开发中

---

## 比例固定缩放 - 大屏运行模式
#### 运行依赖：
##### Echarts.js

```javascript
npm install echarts --save 
``` 

#### 运行方式：

```javascript
npm install
npm run serve
```

#### 思路

计算固定分辨率的比率，通过屏幕宽高与固定分辨率来计算缩放比率，通过固定比率与屏幕宽高比率来判定屏幕的异形情况，通过屏幕宽/高与缩放后的大屏宽/高之差计算边距来达到居中效果。
 