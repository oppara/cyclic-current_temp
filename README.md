# current_temp

1 時間毎にアメダス東京の現在気温を Twitter につぶやくボット。<br>
[@current_temp](https://twitter.com/current_temp)

## Cyclic.sh

[Cyclic.sh](https://www.cyclic.sh/) 上で動作させる。

### Cron

- Method: GET
- Path: /
- Schedule Type: Schedule
- Cron Expression: 10 */1 * * *