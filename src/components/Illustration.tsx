import { useId } from "react";

type IllustrationProps = {
  scene?: "home" | "journey" | "garden" | "table";
  className?: string;
  compact?: boolean;
};

/** Original little scenes about making a life together. */
export function Illustration({
  scene = "home",
  className = "",
  compact = false,
}: IllustrationProps) {
  const id = useId().replace(/:/g, "");
  const ink = "#65554b";

  return (
    <svg
      viewBox="0 0 600 480"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-scene={scene}
      data-compact={compact || undefined}
    >
      <defs>
        <clipPath id={`${id}-window`}>
          <path d="M213 245V131C213 78 251 43 300 43C349 43 387 78 387 131V245Z" />
        </clipPath>
        <pattern
          id={`${id}-grain`}
          width="17"
          height="19"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="5" r=".6" fill={ink} opacity=".13" />
          <circle cx="12" cy="14" r=".45" fill={ink} opacity=".08" />
        </pattern>
      </defs>

      {scene === "home" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Sunlight, high walls, and a small landscape beyond the window. */}
          <path
            d="M96 345V170C96 86 176 18 300 18C424 18 504 86 504 170V345Z"
            fill="#f0e9d9"
          />
          <path
            d="M96 345V170C96 86 176 18 300 18C424 18 504 86 504 170V345Z"
            fill={`url(#${id}-grain)`}
          />
          <path
            d="M207 251V131C207 75 247 37 300 37C353 37 393 75 393 131V251Z"
            fill="#f8f5ed"
            stroke="#aa977e"
            strokeWidth="1.5"
          />
          <g clipPath={`url(#${id}-window)`}>
            <path d="M213 43H387V245H213Z" fill="#e4e7dc" />
            <circle cx="338" cy="110" r="25" fill="#e6c97f" />
            <path
              d="M192 207C232 172 258 175 289 193C327 215 356 153 406 171V253H192Z"
              fill="#a6b092"
            />
            <path
              d="M198 231C236 202 269 213 298 226C333 242 364 203 404 211V256H198Z"
              fill="#788767"
            />
            <path
              d="M208 208C253 214 274 224 306 245"
              stroke="#d5d8bd"
              strokeWidth="2"
            />
          </g>
          <path d="M300 45V246M214 160H386" stroke="#aa977e" strokeWidth="4" />
          <path d="M201 251H399" stroke="#aa977e" strokeWidth="4" />
          <path
            d="M164 64C155 105 162 163 153 206C150 220 146 235 142 249"
            stroke="#cbbb9e"
            strokeWidth="1.5"
          />
          <path
            d="M180 49C165 99 175 167 164 213"
            stroke="#dbcfb9"
            strokeWidth="8"
          />

          {/* A little framed flower and an everyday coat hook. */}
          <path
            d="M428 111L472 113L469 172L426 169Z"
            fill="#f8f5ed"
            stroke="#a88b70"
            strokeWidth="3"
          />
          <path
            d="M449 158L451 132M451 145C441 145 439 140 439 137C446 136 450 140 451 145M451 151C459 149 462 144 462 140C455 140 452 145 451 151"
            stroke="#7d896c"
            strokeWidth="1.5"
          />
          <path
            d="M451 134C443 134 442 128 446 126C445 121 452 120 454 125C461 126 459 132 455 132C453 138 449 137 451 134Z"
            fill="#c77c5e"
          />
          <path d="M105 257H492" stroke="#dfd4bf" strokeWidth="1.4" />
          <path
            d="M84 349C177 339 411 337 517 350"
            stroke="#b8a68c"
            strokeWidth="1.5"
          />

          {/* A woven rug under the shared table. */}
          <path
            d="M157 355C208 337 394 337 446 357L488 414C415 441 187 443 115 414Z"
            fill="#e5cead"
          />
          <path
            d="M167 364C231 348 375 350 437 365L466 404C391 424 206 426 137 404Z"
            stroke="#c29f80"
            strokeWidth="1.3"
          />
          <path
            d="M160 377C240 360 377 363 446 379M148 392C236 376 385 380 455 393"
            stroke="#d2b392"
            strokeWidth="1.3"
          />
          <path
            d="M117 418L111 424M132 423L127 429M149 428L145 434M166 432L164 438M184 436L182 442M202 439L201 445M220 441V448M239 444V450M257 446V452M277 447V453M297 448V454M317 447V453M337 446V452M357 445V451M377 443V449M397 440L398 446M417 437L419 443M437 432L440 438M457 427L461 433M477 420L481 426"
            stroke="#c29f80"
            strokeWidth="1.5"
          />

          {/* The terracotta and olive chairs deliberately differ. */}
          <path
            d="M174 286L184 382M211 318L225 393"
            stroke="#8c6d52"
            strokeWidth="8"
          />
          <path
            d="M144 275C142 260 150 249 165 247L188 244C201 243 210 251 213 265L223 314L153 323Z"
            fill="#c87e60"
            stroke="#a96952"
            strokeWidth="1.2"
          />
          <path
            d="M153 323L213 313L244 328C247 332 246 340 239 342L174 352C162 353 153 340 153 323Z"
            fill="#d69572"
            stroke="#a96952"
            strokeWidth="1.2"
          />
          <path
            d="M172 352L168 401M234 341L241 394"
            stroke="#8c6d52"
            strokeWidth="7"
          />
          <path
            d="M159 264L168 307M178 259L188 303M198 263L205 299"
            stroke="#e3ad8f"
            strokeWidth="1.2"
          />

          <path
            d="M392 315L381 393M428 286L420 384"
            stroke="#8c6d52"
            strokeWidth="8"
          />
          <path
            d="M385 267C387 254 395 246 409 248L433 252C448 255 453 266 449 281L437 328L377 315Z"
            fill="#7c8966"
            stroke="#5e7054"
            strokeWidth="1.2"
          />
          <path
            d="M378 313L439 328C438 341 429 351 417 350L357 339C350 336 351 329 356 325Z"
            fill="#95a17b"
            stroke="#5e7054"
            strokeWidth="1.2"
          />
          <path
            d="M360 339L352 393M424 351L430 400"
            stroke="#8c6d52"
            strokeWidth="7"
          />
          <path
            d="M398 265L391 299M416 267L408 306M434 271L425 311"
            stroke="#b2ba96"
            strokeWidth="1.2"
          />

          {/* Warm wood, a flower, and coffee for two. */}
          <path
            d="M264 296L253 387M335 298L346 389"
            stroke="#936f50"
            strokeWidth="9"
          />
          <path d="M271 342H337" stroke="#a4825d" strokeWidth="5" />
          <path
            d="M220 278C220 261 260 251 302 251C348 251 386 263 386 279V290C386 307 349 317 302 317C257 317 220 306 220 290Z"
            fill="#b18b63"
          />
          <ellipse
            cx="303"
            cy="278"
            rx="83"
            ry="25"
            fill="#d2ac7f"
            stroke="#a98760"
            strokeWidth="1.2"
          />
          <path
            d="M235 282C265 297 332 301 371 285"
            stroke="#bf966e"
            strokeWidth="1.3"
          />
          <ellipse cx="260" cy="278" rx="19" ry="5" fill="#eadbc3" />
          <path
            d="M247 260H270L268 274C266 280 252 280 249 274Z"
            fill="#f8f5ed"
            stroke="#a69a80"
            strokeWidth="1"
          />
          <path
            d="M270 263C282 261 282 274 270 271"
            stroke="#f8f5ed"
            strokeWidth="4"
          />
          <ellipse cx="258.5" cy="261" rx="10.5" ry="3" fill="#755847" />
          <path
            d="M257 250C252 245 262 241 257 236"
            stroke="#bcae97"
            strokeWidth="1.3"
          />
          <ellipse cx="347" cy="280" rx="18" ry="5" fill="#eadbc3" />
          <path
            d="M336 263H357L355 277C352 281 340 280 338 276Z"
            fill="#753d45"
          />
          <path
            d="M357 266C367 264 367 276 356 274"
            stroke="#753d45"
            strokeWidth="3.5"
          />
          <ellipse cx="346.5" cy="264" rx="9.5" ry="2.5" fill="#a36d6a" />
          <path
            d="M348 251C344 245 353 241 349 237"
            stroke="#bcae97"
            strokeWidth="1.3"
          />
          <path
            d="M297 254L294 272C294 279 311 279 312 272L308 254Z"
            fill="#d8dec9"
            stroke="#96a085"
            strokeWidth="1"
          />
          <path
            d="M302 255L304 223M304 239C314 237 317 230 316 227C308 227 304 232 304 239M303 245C296 244 291 238 291 234C300 235 303 239 303 245"
            stroke="#68765a"
            strokeWidth="1.5"
          />
          <path
            d="M303 225C296 228 290 222 295 217C291 211 298 206 303 211C306 205 315 208 312 215C320 217 314 226 308 223C306 229 302 228 303 225Z"
            fill="#c77c5e"
          />
          <circle cx="303.5" cy="217.5" r="3" fill="#ead7a1" />

          {/* A well-loved plant, two stacked books, and a small cat-shaped cushion. */}
          <path
            d="M102 322C98 278 104 250 99 219M99 277C82 265 71 251 75 238C92 240 100 258 99 277M100 257C115 249 124 235 121 221C108 225 101 242 100 257M100 299C116 289 128 278 126 265C109 269 102 284 100 299M100 240C91 229 89 214 93 205C104 212 106 226 100 240"
            stroke="#657454"
            strokeWidth="2.5"
            fill="#869673"
          />
          <path
            d="M73 316H127L120 357C116 369 85 370 80 357Z"
            fill="#d4ae87"
            stroke="#b38c66"
            strokeWidth="1.2"
          />
          <ellipse cx="100" cy="317" rx="27" ry="6" fill="#b99573" />
          <path
            d="M86 333H117M87 342H115M89 351H113"
            stroke="#bc936e"
            strokeWidth="1.2"
          />
          <path d="M456 347L494 340L505 351L464 359Z" fill="#753d45" />
          <path
            d="M464 359V366L505 358V351"
            fill="#f3e4ca"
            stroke="#8f6a60"
            strokeWidth="1"
          />
          <path d="M450 364L488 357L500 368L458 376Z" fill="#8d9975" />
          <path
            d="M458 376V382L500 374V368"
            fill="#f3e4ca"
            stroke="#8d9975"
            strokeWidth="1"
          />
          <path
            d="M466 340C464 330 467 322 473 318L473 309L483 315L493 312L499 323C505 340 489 347 476 344"
            fill="#e9c47b"
            stroke="#c39e5e"
            strokeWidth="1.2"
          />
          <path
            d="M479 329H481M490 327H492"
            stroke="#8f7857"
            strokeWidth="1.5"
          />
          <path
            d="M469 339C456 337 454 348 466 348"
            stroke="#e9c47b"
            strokeWidth="6"
          />
          <path
            d="M478 399C484 397 490 397 494 400M104 382C111 379 117 380 121 383"
            stroke="#c9b899"
            strokeWidth="1.5"
          />
        </g>
      )}

      {scene === "journey" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M91 303C82 155 167 58 298 57C427 56 521 169 505 307Z"
            fill="#eae9dc"
          />
          <circle cx="390" cy="129" r="39" fill="#ead7a1" />
          <path d="M78 299L204 154L333 299Z" fill="#a5ae95" />
          <path d="M244 306L364 184L509 306Z" fill="#7e8d71" />
          <path
            d="M176 187L204 154L237 192L220 188L207 176L193 188Z"
            fill="#f8f5ed"
          />
          <path
            d="M72 309C156 286 233 297 300 311C385 329 450 295 525 309L506 383C366 422 190 410 91 377Z"
            fill="#d8dcc3"
          />
          <path
            d="M351 309C321 326 294 337 309 349C327 362 386 354 391 374C394 393 340 412 312 425H226C250 396 318 384 313 376C307 365 244 370 243 350C243 332 302 312 319 308Z"
            fill="#f5ecda"
          />
          <path
            d="M152 301V222M122 270L152 216L181 270ZM130 289L152 247L175 289Z"
            fill="#68765a"
            stroke="#68765a"
            strokeWidth="4"
          />
          <path
            d="M446 298V243M426 276L446 236L466 276Z"
            fill="#68765a"
            stroke="#68765a"
            strokeWidth="4"
          />
          <path
            d="M194 356L186 409M244 356L249 409"
            stroke="#8e7157"
            strokeWidth="7"
          />
          <path
            d="M181 336C181 326 190 320 199 320H234C244 320 251 326 251 336V373H181Z"
            fill="#c77c5e"
            stroke="#a76b53"
            strokeWidth="1.5"
          />
          <path
            d="M193 321V309C193 296 237 296 237 309V321M181 340H251"
            stroke="#a76b53"
            strokeWidth="3"
          />
          <path d="M197 337V368M235 337V368" stroke="#e3aa83" strokeWidth="5" />
          <path
            d="M383 372L379 413M423 372L428 413"
            stroke="#8e7157"
            strokeWidth="5"
          />
          <path
            d="M371 345C371 336 380 330 389 330H417C426 330 433 336 433 345V386H371Z"
            fill="#ead7a1"
            stroke="#bda46d"
            strokeWidth="1.5"
          />
          <path
            d="M384 330V319C384 309 419 309 419 319V330M371 349H433"
            stroke="#bda46d"
            strokeWidth="3"
          />
          <path d="M385 349V380M418 349V380" stroke="#d2ba82" strokeWidth="4" />
          <path
            d="M284 132C292 123 299 125 305 132M309 114C317 107 325 109 331 116"
            stroke="#8e977f"
            strokeWidth="2"
          />
          <path
            d="M114 365L112 350M108 359L116 357M458 380L461 365M454 374L466 373"
            stroke="#98a17c"
            strokeWidth="2"
          />
          <path
            d="M224 264C224 250 242 246 249 258C257 244 276 251 276 264C276 279 249 295 249 295C249 295 224 280 224 264Z"
            fill="#753d45"
            transform="translate(64 -83) scale(.68)"
          />
        </g>
      )}

      {scene === "garden" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M102 324V213C102 117 183 54 297 54C413 54 498 123 498 213V324Z"
            fill="#ede8d8"
          />
          <path
            d="M161 313V212C161 137 219 100 299 100C376 100 438 137 438 212V313"
            stroke="#bec6ad"
            strokeWidth="10"
          />
          <path
            d="M190 313V213C190 155 238 127 299 127C360 127 408 156 408 213V313M163 220H190M165 179L195 188M185 142L209 162M216 118L235 142M253 106L263 130M296 101V127M338 105L331 131M378 117L366 140M412 143L392 164M433 181L406 191M438 220H409"
            stroke="#aab799"
            strokeWidth="2"
          />
          <path
            d="M152 304C142 279 133 265 112 263C109 284 127 301 152 304M155 268C176 253 182 235 171 218C153 226 147 246 155 268M169 204C147 194 139 177 145 161C165 165 177 186 169 204M199 150C194 126 204 111 223 107C231 125 217 143 199 150M261 111C259 89 271 73 290 72C294 93 280 108 261 111M333 112C348 91 368 88 382 99C373 120 353 126 333 112M413 163C433 141 452 143 463 157C453 176 434 180 413 163M440 230C458 214 475 215 485 230C470 248 451 249 440 230M437 286C415 271 411 255 421 241C439 247 445 266 437 286"
            fill="#889879"
          />
          <path
            d="M91 350C165 325 442 325 511 352C484 399 144 412 91 350Z"
            fill="#d8dcc6"
          />
          <path
            d="M218 285H380V340H218Z"
            fill="#cba77b"
            stroke="#a98865"
            strokeWidth="2"
          />
          <path
            d="M227 340L219 388M371 340L380 388M224 300H375M224 319H375M244 282V343M352 282V343"
            stroke="#a98865"
            strokeWidth="4"
          />
          <path
            d="M207 341H391V354H207Z"
            fill="#d6b68c"
            stroke="#a98865"
            strokeWidth="2"
          />
          <path d="M227 334L234 303L268 306L272 337Z" fill="#c77c5e" />
          <path d="M331 337L335 304L370 309L373 339Z" fill="#ead7a1" />
          <path
            d="M238 309L260 332M240 330L259 311"
            stroke="#e0aa88"
            strokeWidth="1.5"
          />
          <path
            d="M344 315C342 310 349 309 352 314C358 309 362 315 358 319L352 324Z"
            fill="#b9a06f"
          />
          <path
            d="M111 337H160L155 374C152 384 121 386 117 374Z"
            fill="#b47c61"
          />
          <path
            d="M135 338L135 277M136 317C151 304 162 304 167 312C160 324 149 326 136 317M134 303C119 289 108 292 107 301C116 312 128 314 134 303"
            stroke="#68765a"
            strokeWidth="2"
            fill="#8b9b75"
          />
          <path
            d="M133 283C122 287 116 276 123 271C118 261 131 256 136 265C145 257 154 267 147 274C152 283 140 290 137 281Z"
            fill="#c77c5e"
          />
          <circle cx="135" cy="273" r="4" fill="#ead7a1" />
          <path
            d="M453 341L455 304M454 322C442 314 434 314 432 320C439 329 446 330 454 322M456 314C469 306 478 308 479 315C470 323 462 322 456 314"
            stroke="#68765a"
            strokeWidth="2"
            fill="#8b9b75"
          />
          <path
            d="M431 340H477L471 375C468 385 441 385 437 375Z"
            fill="#e1c88e"
            stroke="#c6ae77"
            strokeWidth="1"
          />
          <path
            d="M453 307C442 310 438 298 447 294C441 283 454 279 460 289C470 282 478 294 468 300C472 310 458 315 456 306Z"
            fill="#753d45"
          />
          <circle cx="456" cy="297" r="4" fill="#ead7a1" />
          <path
            d="M294 206C286 194 268 199 268 212C268 225 294 243 294 243C294 243 320 225 320 212C320 199 302 194 294 206Z"
            fill="#c77c5e"
          />
          <path
            d="M280 263C290 268 303 268 312 263"
            stroke="#c1b49b"
            strokeWidth="1.5"
          />
        </g>
      )}

      {scene === "table" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M91 294C91 155 174 65 300 65C427 65 509 155 509 294Z"
            fill="#ece8d9"
          />
          <path
            d="M300 65V141M270 171C270 150 283 137 300 137C317 137 330 150 330 171Z"
            stroke="#a38b70"
            strokeWidth="2"
            fill="#ead7a1"
          />
          <path d="M286 173C289 188 311 188 314 173" fill="#f6e7b8" />
          <ellipse cx="301" cy="386" rx="220" ry="37" fill="#e6dac4" />
          <path
            d="M204 288L187 395M395 289L411 395"
            stroke="#98734f"
            strokeWidth="10"
          />
          <path
            d="M163 251C163 224 224 204 300 204C378 204 439 224 439 251V277C439 303 378 322 300 322C224 322 163 303 163 277Z"
            fill="#b28d63"
          />
          <ellipse
            cx="301"
            cy="251"
            rx="138"
            ry="46"
            fill="#d7b68a"
            stroke="#b28d63"
            strokeWidth="1.5"
          />
          <path
            d="M251 212C279 206 322 206 350 212L359 304C330 317 276 317 244 305Z"
            fill="#f0e7d3"
          />
          <path
            d="M258 214L251 304M342 214L350 304"
            stroke="#c77c5e"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
          <ellipse
            cx="216"
            cy="256"
            rx="36"
            ry="16"
            fill="#f8f5ed"
            stroke="#aa9d84"
            strokeWidth="1.5"
          />
          <ellipse
            cx="216"
            cy="256"
            rx="26"
            ry="10"
            stroke="#d6cdb8"
            strokeWidth="1.5"
          />
          <ellipse
            cx="384"
            cy="256"
            rx="36"
            ry="16"
            fill="#f8f5ed"
            stroke="#aa9d84"
            strokeWidth="1.5"
          />
          <ellipse
            cx="384"
            cy="256"
            rx="26"
            ry="10"
            stroke="#d6cdb8"
            strokeWidth="1.5"
          />
          <path
            d="M206 254C212 247 223 249 228 256C223 263 211 262 206 254Z"
            fill="#d3a369"
          />
          <path
            d="M375 253C380 249 389 248 394 256C388 263 378 262 375 253Z"
            fill="#d3a369"
          />
          <path
            d="M176 251V268M172 244V251H180V244M184 246V268M421 246V268M426 244V268"
            stroke="#8b826c"
            strokeWidth="2"
          />
          <path
            d="M216 218V236M206 236H225M206 198H226L223 216C221 224 212 224 209 216Z"
            stroke="#9eab94"
            strokeWidth="1.5"
            fill="#dce2cd"
          />
          <path
            d="M384 217V235M374 235H393M374 197H394L391 215C389 223 380 223 377 215Z"
            stroke="#9eab94"
            strokeWidth="1.5"
            fill="#dce2cd"
          />
          <path
            d="M291 240L286 264C286 276 314 276 314 264L310 240Z"
            fill="#c77c5e"
            stroke="#a66c53"
            strokeWidth="1.2"
          />
          <path
            d="M299 242V201M299 219C284 218 281 207 281 202C294 203 299 209 299 219M300 227C316 224 321 215 319 210C307 211 301 218 300 227"
            stroke="#68765a"
            strokeWidth="2"
            fill="#93a07b"
          />
          <path
            d="M298 205C287 210 279 199 286 193C280 181 293 176 300 186C309 175 322 184 315 195C324 204 309 214 303 203Z"
            fill="#ead7a1"
            stroke="#c5b17b"
            strokeWidth="1"
          />
          <circle cx="300" cy="195" r="5" fill="#c77c5e" />
          <path
            d="M117 296C115 281 123 271 137 270L155 270C167 271 175 281 176 295L179 338H119Z"
            fill="#7c8966"
            stroke="#627152"
            strokeWidth="1.5"
          />
          <path
            d="M119 338L179 338L200 351L136 359Z"
            fill="#97a17c"
            stroke="#627152"
            strokeWidth="1.5"
          />
          <path
            d="M135 359L128 407M192 353L200 398M126 281L129 323M148 281L151 323M168 287L170 323"
            stroke="#627152"
            strokeWidth="3"
          />
          <path
            d="M422 296C421 281 429 271 443 270L461 270C473 271 481 281 482 295L485 338H424Z"
            fill="#c77c5e"
            stroke="#a46a53"
            strokeWidth="1.5"
          />
          <path
            d="M424 338L485 338L467 359L402 351Z"
            fill="#d79572"
            stroke="#a46a53"
            strokeWidth="1.5"
          />
          <path
            d="M411 354L403 399M470 359L477 407M434 283L436 324M454 281L456 324M474 285L476 324"
            stroke="#a46a53"
            strokeWidth="3"
          />
          <path
            d="M151 169C145 163 137 166 138 173C139 180 150 186 150 186C150 186 162 180 163 173C164 166 156 163 151 169Z"
            fill="#c77c5e"
          />
          <path
            d="M448 141C442 135 434 138 435 145C436 152 447 158 447 158C447 158 459 152 460 145C461 138 453 135 448 141Z"
            fill="#753d45"
          />
        </g>
      )}
    </svg>
  );
}
