import type { ReactNode } from "react";

type IllustrationProps = {
  scene?: "home" | "journey" | "garden" | "table";
  typeId?: string;
  className?: string;
  compact?: boolean;
  width?: number;
  height?: number;
};

// Original artwork from Open Design, kept as inline vector paths so the same
// illustration renders in the browser, downloaded cards, and server OG images.
const artwork: Record<string, ReactNode> = {
  "adventure-partner": (
    <>
      <rect width="600" height="480" fill="#f8f2e5" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#bc975f"
        opacity=".08"
      />
      <path d="M83 298V159a209 139 0 0 1 418 0v139Z" fill="#fffdfa" />
      <path d="M98 286V163a194 124 0 0 1 388 0v123Z" fill="#d8e8ee" />
      <circle cx="391" cy="114" r="34" fill="#efc771" />
      <path d="M98 256l100-89 93 87 72-62 123 72v22H98Z" fill="#b4c6b5" />
      <path
        d="M98 273l90-43 77 56h-167Zm180 13 84-61 124 49v12Z"
        fill="#7e9d91"
      />
      <path d="M292 40v246" stroke="#fffdfa" strokeWidth="9" />
      <path d="M51 416h500" stroke="#d9c9c1" strokeWidth="3" />
      <rect x="115" y="277" width="163" height="129" rx="16" fill="#bc975f" />
      <path
        d="M162 277v-19q0-16 15-16h37q15 0 15 16v19"
        fill="none"
        stroke="#815c5d"
        strokeWidth="10"
      />
      <path
        d="M146 278v127m104-127v127"
        stroke="#fffdfa"
        strokeWidth="10"
        opacity=".6"
      />
      <circle cx="141" cy="415" r="8" fill="#66514c" />
      <circle cx="253" cy="415" r="8" fill="#66514c" />
      <path d="M184 322l18 18-18 18-18-18z" fill="#fffdfa" />
      <rect x="310" y="310" width="135" height="101" rx="12" fill="#6c8795" />
      <path
        d="M341 309v-12q0-13 13-13h42q13 0 13 13v12"
        fill="none"
        stroke="#5b726b"
        strokeWidth="8"
      />
      <path
        d="M332 315v90m89-90v90"
        stroke="#fffdfa"
        strokeWidth="8"
        opacity=".5"
      />
      <path
        d="M374 208l19 10 29-16 8 7-21 24 17 8-5 7-24-4-21 20-8-4 11-23-15-11z"
        fill="#bc975f"
      />
      <path
        d="M449 365l36-17 27 19 30-12v57l-30 11-27-18-36 13z"
        fill="#fffdfa"
        stroke="#ccbbb1"
        strokeWidth="2"
      />
      <path
        d="M485 348v57m27-38v56m-55-30 21-14 20 24 35-22"
        fill="none"
        stroke="#afc2a6"
        strokeWidth="5"
      />
    </>
  ),
  "everyday-soulmate": (
    <>
      <rect width="600" height="480" fill="#fff1f2" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#c64c65"
        opacity=".08"
      />
      <path d="M146 260V127a114 114 0 0 1 228 0v133Z" fill="#fffdfa" />
      <path d="M158 250V130a102 102 0 0 1 204 0v120Z" fill="#d6e7ed" />
      <circle cx="310" cy="104" r="29" fill="#efc771" />
      <path d="M158 214Q215 165 263 211T362 204V250H158Z" fill="#b7c5aa" />
      <path d="M158 237Q218 210 278 237T362 232V250H158Z" fill="#8fa385" />
      <path d="M260 29V250M158 156H362" stroke="#fffdfa" strokeWidth="9" />
      <path d="M138 260H382" stroke="#dba8b1" strokeWidth="10" />
      <path d="M69 335v-66q0-29 29-29h18q29 0 29 29v66" fill="#83957a" />
      <path d="M440 335v-66q0-29 29-29h18q29 0 29 29v66" fill="#c64c65" />
      <path
        d="M78 337v86m60-86v86m309-86v86m60-86v86"
        stroke="#59644c"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M160 332l-17 104m294-104l17 104"
        stroke="#a27263"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <ellipse cx="300" cy="322" rx="207" ry="60" fill="#d7a49e" />
      <ellipse cx="300" cy="312" rx="207" ry="59" fill="#fffdfa" />
      <path d="M264 258h74v107h-74z" fill="#f6d1d8" />
      <path
        d="M275 261v102m14-105v107m14-107v107m14-106v106m14-103v103"
        stroke="#fffdfa"
        strokeWidth="3"
      />
      <g transform="translate(209 290) scale(0.75)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#c64c65"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#c64c65" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(393 306) scale(0.75)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#83957a"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#83957a" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <path d="M291 271h29l-4-48h-21z" fill="#8aa48a" />
      <path
        d="M305 227v-60m0 39l-21-25m21 15l20-19"
        stroke="#617b5d"
        strokeWidth="4"
      />
      <path
        d="M305 170c-26-8-21-34-5-32l6 10 8-10c19 1 17 29-9 32Zm-21 15c-21-3-25-24-11-27l10 9 5-12c19-2 17 25-4 30Zm42-8c-18-6-17-27-4-27l5 9 9-7c18 4 9 26-10 25Z"
        fill="#c64c65"
      />
      <g transform="translate(505 199) scale(0.65)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#83957a"
          stroke="#83957a"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#edb0bd" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <rect x="56" y="105" width="56" height="72" rx="2" fill="#fffdfa" />
      <path d="M70 151l14-27 13 27z" fill="#83957a" />
      <path d="M61 180h47" stroke="#dba8b1" strokeWidth="4" />
    </>
  ),
  "free-spirited-friend": (
    <>
      <rect width="600" height="480" fill="#edf4f0" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#7c9d8a"
        opacity=".08"
      />
      <path d="M107 354V207a187 187 0 0 1 374 0v147Z" fill="#fffdfa" />
      <path d="M124 342V214a170 170 0 0 1 340 0v128Z" fill="#dce9df" />
      <path d="M294 44v299M124 223h340" stroke="#fffdfa" strokeWidth="8" />
      <circle cx="381" cy="144" r="31" fill="#efce83" />
      <path d="M124 312q80-81 150-24t190 3v51H124Z" fill="#bed0b6" />
      <path
        d="M83 379h431"
        stroke="#b5a18d"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path d="M117 385v56m361-56v56" stroke="#b5a18d" strokeWidth="12" />
      <g transform="translate(209 291) scale(1.23)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#7c9d8a"
          stroke="#7c9d8a"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#c7a2a3" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <g transform="translate(390 316) scale(0.98)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#c8879d"
          stroke="#c8879d"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#e6c79f" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <path d="M258 382h70v33h-70z" fill="#e5b3c2" />
      <path d="M260 391h64m-64 9h64" stroke="#fffdfa" strokeWidth="3" />
      <path d="M57 278h32v50H57z" fill="#a9bec3" />
      <path
        d="M87 283l30-21 4 8-32 30m-30-15c-30-12-27 38 0 27"
        fill="none"
        stroke="#a9bec3"
        strokeWidth="8"
      />
      <path
        d="M275 110c-15-20-36 1-15 17l15 12 15-12c21-16 0-37-15-17"
        fill="#7c9d8a"
      />
    </>
  ),
  "growth-companion": (
    <>
      <rect width="600" height="480" fill="#f4eff7" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#9e87ad"
        opacity=".08"
      />
      <rect x="143" y="47" width="303" height="154" rx="4" fill="#fffdfa" />
      <path d="M158 62h273v123H158z" fill="#e1e8de" />
      <path
        d="M165 167l60-52 52 33 65-56 81 76"
        fill="none"
        stroke="#9aaf91"
        strokeWidth="8"
      />
      <circle cx="380" cy="98" r="20" fill="#edc97b" />
      <path d="M85 304v-62q0-23 24-23h25q24 0 24 23v62" fill="#9e87ad" />
      <path d="M442 304v-62q0-23 24-23h25q24 0 24 23v62" fill="#8ca18b" />
      <path
        d="M92 317v108m58-108v108m300-108v108m57-108v108"
        stroke="#9c7a6d"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M152 320l-12 118m305-118l12 118"
        stroke="#a58070"
        strokeWidth="13"
      />
      <rect x="100" y="283" width="430" height="50" rx="25" fill="#cfa399" />
      <ellipse cx="315" cy="283" rx="215" ry="59" fill="#fffdfa" />
      <g transform="translate(194 262) scale(0.65)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#9e87ad"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#9e87ad" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(434 269) scale(0.65)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#8ca18b"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#8ca18b" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <path d="M249 279l44-19 61 16-45 24z" fill="#edd2a5" />
      <path d="M257 278l36-14 52 13-36 18z" fill="#fffdfa" />
      <path
        d="M292 267l2 22m18-13 18 4m-65-1 18-7"
        stroke="#bcaaa1"
        strokeWidth="2"
      />
      <g transform="translate(310 247) scale(0.55)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#819579"
          stroke="#819579"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#8ca18b" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <path
        d="M69 113h37m-18-18v37"
        stroke="#9e87ad"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M487 124c-13-17-31 0-13 14l13 10 13-10c18-14 0-31-13-14"
        fill="#9e87ad"
      />
    </>
  ),
  "quiet-garden": (
    <>
      <rect width="600" height="480" fill="#eef3eb" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#83957a"
        opacity=".08"
      />
      <path d="M107 354V207a187 187 0 0 1 374 0v147Z" fill="#fffdfa" />
      <path d="M124 342V214a170 170 0 0 1 340 0v128Z" fill="#dce9df" />
      <path d="M294 44v299M124 223h340" stroke="#fffdfa" strokeWidth="8" />
      <circle cx="381" cy="144" r="31" fill="#efce83" />
      <path d="M124 312q80-81 150-24t190 3v51H124Z" fill="#bed0b6" />
      <path
        d="M83 379h431"
        stroke="#b5a18d"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path d="M117 385v56m361-56v56" stroke="#b5a18d" strokeWidth="12" />
      <g transform="translate(209 291) scale(1.23)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#83957a"
          stroke="#83957a"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#c7a2a3" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <g transform="translate(390 316) scale(0.98)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#ce8997"
          stroke="#ce8997"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#e6c79f" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <path d="M258 382h70v33h-70z" fill="#e5b3c2" />
      <path d="M260 391h64m-64 9h64" stroke="#fffdfa" strokeWidth="3" />
      <path d="M57 278h32v50H57z" fill="#a9bec3" />
      <path
        d="M87 283l30-21 4 8-32 30m-30-15c-30-12-27 38 0 27"
        fill="none"
        stroke="#a9bec3"
        strokeWidth="8"
      />
      <path
        d="M275 110c-15-20-36 1-15 17l15 12 15-12c21-16 0-37-15-17"
        fill="#83957a"
      />
    </>
  ),
  "reliable-companion": (
    <>
      <rect width="600" height="480" fill="#f0f1f7" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#858aa7"
        opacity=".08"
      />
      <path d="M146 260V127a114 114 0 0 1 228 0v133Z" fill="#fffdfa" />
      <path d="M158 250V130a102 102 0 0 1 204 0v120Z" fill="#d6e7ed" />
      <circle cx="310" cy="104" r="29" fill="#efc771" />
      <path d="M158 214Q215 165 263 211T362 204V250H158Z" fill="#b7c5aa" />
      <path d="M158 237Q218 210 278 237T362 232V250H158Z" fill="#8fa385" />
      <path d="M260 29V250M158 156H362" stroke="#fffdfa" strokeWidth="9" />
      <path d="M138 260H382" stroke="#dba8b1" strokeWidth="10" />
      <path d="M69 335v-66q0-29 29-29h18q29 0 29 29v66" fill="#8ea58c" />
      <path d="M440 335v-66q0-29 29-29h18q29 0 29 29v66" fill="#858aa7" />
      <path
        d="M78 337v86m60-86v86m309-86v86m60-86v86"
        stroke="#59644c"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M160 332l-17 104m294-104l17 104"
        stroke="#a27263"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <ellipse cx="300" cy="322" rx="207" ry="60" fill="#d7a49e" />
      <ellipse cx="300" cy="312" rx="207" ry="59" fill="#fffdfa" />
      <path d="M264 258h74v107h-74z" fill="#f6d1d8" />
      <path
        d="M275 261v102m14-105v107m14-107v107m14-106v106m14-103v103"
        stroke="#fffdfa"
        strokeWidth="3"
      />
      <g transform="translate(209 290) scale(0.75)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#858aa7"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#858aa7" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(393 306) scale(0.75)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#8ea58c"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#8ea58c" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <path d="M291 271h29l-4-48h-21z" fill="#8aa48a" />
      <path
        d="M305 227v-60m0 39l-21-25m21 15l20-19"
        stroke="#617b5d"
        strokeWidth="4"
      />
      <path
        d="M305 170c-26-8-21-34-5-32l6 10 8-10c19 1 17 29-9 32Zm-21 15c-21-3-25-24-11-27l10 9 5-12c19-2 17 25-4 30Zm42-8c-18-6-17-27-4-27l5 9 9-7c18 4 9 26-10 25Z"
        fill="#858aa7"
      />
      <g transform="translate(505 199) scale(0.65)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#8ea58c"
          stroke="#8ea58c"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#d1b5c7" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <rect x="56" y="105" width="56" height="72" rx="2" fill="#fffdfa" />
      <path d="M70 151l14-27 13 27z" fill="#8ea58c" />
      <path d="M61 180h47" stroke="#dba8b1" strokeWidth="4" />
    </>
  ),
  "romantic-explorer": (
    <>
      <rect width="600" height="480" fill="#fff0eb" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#d18a76"
        opacity=".08"
      />
      <path d="M83 298V159a209 139 0 0 1 418 0v139Z" fill="#fffdfa" />
      <path d="M98 286V163a194 124 0 0 1 388 0v123Z" fill="#d8e8ee" />
      <circle cx="391" cy="114" r="34" fill="#efc771" />
      <path d="M98 256l100-89 93 87 72-62 123 72v22H98Z" fill="#b4c6b5" />
      <path
        d="M98 273l90-43 77 56h-167Zm180 13 84-61 124 49v12Z"
        fill="#7e9d91"
      />
      <path d="M292 40v246" stroke="#fffdfa" strokeWidth="9" />
      <path d="M51 416h500" stroke="#d9c9c1" strokeWidth="3" />
      <rect x="115" y="277" width="163" height="129" rx="16" fill="#d18a76" />
      <path
        d="M162 277v-19q0-16 15-16h37q15 0 15 16v19"
        fill="none"
        stroke="#815c5d"
        strokeWidth="10"
      />
      <path
        d="M146 278v127m104-127v127"
        stroke="#fffdfa"
        strokeWidth="10"
        opacity=".6"
      />
      <circle cx="141" cy="415" r="8" fill="#66514c" />
      <circle cx="253" cy="415" r="8" fill="#66514c" />
      <path d="M184 322l18 18-18 18-18-18z" fill="#fffdfa" />
      <rect x="310" y="310" width="135" height="101" rx="12" fill="#829d9b" />
      <path
        d="M341 309v-12q0-13 13-13h42q13 0 13 13v12"
        fill="none"
        stroke="#5b726b"
        strokeWidth="8"
      />
      <path
        d="M332 315v90m89-90v90"
        stroke="#fffdfa"
        strokeWidth="8"
        opacity=".5"
      />
      <path
        d="M374 208l19 10 29-16 8 7-21 24 17 8-5 7-24-4-21 20-8-4 11-23-15-11z"
        fill="#d18a76"
      />
      <path
        d="M449 365l36-17 27 19 30-12v57l-30 11-27-18-36 13z"
        fill="#fffdfa"
        stroke="#ccbbb1"
        strokeWidth="2"
      />
      <path
        d="M485 348v57m27-38v56m-55-30 21-14 20 24 35-22"
        fill="none"
        stroke="#afc2a6"
        strokeWidth="5"
      />
    </>
  ),
  "steady-teammate": (
    <>
      <rect width="600" height="480" fill="#f4f1e9" />
      <ellipse
        cx="300"
        cy="431"
        rx="240"
        ry="20"
        fill="#b48a57"
        opacity=".08"
      />
      <rect x="143" y="47" width="303" height="154" rx="4" fill="#fffdfa" />
      <path d="M158 62h273v123H158z" fill="#e1e8de" />
      <path
        d="M165 167l60-52 52 33 65-56 81 76"
        fill="none"
        stroke="#9aaf91"
        strokeWidth="8"
      />
      <circle cx="380" cy="98" r="20" fill="#edc97b" />
      <path d="M85 304v-62q0-23 24-23h25q24 0 24 23v62" fill="#b48a57" />
      <path d="M442 304v-62q0-23 24-23h25q24 0 24 23v62" fill="#6f8780" />
      <path
        d="M92 317v108m58-108v108m300-108v108m57-108v108"
        stroke="#9c7a6d"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M152 320l-12 118m305-118l12 118"
        stroke="#a58070"
        strokeWidth="13"
      />
      <rect x="100" y="283" width="430" height="50" rx="25" fill="#cfa399" />
      <ellipse cx="315" cy="283" rx="215" ry="59" fill="#fffdfa" />
      <g transform="translate(194 262) scale(0.65)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#b48a57"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#b48a57" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(434 269) scale(0.65)">
        <ellipse cx="0" cy="31" rx="43" ry="9" fill="#dfd2cc" opacity=".45" />
        <path
          d="M25-9H38C61-9 59 23 34 24H25"
          fill="none"
          stroke="#6f8780"
          strokeWidth="10"
        />
        <path d="M-29-15H29V14Q29 35 0 35Q-29 35-29 14Z" fill="#6f8780" />
        <ellipse cy="-15" rx="29" ry="7" fill="#fffdfa" />
        <ellipse cy="-14" rx="22" ry="4" fill="#73574a" />
        <path
          d="M-9-30C-21-45 6-51-4-67"
          fill="none"
          stroke="#ac9899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <path d="M249 279l44-19 61 16-45 24z" fill="#edd2a5" />
      <path d="M257 278l36-14 52 13-36 18z" fill="#fffdfa" />
      <path
        d="M292 267l2 22m18-13 18 4m-65-1 18-7"
        stroke="#bcaaa1"
        strokeWidth="2"
      />
      <g transform="translate(310 247) scale(0.55)">
        <path
          d="M0 0V-93M0-39C-45-30-57-63-43-72C-21-82-2-49 0-39ZM0-58C43-50 54-83 38-91C18-98 3-69 0-58ZM0-82C-20-90-26-118-11-121C7-124 14-100 0-82Z"
          fill="#819579"
          stroke="#819579"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M-35 0H35L27 55H-27Z" fill="#6f8780" />
        <path d="M-38 0H38" stroke="#fffdfa" strokeWidth="7" />
      </g>
      <path
        d="M69 113h37m-18-18v37"
        stroke="#b48a57"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M487 124c-13-17-31 0-13 14l13 10 13-10c18-14 0-31-13-14"
        fill="#b48a57"
      />
    </>
  ),
};
const sceneType = {
  home: "everyday-soulmate",
  journey: "romantic-explorer",
  garden: "quiet-garden",
  table: "steady-teammate",
};

export function Illustration({
  scene = "home",
  typeId,
  className = "",
  width = 600,
  height = 480,
}: IllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`illustration ${className}`}
      width={width}
      height={height}
      viewBox="0 0 600 480"
      aria-hidden="true"
    >
      {artwork[typeId ?? sceneType[scene]] ?? artwork[sceneType[scene]]}
    </svg>
  );
}
