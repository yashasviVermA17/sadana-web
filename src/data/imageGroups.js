const imageModules = import.meta.glob('../assets/projects/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const EXTENSION_RE = /\.(jpe?g|png|webp)$/i
const DUPLICATE_SUFFIX_RE = /[\s\-_.]*(?:\(\d+\)|\[[^\]]*\]|copy ?\d*|\d+)$/i

const stripDuplicateSuffixes = (value) => {
  let current = value
  for (;;) {
    const next = current.replace(DUPLICATE_SUFFIX_RE, '').trimEnd()
    if (next === current) return current
    current = next
  }
}

const naturalCollator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

const groupKeyOf = (filename) =>
  stripDuplicateSuffixes(filename.replace(EXTENSION_RE, ''))
    .toLowerCase()
    .replace(/s$/i, '')

const titleCase = (value) => value.replace(/(^|\s)[a-z]/g, (match) => match.toUpperCase())

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const buckets = new Map()

Object.entries(imageModules).forEach(([filePath, url]) => {
  const filename = filePath.split('/').pop()
  const stem = filename.replace(EXTENSION_RE, '')
  const key = groupKeyOf(filename)
  const bucket = buckets.get(key) ?? []
  bucket.push({ filename, url, stem, base: stripDuplicateSuffixes(stem) })
  buckets.set(key, bucket)
})

export const projectImageGroups = Array.from(buckets.values())
  .map((images) => {
    const ordered = [...images].sort((a, b) => naturalCollator.compare(a.stem, b.stem))
    const titleBase = [...images].sort(
      (a, b) => b.base.length - a.base.length || naturalCollator.compare(a.base, b.base),
    )[0].base

    return {
      id: slugify(titleBase),
      title: titleCase(titleBase),
      cover: ordered[0].url,
      images: ordered,
      count: ordered.length,
    }
  })
  .sort((a, b) => naturalCollator.compare(a.title, b.title))

export const getProjectImageGroup = (id) => projectImageGroups.find((group) => group.id === id)
