"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Profile } from "../lib/quiz";
import {
  loadKakaoShare,
  sendKakaoShare,
  type KakaoSdk,
} from "../lib/kakao-share";

const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

export function KakaoShareButton({
  profile,
  onNotice,
}: {
  profile: Profile;
  onNotice: (message: string) => void;
}) {
  const [sdk, setSdk] = useState<KakaoSdk | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!key) return;
    let active = true;
    void loadKakaoShare(key).then((loaded) => {
      if (!active) return;
      setSdk(loaded);
      setState(loaded ? "ready" : "error");
    });
    return () => {
      active = false;
    };
  }, [attempt]);

  if (!key) return null;

  const share = () => {
    if (state === "error") {
      setState("loading");
      setAttempt((value) => value + 1);
      return;
    }
    if (!sdk) return;
    try {
      sendKakaoShare(sdk, profile);
      onNotice("카카오톡 공유 창에서 보낼 사람을 선택해주세요.");
    } catch {
      onNotice(
        "카카오톡을 열지 못했어요. 다시 시도하거나 결과 공유를 이용해주세요.",
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className="button kakao-share"
        onClick={share}
        disabled={state === "loading"}
        aria-busy={state === "loading"}
      >
        <MessageCircle
          size={19}
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
        {state === "loading"
          ? "카카오톡 준비 중…"
          : state === "error"
            ? "카카오톡 다시 연결"
            : "카카오톡으로 공유"}
      </button>
      {state === "error" && (
        <p className="kakao-share-error" role="status">
          카카오톡을 불러오지 못했어요. 다시 연결하거나 아래 결과 공유를
          이용해주세요.
        </p>
      )}
    </>
  );
}
