let layer_base = [
  ["Q" , "W" , "F" , "P"  , "B"    , null , null, "J"    , "L"  , "U" , "Y" , "'"],
  ["A" , "R" , "S" , "T"  , "G"    , null , null, "M"    , "N"  , "E" , "I" , "O"],
  ["Z" , "X" , "C" , "D"  , "V"    , null , null, "K"    , "H"  , "," , "." , "/"],
  [null, null, null, "NAV", "shift", "tab", ";" , "space", "SYM", null, null, null]
]

let layer_nav = [
  ["esc"  , "enter", " "      , " "     , " ", null, null, "pgup", "home"  , "up"  , "end"  , "del"],
  ["alt"  , "gui"  , "shift"  , "ctrl"  , " ", null, null, "pgdn", "left"  , "down", "right", "bksp"],
  ["alt:S", "gui:S", "shift:S", "ctrl:S", " ", null, null, " "   , "S-tab", "tab" , " "    , " "],
  [null   , null   , null     , "NAV"   , " ", " " , " " , " "   , " "     , null  , null   , null]
]

let layer_sym = [
  ["!" , "@" , "#" , "$", "%", null, null, "^" , "&"  , "*" , "-" , "="],
  ["1" , "2" , "3" , "4", "5", null, null, "6" , "7"  , "8" , "9" , "0"],
  ["[" , "]" , "{" , "}", "`", null, null, "\\", "("  , ")" , "." , "/"],
  [null, null, null, " ", " ", " " , " " , " " , "SYM", null, null, null]
]

let layer_fun = [
  ["rgb\nspi", "rgb\nhui", "rgb\nsai", "rgb\nvai", "rgb\nmod" , null, null, " "   , "F1" , "F2" , "F3" , "F4"],
  ["rgb\nspd", "rgb\nhud", "rgb\nsad", "rgb\nvad", "rgb\nrmod", null, null, "caps", "F5" , "F6" , "F7" , "F8"],
  ["alt:S"   , "gui:S"   , "shift:S" , "ctrl:S"  , "rgb\ntog" , null, null, "ins" , "F9" , "F10", "F11", "F12"],
  [null      , null      , null      , "EXT"     , " "        , " " , " " , " "   , "SYM", null , null , null]
]

let combo_layer = "base";
let combos = [
  {
    "input": ["D", "H"],
    "output": "ENTER"
  },
  {
    "input": ["W", "F", ",", "."],
    "output": "!"
  },
  {
    "input": ["P", "L"],
    "output": "?"
  },
  {
    "input": [",", "."],
    "output": "-"
  },
  {
    "input": ["H", ","],
    "output": "_"
  },
  {
    "input": [".", "/"],
    "output": "="
  },
  {
    "input": ["Z", "X"],
    "output": "UNDO"
  },
  {
    "input": ["X", "C"],
    "output": "CUT"
  },
  {
    "input": ["C", "D"],
    "output": "COPY"
  },
  {
    "input": ["X", "C", "D"],
    "output": "PASTE"
  },
]

let col_class_left = ["col-pinky", "col-ring", "col-middle", "col-index", "col-inner", "col-thumb"]
let col_class_right = ["col-thumb", "col-inner", "col-index", "col-middle", "col-ring", "col-pinky"]
let col_class = col_class_left.concat(col_class_right)
let col_hand = ["left", "left", "left", "left", "left", "left", "right", "right", "right", "right", "right", "right"]
let row_class = ["", "", "", "mod"]

let tippy_placement = ["top", "left", "right", "bottom"]

function get_combos(layer, key_label) {
  if (layer != combo_layer) {
    return []
  }
  let c = [];
  for (let combo of combos) {
    if (combo.input.includes(key_label)) {
      c.push(combo)
    }
  }
  return c;
}

function render_layout(layer, keys) {
  for (let col = 0; col < keys[0].length; col++) {
    let base_container = document.getElementById("layer-" + layer + "-" + col_hand[col])
    let column = document.createElement("div")
    column.className = "col " + col_class[col]
    base_container.append(column)
    for (let row = 0; row < keys.length; row++) {
      let key_id = `r${row}c${col}`
      if (!keys[row][col]) {
        continue
      }
      let tokens = keys[row][col].split(":")
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

