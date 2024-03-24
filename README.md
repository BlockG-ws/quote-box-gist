# quote-box

从句子json中随机抽取语录，格式化后保存至 `quote.txt`。你可以利用 GitHub Actions 來定时推送到 [Gist](https://gist.github.com) 并在个人资料中置顶，以增添其丰富程度。


> *PS. 若想了解更多「置頂 Gist」專案，請參見*  
> *<https://github.com/matchai/awesome-pinned-gists>*

## 使用

首先在需要运行 Actions 的仓库根目录创建 `quotes.json`：
```json
[
  {"id":1,"sentence":"海内存知己，天涯若比邻。请稍候...","category":1,"cite":"Windows 10/11 OOBE","author":"微软式中文"},
  {"id":2,"sentence":"我明白了勇气并不代表没有恐惧，而是战胜恐惧。勇敢的人不是不会恐惧的人，而是战胜了恐惧的人。","category":2,"cite":"...","author":"纳尔逊·曼德拉"},
  ...
  {"id":42,"sentence":"愛是唯一可以超越時間與空間的事物。","category":2,"cite":"星際效應","author":"艾蜜莉亞・布蘭德"}
]  
```

你可以使用 GitHub Actions 以将其推送到一个Gist，以下為一個範例，使用 [Deploy to Gist](https://github.com/marketplace/actions/deploy-to-gist)：

```yaml
name: Push to Gist

on:
  push:
    branches:
      - master
  schedule:
    - cron: 0 0 * * * # 每天執行

jobs:
  push:
    runs-on: ubuntu-22.04
    env:
      FILE_NAME: 🌧 Quote
      GIST_ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    steps:
    - name: Download
      uses: BlockG-ws/quote-box-gist@master # 尚未發布到 Marketplace
      with:
        quotes: ./quotes.json # 可選
    - name: Push
      uses: exuanbo/actions-deploy-gist@v1.1.4
      with:
        token: ${{ secrets.GH_TOKEN }} # 需要自行產生
        gist_id: ${{ env.GIST_ID }} # 上述 `env` 設定
        gist_file_name: ${{ env.FILE_NAME }} # 上述 `env` 設定
        file_path: quote.txt
        file_type: text

# Authored by Yu-huan Kuo, licensed under MIT License.
```

## 授权

原代码：
Copyright (C) 2023, 2024 [Yu-huan Kuo](https://github.com/rnmeow), licensed under [MIT License](https://github.com/rnmeow/quote-box-zh_tw/blob/master/LICENSE.txt).

此Fork：
Licensed under MIT License.