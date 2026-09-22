/**
 * Taxonomy — 消费/商用品类与路由的唯一 interface。
 * #/surface 是历史死路由，必须改写到 #/consumer 或 #/business。
 */
const Taxonomy = (function () {
  function segmentOf(device) {
    if (typeof Catalog !== 'undefined' && Catalog.segmentOf) return Catalog.segmentOf(device);
    if (!device) return 'consumer';
    if (device.segment === 'commercial' || device.segment === 'consumer') return device.segment;
    return device.isCommercial ? 'commercial' : 'consumer';
  }

  function seriesIdOf(device) {
    if (!device) return '';
    if (segmentOf(device) === 'commercial' && (device.categoryId === 'studio' || device.categoryId === 'hub')) {
      return 'hub';
    }
    return device.categoryId || '';
  }

  function routePrefix(segment) {
    return segment === 'commercial' ? 'business' : 'consumer';
  }

  function seriesLabel(seriesId, segment) {
    const list = (typeof Catalog !== 'undefined' && Catalog.listSeries)
      ? Catalog.listSeries(segment)
      : [];
    const hit = list.find(function (c) {
      return c.seriesId === seriesId || c.id === seriesId;
    });
    if (hit && hit.name) return hit.name;
    if (seriesId === 'hub') return 'Surface Hub & Studio 商用协作系列';
    const token = seriesId ? String(seriesId) : '';
    return segment === 'commercial'
      ? ('Surface ' + token + ' 商用系列')
      : ('Surface ' + token + ' 消费系列');
  }

  function canonicalPath(input) {
    if (!input) return '#/';
    if (input.id && input.specs) {
      const segment = segmentOf(input);
      const seriesId = seriesIdOf(input);
      return '#/' + routePrefix(segment) + '/' + seriesId + '/' + input.id;
    }
    const segment = input.segment || 'consumer';
    const seriesId = input.seriesId;
    if (!seriesId) return segment === 'commercial' ? '#/business' : '#/';
    if (input.deviceId) {
      return '#/' + routePrefix(segment) + '/' + seriesId + '/' + input.deviceId;
    }
    return '#/' + routePrefix(segment) + '/' + seriesId;
  }

  function resolvePath(path) {
    const clean = String(path || '').replace(/^#/, '');
    if (clean === '/business' || clean === '/surface/business') {
      return {
        kind: 'business-home',
        segment: 'commercial',
        canonical: '#/business',
        rewritten: clean === '/surface/business'
      };
    }

    let m = clean.match(/^\/business\/([^/]+)\/([^/]+)$/);
    if (m) {
      return { kind: 'detail', segment: 'commercial', seriesId: m[1], deviceId: m[2], canonical: '#/business/' + m[1] + '/' + m[2] };
    }
    m = clean.match(/^\/business\/([^/]+)$/);
    if (m) {
      return { kind: 'series', segment: 'commercial', seriesId: m[1], canonical: '#/business/' + m[1] };
    }
    m = clean.match(/^\/consumer\/([^/]+)\/([^/]+)$/);
    if (m) {
      return { kind: 'detail', segment: 'consumer', seriesId: m[1], deviceId: m[2], canonical: '#/consumer/' + m[1] + '/' + m[2] };
    }
    m = clean.match(/^\/consumer\/([^/]+)$/);
    if (m) {
      return { kind: 'series', segment: 'consumer', seriesId: m[1], canonical: '#/consumer/' + m[1] };
    }

    m = clean.match(/^\/surface\/([^/]+)\/([^/]+)$/);
    if (m) {
      const fallbackSeries = m[1];
      const deviceId = m[2];
      const dev = (typeof Catalog !== 'undefined' && Catalog.getDevice) ? Catalog.getDevice(deviceId) : null;
      const segment = segmentOf(dev);
      const seriesId = dev ? seriesIdOf(dev) : fallbackSeries;
      return {
        kind: 'detail',
        segment: segment,
        seriesId: seriesId,
        deviceId: deviceId,
        canonical: '#/' + routePrefix(segment) + '/' + seriesId + '/' + deviceId,
        rewritten: true
      };
    }

    m = clean.match(/^\/surface\/([^/]+)$/);
    if (m) {
      const seriesId = m[1];
      const segment = seriesId === 'hub' ? 'commercial' : 'consumer';
      return {
        kind: 'series',
        segment: segment,
        seriesId: seriesId,
        canonical: '#/' + routePrefix(segment) + '/' + seriesId,
        rewritten: true
      };
    }

    return { kind: 'unknown', canonical: '#/' };
  }

  return {
    segmentOf: segmentOf,
    seriesIdOf: seriesIdOf,
    seriesLabel: seriesLabel,
    canonicalPath: canonicalPath,
    resolvePath: resolvePath,
    routePrefix: routePrefix
  };
})();

if (typeof window !== 'undefined') {
  window.Taxonomy = Taxonomy;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Taxonomy;
}
