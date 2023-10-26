const BASE = [
  ["Q" , "V" , "M" , "P"  , "K"    , null , null, "/"    , ","  , "." , "X" , "Z"],
  ["N" , "R" , "S" , "T"  , "G"    , null , null, "'"    , "A"  , "I" , "H" , "C"],
  ["B" , "W" , "F" , "D"  , "J"    , null , null, "-"    , "O"  , "U" , "L" , "Y"],
  [null, null, null, "shift", "space", "enter", "tab" , "E", null, null, null, null]
]

const NAV = [
  ["prtsc", "home" , "up"     , "end"   , "pgup", null, null, "pgup", "ptab", "wkspup"  , "ntab"  , "del"],
  ["esc"  , "left"  , "down"  , "right"  , "pgdn", null, null, "pgdn", "winlft"  , "wkspdn", "winrgt", "bksp"],
  ["ctrl:Z", "ctrl:X", "ctrl:C", "ctrl:V", "winmax", null, null, " "   , "wksp1", "wksp2" , "wksp3"    , "wksp4"],
  [null   , null   , null     , " "   , " ", " " , " " , NAV   , null     , null  , null   , null]
]

const SYM = [
  ["|" , "`" , "*" , "&", "[", null, null, "]" , "7"  , "8" , "9" , "\\"],
  [";" , "^" , "%" , "$", "(", null, null, ")" , "4"  , "5" , "6" , "="],
  ["~" , "#" , "@" , "!", "{", null, null, "}", "1"  , "2" , "3" , "+"],
  [null, null, null, " ", SYM, " " , ":" , "0" , null, null, null, null]
]

const FUN = [
  ["F9", "F10", "F11", "F12", " " , null, null, " "     , " "     , "volup" , " "     , " "],
  ["F5", "F6" , "F7" , "F8" , " " , null, null, "nument", "ptrk"  , "voldn" , "ntrk"  , " "],
  ["F1", "F2" , "F3" , "F4" , " " , null, null, "scroll", "mouse1", "mouse3", "mouse2", " "],
  [null      , null      , null   , " " , " " , FUN     , " " , " "   , null , null , null , null]
]

const COMBO_LAYER = "base";
const COMBOS = [
  {
    "input": [".", ","],
    "output": ":"
  },
  {
    "input": ["K", "/"],
    "output": "["
  },
  {
    "input": ["G", "'"],
    "output": "("
  },
  {
    "input": ["J", "-"],
    "output": "{"
  },
]

const col_class_left = ["pinky", "ring", "middle", "index", "inner", "thumb"]
const col_class = col_class_left.concat(col_class_left.toReversed())
const col_hand = Array(12).fill("left", 0, 5).fill("right", 6, 11)
const rowClass = ["", "", "", "mod"]
const tippyPlacement = ["top", "left", "right", "bottom"]

const getCombos = (layer, keyLabel) => {
  return layer === comboLayer
    ? layer.filter((combo) => combo.input.includes(keyLabel))
    : [];
}

const renderLayout = (layer, rows) => {
  for (const col of rows[0].keys) {
    const baseContainer = document.getElementById(`layer-${layer}-${col_hand[col]}`)
    const column = document.createElement("div")
    column.className = "col " + col_class[col]
    baseContainer.append(column)
    for (const row of rows.keys()) {
      if (!rows[row][col]) {
        continue
      }
      const tokens = rows[row][col].split(":")
      const keyLabel = tokens[0]
      const keyMod = tokens[1] || ""
      const key = document.createElement("span")
      key.id = `r${row}c${col}`;
      key.classList.add("key")
      if (rowClass[row]) {
        key.classList.add(rowClass[row])
      }
      const keyCombos = getCombos(layer, keyLabel);
      if (keyCombos.length > 0) {
        key.classList.add("combo")
        for (const combo of keyCombos) {
          tippy(key, {
            content: `${combo.input.join("")} combo: ${combo.output}`,
            placement: tippyPlacement[i]
          })
        }
      }
      if (key_mod) {
        key.classList.add(key_mod)
      }
      key.innerText = key_label
      column.append(key)
    }
  }
}

renderLayout("base", BASE );
renderLayout("nav", NAV);
renderLayout("sym", SYM);
renderLayout("fun", FUN);

tippy(".S", {
  content: "sticky",
  placement: "bottom"
})

