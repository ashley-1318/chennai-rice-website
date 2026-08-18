# Generates the About page artwork.
#
# There is no photography of fields, farmers, mills or family tables on this
# machine, so the hero and section visuals are built as layered vector scenes
# in the brief's palette. Every one of them sits behind an <img> that points at
# a real photograph first, so dropping a JPG in replaces the art with no code
# change.

$utf8 = New-Object System.Text.UTF8Encoding($false)
$out = "D:\Product Page\public\assets\about"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function Save([string]$name, [string]$svg) {
  [System.IO.File]::WriteAllText((Join-Path $out $name), $svg, $utf8)
}

function Rnd([int]$seed) {
  $a = $seed
  return {
    $script:a = ($script:a * 1103515245 + 12345) % 2147483648
    return [double]$script:a / 2147483648
  }.GetNewClosure()
}

# ---------------------------------------------------------------- hero ----
# Golden-hour paddy field: sky wash, low sun, treeline, and ranks of ears
# receding to the horizon. Drawn wide for a full-bleed parallax hero.
$sb = New-Object System.Text.StringBuilder
function AddHero([string]$s) { [void]$sb.AppendLine($s) }

AddHero '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img" aria-label="Golden paddy field at sunrise">'
AddHero '  <defs>'
AddHero '    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
AddHero '      <stop offset="0" stop-color="#F3E7C8"/><stop offset="0.45" stop-color="#F7DFA8"/><stop offset="1" stop-color="#E9C97A"/>'
AddHero '    </linearGradient>'
AddHero '    <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">'
AddHero '      <stop offset="0" stop-color="#FFF6DC"/><stop offset="0.5" stop-color="#FFE9A8" stop-opacity="0.55"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/>'
AddHero '    </radialGradient>'
AddHero '    <linearGradient id="fieldFar" x1="0" y1="0" x2="0" y2="1">'
AddHero '      <stop offset="0" stop-color="#B8C86A"/><stop offset="1" stop-color="#8FAE4E"/>'
AddHero '    </linearGradient>'
AddHero '    <linearGradient id="fieldMid" x1="0" y1="0" x2="0" y2="1">'
AddHero '      <stop offset="0" stop-color="#9DB84F"/><stop offset="1" stop-color="#6F9438"/>'
AddHero '    </linearGradient>'
AddHero '    <linearGradient id="fieldNear" x1="0" y1="0" x2="0" y2="1">'
AddHero '      <stop offset="0" stop-color="#5F8632"/><stop offset="1" stop-color="#2F4A1E"/>'
AddHero '    </linearGradient>'
AddHero '  </defs>'
AddHero '  <rect width="1600" height="900" fill="url(#sky)"/>'
AddHero '  <circle cx="1130" cy="300" r="300" fill="url(#sun)"/>'
AddHero '  <circle cx="1130" cy="300" r="62" fill="#FFF3D0" opacity="0.95"/>'
# distant treeline
AddHero '  <path d="M0 470 C120 452 190 466 260 458 C340 449 400 462 470 452 C560 440 620 458 700 450 C800 440 860 460 950 452 C1050 443 1120 460 1220 452 C1320 444 1420 462 1600 450 L1600 500 L0 500 Z" fill="#7E9B52" opacity="0.55"/>'
AddHero '  <rect x="0" y="486" width="1600" height="70" fill="url(#fieldFar)"/>'
AddHero '  <rect x="0" y="548" width="1600" height="110" fill="url(#fieldMid)"/>'
AddHero '  <rect x="0" y="648" width="1600" height="252" fill="url(#fieldNear)"/>'

