# Generates a symmetrical mandala / kolam medallion for the hero backdrop.
# Rotations are computed so every ring is exactly symmetrical.

$sb = New-Object System.Text.StringBuilder
function Add-Line([string]$s) { [void]$sb.AppendLine($s) }

Add-Line '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600" width="600" height="600" aria-hidden="true">'
Add-Line '  <title>Decorative mandala</title>'
Add-Line '  <defs>'
Add-Line '    <path id="petal-o" d="M300 34 C334 66 334 108 300 132 C266 108 266 66 300 34 Z"/>'
Add-Line '    <path id="petal-m" d="M300 150 C326 172 326 194 300 210 C274 194 274 172 300 150 Z"/>'
Add-Line '    <path id="petal-i" d="M300 218 C316 234 316 254 300 268 C284 254 284 234 300 218 Z"/>'
Add-Line '    <path id="diamond" d="M300 42 L307 56 L300 70 L293 56 Z"/>'
Add-Line '    <circle id="dot" cx="300" cy="104" r="3.2"/>'
Add-Line '    <path id="tick" d="M300 138 L300 146"/>'
Add-Line ''
Add-Line '    <!-- Dissolves the medallion outward so it has no hard edge -->'
Add-Line '    <radialGradient id="fade" cx="0.5" cy="0.5" r="0.5">'
Add-Line '      <stop offset="0.62" stop-color="#ffffff" stop-opacity="1"/>'
Add-Line '      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>'
Add-Line '    </radialGradient>'
Add-Line '    <mask id="vignette">'
Add-Line '      <rect x="0" y="0" width="600" height="600" fill="url(#fade)"/>'
Add-Line '    </mask>'
Add-Line '  </defs>'
Add-Line ''
Add-Line '  <!-- Opacity is baked in: this is consumed as a CSS background-image,'
Add-Line '       which cannot be dimmed from the stylesheet. -->'
Add-Line '  <g mask="url(#vignette)" opacity="0.45">'
Add-Line '  <g fill="none" stroke="#A87A22" stroke-linecap="round" stroke-linejoin="round">'

# Concentric rings
Add-Line '    <circle cx="300" cy="300" r="288" stroke-width="1"/>'
Add-Line '    <circle cx="300" cy="300" r="281" stroke-width="2"/>'
Add-Line '    <circle cx="300" cy="300" r="170" stroke-width="1.6"/>'
Add-Line '    <circle cx="300" cy="300" r="163" stroke-width="1"/>'
Add-Line '    <circle cx="300" cy="300" r="93" stroke-width="1.6"/>'
Add-Line '    <circle cx="300" cy="300" r="58" stroke-width="1"/>'
Add-Line '    <circle cx="300" cy="300" r="26" stroke-width="1.6"/>'
Add-Line ''

# Outer lotus ring - 16 petals
Add-Line '    <g stroke-width="1.5">'
for ($i = 0; $i -lt 16; $i++) {
  $a = [math]::Round($i * 360 / 16, 2)
  Add-Line ('      <use href="#petal-o" xlink:href="#petal-o" transform="rotate({0} 300 300)"/>' -f $a)
}
Add-Line '    </g>'
Add-Line ''

# Middle ring - 12 petals, offset by half a step so it interleaves
Add-Line '    <g stroke-width="1.3">'
for ($i = 0; $i -lt 12; $i++) {
  $a = [math]::Round($i * 360 / 12 + 15, 2)
  Add-Line ('      <use href="#petal-m" xlink:href="#petal-m" transform="rotate({0} 300 300)"/>' -f $a)
}
Add-Line '    </g>'
Add-Line ''

# Inner lotus - 8 petals
Add-Line '    <g stroke-width="1.5">'
for ($i = 0; $i -lt 8; $i++) {
  $a = [math]::Round($i * 360 / 8, 2)
  Add-Line ('      <use href="#petal-i" xlink:href="#petal-i" transform="rotate({0} 300 300)"/>' -f $a)
}
Add-Line '    </g>'
Add-Line ''

# Radial ticks between the outer petals and the mid ring - 32
Add-Line '    <g stroke-width="1.1">'
for ($i = 0; $i -lt 32; $i++) {
  $a = [math]::Round($i * 360 / 32 + 5.625, 2)
  Add-Line ('      <use href="#tick" xlink:href="#tick" transform="rotate({0} 300 300)"/>' -f $a)
}
Add-Line '    </g>'
Add-Line ''

# Diamond points around the rim - 24
Add-Line '    <g stroke-width="1.1">'
for ($i = 0; $i -lt 24; $i++) {
  $a = [math]::Round($i * 360 / 24, 2)
  Add-Line ('      <use href="#diamond" xlink:href="#diamond" transform="rotate({0} 300 300)"/>' -f $a)
}
Add-Line '    </g>'
Add-Line '  </g>'
Add-Line ''

# Kolam dot ring - 24 filled dots
Add-Line '  <g fill="#A87A22" stroke="none">'
for ($i = 0; $i -lt 24; $i++) {
  $a = [math]::Round($i * 360 / 24 + 7.5, 2)
  Add-Line ('    <use href="#dot" xlink:href="#dot" transform="rotate({0} 300 300)"/>' -f $a)
}
Add-Line '  </g>'
Add-Line '  </g>'
Add-Line '</svg>'

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("D:\Product Page\assets\mandala.svg", $sb.ToString(), $utf8NoBom)

# Validate it parses as XML
$xml = New-Object System.Xml.XmlDocument
$xml.Load("D:\Product Page\assets\mandala.svg")
"valid XML: yes"
"elements:  {0}" -f $xml.SelectNodes("//*").Count
"size:      {0} bytes" -f (Get-Item -LiteralPath "D:\Product Page\assets\mandala.svg").Length
