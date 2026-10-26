export type Axis = "pace" | "closeness" | "care";

export type Option = {
  text: string;
  detail?: string;
  score: number;
};

export type Question = {
  id: string;
  chapter: string;
  scene: string;
  prompt: string;
  hint: string;
  axis: Axis;
  perspective: "self" | "partner";
  options: Option[];
};

export type Profile = {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  tags: string[];
  color: string;
  scene: "home" | "journey" | "garden" | "table";
  strengths: string[];
  conversation: string[];
};

export const QUESTIONS: Question[] = [
  {
    id: "self-weekend",
    chapter: "내가 사랑하는 일상",
    scene: "아무 약속 없는 토요일",
    prompt: "눈을 뜨니 온전히 비어 있는 하루.\n나는 어떻게 보내고 싶을까요?",
    hint: "멋져 보이는 답보다, 평소 내 모습에 가까운 답을 골라주세요.",
    axis: "pace",
    perspective: "self",
    options: [
      {
        text: "늘 가던 카페에서 느긋하게",
        detail: "익숙한 커피와 늘 앉던 자리면 충분해요.",
        score: -3,
      },
      {
        text: "평소처럼 쉬다가 동네 산책",
        detail: "편안한 하루에 작은 변화를 더해요.",
        score: -1,
      },
      {
        text: "찜해 둔 새로운 공간으로",
        detail: "가보지 않은 곳에서 기분 전환하고 싶어요.",
        score: 1,
      },
      {
        text: "일단 나가서 오늘을 발견하기",
        detail: "계획에 없던 풍경을 만나면 더 좋아요.",
        score: 3,
      },
    ],
  },
  {
    id: "self-dinner",
    chapter: "내가 사랑하는 일상",
    scene: "둘이 저녁을 고르는 순간",
    prompt: "함께 먹을 저녁을 정할 때,\n내가 먼저 꺼낼 말은?",
    hint: "둘 다 좋은 선택이에요. 더 자주 끌리는 쪽을 생각해 보세요.",
    axis: "pace",
    perspective: "self",
    options: [
      {
        text: "“우리 좋아하는 그 메뉴 먹자”",
        detail: "실패 없는 익숙한 맛이 좋아요.",
        score: -3,
      },
      {
        text: "“단골집에서 다른 메뉴 먹어볼까?”",
        detail: "편안한 곳에서 조금만 새롭게요.",
        score: -1,
      },
      {
        text: "“새로 생긴 곳, 한번 가볼래?”",
        detail: "괜찮아 보이는 새 식당을 찾아봐요.",
        score: 1,
      },
      {
        text: "“우리 안 먹어본 음식 도전하자”",
        detail: "색다른 경험이 둘만의 이야기가 돼요.",
        score: 3,
      },
    ],
  },
  {
    id: "self-evening",
    chapter: "내가 사랑하는 일상",
    scene: "하루를 마친 저녁",
    prompt: "퇴근 후 집에 돌아왔어요.\n나에게 가장 편안한 시간은?",
    hint: "사랑의 크기가 아니라, 에너지를 채우는 방식에 관한 질문이에요.",
    axis: "closeness",
    perspective: "self",
    options: [
      {
        text: "저녁부터 잠들 때까지 함께",
        detail: "하루 이야기를 오래 나누고 싶어요.",
        score: -3,
      },
      {
        text: "잠깐 쉬고, 함께 보내는 저녁",
        detail: "나만의 숨 돌릴 시간도 조금 필요해요.",
        score: -1,
      },
      {
        text: "각자 쉬다가 잠들기 전 대화",
        detail: "충분히 쉬고 나면 더 반갑게 만나요.",
        score: 1,
      },
      {
        text: "서로 좋아하는 일을 하며 쉬기",
        detail: "같은 집에서 각자의 리듬을 지켜요.",
        score: 3,
      },
    ],
  },
  {
    id: "self-hobby",
    chapter: "내가 사랑하는 일상",
    scene: "새로운 취미가 생긴 날",
    prompt: "오랫동안 해보고 싶던 취미.\n시작하는 내 모습은?",
    hint: "관계 속에서 나에게 편안한 거리를 떠올려 보세요.",
    axis: "closeness",
    perspective: "self",
    options: [
      {
        text: "둘이 함께 배울 수 있는 걸 찾아요",
        detail: "즐거운 일은 함께 경험하고 싶어요.",
        score: -3,
      },
      {
        text: "함께 해보고, 안 맞으면 따로 해요",
        detail: "우선 같이할 기회부터 만들어 봐요.",
        score: -1,
      },
      {
        text: "혼자 시작하고 가끔 초대해요",
        detail: "내 취미를 가끔 나누는 게 좋아요.",
        score: 1,
      },
      {
        text: "온전히 나만의 시간으로 즐겨요",
        detail: "서로 다른 이야기를 가져오는 것도 좋아요.",
        score: 3,
      },
    ],
  },
  {
    id: "self-comfort",
    chapter: "내가 사랑하는 일상",
    scene: "상대의 어깨가 처진 날",
    prompt: "“오늘 회사에서 너무 힘들었어.”\n그 말을 들은 내가 먼저 하는 일은?",
    hint: "내가 자연스럽게 건네는 다정함의 모양을 골라주세요.",
    axis: "care",
    perspective: "self",
    options: [
      {
        text: "말없이 안아주고 이야기를 들어요",
        detail: "마음이 풀릴 때까지 곁에 있어요.",
        score: -3,
      },
      {
        text: "마음을 알아준 뒤 필요한 걸 물어요",
        detail: "충분히 들어주는 것이 먼저예요.",
        score: -1,
      },
      {
        text: "무엇이 도움이 될지 같이 정리해요",
        detail: "공감하면서 다음 방법을 찾아요.",
        score: 1,
      },
      {
        text: "당장 덜 힘들 방법을 함께 찾아요",
        detail: "문제를 나누어 짊어지고 싶어요.",
        score: 3,
      },
    ],
  },
  {
    id: "self-disagreement",
    chapter: "내가 사랑하는 일상",
    scene: "작은 오해가 생겼을 때",
    prompt: "사소한 말에 서로 서운해졌어요.\n대화를 시작한다면 나는?",
    hint: "둘 중 하나만 중요하다는 뜻은 아니에요. 먼저 하는 일을 골라주세요.",
    axis: "care",
    perspective: "self",
    options: [
      {
        text: "“어떤 마음이었는지 듣고 싶어”",
        detail: "서로의 감정을 알아주는 것부터요.",
        score: -3,
      },
      {
        text: "“많이 서운했지. 우리 이야기하자”",
        detail: "마음을 풀고 상황을 돌아봐요.",
        score: -1,
      },
      {
        text: "“어디서 엇갈렸는지 같이 볼까?”",
        detail: "상황을 정리하며 마음도 살펴요.",
        score: 1,
      },
      {
        text: "“다음엔 어떻게 하면 좋을까?”",
        detail: "같은 일이 반복되지 않을 약속을 찾아요.",
        score: 3,
      },
    ],
  },
  {
    id: "partner-weekend",
    chapter: "내가 바라는 당신",
    scene: "함께 살게 될 누군가",
    prompt: "앞으로의 주말을 떠올릴 때,\n어떤 제안을 하는 사람에게 끌리나요?",
    hint: "지금부터는 나의 행동이 아니라, 상대에게 바라는 모습을 골라주세요.",
    axis: "pace",
    perspective: "partner",
    options: [
      {
        text: "“우리 늘 가던 길 산책하자”",
        detail: "익숙한 일상을 함께 아끼는 사람.",
        score: -3,
      },
      {
        text: "“편하게 쉬다가 가까운 데 갈까?”",
        detail: "평소의 리듬에 작은 즐거움을 더하는 사람.",
        score: -1,
      },
      {
        text: "“이번엔 다른 동네 가보자”",
        detail: "새로운 장소를 종종 제안하는 사람.",
        score: 1,
      },
      {
        text: "“가보고 싶은 곳, 같이 떠날래?”",
        detail: "처음의 설렘을 자주 데려오는 사람.",
        score: 3,
      },
    ],
  },
  {
    id: "partner-anniversary",
    chapter: "내가 바라는 당신",
    scene: "둘만의 기념일",
    prompt: "올해의 기념일을 준비한 상대.\n어떤 하루가 더 반가울까요?",
    hint: "비용이나 규모보다, 그 하루의 분위기를 상상해 보세요.",
    axis: "pace",
    perspective: "partner",
    options: [
      {
        text: "추억이 쌓인 장소에서 보내는 하루",
        detail: "우리의 이야기를 오래 기억해 주면 좋아요.",
        score: -3,
      },
      {
        text: "익숙한 데이트에 작은 깜짝 선물",
        detail: "편안한 분위기에 소소한 변화면 충분해요.",
        score: -1,
      },
      {
        text: "가보고 싶던 곳에서 새로운 추억",
        detail: "처음 함께하는 순간이 기대돼요.",
        score: 1,
      },
      {
        text: "생각도 못 했던 색다른 경험",
        detail: "예상 밖의 즐거움을 나누고 싶어요.",
        score: 3,
      },
    ],
  },
  {
    id: "partner-time",
    chapter: "내가 바라는 당신",
    scene: "각자의 시간이 필요한 날",
    prompt:
      "함께 살더라도 혼자만의 시간은 필요하죠.\n상대가 어떤 리듬이면 편할까요?",
    hint: "내 방식과 같아야 할 필요는 없어요. 내가 바라는 관계를 골라주세요.",
    axis: "closeness",
    perspective: "partner",
    options: [
      {
        text: "대부분의 시간을 함께 보내고 싶어 해요",
        detail: "무언가를 같이하자는 제안이 반가워요.",
        score: -3,
      },
      {
        text: "함께하는 시간이 많고, 가끔 따로 쉬어요",
        detail: "함께하는 일상이 기본이면 좋아요.",
        score: -1,
      },
      {
        text: "각자 충분히 쉬고, 약속한 시간을 함께해요",
        detail: "서로의 시간을 챙겨주는 게 좋아요.",
        score: 1,
      },
      {
        text: "각자의 일정을 편하게 존중해 줘요",
        detail: "혼자 보내는 시간도 자연스러우면 좋아요.",
        score: 3,
      },
    ],
  },
  {
    id: "partner-hobby",
    chapter: "내가 바라는 당신",
    scene: "취향이 서로 다를 때",
    prompt:
      "나는 전시, 상대는 등산을 좋아해요.\n어떤 말을 들으면 마음이 놓일까요?",
    hint: "서로 다른 취향을 함께 살아가는 모습을 생각해 보세요.",
    axis: "closeness",
    perspective: "partner",
    options: [
      {
        text: "“번갈아 가며 둘 다 같이 해보자”",
        detail: "서로의 세계에 함께 들어와 주는 사람.",
        score: -3,
      },
      {
        text: "“가끔 같이 가고, 함께할 취미도 찾자”",
        detail: "공통의 즐거움을 만들어 가는 사람.",
        score: -1,
      },
      {
        text: "“각자 즐기고, 가끔 초대해 줘”",
        detail: "다른 취향을 편안하게 응원하는 사람.",
        score: 1,
      },
      {
        text: "“다녀와서 어떤 하루였는지 알려줘”",
        detail: "각자의 세계를 그대로 존중하는 사람.",
        score: 3,
      },
    ],
  },
  {
    id: "partner-comfort",
    chapter: "내가 바라는 당신",
    scene: "이번엔 내가 지친 날",
    prompt: "긴 하루를 보내고 돌아온 나에게,\n상대가 먼저 해줬으면 하는 일은?",
    hint: "내가 건네는 위로와, 받고 싶은 위로는 다를 수 있어요.",
    axis: "care",
    perspective: "partner",
    options: [
      {
        text: "“많이 힘들었지” 하고 오래 들어주기",
        detail: "설명하거나 해결하지 않아도 괜찮은 시간.",
        score: -3,
      },
      {
        text: "마음을 알아준 뒤 필요한 것 묻기",
        detail: "충분한 공감 뒤에 오는 작은 도움.",
        score: -1,
      },
      {
        text: "이야기를 듣고 함께 방법 찾아보기",
        detail: "내 편에서 차근차근 풀어가는 대화.",
        score: 1,
      },
      {
        text: "내 부담을 줄일 일을 찾아 해주기",
        detail: "막막한 일이 조금 가벼워지는 행동.",
        score: 3,
      },
    ],
  },
  {
    id: "partner-disagreement",
    chapter: "내가 바라는 당신",
    scene: "오래 함께하기 위한 대화",
    prompt: "서운했던 일을 이야기한 뒤,\n어떤 반응에 다시 가까워질까요?",
    hint: "마지막 질문이에요. 나에게 닿는 다정함을 골라주세요.",
    axis: "care",
    perspective: "partner",
    options: [
      {
        text: "“그때 네 마음이 그랬구나”",
        detail: "내 감정을 충분히 이해했다는 말.",
        score: -3,
      },
      {
        text: "“마음이 풀릴 때까지 더 이야기하자”",
        detail: "마음을 살피며 해결도 함께 고민하는 태도.",
        score: -1,
      },
      {
        text: "“우리 다음에는 이렇게 해볼까?”",
        detail: "내 마음을 듣고 구체적인 약속을 하는 태도.",
        score: 1,
      },
      {
        text: "말한 내용을 기억하고 행동을 바꾸기",
        detail: "같은 서운함이 줄어드는 실제 변화.",
        score: 3,
      },
    ],
  },
];