# Ranks of ripe paddy, denser and warmer as they come forward. Each ear is a
# tapered drooping head rather than a blob on a stick — at hero scale a
# lollipop shape reads as clip-art, a curved head reads as a crop.
$rows = @(
  @{ y = 560; count = 420; h = 24;  w = 1.2; col = '#CFD98A'; op = 0.55 },
  @{ y = 618; count = 340; h = 40;  w = 1.6; col = '#C4CE78'; op = 0.7 },
  @{ y = 700; count = 260; h = 68;  w = 2.2; col = '#BBBB5E'; op = 0.85 },
  @{ y = 810; count = 190; h = 108; w = 3.0; col = '#C0A64C'; op = 0.95 },
  @{ y = 905; count = 130; h = 150; w = 3.8; col = '#8E7A34'; op = 1.0 }
)
$seed = 7
foreach ($r in $rows) {
  AddHero ('  <g opacity="{0}">' -f $r.op)
  for ($i = 0; $i -lt $r.count; $i++) {
    $seed = ($seed * 1103515245 + 12345) % 2147483648
    $j = [double]$seed / 2147483648
    $seed = ($seed * 1103515245 + 12345) % 2147483648
    $k = [double]$seed / 2147483648
    $x = [math]::Round(($i / [double]$r.count) * 1660 - 30 + ($j - 0.5) * 22, 1)
    $hh = [math]::Round($r.h * (0.7 + $j * 0.6), 1)
    $lean = [math]::Round(($k - 0.5) * 16, 1)
    $tipX = [math]::Round($x + $lean, 1)
    $tipY = [math]::Round($r.y - $hh, 1)
    $earLen = [math]::Round($hh * 0.42, 1)
    # stalk
    AddHero ('    <path d="M{0} {1} Q{2} {3} {4} {5}" stroke="{6}" stroke-width="{7}" fill="none" stroke-linecap="round"/>' -f `
        $x, $r.y, ([math]::Round($x + $lean * 0.3, 1)), ([math]::Round($r.y - $hh * 0.55, 1)), $tipX, $tipY, $r.col, $r.w)
    # drooping ear: a narrow leaf shape hanging from the tip
    AddHero ('    <path d="M{0} {1} q{2} {3} {4} {5} q-{6} -{7} -{8} -{9} Z" fill="{10}"/>' -f `
        $tipX, $tipY, `
        ([math]::Round($r.w * 2.2, 1)), ([math]::Round($earLen * 0.45, 1)), `
        ([math]::Round($lean * 0.35, 1)), $earLen, `
        ([math]::Round($r.w * 2.2, 1)), ([math]::Round($earLen * 0.45, 1)), `
        ([math]::Round($lean * 0.35 * 2, 1)), 0, `
        $r.col)
  }
  AddHero '  </g>'
}
# haze between the ranks so the field recedes rather than stacking flat
AddHero '  <rect x="0" y="486" width="1600" height="120" fill="#F7DFA8" opacity="0.30"/>'
AddHero '  <rect x="0" y="600" width="1600" height="120" fill="#EFD08A" opacity="0.16"/>'
AddHero '  <rect width="1600" height="900" fill="url(#sky)" opacity="0.06"/>'
AddHero '</svg>'
Save "hero-field.svg" $sb.ToString()

# ------------------------------------------------------- rice grain macro ----
$sb2 = New-Object System.Text.StringBuilder
function G([string]$s) { [void]$sb2.AppendLine($s) }
G '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620" width="900" height="620" role="img" aria-label="Close-up of polished rice grains">'
G '  <defs>'
G '    <linearGradient id="gbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F2E4"/><stop offset="1" stop-color="#E7DCC2"/></linearGradient>'
G '    <linearGradient id="grain" x1="0" y1="0" x2="1" y2="1">'
G '      <stop offset="0" stop-color="#FFFFFF"/><stop offset="0.45" stop-color="#FBF7EC"/><stop offset="1" stop-color="#E3D8BE"/>'
G '    </linearGradient>'
G '  </defs>'
G '  <rect width="900" height="620" fill="url(#gbg)"/>'
$seed = 91
for ($i = 0; $i -lt 190; $i++) {
  $seed = ($seed * 1103515245 + 12345) % 2147483648; $a = [double]$seed / 2147483648
  $seed = ($seed * 1103515245 + 12345) % 2147483648; $b = [double]$seed / 2147483648
  $seed = ($seed * 1103515245 + 12345) % 2147483648; $c = [double]$seed / 2147483648
  $x = [math]::Round($a * 900, 1); $y = [math]::Round($b * 620, 1)
  $rot = [math]::Round($c * 360, 1); $rx = [math]::Round(26 + $c * 12, 1); $ry = [math]::Round(8 + $a * 3, 1)
  G ('  <g transform="rotate({0} {1} {2})">' -f $rot, $x, $y)
  G ('    <ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" fill="rgba(90,70,40,0.13)"/>' -f ($x + 2), ($y + 3), $rx, $ry)
  G ('    <ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" fill="url(#grain)"/>' -f $x, $y, $rx, $ry)
  G ('    <ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" fill="#FFFFFF" opacity="0.7"/>' -f ($x - $rx * 0.25), ($y - $ry * 0.3), ($rx * 0.34), ($ry * 0.24))
  G '  </g>'
}
G '</svg>'
Save "grain-macro.svg" $sb2.ToString()

# ------------------------------------------------- Tamil Nadu landscape ----
$sb3 = New-Object System.Text.StringBuilder
function T([string]$s) { [void]$sb3.AppendLine($s) }
T '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="Tamil Nadu paddy landscape with temple gopuram and palms">'
T '  <defs>'
T '    <linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCEBD3"/><stop offset="1" stop-color="#F4E6BE"/></linearGradient>'
T '    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BCD6C0"/><stop offset="1" stop-color="#8FB68F"/></linearGradient>'
T '  </defs>'
T '  <rect width="1200" height="800" fill="url(#tsky)"/>'
T '  <circle cx="250" cy="180" r="70" fill="#FFF2CE" opacity="0.9"/>'
# gopuram silhouette
T '  <g fill="#4A6B35" opacity="0.5">'
T '    <path d="M905 470 L905 300 L925 300 L935 250 L960 210 L985 250 L995 300 L1015 300 L1015 470 Z"/>'
T '    <rect x="890" y="470" width="140" height="40"/>'
T '  </g>'
# palms
T '  <g fill="#3F6B2A" opacity="0.75">'
foreach ($px in 120, 300, 1080) {
  T ('    <path d="M{0} 510 q6 -70 2 -120" stroke="#5A4630" stroke-width="7" fill="none"/>' -f $px)
  for ($k = 0; $k -lt 6; $k++) {
    $ang = -70 + $k * 28
    T ('    <ellipse cx="{0}" cy="386" rx="46" ry="9" transform="rotate({1} {0} 386)"/>' -f ($px + 2), $ang)
  }
}
T '  </g>'
# flooded terraces
T '  <path d="M0 500 C200 486 380 508 600 498 C820 488 1000 510 1200 500 L1200 800 L0 800 Z" fill="url(#water)"/>'
T '  <g stroke="#F2E7C4" stroke-width="3" opacity="0.55" fill="none">'
T '    <path d="M0 560 C260 548 420 570 640 560 C860 550 1010 570 1200 560"/>'
T '    <path d="M0 640 C240 628 440 652 660 640 C880 628 1020 652 1200 640"/>'
T '    <path d="M0 730 C260 718 420 742 640 730 C860 718 1020 742 1200 730"/>'
T '  </g>'
# near seedlings
$seed = 43
T '  <g stroke="#2F4A1E" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9">'
for ($i = 0; $i -lt 120; $i++) {
  $seed = ($seed * 1103515245 + 12345) % 2147483648; $a = [double]$seed / 2147483648
  $x = [math]::Round($a * 1220 - 10, 1)
  $y = [math]::Round(600 + $a * 190, 1)
  $h = [math]::Round(18 + $a * 26, 1)
  T ('    <path d="M{0} {1} q4 -{2} 1 -{3}"/>' -f $x, $y, [math]::Round($h * 0.6, 1), $h)
}
T '  </g>'
T '</svg>'
Save "tamil-nadu.svg" $sb3.ToString()

# ------------------------------------------------------------- family ----
$sb4 = New-Object System.Text.StringBuilder
function F2([string]$s) { [void]$sb4.AppendLine($s) }
F2 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700" role="img" aria-label="Served rice on a banana leaf at a family table">'
F2 '  <defs>'
F2 '    <radialGradient id="warm" cx="0.5" cy="0.35" r="0.75"><stop offset="0" stop-color="#FFE9C0"/><stop offset="1" stop-color="#E8C98C"/></radialGradient>'
F2 '    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A97545"/><stop offset="1" stop-color="#7A4F2C"/></linearGradient>'
F2 '  </defs>'
F2 '  <rect width="1000" height="700" fill="url(#warm)"/>'
F2 '  <rect x="0" y="430" width="1000" height="270" fill="url(#wood)"/>'
F2 '  <ellipse cx="500" cy="470" rx="330" ry="86" fill="#3F6B2A" opacity="0.92"/>'
F2 '  <ellipse cx="500" cy="466" rx="300" ry="72" fill="#4C7F33"/>'
F2 '  <path d="M210 466 L790 466" stroke="#3A6127" stroke-width="3" opacity="0.7"/>'
# heap of rice
F2 '  <ellipse cx="470" cy="452" rx="120" ry="52" fill="#FFFDF6"/>'
F2 '  <ellipse cx="470" cy="440" rx="104" ry="42" fill="#FFFFFF"/>'
$seed = 17
F2 '  <g fill="#F6F1E2">'
for ($i = 0; $i -lt 70; $i++) {
  $seed = ($seed * 1103515245 + 12345) % 2147483648; $a = [double]$seed / 2147483648
  $seed = ($seed * 1103515245 + 12345) % 2147483648; $b = [double]$seed / 2147483648
  $ang = $a * 6.283; $rad = [math]::Sqrt($b) * 100
  $x = [math]::Round(470 + [math]::Cos($ang) * $rad, 1)
  $y = [math]::Round(438 + [math]::Sin($ang) * $rad * 0.4, 1)
  F2 ('    <ellipse cx="{0}" cy="{1}" rx="7" ry="2.6" transform="rotate({2} {0} {1})" fill="#FFFFFF" stroke="#E6DCC6" stroke-width="0.5"/>' -f $x, $y, [math]::Round($a * 180, 1))
}
F2 '  </g>'
# small side bowls
F2 '  <ellipse cx="680" cy="470" rx="52" ry="20" fill="#B98A3C"/><ellipse cx="680" cy="464" rx="46" ry="16" fill="#D8A64C"/>'
F2 '  <ellipse cx="300" cy="474" rx="44" ry="17" fill="#8C6239"/><ellipse cx="300" cy="469" rx="38" ry="13" fill="#A87A45"/>'
# steam
F2 '  <g stroke="#FFFFFF" stroke-width="5" fill="none" opacity="0.35" stroke-linecap="round">'
F2 '    <path d="M446 392 c-14 -26 12 -40 -2 -68"/><path d="M478 386 c-14 -28 12 -44 -2 -74"/><path d="M510 394 c-12 -24 10 -38 -2 -64"/>'
F2 '  </g>'
F2 '</svg>'
Save "family-table.svg" $sb4.ToString()

Get-ChildItem -LiteralPath $out -File | ForEach-Object {
  $x = New-Object System.Xml.XmlDocument
  try { $x.Load($_.FullName); "{0,-22} valid, {1,6} bytes, {2} elements" -f $_.Name, $_.Length, $x.SelectNodes("//*").Count }
  catch { "{0,-22} INVALID: {1}" -f $_.Name, $_.Exception.Message }
}
