/**
 * Taxonomy — 消费/商用/Xbox 品类与路由的唯一 interface。
 * #/surface 是历史死路由，必须改写到 #/consumer 或 #/business 或 #/xbox。
 */
const Taxonomy = (function () {
  function segmentOf(device) {
    if (typeof Catalog !== 'undefined' && Catalog.segmentOf) return Catalog.segmentOf(device);
    if (!device) return 'consumer';
    if (device.segment === 'commercial' || device.segment === 'consumer' || device.segment === 'xbox') return device.segment;
    if (device.categoryId === 'xbox') return 'xbox';
    return device.isCommercial ? 'commercial' : 'consumer';
  }

  function seriesIdOf(device) {
    if (!device) return '';
    if (device.categoryId === 'xbox' || segmentOf(device) === 'xbox') {
      return 'consoles';
    }
    if (segmentOf(device) === 'commercial' && (device.categoryId === 'studio' || device.categoryId === 'hub')) {
      return 'hub';
    }
    return device.categoryId || '';
  }

  function routePrefix(segment) {
    if (segment === 'commercial') return 'business';
    if (segment === 'xbox') return 'xbox';
    return 'consumer';
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
    if (seriesId === 'xbox' || seriesId === 'consoles' || seriesId === 'xbox-consoles') return 'XBOX 主机';
    if (seriesId === 'controllers' || seriesId === 'xbox-controllers') return 'XBOX 手柄';
    if (seriesId === 'accessories' || seriesId === 'xbox-accessories') return 'XBOX 配件';
    const token = seriesId ? String(seriesId) : '';
    if (segment === 'xbox') return 'XBOX ' + token;
    return segment === 'commercial'
      ? ('Surface ' + token + ' 商用系列')
      : ('Surface ' + token + ' 消费系列');
  }

  function canonicalPath(input) {
    if (!input) return '#/';
    if (input.id && input.specs) {
      const segment = segmentOf(input);
      const seriesId = seriesIdOf(input);
      if (segment === 'xbox' || input.categoryId === 'xbox') {
        return '#/xbox/consoles/' + input.id;
      }
      return '#/' + routePrefix(segment) + '/' + seriesId + '/' + input.id;
    }
    const segment = input.segment || 'consumer';
    const seriesId = input.seriesId;
    if (segment === 'xbox' || seriesId === 'xbox' || seriesId === 'consoles') {
      if (input.deviceId) {
        return '#/xbox/consoles/' + input.deviceId;
      }
      return '#/xbox/' + (seriesId && seriesId !== 'xbox' ? seriesId : 'consoles');
    }
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

    if (clean === '/xbox') {
      return {
        kind: 'series',
        segment: 'xbox',
        seriesId: 'consoles',
        canonical: '#/xbox/consoles',
        rewritten: true
      };
    }

    let m = clean.match(/^\/xbox\/([^/]+)\/([^/]+)$/);
    if (m) {
      return { kind: 'detail', segment: 'xbox', seriesId: m[1], deviceId: m[2], canonical: '#/xbox/' + m[1] + '/' + m[2] };
    }
    m = clean.match(/^\/xbox\/([^/]+)$/);
    if (m) {
      return { kind: 'series', segment: 'xbox', seriesId: m[1], canonical: '#/xbox/' + m[1] };
    }

    m = clean.match(/^\/business\/([^/]+)\/([^/]+)$/);
    if (m) {
      return { kind: 'detail', segment: 'commercial', seriesId: m[1], deviceId: m[2], canonical: '#/business/' + m[1] + '/' + m[2] };
    }
    m = clean.match(/^\/business\/([^/]+)$/);
    if (m) {
      return { kind: 'series', segment: 'commercial', seriesId: m[1], canonical: '#/business/' + m[1] };
    }
    m = clean.match(/^\/consumer\/([^/]+)\/([^/]+)$/);
    if (m) {
      if (m[1] === 'xbox') {
        return { kind: 'detail', segment: 'xbox', seriesId: 'consoles', deviceId: m[2], canonical: '#/xbox/consoles/' + m[2], rewritten: true };
      }
      return { kind: 'detail', segment: 'consumer', seriesId: m[1], deviceId: m[2], canonical: '#/consumer/' + m[1] + '/' + m[2] };
    }
    m = clean.match(/^\/consumer\/([^/]+)$/);
    if (m) {
      if (m[1] === 'xbox') {
        return { kind: 'series', segment: 'xbox', seriesId: 'consoles', canonical: '#/xbox/consoles', rewritten: true };
      }
      return { kind: 'series', segment: 'consumer', seriesId: m[1], canonical: '#/consumer/' + m[1] };
    }

    m = clean.match(/^\/surface\/([^/]+)\/([^/]+)$/);
    if (m) {
      const fallbackSeries = m[1];
      const deviceId = m[2];
      const dev = (typeof Catalog !== 'undefined' && Catalog.getDevice) ? Catalog.getDevice(deviceId) : null;
      const segment = segmentOf(dev);
      const seriesId = dev ? seriesIdOf(dev) : fallbackSeries;
      if (segment === 'xbox' || fallbackSeries === 'xbox') {
        return {
          kind: 'detail',
          segment: 'xbox',
          seriesId: 'consoles',
          deviceId: deviceId,
          canonical: '#/xbox/consoles/' + deviceId,
          rewritten: true
        };
      }
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
      if (seriesId === 'xbox') {
        return {
          kind: 'series',
          segment: 'xbox',
          seriesId: 'consoles',
          canonical: '#/xbox/consoles',
          rewritten: true
        };
      }
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
