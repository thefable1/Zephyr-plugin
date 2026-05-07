# Zephyr Plugins

The curated registry of community plugins for [Zephyr](https://github.com/Prismo-Studio/Zephyr).

Zephyr fetches `registry.json` from this repository to populate its plugin browser. Each entry points to a folder under `themes/`, `games/`, or `mods/`.

## Layout

```
themes/<plugin-id>/manifest.json
themes/<plugin-id>/theme.css

games/<plugin-id>/manifest.json
games/<plugin-id>/game.json

mods/<plugin-id>/manifest.json

registry.json
scripts/build-registry.mjs
```

## Contributing

1. Use [zephyr-plugin-template](https://github.com/Prismo-Studio/zephyr-plugin-template) to build and test your plugin first.
2. Fork this repository and open a pull request adding a new folder under the matching type directory (`themes`, `games`, or `mods`).
3. The folder name must match the `id` field of your `manifest.json`.
4. Maintainers review for safety, quality, and metadata correctness before merging.
5. After merge, CI runs `scripts/build-registry.mjs` to regenerate `registry.json`.

## Local registry rebuild

```sh
node scripts/build-registry.mjs
```

Walks `themes/`, `games/`, and `mods/`, then writes a fresh `registry.json` listing every plugin found.
# Zephyr-plugin
