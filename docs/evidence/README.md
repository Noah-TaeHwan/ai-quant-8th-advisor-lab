# 백테스트 증거 (curated)

대표 결과만 봅니다. 전체 실행 산출물은 각 `*-results/`에 있습니다.

- 삼성전자 Buy&Hold: `../lean-results/samsung-report.html`, 주문·통계 `../lean-results/SamsungBuyAndHold-summary.json`
- 현대차 추세 추종: `../hyundai-results/hyundai-2026-h1-report.html`, 주문·통계 `../hyundai-results/HyundaiTrendBacktest-summary.json`

재현:

```bash
docker compose -f docker-compose.lean.yml run --rm samsung-backtest
docker compose -f docker-compose.hd.yaml run --build --rm hyundai-backtest
```

전제: KRX 수수료·세금·배당·액면분할·환율 미반영 교육용 실행입니다.
`data-monitor-*`·`failed/succeeded-data-requests-*`는 LEAN 데이터 다운로드 과정 파일로 참고용입니다.
