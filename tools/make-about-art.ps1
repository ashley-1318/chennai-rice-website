# Generates the About page stand-in illustration:
#   assets/factory-placeholder.svg - shown until the real factory photograph
#                                    is saved as assets/factory.jpg

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# --------------------------------------------------------------- factory ----
# Flat illustration in the site palette: silo row, sheds, hills, warm ground.

$f = New-Object System.Text.StringBuilder
function F([string]$s) { [void]$f.AppendLine($s) }

F '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 620" width="1600" height="620" role="img" aria-label="Illustration of the Chennai Rice milling plant: a row of grain silos beside long processing sheds">'
F '  <defs>'
F '    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
F '      <stop offset="0" stop-color="#FBF6EC"/>'
F '      <stop offset="1" stop-color="#F3EBDB"/>'
F '    </linearGradient>'
F '    <linearGradient id="silo" x1="0" y1="0" x2="1" y2="0">'
F '      <stop offset="0" stop-color="#C9B896"/>'
F '      <stop offset="0.35" stop-color="#EFE6D2"/>'
F '      <stop offset="1" stop-color="#BFAE8C"/>'
F '    </linearGradient>'
F '    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">'
F '      <stop offset="0" stop-color="#E3D3B0"/>'
F '      <stop offset="1" stop-color="#D6C298"/>'
F '    </linearGradient>'
F '  </defs>'
F ''
F '  <rect width="1600" height="620" fill="url(#sky)"/>'
F ''
F '  <!-- distant hills -->'
F '  <path d="M0 300 C170 250 300 288 430 272 C560 256 660 214 810 240 C960 266 1060 244 1200 258 C1330 271 1460 250 1600 268 L1600 330 L0 330 Z" fill="#A87A22" fill-opacity="0.16"/>'
F '  <path d="M0 330 C200 300 360 330 520 318 C700 305 830 276 1010 300 C1180 322 1350 306 1600 322 L1600 380 L0 380 Z" fill="#A87A22" fill-opacity="0.10"/>'
F ''
F '  <!-- ground -->'
F '  <rect x="0" y="368" width="1600" height="252" fill="url(#ground)"/>'
F '  <path d="M0 368 L1600 368 L1600 392 L0 400 Z" fill="#C9A44C" fill-opacity="0.35"/>'
F ''
F '  <!-- long processing sheds, right: solid bodies with pitched roofs -->'
F '  <g>'
F '    <rect x="985" y="332" width="575" height="72" fill="#F7F2E6" stroke="#D8C9A8" stroke-width="2"/>'
F '    <path d="M972 334 L1272 290 L1572 334 Z" fill="#8A2A31"/>'
F '    <g fill="#E3D8BE">'
F '      <rect x="1020" y="352" width="26" height="34"/><rect x="1070" y="352" width="26" height="34"/>'
F '      <rect x="1120" y="352" width="26" height="34"/><rect x="1170" y="352" width="26" height="34"/>'
F '      <rect x="1220" y="352" width="26" height="34"/><rect x="1270" y="352" width="26" height="34"/>'
F '      <rect x="1320" y="352" width="26" height="34"/><rect x="1370" y="352" width="26" height="34"/>'
F '    </g>'
F '    <rect x="880" y="366" width="430" height="44" fill="#FDFBF5" stroke="#D8C9A8" stroke-width="2"/>'
F '    <path d="M868 368 L1095 336 L1322 368 Z" fill="#6E1B22"/>'
F '  </g>'

# silo row - one even rank so the spacing reads as a real tank farm
F ''
F '  <!-- grain silos -->'
for ($i = 0; $i -lt 8; $i++) {
  $cx = 205 + $i * 94
  $top = 300
  $bot = 410
  $r = 40
  F '  <g>'
  F ('    <rect x="{0}" y="{1}" width="{2}" height="{3}" fill="url(#silo)"/>' -f ($cx - $r), $top, ($r * 2), ($bot - $top))
  F ('    <path d="M{0} {1} L{2} {3} L{4} {1} Z" fill="#B9A87F"/>' -f ($cx - $r - 4), $top, $cx, ($top - 36), ($cx + $r + 4))
  F ('    <rect x="{0}" y="{1}" width="{2}" height="5" fill="#A8956F" fill-opacity="0.5"/>' -f ($cx - $r), ($top + 38), ($r * 2))
  F ('    <ellipse cx="{0}" cy="{1}" rx="{2}" ry="8" fill="#C6B693"/>' -f $cx, $bot, $r)
  F '  </g>'
}

F ''
F '  <!-- trees -->'
foreach ($t in @(@(90,392,34), @(160,398,26), @(1520,396,30), @(1440,400,22), @(700,404,20))) {
  F ('  <circle cx="{0}" cy="{1}" r="{2}" fill="#6E7A3A" fill-opacity="0.35"/>' -f $t[0], $t[1], $t[2])
}
F ''
F '  <!-- foreground road -->'
F '  <rect x="0" y="470" width="1600" height="46" fill="#CBB994"/>'
F '  <g stroke="#F7F2E6" stroke-width="4" stroke-dasharray="34 30">'
F '    <path d="M0 493 L1600 493"/>'
F '  </g>'
F '</svg>'

[System.IO.File]::WriteAllText("D:\Product Page\assets\factory-placeholder.svg", $f.ToString(), $utf8NoBom)

foreach ($file in "factory-placeholder.svg") {
  $path = "D:\Product Page\assets\$file"
  $xml = New-Object System.Xml.XmlDocument
  try { $xml.Load($path); "{0,-26} valid XML, {1} elements, {2} bytes" -f $file, $xml.SelectNodes("//*").Count, (Get-Item -LiteralPath $path).Length }
  catch { "{0,-26} INVALID: {1}" -f $file, $_.Exception.Message }
}