// Order follows the three positive-axis bits: pace, closeness, care.
export const PROFILES: Profile[] = [
  {
    id: "everyday-soulmate",
    name: "일상의 단짝",
    englishName: "The Everyday Soulmate",
    tagline: "별일 없는 하루도, 둘이라서 특별하게.",
    description:
      "함께 먹는 저녁과 서로의 하루를 듣는 시간을 소중히 여겨요. 익숙한 일상을 함께 쌓고, 마음이 편히 머물 수 있는 관계를 그리고 있어요.",
    tags: ["함께하는 일상", "다정한 공감", "익숙한 행복"],
    color: "#b95343",
    scene: "home",
    strengths: [
      "작은 일상을 함께 나누려는 마음",
      "상대의 감정을 먼저 살피는 다정함",
      "오래 쌓이는 둘만의 추억",
    ],
    conversation: [
      "평범한 주말을 둘이 어떻게 보내고 싶어요?",
      "힘든 날에는 어떤 위로가 가장 좋아요?",
      "함께 살며 꼭 만들고 싶은 작은 습관이 있어요?",
    ],
  },
  {
    id: "steady-teammate",
    name: "든든한 한 팀",
    englishName: "The Steady Teammate",
    tagline: "소소한 오늘을, 함께 더 좋은 내일로.",
    description:
      "익숙한 일상을 함께 꾸리고, 어려운 일은 둘이 나눠 풀어가고 싶어 해요. 좋아하는 마음을 구체적인 도움과 실천으로 전하는 쪽에 가까워요.",
    tags: ["함께하는 일상", "행동하는 다정함", "차곡차곡 신뢰"],
    color: "#a87542",
    scene: "table",
    strengths: [
      "둘의 생활을 함께 챙기려는 책임감",
      "막막한 일을 나누어 풀어가는 태도",
      "작은 약속을 행동으로 옮기는 마음",
    ],
    conversation: [
      "둘 다 바쁜 주에는 집안일을 어떻게 나누면 좋을까요?",
      "마음이 담겼다고 느끼는 작은 행동은 뭐예요?",
      "우리 집에 하나의 규칙을 만든다면 무엇일까요?",
    ],
  },
  {
    id: "quiet-garden",
    name: "서로의 작은 정원",
    englishName: "The Quiet Garden",
    tagline: "각자의 속도로 자라며, 서로의 편이 되어.",
    description:
      "편안한 생활 속에서 각자의 시간을 지키는 관계를 그리고 있어요. 늘 같은 일을 하지 않아도, 마음을 나눌 때 충분히 들어주는 사람이 되고 싶어 해요.",
    tags: ["편안한 거리", "마음을 듣는 시간", "잔잔한 일상"],
    color: "#78836a",
    scene: "garden",
    strengths: [
      "서로의 휴식과 취향을 존중하는 태도",
      "조용히 이야기를 들어주는 여유",
      "각자의 일상을 편안하게 나누는 마음",
    ],
    conversation: [
      "혼자만의 시간에는 주로 무엇을 해요?",
      "같은 공간에서 각자 쉬는 저녁은 어떤 느낌일까요?",
      "대화하고 싶은 날과 쉬고 싶은 날을 어떻게 알려주면 좋을까요?",
    ],
  },
  {
    id: "reliable-companion",
    name: "나란한 동반자",
    englishName: "The Reliable Companion",
    tagline: "각자의 하루를 존중하고, 필요한 순간 나란히.",
    description:
      "서로의 생활 리듬을 존중하면서 오래 이어지는 관계를 좋아해요. 각자의 시간을 보내다가도 도움이 필요한 순간에는 구체적으로 힘을 보태고 싶어 해요.",
    tags: ["서로의 리듬", "실천하는 배려", "편안한 신뢰"],
    color: "#7d7f97",
    scene: "home",
    strengths: [
      "각자의 방식과 일정을 존중하는 마음",
      "필요한 도움을 구체적으로 찾는 태도",
      "꾸준하고 편안한 생활을 가꾸는 힘",
    ],
    conversation: [
      "결혼해도 꼭 지키고 싶은 나만의 시간이 있어요?",
      "도움이 필요할 때 어떤 식으로 말하는 편이에요?",
      "함께 결정할 일과 각자 결정할 일은 어떻게 나누고 싶어요?",
    ],
  },
  {
    id: "romantic-explorer",
    name: "설렘을 나누는 여행자",
    englishName: "The Romantic Explorer",
    tagline: "새로운 풍경마다, 함께 웃는 사람이 있다면.",
    description:
      "새로운 경험을 함께하며 둘만의 이야기를 만드는 걸 좋아해요. 어디로 가는지만큼 그곳에서 서로 어떤 마음이었는지도 오래 나누고 싶어 해요.",
    tags: ["함께하는 발견", "마음을 나누는 대화", "작은 모험"],
    color: "#b77c65",
    scene: "journey",
    strengths: [
      "새로운 순간을 함께 만들려는 호기심",
      "경험 속 감정까지 나누는 다정함",
      "평범한 날에 작은 설렘을 더하는 마음",
    ],
    conversation: [
      "둘이 처음 해보고 싶은 일이 있어요?",
      "여행에서 가장 오래 기억하는 순간은 언제예요?",
      "서로에게 설레는 일상을 만들어주려면 무엇을 해볼까요?",
    ],
  },
  {
    id: "adventure-partner",
    name: "함께 떠나는 모험가",
    englishName: "The Adventure Partner",
    tagline: "우리의 다음 페이지를, 같이 펼쳐볼까요.",
    description:
      "새로운 일에 함께 도전하고, 예상 밖의 문제도 둘이 풀어가는 관계를 그리고 있어요. 해보고 싶은 것을 이야기로만 남기지 않고 함께 움직이는 쪽에 가까워요.",
    tags: ["함께하는 도전", "든든한 실행력", "새로운 일상"],
    color: "#a37a48",
    scene: "journey",
    strengths: [
      "새로운 경험으로 이끄는 호기심",
      "어려운 순간 함께 방법을 찾는 태도",
      "둘의 바람을 행동으로 옮기려는 마음",
    ],
    conversation: [
      "언젠가 둘이 도전해 보고 싶은 일이 있어요?",
      "여행 계획이 틀어지면 보통 어떻게 해요?",
      "큰 결정을 앞두고 상대에게 어떤 도움이 필요해요?",
    ],
  },
  {
    id: "free-spirited-friend",
    name: "서로의 세계를 잇는 친구",
    englishName: "The Open-hearted Friend",
    tagline: "다른 곳을 보고 와도, 이야기는 서로에게.",
    description:
      "새로운 것을 발견하는 즐거움과 각자의 자유를 함께 소중히 여겨요. 서로 다른 하루를 보내고 돌아와 마음을 나눌 수 있는 관계를 그리고 있어요.",
    tags: ["각자의 호기심", "열린 대화", "응원하는 사이"],
    color: "#7d8b80",
    scene: "garden",
    strengths: [
      "서로의 새로운 관심사를 응원하는 마음",
      "다른 경험과 감정에 귀 기울이는 태도",
      "각자의 세계를 관계 안으로 가져오는 호기심",
    ],
    conversation: [
      "상대와 취향이 다르면 어떻게 함께하고 싶어요?",
      "요즘 혼자서 푹 빠져 있는 게 있어요?",
      "각자 보낸 하루에서 어떤 이야기를 나누고 싶어요?",
    ],
  },
  {
    id: "growth-companion",
    name: "꿈을 응원하는 동료",
    englishName: "The Growth Companion",
    tagline: "너의 꿈과 나의 꿈이, 함께 자라는 사이.",
    description:
      "각자의 관심사와 새로운 도전을 응원하는 관계를 좋아해요. 서로 다른 길을 걷는 순간에도 필요한 도움을 주고받으며 함께 성장하고 싶어 해요.",
    tags: ["서로의 도전", "구체적인 응원", "함께 성장"],
    color: "#8b7892",
    scene: "table",
    strengths: [
      "서로의 도전에 공간을 내어주는 마음",
      "응원을 구체적인 도움으로 전하는 태도",
      "각자의 변화와 성장을 받아들이는 호기심",
    ],
    conversation: [
      "앞으로 꼭 도전해 보고 싶은 일이 있어요?",
      "상대가 새로운 일을 시작하면 어떻게 응원하고 싶어요?",
      "서로 바쁠 때에도 함께 지키고 싶은 시간은 언제일까요?",
    ],
  },
];

