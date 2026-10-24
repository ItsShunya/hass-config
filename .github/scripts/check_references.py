#!/usr/bin/env python3
"""Check that every file the configuration references exists and parses.

Home Assistant's check_config does not read YAML dashboards (they are only
loaded when opened), so a missing include or dashboard file goes unnoticed
until someone opens the dashboard. Starting from configuration.yaml, this
follows !include tags, lovelace dashboard filenames and /local/ URLs, and
exits non-zero if any target is missing or is not valid YAML.
"""

import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
errors: list[str] = []
loaded: set[Path] = set()


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


class Loader(yaml.SafeLoader):
    """SafeLoader that understands Home Assistant's custom tags."""


def _base(loader: Loader) -> Path:
    return Path(loader.name).parent


def _include(loader: Loader, node: yaml.Node):
    target = _base(loader) / loader.construct_scalar(node)
    return load(target, referrer=Path(loader.name))


def _include_dir(loader: Loader, node: yaml.Node):
    target = _base(loader) / loader.construct_scalar(node)
    if not target.is_dir():
        errors.append(f"{rel(Path(loader.name))}: directory not found: {rel(target)}")
        return None
    return [load(f, referrer=Path(loader.name)) for f in sorted(target.rglob("*.yaml"))]


def _placeholder(loader: Loader, node: yaml.Node):
    return None


Loader.add_constructor("!include", _include)
for tag in ("!include_dir_list", "!include_dir_named",
            "!include_dir_merge_list", "!include_dir_merge_named"):
    Loader.add_constructor(tag, _include_dir)
for tag in ("!secret", "!env_var", "!input"):
    Loader.add_constructor(tag, _placeholder)


def load(path: Path, referrer: Path | None = None):
    path = path.resolve()
    if not path.is_file():
        where = f"{rel(referrer)}: " if referrer else ""
        errors.append(f"{where}file not found: {rel(path)}")
        return None
    if path in loaded:
        return None
    loaded.add(path)
    try:
        with path.open(encoding="utf-8") as stream:
            return yaml.load(stream, Loader=Loader)
    except yaml.YAMLError as err:
        errors.append(f"{rel(path)}: invalid YAML: {err}")
        return None


def local_urls(data):
    """Yield every string in data that points into www/ (a /local/ URL)."""
    if isinstance(data, str):
        if data.startswith("/local/"):
            yield data
    elif isinstance(data, dict):
        for value in data.values():
            yield from local_urls(value)
    elif isinstance(data, list):
        for value in data:
            yield from local_urls(value)


def main() -> int:
    config_file = ROOT / "configuration.yaml"
    config = load(config_file) or {}
    documents = [config]

    lovelace = config.get("lovelace") or {}
    for name, dashboard in (lovelace.get("dashboards") or {}).items():
        filename = (dashboard or {}).get("filename")
        if filename:
            documents.append(load(ROOT / filename, referrer=config_file))

    for url in sorted({u for doc in documents for u in local_urls(doc)}):
        target = ROOT / "www" / url.removeprefix("/local/").split("?")[0]
        if not target.is_file():
            errors.append(f"/local/ URL has no file in www/: {url}")

    for error in errors:
        print(f"ERROR {error}")
    print(f"Checked {len(loaded)} YAML files: {len(errors)} error(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
