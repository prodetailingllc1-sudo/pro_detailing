export type TintVehicleId =
  | 'sedan'
  | 'coupe'
  | 'suv'
  | 'tesla'
  | 'truck'
  | 'van';

export type TintWindowZone = 'frontSides' | 'rearSides' | 'windshield';

type TintWindowPathMap = Record<
  TintVehicleId,
  Record<TintWindowZone, readonly string[]>
>;

// Paths are registered to the same 3:2 canvas as every simulator vehicle.
// They are intentionally inset from rubber, pillars, mirrors and painted trim.
export const tintWindowPaths: TintWindowPathMap = {
  sedan: {
    rearSides: [
      'M 96 151 C 99 132 111 111 135 96 C 151 86 169 83 194 85 L 185 161 C 157 160 126 157 96 152 Z',
    ],
    frontSides: [
      'M 208 87 C 233 85 254 90 269 102 C 281 115 288 134 292 150 L 244 150 C 236 150 232 154 229 163 L 202 162 Z',
    ],
    windshield: [
      'M 314 91 C 359 85 414 86 449 94 C 489 103 523 126 554 157 L 545 167 C 516 140 484 119 447 110 C 408 102 360 102 318 107 Z',
    ],
  },
  coupe: {
    rearSides: [],
    frontSides: [
      'M 67 155 C 78 138 104 125 132 119 C 145 116 157 117 166 120 L 162 168 C 133 167 101 163 75 159 Z',
      'M 178 121 C 198 119 217 121 229 130 C 236 139 240 150 241 157 L 213 157 C 207 158 204 163 202 169 L 174 168 Z',
    ],
    windshield: [
      'M 257 123 C 299 116 347 119 384 131 C 412 140 431 157 447 177 L 439 185 C 421 166 404 153 380 145 C 342 133 301 132 263 138 Z',
    ],
  },
  suv: {
    rearSides: [
      'M 53 126 C 57 105 65 82 79 69 C 87 63 97 61 113 61 L 105 132 C 87 130 68 128 53 126 Z',
      'M 122 63 L 183 63 C 187 83 190 113 189 143 L 112 133 Z',
    ],
    frontSides: [
      'M 200 64 C 225 64 243 71 255 85 C 265 99 269 119 271 135 L 238 135 C 226 136 217 142 211 149 L 197 147 Z',
    ],
    windshield: [
      'M 286 63 C 337 57 397 60 441 73 C 479 84 508 106 530 135 L 520 145 C 496 117 470 99 438 89 C 396 75 340 73 292 79 Z',
    ],
  },
  tesla: {
    rearSides: [
      'M 82 137 C 84 121 94 109 116 100 L 117 149 C 104 147 92 144 82 140 Z',
      'M 127 97 C 145 93 163 92 181 94 L 180 156 L 122 149 Z',
    ],
    frontSides: [
      'M 196 93 C 223 93 247 102 261 118 C 269 128 275 141 279 153 L 259 153 L 256 149 L 222 149 C 215 151 212 157 210 165 L 194 160 Z',
    ],
    windshield: [
      'M 321 82 C 365 75 416 78 451 87 C 496 99 537 126 570 165 L 560 175 C 527 140 490 117 448 105 C 409 94 366 93 327 98 Z',
    ],
  },
  truck: {
    rearSides: [
      'M 139 98 C 144 94 150 94 160 94 L 267 95 L 258 167 L 140 163 C 132 150 132 121 139 98 Z',
    ],
    frontSides: [
      'M 282 96 L 332 97 C 347 107 355 124 359 143 L 333 143 C 322 144 316 153 312 167 L 278 165 Z',
    ],
    windshield: [
      'M 342 95 C 387 89 435 91 474 101 C 515 112 545 132 575 157 L 568 166 C 540 144 509 127 472 117 C 431 106 386 105 346 111 Z',
    ],
  },
  van: {
    rearSides: [
      'M 47 102 C 57 95 78 92 113 92 L 109 157 C 87 157 67 155 51 153 C 47 139 45 117 47 102 Z',
      'M 124 93 C 153 92 185 92 218 94 L 216 168 L 117 159 Z',
    ],
    frontSides: [
      'M 230 95 C 257 96 282 103 299 118 C 312 131 321 146 329 160 L 302 161 L 296 157 L 264 157 C 254 158 247 165 244 175 L 226 170 Z',
    ],
    windshield: [
      'M 347 92 C 390 88 441 89 480 99 C 528 110 573 138 609 174 L 599 183 C 563 149 525 127 478 115 C 438 105 392 103 352 108 Z',
    ],
  },
};
