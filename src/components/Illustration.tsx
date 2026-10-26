type IllustrationProps = {
  scene?: "home" | "journey" | "garden" | "table";
  className?: string;
  compact?: boolean;
  width?: number;
  height?: number;
};

// Shared illustration tokens. Explicit SVG colors also survive PNG downloads
// and server-rendered social images without a browser stylesheet.
const palette = {
  ink: "#995465",
  rose: "#ED91AA",
  blush: "#FCE3EB",
  mint: "#BBDDD1",
  mintLight: "#EEF7F2",
  mintLine: "#97BFAF",
  gold: "#EDC66F",
  lilac: "#D9D4F0",
  paper: "#FFFEFC",
  rule: "#E9D6DC",
};

function spark({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <path
      d="M0-12 3-3 12 0 3 3 0 12-3 3-12 0-3-3Z"
      transform={`translate(${x} ${y}) scale(${size / 12})`}
      fill={palette.gold}
    />
  );
}

function heart({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <path
      d="M0 14C-7 9-18 1-18-9-18-21-4-23 0-12 4-23 18-21 18-9 18 1 7 9 0 14Z"
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill={palette.rose}
    />
  );
}

/** Light, flat card motifs inspired by LookAtMe's fortune illustrations. */
export function Illustration({
  scene = "home",
  className = "",
  compact = false,
  width,
  height,
}: IllustrationProps) {
  const c = palette;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 480"
      width={width}
      height={height}
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-scene={scene}
      data-compact={compact || undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="rotate(-13 263 249)">
        <rect
          x="138"
          y="95"
          width="250"
          height="308"
          rx="25"
          fill={c.mintLight}
          stroke={c.mintLine}
          strokeWidth="2"
        />
        <rect
          x="154"
          y="111"
          width="218"
          height="276"
          rx="15"
          stroke={c.mint}
          strokeWidth="1.5"
        />
        <path
          d="M178 139H194M186 131V147"
          stroke={c.mintLine}
          strokeWidth="2"
        />
        <path
          d="M178 339Q222 302 263 339T348 339"
          stroke={c.mint}
          strokeWidth="2"
        />
      </g>
      <g transform="rotate(9 333 237)">
        <rect
          x="208"
          y="79"
          width="250"
          height="316"
          rx="25"
          fill={c.paper}
          stroke={c.rule}
          strokeWidth="2"
        />
        <rect
          x="224"
          y="95"
          width="218"
          height="284"
          rx="15"
          stroke={c.blush}
          strokeWidth="1.5"
        />
        {heart({ x: 243, y: 120, scale: 0.35 })}
        {spark({ x: 423, y: 354, size: 7 })}

        {scene === "home" && (
          <g>
            {heart({ x: 332, y: 176, scale: 0.85 })}
            <path
              d="M273 195Q264 185 273 175M379 197Q388 187 379 177"
              stroke={c.rule}
              strokeWidth="3"
            />
            <g transform="rotate(-8 282 258)">
              <path
                d="M304 229H312C336 229 336 263 312 263H304"
                stroke={c.rose}
                strokeWidth="7"
              />
              <path
                d="M249 224H308V270Q308 289 279 289T249 270Z"
                fill={c.blush}
                stroke={c.rose}
                strokeWidth="2.5"
              />
              <path d="M259 234H298" stroke={c.paper} strokeWidth="3" />
            </g>
            <g transform="rotate(8 378 268)">
              <path
                d="M398 239H407C428 239 428 270 407 270H398"
                stroke={c.mintLine}
                strokeWidth="7"
              />
              <path
                d="M346 234H401V278Q401 296 374 296T346 278Z"
                fill={c.mintLight}
                stroke={c.mintLine}
                strokeWidth="2.5"
              />
              <path d="M357 246H389" stroke={c.mint} strokeWidth="3" />
            </g>
            <path
              d="M252 314Q327 329 403 314"
              stroke={c.rule}
              strokeWidth="2"
            />
          </g>
        )}

        {scene === "journey" && (
          <g>
            <circle cx="283" cy="173" r="23" fill={c.gold} />
            <path d="M268 188H303" stroke={c.paper} strokeWidth="8" />
            <path
              d="M250 279C241 313 296 333 318 302C334 280 290 268 288 290C285 317 355 329 386 293"
              stroke={c.mintLine}
              strokeWidth="2.5"
              strokeDasharray="5 8"
            />
            <path
              d="M264 226 409 180 368 278 330 249Z"
              fill={c.blush}
              stroke={c.ink}
              strokeWidth="2.5"
            />
            <path
              d="M409 180 330 249 321 274 314 242Z"
              fill={c.paper}
              stroke={c.ink}
              strokeWidth="2.5"
            />
            <path d="M321 274 344 259" stroke={c.ink} strokeWidth="2.5" />
            {spark({ x: 394, y: 319, size: 9 })}
          </g>
        )}

        {scene === "garden" && (
          <g>
            <path
              d="M319 292 293 202M344 292 365 190"
              stroke={c.mintLine}
              strokeWidth="4"
            />
            <path
              d="M309 257C281 261 265 247 265 229C290 226 305 237 309 257ZM350 251C374 254 392 240 395 220C370 219 353 234 350 251Z"
              fill={c.mint}
            />
            <path
              d="M266 172 287 187 297 164 309 187 328 173C332 203 316 221 296 219C276 218 266 201 266 172Z"
              fill={c.blush}
              stroke={c.rose}
              strokeWidth="2.5"
            />
            <path
              d="M341 153 359 167 371 147 380 171 398 162C398 188 382 207 365 202C347 197 339 178 341 153Z"
              fill={c.lilac}
              stroke={c.ink}
              strokeWidth="2"
            />
            <path
              d="M297 279H364L354 326Q332 338 310 326Z"
              fill={c.paper}
              stroke={c.ink}
              strokeWidth="2.5"
            />
            <path d="M302 293H359" stroke={c.blush} strokeWidth="9" />
            {heart({ x: 331, y: 317, scale: 0.35 })}
          </g>
        )}

        {scene === "table" && (
          <g>
            <path
              d="M255 169H351Q370 169 370 189V230Q370 249 350 249H291L267 269V249H255Q239 249 239 230V189Q239 169 255 169Z"
              fill={c.mintLight}
              stroke={c.mintLine}
              strokeWidth="2.5"
            />
            <path
              d="M263 195H325M263 211H304"
              stroke={c.mintLine}
              strokeWidth="3"
            />
            <path
              d="M323 228H399Q418 228 418 247V287Q418 307 399 307H395V326L370 307H323Q304 307 304 287V247Q304 228 323 228Z"
              fill={c.blush}
              stroke={c.rose}
              strokeWidth="2.5"
            />
            {heart({ x: 361, y: 269, scale: 0.8 })}
            {spark({ x: 277, y: 304, size: 10 })}
          </g>
        )}
      </g>
      {!compact && (
        <g>
          {spark({ x: 112, y: 155, size: 15 })}
          {spark({ x: 484, y: 116, size: 11 })}
          {spark({ x: 470, y: 368, size: 17 })}
          <circle cx="101" cy="304" r="5" fill={c.mint} />
          <circle cx="489" cy="261" r="4" fill={c.rose} />
          <path
            d="M132 366 125 376M498 179 507 184"
            stroke={c.rose}
            strokeWidth="3"
          />
        </g>
      )}
    </svg>
  );
}