const AXES: Axis[] = ["pace", "closeness", "care"];
const AXIS_LABELS: Record<Axis, string> = {
  pace: "일상의 변화",
  closeness: "함께하는 시간",
  care: "마음을 돌보는 방식",
};

const PARTNER_TRAITS: Record<Axis, [string, string, string]> = {
  pace: [
    "익숙한 일상과 작은 약속을 함께 소중히 여기는 사람",
    "편안한 일상과 새로운 경험을 상황에 맞게 나누는 사람",
    "새로운 경험과 작은 모험을 함께 발견하는 사람",
  ],
  closeness: [
    "함께 보내는 시간을 즐겁게 만들고 자주 일상을 나누는 사람",
    "함께하는 시간과 혼자만의 시간을 유연하게 조율하는 사람",
    "각자의 취향과 혼자만의 시간을 편안하게 존중하는 사람",
  ],
  care: [
    "해답을 찾기 전에 내 마음을 충분히 들어주는 사람",
    "마음을 들어주는 일과 구체적인 도움을 함께 챙기는 사람",
    "어려운 순간에 구체적인 방법과 행동으로 힘을 보태는 사람",
  ],
};

export function getProfile(id: string): Profile | undefined {
  return PROFILES.find((profile) => profile.id === id);
}

export function calculateResult(answers: number[]): {
  profile: Profile;
  self: Record<Axis, number>;
  partner: Record<Axis, number>;
  partnerTraits: string[];
  conversation: string[];
  note: string;
} {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new RangeError(
      `모든 ${QUESTIONS.length}개 질문에 답한 뒤 결과를 확인해 주세요.`,
    );
  }

  const totals = {
    self: { pace: 0, closeness: 0, care: 0 },
    partner: { pace: 0, closeness: 0, care: 0 },
  };
  const maximums = {
    self: { pace: 0, closeness: 0, care: 0 },
    partner: { pace: 0, closeness: 0, care: 0 },
  };

  QUESTIONS.forEach((question, index) => {
    const answer = answers[index];
    if (
      !Number.isInteger(answer) ||
      answer < 0 ||
      answer >= question.options.length
    ) {
      throw new RangeError(`${index + 1}번 질문의 답변을 다시 선택해 주세요.`);
    }
    totals[question.perspective][question.axis] +=
      question.options[answer].score;
    maximums[question.perspective][question.axis] += Math.max(
      ...question.options.map((option) => Math.abs(option.score)),
    );
  });

  const normalize = (
    perspective: "self" | "partner",
  ): Record<Axis, number> => ({
    pace: Math.round(
      (totals[perspective].pace / maximums[perspective].pace) * 100,
    ),
    closeness: Math.round(
      (totals[perspective].closeness / maximums[perspective].closeness) * 100,
    ),
    care: Math.round(
      (totals[perspective].care / maximums[perspective].care) * 100,
    ),
  });
  const self = normalize("self");
  const partner = normalize("partner");
  const profileIndex =
    (self.pace > 0 ? 4 : 0) +
    (self.closeness > 0 ? 2 : 0) +
    (self.care > 0 ? 1 : 0);
  const profile = PROFILES[profileIndex];
  const balancedSelfAxes = AXES.filter((axis) => self[axis] === 0);
  const balancedPartnerAxes = AXES.filter((axis) => partner[axis] === 0);
  const balanceNotes = [
    balancedSelfAxes.length > 0
      ? `나의 '${balancedSelfAxes.map((axis) => AXIS_LABELS[axis]).join("·")}' 응답은 균형을 이루고 있어요. 유형 이름은 대표 표현이며, 두 성향을 함께 가진 것으로 읽어주세요.`
      : "",
    balancedPartnerAxes.length > 0
      ? `상대에게 바라는 '${balancedPartnerAxes.map((axis) => AXIS_LABELS[axis]).join("·")}' 역시 균형에 가까워요.`
      : "",
  ].filter(Boolean);

  return {
    profile,
    self,
    partner,
    partnerTraits: AXES.map(
      (axis) =>
        PARTNER_TRAITS[axis][
          partner[axis] === 0 ? 1 : partner[axis] < 0 ? 0 : 2
        ],
    ),
    conversation: [...profile.conversation],
    note: [
      ...balanceNotes,
      "이 결과는 지금의 답변을 바탕으로 관계 취향을 돌아보는 대화 가이드예요. 공식 MBTI 검사나 심리 진단이 아니며, 특정 상대와의 궁합 또는 결혼의 성공을 예측하지 않아요.",
    ].join(" "),
  };
}
