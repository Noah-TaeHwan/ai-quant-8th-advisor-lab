// S3 분할용 API 베이스 (classic script, import/export 없음)
// api.js(apiFetch) 외에 views/ 등에 직접 fetch('/api/...') 호출이 수십 곳 있어
// shim 하나로 현재+미래 호출을 모두 커버한다 (S3에서는 EC2로, EC2 same-origin에서는 '' 그대로).
(function () {
  var host = (typeof location !== 'undefined' && location.hostname) || '';
  // S3 정적호스팅(amazonaws.com)에서만 EC2 백엔드로, 그 외 same-origin은 '' 유지
  window.__API_BASE__ = host.slice(-13) === 'amazonaws.com' ? 'http://54.116.230.120:8000' : '';

  // 기존 fetch 그대로 전달 — 문자열 '/api/' 시작 URL만 prefix, FormData 등 옵션(method/headers/body) 손대지 않음
  var _fetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    if (typeof input === 'string' && input.indexOf('/api/') === 0) {
      return _fetch(window.__API_BASE__ + input, init);
    }
    return _fetch(input, init);
  };

  // S3에서는 문서 링크도 EC2로 연결 (same-origin이면 그대로 /docs)
  if (window.__API_BASE__) {
    var el = document.getElementById('health-indicator');
    if (el) el.href = window.__API_BASE__ + '/docs';
  }
})();
