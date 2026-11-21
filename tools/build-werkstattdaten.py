#!/usr/bin/env python3
"""Build two separate open-data projections; never reads the internal lead store."""
import collections
import hashlib
import io
import json
import re
import sys
import zipfile
from pathlib import Path


def points(geometry):
    def visit(value):
        if not isinstance(value, list) or not value:
            return
        if len(value) >= 2 and all(type(n) in (float, int) for n in value[:2]):
            x, y = value[:2]
            if 5 < x < 16 and 47 < y < 56:
                yield x, y
        else:
            for child in value:
                yield from visit(child)
    return list(visit(geometry.get('coordinates')))


def osm_records(osm):
    by_id = {}
    for f in osm['features']:
        tags = f['properties']
        if (tags.get('shop') not in ('car_repair', 'tyres', 'motorcycle_repair')
                and tags.get('craft') not in ('car_repair', 'car_painter', 'coachbuilder', 'varnisher')):
            continue
        name = tags.get('name', '').strip()
        key = f.get('id', '')
        if not 1 <= len(name) <= 180 or not re.fullmatch(r'[nwr][1-9][0-9]*', key):
            continue
        pts = points(f['geometry'])
        if not pts:
            continue
        xs, ys = zip(*pts)
        record = [key, name, round((min(ys) + max(ys)) / 2, 5), round((min(xs) + max(xs)) / 2, 5)]
        by_id.setdefault(key, record)
    return sorted(by_id.values())


def postal_records(archive):
    values = set()
    licence = archive.read('readme.txt').decode('utf-8')
    if 'Creative Commons Attribution 4.0' not in licence:
        raise ValueError('GeoNames licence not verified')
    with io.TextIOWrapper(archive.open('DE.txt'), encoding='utf-8') as stream:
        for line in stream:
            row = line.rstrip('\r\n').split('\t')
            if len(row) != 12 or row[0] != 'DE' or not re.fullmatch(r'[0-9]{5}', row[1]):
                continue
            try:
                lat, lon = map(float, row[9:11])
            except ValueError:
                continue
            if 5 < lon < 16 and 47 < lat < 56 and row[2].strip() and row[3].strip():
                values.add((row[1], row[2].strip(), row[3].strip(), round(lat, 5), round(lon, 5)))
    return sorted(values)


def write_json(path, values):
    with path.open('x', encoding='utf-8') as out:
        json.dump(values, out, ensure_ascii=False, separators=(',', ':'))
        out.write('\n')


def sha(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def main(osm_path, zip_path, output):
    with osm_path.open(encoding='utf-8') as f:
        osm = osm_records(json.load(f))
    with zipfile.ZipFile(zip_path) as archive:
        postal = postal_records(archive)
    if len(osm) < 1000 or len(postal) < 5000:
        raise ValueError('Unexpectedly small source projection')
    if not {'10115', '01067'} <= {o[0] for o in postal}:
        raise ValueError('Reference ZIP codes missing')
    output.mkdir(parents=True, exist_ok=False)
    write_json(output / 'osm-werkstaetten.json', osm)
    write_json(output / 'geonames-orte.json', postal)
    write_json(output / 'manifest.json', {
        'osm': {'sha256': sha(osm_path), 'records': len(osm), 'licence': 'ODbL-1.0'},
        'geonames': {'sha256': sha(zip_path), 'records': len(postal), 'licence': 'CC-BY-4.0'},
    })
    print(f'OSM {len(osm)}, GeoNames {len(postal)}, ZIPs {len(collections.Counter(o[0] for o in postal))}')


if __name__ == '__main__':
    main(*map(Path, sys.argv[1:]))
