# current_temp

1 時間毎にアメダス東京の現在気温を Twitter につぶやくボット。<br>
[@current_temp](https://twitter.com/current_temp)

## Cyclic.sh

[Cyclic.sh](https://www.cyclic.sh/) 上で動作させる。

Tiny API を元に実装。

### Cron

- Method: GET
- Path: /
- Schedule Type: Schedule
- Cron Expression: 18 */1 * * *

### Variables

以下の環境変数を設定すみ。

- APP_KEY
- APP_SECRET
- ACCESS_TOKEN
- ACCESS_SECRET
- MAILGUN_API_KEY
- MAILGUN_DOMAIN
- MAILGUN_FROM_ADDRESS
- MAILGUN_TO_ADDRESS