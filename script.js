let layer_base = [
  ["Q" , "V" , "M" , "P"  , "K"    , null , null, "/"    , ","  , "." , "X" , "Z"],
  ["N" , "R" , "S" , "T"  , "G"    , null , null, "'"    , "A"  , "I" , "H" , "C"],
  ["B" , "W" , "F" , "D"  , "J"    , null , null, "-"    , "O"  , "U" , "L" , "Y"],
  [null, null, null, "shift", "space", "enter", "tab" , "E", null, null, null, null]
]

let layer_nav = [
  ["prtsc", "home" , "up"     , "end"   , "pgup", null, null, "pgup", "ptab", "wkspup"  , "ntab"  , "del"],
  ["esc"  , "left"  , "down"  , "right"  , "pgdn", null, null, "pgdn", "winlft"  , "wkspdn", "winrgt", "bksp"],
  ["ctrl:Z", "ctrl:X", "ctrl:C", "ctrl:V", "winmax", null, null, " "   , "wksp1", "wksp2" , "wksp3"    , "wksp4"],
  [null   , null   , null     , " "   , " ", " " , " " , NAV   , null     , null  , null   , null]
]

let layer_sym = [
  ["|" , "`" , "*" , "&", "[", null, null, "]" , "7"  , "8" , "9" , "\\"],
  [";" , "^" , "%" , "$", "(", null, null, ")" , "4"  , "5" , "6" , "="],
  ["~" , "#" , "@" , "!", "{", null, null, "}", "1"  , "2" , "3" , "+"],
  [null, null, null, " ", SYM, " " , ":" , "0" , null, null, null, null]
]

let layer_fun = [
  ["F9", "F10", "F11", "F12", " " , null, null, " "     , " "     , "volup" , " "     , " "],
  ["F5", "F6" , "F7" , "F8" , " " , null, null, "nument", "ptrk"  , "voldn" , "ntrk"  , " "],
  ["F1", "F2" , "F3" , "F4" , " " , null, null, "scroll", "mouse1", "mouse3", "mouse2", " "],
  [null      , null      , null   , " " , " " , FUN     , " " , " "   , null , null , null , null]
]

let combo_layer = "base";
let combos = [
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

let col_class_left = ["pinky", "ring", "middle", "index", "inner", "thumb"]
let col_class = col_class_left.concat(col_class_left.toReversed())
let col_hand = Array(12).fill("left", 0, 5).fill("right", 6, 11)
let row_class = ["", "", "", "mod"]

let tippy_placement = ["top", "left", "right", "bottom"]

function get_combos(layer, key_label) {
  return layer === combo_layer
    ? layer.filter((combo) => combo.input.includes(key_label))
    : [];
}

function render_layout(layer, rows) {
  for (const col of rows[0].keys) {
    let base_container = document.getElementById("layer-" + layer + "-" + col_hand[col])
    let column = document.createElement("div")
    column.className = "col " + col_class[col]
    base_container.append(column)
    for (const row of rows.keys()) {
      let key_id = `r${row}c${col}`
      if (!rows[row][col]) {
        continue
      }
      let tokens = rows[row][col].split(":")
      let key_label = tokens[0]
      let key_mod = tokens[1] || ""
      let key = document.createElement("span")
      key.id = key_id
      key.classList.add("key")
      if (row_class[row]) {
        key.classList.add(row_class[row])
      }
      let key_combos = get_combos(layer, key_label);
      if (key_combos.length > 0) {
        key.classList.add("combo")
        for (let i = 0; i < key_combos.length; i++){
          let combo = key_combos[i];
          tippy(key, {
            content: `${combo.input.join("")} combo: ${combo.output}`,
            placement: tippy_placement[i]
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

render_layout("base", layer_base);
render_layout("nav", layer_nav);
render_layout("sym", layer_sym);
render_layout("fun", layer_fun);

tippy(".S", {
  content: "sticky",
  placement: "bottom"
})

