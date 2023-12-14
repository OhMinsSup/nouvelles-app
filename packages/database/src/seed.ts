import { db, type Tag, type Category, type Newspaper } from './client';

function dateStringFormating(date: string): string {
  const [year, month, day] = date.split('.');
  const dateString = `20${year}-${month}-${day} 00:00:00`;
  return dateString;
}

interface ItemTestType {
  id: string;
  neusralId: string | undefined;
  category: string | undefined;
  tag: string | undefined;
  reporter: string | undefined;
  title: string | undefined;
  link: string | undefined;
  realLink: string | undefined;
  date: string | undefined;
  image: string | undefined;
  description: string | undefined;
}

const DEFAULT_ITEMS = [
  {
    id: 'ugd7o2kkd5cbqunpw1lqka5w',
    neusralId: 'GkCGKPmwPP',
    description:
      '개도국·저개발국가에 2050년까지 배상 땐 연 20조 달할 듯중국 6529조 1위…국내 기업 책임액 ...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000422300040101.jpg',
    realLink:
      'https://www.khan.co.kr/environment/climate/article/202312122133005',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '경향신문',
    title: '한국, 온실가스 배출 ‘기후 부채’는 517조원 ‘세계 9위’',
    link: 'https://www.neusral.com/r?n=GkCGKPmwPP',
    date: '23.12.12',
  },
  {
    id: 'm30i05pz050ph24m5z3l7hu2',
    neusralId: 'p0CdaGpnQr',
    description:
      '&ldquo;에어컨만 잘 틀어도 아낄 수 있는 전기 요금이 연 1조 달러&rdquo; 제28차 유엔기후변화협약 당사국총회(COP28)에서 미국 등 60여개 국가는 지난 5일 국제 냉방 서약(Global Cooling Pledge)에 가입하며 2050년까지 냉방 관련 온실가스 배출량을 2022년의 68% 이상 줄이기로 했다. 이 목표를 달성하면 2050년까지 온실가스를 약 780억t 감축할 전망이다. 뿐만 아니라 전세계 소비자들은 2050년 전기 요금으로만 연 1조 달러를 아낄 수 있을 것으...',
    image:
      'https://res.heraldm.com/content/image/2023/08/09/20230809000631_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000664',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '헤럴드경제',
    title:
      '“전기 요금만 1300조원” 어마어마하게 아낀다…에어컨 잘 틀면 벌어지는 놀라운 일 [지구, 뭐래?]',
    link: 'https://www.neusral.com/r?n=p0CdaGpnQr',
    date: '23.12.12',
  },
  {
    id: 'vkh1fua52bur7o1sb9wtozwh',
    neusralId: 'aVCVRbm8z4',
    description:
      '기후테크가 온다 COP28가 인정했다...기후위기 해결사 떠오른 한국 우주기업들 SIA·나라스페이스, 기후테크 중심으로 국제 활동 넓혀 개도국 기상 예측부터 대기 중 메탄 감시까지 전 지구적 차원 관측 중요해우주 기반 기후테크 수요 늘 것 국방과 통신 분야에서 주로 활',
    image:
      'https://biz.chosun.com/resizer/v-Y-Yrbm5bGYb7lQChrhq_9OERI=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/7BNL6YQPYBH6XMB6B6YGFG4H6U.jpg',
    realLink:
      'https://biz.chosun.com/science-chosun/technology/2023/12/12/ILHB7IN3GVCOZFIUA2DX4QZ3XI/?utm_source=naver&utm_medium=original&utm_campaign=biz',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '조선비즈',
    title:
      '[기후테크가 온다] COP28가 인정했다...기후위기 해결사 떠오른 한국 우주기업들',
    link: 'https://www.neusral.com/r?n=aVCVRbm8z4',
    date: '23.12.12',
  },
  {
    id: 'nprgtfb94zfkktfm6s00y1lg',
    neusralId: 'eWCWLrJX7W',
    description:
      '수소연료가 탄소 배출량이 많은 건설&middot;산업 중장비의 탄소중립을 이끌 핵심 수단으로 부상했다. 국내외에서 관련 연료전지 및 내연기관 연구개발이 활발히 진행되고 있어 동향을 알아보는 자리가 마련된다.  건설기계부품연구원(원장 채규남)이 오는 13일 서울 역삼동 SC컨벤션센터에서 &lsquo;제5회 수소 건설&middot;산업기계 발전포럼&rsquo;을 연다고 밝혔다.  포럼에서 ▷HD현대인프라코어 신명호 책임연구원이 &lsquo;14t급 수소로더 개발 ...',
    image:
      'https://res.heraldm.com/content/image/2023/12/12/20231212000625_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000667',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '헤럴드경제',
    title: '“수소연료, 건설기계 탄소중립 핵심자원”',
    link: 'https://www.neusral.com/r?n=eWCWLrJX7W',
    date: '23.12.12',
  },
  {
    id: 'slh7al0wtpar2wkkpfz2p6mt',
    neusralId: 'NACn3XjNPL',
    description:
      '“겨울에는 충전하면 150㎞밖에 못 가요. 이럴 줄 알았으면 전기 말고 LPG(액화석유가스) 트럭을...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000433400039941.jpg',
    realLink: 'https://www.khan.co.kr/economy/auto/article/202312122200035',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '경향신문',
    title: '디젤 빠질 1톤 트럭…LPG에 시선 집중',
    link: 'https://www.neusral.com/r?n=NACn3XjNPL',
    date: '23.12.12',
  },
  {
    id: 'kukzv1xcz72uac55irt3vad0',
    neusralId: 'qkCZqxl628',
    description:
      '은행대상 / 강신숙 Sh수협은행장10월까지 순이익 3100억작년 전체 번 돈보다 많아총자산 57조…7년새 2배무디스 평가 신용등급 올라어업·수산·해양 맞춤 서비스해양수산금융 발전에도 기여',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01110205000002_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/special-edition/10896579',
    category: 'ESG 뉴스',
    tag: '사회공헌/인권경영(SOCIAL)',
    reporter: '매일경제',
    title: "수협 1호 여성행장 … 최대실적에 내실까지 '두토끼' 잡아",
    link: 'https://www.neusral.com/r?n=qkCZqxl628',
    date: '23.12.12',
  },
  {
    id: 't0x5mgrp8887s612tqgl4ros',
    neusralId: 'EZCYngJQwL',
    description:
      'SK그룹이 연말을 맞아 이웃사랑 성금 120억원을 사회복지공동모금회에 기부(사진)했다고 12일 밝혔...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000410100039001.jpg',
    realLink:
      'https://www.khan.co.kr/people/people-general/article/202312122048015',
    category: 'ESG 뉴스',
    tag: '사회공헌/인권경영(SOCIAL)',
    reporter: '경향신문',
    title: 'SK그룹, 사회복지공동모금회에 120억원 기부',
    link: 'https://www.neusral.com/r?n=EZCYngJQwL',
    date: '23.12.12',
  },
  {
    id: 'dd9dil0uhwminx0i2grsg5ki',
    neusralId: 'qkCZqx7Yml',
    image:
      'https://image.kmib.co.kr/online_image/2023/1213/2023121219150566437_1702376105_0924334613.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0924334613&code=11151300&cp=nv',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '국민일보',
    title: '은행권 셀프 연임 막는다… 이복현표 지배구조 30개 원칙 제시',
    link: 'https://www.neusral.com/r?n=qkCZqx7Yml',
    date: '23.12.13',
  },
  {
    id: 'srcy2z9y4b672pd4osi2dg65',
    neusralId: 'KYCzjKm8qz',
    description:
      '은행권 이사회를 ‘일하는 이사회’로 만들기 위한 모범관행이 마련됐다. 한국의 고질적 문제로 거론되는 이사회의 취약한 견제...',
    image:
      'https://flexible.img.hani.co.kr/flexible/normal/640/383/imgdb/original/2023/1212/20231212502995.jpg',
    realLink: 'https://www.hani.co.kr/arti/economy/finance/1120107.html',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한겨레',
    title: '은행권 ‘일하는 이사회’ 만들 수 있을까…금감원, 모범관행 마련',
    link: 'https://www.neusral.com/r?n=KYCzjKm8qz',
    date: '23.12.12',
  },
  {
    id: 'sescf22gyerfb6toqdqsbp8x',
    neusralId: 'XJCeWYGYy6',
    description:
      '[이데일리 정두리 기자] 내부통제와 관련한 금융사 임원의 책임소재를 명확히 하는 책무구조도 도입이 내년 하반기 시행 예정인 가운데 금융권이 대책 마련에 분주하다. 전문가들은 앞으로 책무구조도 도입으로 해당임원의 책무가 명확해짐에 따라 임원 신규선임뿐만 아니라 기존 임원...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300034.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01230006635838192&mediaCodeNo=257',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '이데일리',
    title: '내년부터 책무구조도 도입…금융사 내부통제 어떻게 바뀌나',
    link: 'https://www.neusral.com/r?n=XJCeWYGYy6',
    date: '23.12.13',
  },
  {
    id: 'o1fr3ehwkquyybwi9p7ubec4',
    neusralId: 'EZCYngJgVo',
    description: '이창민의 한국 경제 속 재벌 탐구',
    image:
      'https://flexible.img.hani.co.kr/flexible/normal/800/481/imgdb/original/2023/1212/20231212503404.jpg',
    realLink:
      'https://www.hani.co.kr/arti/economy/economy_general/1120153.html',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한겨레',
    title: "5공 때로 퇴보한 정경유착…재벌들 `울며 떡볶이 먹기'",
    link: 'https://www.neusral.com/r?n=EZCYngJgVo',
    date: '23.12.13',
  },
  {
    id: 'rka207ej0kk7595hjiu7myr7',
    neusralId: 'yMCle6YdXQ',
    description:
      '&quot;3년 만에 규정 삭제&quot;…KT&amp;G, &#039;내부 출신 사장&#039; 원칙 깨지나 [박동휘의 컨슈머 리포트] , 박동휘 기자, 경제',
    image: 'https://img.hankyung.com/photo/202312/01.35306319.1.jpg',
    realLink: 'https://www.hankyung.com/article/202312118605i',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한국경제',
    title:
      "행동주의 압박에…KT&G, '내부 출신 사장' 원칙 깨지나 [박동휘의 컨슈머 리포트]",
    link: 'https://www.neusral.com/r?n=yMCle6YdXQ',
    date: '23.12.12',
  },
  {
    id: 'yqej6mwp4gtukwxf75p8ybcm',
    neusralId: 'yMCle6YB03',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121216573886405_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121216573886405',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '머니투데이',
    title: '위믹스, 코인원 고팍스 코빗 이어 빗썸에도 재상장',
    link: 'https://www.neusral.com/r?n=yMCle6YB03',
    date: '23.12.12',
  },
  {
    id: 'qkiib66rlebi3xmwisgv9clr',
    neusralId: 'mxC4Mg8nwM',
    description:
      '[디지털투데이 강주현 기자] 구글이 내년 1월부터 미국에서 가상자산(암호화폐) 신탁 광고를 허용한다. 11일(현지시간) 더블록에 따르면 구글은 이같은 내용의 업데이트를 발표했다. 구글 업데이트 내용은 내년 1월 29일부터 적용된다. 구글은 더블록에 &quot;인증 절차를 완료한 뒤 미국 증권거래위원회(SEC)에 등록한 가상자산 신탁의 경우 미국에서 광고가 가능하다&quot;고 말했다. 구글은 지난해 9월 도박 관련 콘텐츠를 광고하지 않는다는 조건에서 대체불가토큰(NFT) 게임 홍보를 허용한 뒤로 점차 가상자산 친화적인 광고 정책을 발표하고 있다. 올',
    image:
      'https://cdn.digitaltoday.co.kr/news/thumbnail/202312/497833_463734_1019_v150.jpg',
    realLink:
      'http://www.digitaltoday.co.kr/news/articleView.html?idxno=497833',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '디지털투데이',
    title: '구글, 미국서 가상자산 신탁 광고 허용',
    link: 'https://www.neusral.com/r?n=mxC4Mg8nwM',
    date: '23.12.12',
  },
  {
    id: 'c80y89pv9zcefsorxd8y8ewe',
    neusralId: 'MLC6ze8YYQ',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '연합뉴스',
    title: "'너무 올랐나' 비트코인 6% 급락…한때 4만 달러도 위협",
    link: 'https://www.neusral.com/r?n=MLC6ze8YYQ',
    date: '23.12.12',
  },
  {
    id: 'iwhxqqpgehou3y5pl2d7gk7d',
    neusralId: 'KYCzjKmQB0',
    description:
      '빗썸이 수수료 무료 정책에 힘입어 11월 국내 암호화폐 거래량 점유율을 약 26% 수준으로 끌어올렸다. 수수료 무료가 아닐 경우 282억 원의 수수료 수입을 올렸을 것으로 추정된다. 빗썸은 창립 10주년 기념 이벤트로, 상장 코인 전체(256종)에 대해 거래 수수료를 받지',
    image:
      'https://i1.wp.com/www.blockmedia.co.kr/wp-content/uploads/2024/12/빗썸_단독_로고.jpg?fit=598%2C359&ssl=1',
    realLink: 'https://www.blockmedia.co.kr/archives/425590',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '블록미디어',
    title: '빗썸, 점유율 25% 넘겼다…암호화폐 11월 거래량 지난해 초 수준 회복',
    link: 'https://www.neusral.com/r?n=KYCzjKmQB0',
    date: '23.12.12',
  },
  {
    id: 'vrff2yt6eltpbmp2bt5sc0ll',
    neusralId: 'zRCyJzj1Yx',
    description:
      '세계 최대 가상자산 거래소 바이낸스의 거래소 점유율이 30%까지 떨어졌다. 12일 씨씨데이터 등에 따르면 바이낸스의 현물 시장 점유율은 올해 초 55%에서 12월 현재 30.1%를 기록하고 있다. 이 추세라면 곧 20%대로 떨어질 것으로 보인다.바이낸스의 현물 거래량도 1월 4740억 달러에서 9월 1140% 달러로 70% 넘게 줄었다.다만 바이낸스는 여전히 점유율 1위 자리를 지키고 있다. 2위는 ‘오케이엑스(OKX)’로 현재 점유율은 8%다. 1위와 2위의 점유율 차이는 크지만, 오케이엑스의 확산 속도가 상당히 빠르다. 연초 점',
    image:
      'https://cdn.bonmedia.kr/news/thumbnail/202312/1588_1706_43_v150.jpg',
    realLink: 'https://www.bonmedia.kr/news/articleView.html?idxno=1588',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '비온미디어',
    title: '바이낸스, 거래소 점유율 30%로 하락',
    link: 'https://www.neusral.com/r?n=zRCyJzj1Yx',
    date: '23.12.12',
  },
  {
    id: 'uxfdt7hqhvpbq8lvb7peexqn',
    neusralId: 'eWCWLrJqdB',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '지디넷코리아',
    title: "기사회생 솔라나, '이더리움 킬러' 자리 되찾나",
    link: 'https://www.neusral.com/r?n=eWCWLrJqdB',
    date: '23.12.12',
  },
  {
    id: 'j9035p2qc37tm32cea2qbmet',
    neusralId: 'BnCkynKG64',
    description:
      '이더리움의 라이벌 코인으로 유명한 아발란체(AVAX)가 글로벌 암호화폐(가상자산) 시장에서 10위 안에 안착하며 코인 투자자들의 주목을 받고 있다. 국',
    image:
      'https://economist.co.kr/data/ecn/image/2023/12/12/ecn20231212000030.png',
    realLink: 'https://economist.co.kr/article/view/ecn202312120025',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '이코노미스트',
    title: '아발란체, 조정 맞은 코인 시장서 85% ‘껑충’…왜?',
    link: 'https://www.neusral.com/r?n=BnCkynKG64',
    date: '23.12.12',
  },
  {
    id: 'nfsvpb1yt2p1i1p023s9q6o6',
    neusralId: 'joCVNjKGZq',
    description:
      '솔라나 기반 밈코인 봉크(BONK)가 한 달 새 370% 급등하며 시가총액 3위 밈코인에 등극했다. 11일(이하 현지시간) 코인텔레그래...',
    image: 'https://newsimg.sedaily.com/2023/12/12/29YHG4L857_1.jpg',
    realLink: 'https://www.sedaily.com/NewsView/29YHG4L857',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '서울경제',
    title: '솔라나 BONK, 한달새 370% 급등…3위 밈코인 등극',
    link: 'https://www.neusral.com/r?n=joCVNjKGZq',
    date: '23.12.12',
  },
  {
    id: 'tu9ujjweb8r3s93t89cafj56',
    neusralId: 'NACn3XqrwJ',
    description:
      '[아이티데일리] 최근 한국정보인증이 출시한 NFT도메인서비스 ‘WEB3ID(web3id.kr)’ 판매량이 급증하면서 1인당 평균 구매 객단가가 10만 원을 넘어선 것으로 나타났다. 한국정보인증은 비트코인이 반감기와 미국 상장지수펀드(ETF)상장 기대감으로 인해 1년 만에 6천만 원선을 돌파하면서 이러한 호조세가 NFT(대체불가토큰) 시장에 영향을 끼친 것으로 분석했다.지난 8월 한국정보인증(대표 김상준)은 미국 유니콘 기업 ‘언스토퍼블 도메인’과 한국 유통 파트너십 제휴를 맺고 NFT도메인 서비스 ‘WEB3ID’를 제공, 국내 시장',
    image:
      'https://cdn.itdaily.kr/news/thumbnail/202312/218797_223546_1947_v150.jpg',
    realLink: 'http://www.itdaily.kr/news/articleView.html?idxno=218797',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '아이티데일리',
    title: '비트코인 상승에 NFT도메인 ‘WEB3ID’판매량 급증',
    link: 'https://www.neusral.com/r?n=NACn3XqrwJ',
    date: '23.12.12',
  },
  {
    id: 'rput2ctmnqp0mp6iao27rcpu',
    neusralId: '68Ce0PwExa',
    description:
      '윤차용 예금보험공사 부사장(사진 왼쪽)과 오세진 코빗 대표이...',
    image: '/2023/12/12/2023121217453751360_l.jpg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121217464864771',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '디지털데일리',
    title: '코빗, 예금보험공사와 가상자산 상호교류 목적 업무협약 체결',
    link: 'https://www.neusral.com/r?n=68Ce0PwExa',
    date: '23.12.12',
  },
  {
    id: 's1xb7f5e8vj9p3a88jlki5ml',
    neusralId: 'mxC4MgLqm4',
    description:
      'NFT 투자로 이익 내도 소득세 안낸다, &quot;경제 가치보단 수집에 특화&quot; 금융당국, 가상자산서 제외',
    image: 'https://static.hankyung.com/img/logo/logo-news-sns.png?v=20201130',
    realLink: 'https://www.hankyung.com/article/2023121215211',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '한국경제',
    title: 'NFT 투자로 이익 내도 소득세 안낸다',
    link: 'https://www.neusral.com/r?n=mxC4MgLqm4',
    date: '23.12.12',
  },
  {
    id: 'm6dtg0qx9lg0u57o15olint6',
    neusralId: '3jCARk3eMZ',
    description:
      '(조세금융신문=안종명 기자) 대체불가토큰(NFT)이 내년 7월부터 시행되는 가상자산이용자보호법 적용 대상에서 제외된다. 아울러 시행령에 따라 가상자산 사업자는 이용자의 가상자산 중 80%이상을 콜드월렛(인터넷 차단된 가상화폐 지갑)에 보관하도록해 이용자가 사용하는 가상자산의 안정성을 높이도록 했다. 금융위원회는 지난 11일부터 내년 1월 22일까지 ‘가상자',
    image:
      'https://www.tfmedia.co.kr/data/photos/20231250/art_17023507378487_c40149.jpg',
    realLink: 'https://www.tfmedia.co.kr/news/article.html?no=154886',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '조세금융신문',
    title: "대체불가토큰(NFT) 가상자산이용자보호법 대상서 '제외'",
    link: 'https://www.neusral.com/r?n=3jCARk3eMZ',
    date: '23.12.12',
  },
  {
    id: 'lmmf5bukxugc6mj8e1bie91j',
    neusralId: '02CzLgydKZ',
    description:
      '하나증권이 토큰증권(ST)플랫폼을 내년 8월 공개한다. 이후 한 달정도 안정화기간을 거쳐 정식으로 서비스할 계획이다. 하나증권은 ST플랫폼을 통해 발행부터 유통까지 토큰증권 전체 영역을 아우르는 블록체인 생태계를 구축한다는 계획이다. 다양한 자산을 토큰화하는 작업도 병행한다. 국내 최고 연예기획사와도 조각투자와 관련한 업무제휴를 추진할 방침이다. 12일 증',
    image: 'https://static.mk.co.kr/facebook_mknews.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896551',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '매일경제',
    title: '하나증권, 토큰증권 플랫폼 내년 8월에 나온다',
    link: 'https://www.neusral.com/r?n=02CzLgydKZ',
    date: '23.12.12',
  },
  {
    id: 'r7n3zicnjg7ha6bben9nfdwv',
    neusralId: 'LBCp1jkwEW',
    description:
      '미술품 경매회사 케이옥션(102370)의 자회사인 투게더아트가 토큰증권발행(STO) 관련 사업을 본격 추진한다. 투게더아트는 신한투자증권과 미술품 투자계약증권 발행 업무 및 토큰증권 사업의 추진을 위한 업무협약(MOU)을 체결했다고 12일 밝혔다. 양사는 미술품 투자...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200394.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=02151686635837864&mediaCodeNo=257',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '이데일리',
    title: '투게더아트, 신한투자증권과 STO 협업 추진',
    link: 'https://www.neusral.com/r?n=LBCp1jkwEW',
    date: '23.12.12',
  },
  {
    id: 'jwyowr7po80085nowszcdsu3',
    neusralId: 'zRCyJzjBQ7',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121209202784119_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121209202784119',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '머니투데이',
    title: "미술품 조각투자 '테사', 나이스피앤아이 ST평가협의체 합류",
    link: 'https://www.neusral.com/r?n=zRCyJzjBQ7',
    date: '23.12.12',
  },
  {
    id: 'th69ja4o96hgmsyar33wfn6s',
    neusralId: 'xACA7aglMk',
    image: 'https://menu.mt.co.kr/common/meta/meta_mt_twonly.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121217481360232',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '머니투데이',
    title: "아이티센, 지앤비에스 에코와 에너지 멀티플랙스 기반 STO 사업 '맞손'",
    link: 'https://www.neusral.com/r?n=xACA7aglMk',
    date: '23.12.12',
  },
  {
    id: 'fpdlov50wc6osm1noy3cwcnk',
    neusralId: 'joCVNjK8ZY',
    description:
      '국내 주요 가상자산이 하락세다. 12일 오후 1시 40분 빗썸에서 국내 비트코인(BTC)은 전일 대비 1.11% 하락한 4902만 4000원에 ...',
    image: 'https://newsimg.sedaily.com/2023/12/12/29YHF1DKNF_1.png',
    realLink: 'https://www.sedaily.com/NewsView/29YHF1DKNF',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '서울경제',
    title: '[점심브리핑] 美 제재 강화에 테더, 161개 지갑 동결',
    link: 'https://www.neusral.com/r?n=joCVNjK8ZY',
    date: '23.12.12',
  },
  {
    id: 'z0tksl3f9h7vkwj2wpm49zc4',
    neusralId: 'xACA7agrgA',
    description:
      '\r\n[서울=뉴시스]홍연우 기자 = 가상화폐(가상자산) 거래소 빗썸 관계사 주가조작 의혹 등으로 구속돼 재판받고 있던 사업가 강종현(41)씨가 풀려난다',
    image: 'http://image.newsis.com/2023/02/01/NISI20230201_0019732341_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002555243',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '뉴시스',
    title: "'빗썸 실소유주' 의혹 강종현, 구속 10개월만 보석 석방",
    link: 'https://www.neusral.com/r?n=xACA7agrgA',
    date: '23.12.12',
  },
  {
    id: 'psvnaqm7nr6odsfrtbtlx662',
    neusralId: '02CzLgy3xd',
    description:
      '엘살바도르가 비트코인 채권 발행을 위한 규제 허가를 확보했다.12일(현지시간) 엘살바도르 국가 비트코인 사무국(National Bitcoin Office)은 공식 채널을 통해 볼케이노 채권(Volcano Bond)이 디지털자산위원회(CNAD)의 승인을...',
    image: 'https://f1.tokenpost.kr/2022/02/mg8g6t5gql.jpg',
    realLink: 'https://www.tokenpost.kr/article-155860',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '토큰포스트',
    title: '엘살바도르 "비트코인 채권 규제 승인 받았다...내년 1분기 발행"',
    link: 'https://www.neusral.com/r?n=02CzLgy3xd',
    date: '23.12.12',
  },
  {
    id: 'i32rbgan2b9s39g1d65aebo9',
    neusralId: '02CzLgpg4Y',
    realLink: 'https://www.news1.kr/articles/5259120',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '뉴스1',
    title:
      '"코인 MM은 불법" 못박은 금융당국…거래소 \'상장 유지\' 기준 강화되나',
    link: 'https://www.neusral.com/r?n=02CzLgpg4Y',
    date: '23.12.13',
  },
  {
    id: 'wdenantlym361ubx7dzm38iu',
    neusralId: 'bXC8GNnxNP',
    description:
      '\n&#039;비밀 계좌의 성지&#039;로 불리던 스위스나 영국령 케이맨제도 등이 거부들의 금고지기 역할을 한 것도 옛말이 된 지 오래. 조세피난처 맞먹는 금융 혜택을 앞세운 아랍에미리트(UAE) 수도 아부다비가 글로벌 자금을 블랙홀처럼 빨아들이고 있다. 전 세계 억만장자들의 뭉칫돈이 걸프만 부국 UAE로 속속 이동하는 이유는 뭘까. 미국 블룸버그통신은 11일(현지시간) &#034;',
    image:
      'https://newsimg-hams.hankookilbo.com/2023/12/12/f754a58b-d06c-4e7b-b42a-af637292d46e.jpg?t=20231213172829',
    realLink:
      'https://www.hankookilbo.com/News/Read/A2023121214230002979?did=NA',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '한국일보',
    title:
      "억만장자 '피난처'로 떠오른 아부다비... 자오창펑, 레이 달리오 돈이 달려온다",
    link: 'https://www.neusral.com/r?n=bXC8GNnxNP',
    date: '23.12.12',
  },
  {
    id: 'ad535mt74jozzpmh7q3d4u1m',
    neusralId: 'wLCEAz0zpY',
    description:
      '주요 패션업체 재고자산 전년 대비 14% 증가비축 개념…남은 재고 아울렛 소진 및 재활용(이투데이 그래픽팀/신미영 기자)실적 부진에 빠진 패션업계가',
    image:
      'https://img.etoday.co.kr/pto_db/2023/12/20231212214601_1962246_1199_468.jpg',
    realLink: 'https://www.etoday.co.kr/news/view/2311116',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '이투데이',
    title: '따뜻한 겨울 탓에…패션업계 ‘진땀’',
    link: 'https://www.neusral.com/r?n=wLCEAz0zpY',
    date: '23.12.13',
  },
  {
    id: 'pzrkb6v6t3dnysevj7aaf2qg',
    neusralId: 'JbCMXPgywd',
    description:
      "[서울파이낸스 권서현 기자] 자기 관리와 외모를 경쟁력으로 보는 MZ세대가 슬로우에이징(Slow-Aging)'에 대한 관심을 키우고 있다. 슬로우에이징이란 노화를 받아들이되 속도를 늦춰 건강한 피부로 관리·유지하는 것을 의미한다. 기존에 '나이가 드는 것을 막는다'는 의미의 노화를 부정적으로 인식하는 '안티에이징'과 반대되는 개념이다.얼굴, 목, 손 등 다양한 피부 관리 제품들이 등장하지만 최근 관심이 높은 곳은 입술이다. 이전엔 입술을 피부로 인식하지 않는 사람들이 많아 슬로우에이징 시장에서 큰 관심을 얻지 못했다. 하지만 입술은",
    image:
      'http://www.seoulfn.com/news/thumbnail/202312/504237_262047_1652_v150.jpg',
    realLink: 'http://www.seoulfn.com/news/articleView.html?idxno=504237',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '서울파이낸스',
    title: '"입술도 피부"···뷰티업계, 겨울철 \'립 케어\' 전쟁 개막',
    link: 'https://www.neusral.com/r?n=JbCMXPgywd',
    date: '23.12.12',
  },
  {
    id: 'd14ywsan3n76afaylcrr94go',
    neusralId: 'joCVNjKQEy',
    description:
      'K팝의 인기가 높아지면서 세계적인 명품 기업들의 아이돌 쟁탈전이 갈수록 치열해지고 있다. 데뷔 3개월 된 아이돌을 명품 브랜드의 ‘글로벌 앰버서더’로 전격 ...',
    image:
      'https://cphoto.asiae.co.kr/listimglink/1/2023121209133585276_1702340015.jpg',
    realLink: 'https://view.asiae.co.kr/article/2023121209315362784',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '아시아경제',
    title: '3개월차 신인도 ‘앰버서더’…명품업계 K팝 스타 모시기 전쟁',
    link: 'https://www.neusral.com/r?n=joCVNjKQEy',
    date: '23.12.12',
  },
  {
    id: 'jy52zhrwwwgfdrmucmq87eyg',
    neusralId: 'mxC4MgLldj',
    realLink: 'https://www.news1.kr/articles/5259351',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '뉴스1',
    title: '"K-주얼리 찾는 MZ"…신세계백화점 강남점으로 몰린다',
    link: 'https://www.neusral.com/r?n=mxC4MgLldj',
    date: '23.12.13',
  },
  {
    id: 'doph9vei41oqex5x94kg0mb8',
    neusralId: 'ROCyaoWwRj',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121210332360273_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121210332360273',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '머니투데이',
    title: "LF 아떼, '선 에센스' 올 매출 12배 급증...스테디 셀러 등극",
    link: 'https://www.neusral.com/r?n=ROCyaoWwRj',
    date: '23.12.12',
  },
  {
    id: 'q0fdhukpoc7e1ft1u5ljw5ai',
    neusralId: 'r1CndPWm1q',
    description:
      '- 서울시-레페리(Leferi), 12일(화) 서울뷰티산업 활성화 위한 업무협약 체결- 인플루언서 연계한 서울뷰티위크, 수출상담회 및 뷰티 전문가 육성·인재 발굴방안 모색- 트렌드에 맞는 콘텐츠 확산 기대…서울뷰티기업 경쟁력 강화, 글로벌 시장 도약 지원',
    image: 'http://www.thesegye.com/images/oglogo.jpg',
    realLink: 'http://www.thesegye.com/news/view/1065590113926167',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '세계타임즈',
    title:
      '서울시, 국내 뷰티 1위 MCN 기업과 손잡고 우리 뷰티제품 해외 노출 기회 높인다',
    link: 'https://www.neusral.com/r?n=r1CndPWm1q',
    date: '23.12.12',
  },
  {
    id: 'tlqvndcmi34oy85fpdgi2dmj',
    neusralId: 'VwCyo7QlaK',
    description:
      "\r\n[서울=뉴시스]송혜리 기자 = 정보보안 회사가 편의점에서 구운계란을 판다?\r\n\r\n컴퓨터·모바일 백신 프로그램 '알약' 서비스를 제공하는 이스트시큐리티가 이기종 기업들과 벌이는 이색 콜라보레이션 마케팅이 화제다",
    image: 'http://image.newsis.com/2023/12/11/NISI20231211_0001434418_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231211_0002554228',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '뉴시스',
    title: '정보보안 회사가 편의점 구운 계란 파는 이유',
    link: 'https://www.neusral.com/r?n=VwCyo7QlaK',
    date: '23.12.13',
  },
  {
    id: 'l5ton2hhu3wdtyqje8zovohq',
    neusralId: 'BnCkynKopg',
    description:
      '키친205·노티드·성심당 등\n가성비 앞세운 연말 케이크\n조기 예약 마감, 오픈런까지\nSNS 비주얼·가성비 다 잡아',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.cd70420bf452412f8f4dfec918467900.jpg',
    realLink: 'https://www.mk.co.kr/news/business/10896407',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '매일경제',
    title: '“12월엔 꼭 사야 해”…매일 오픈런 벌어지는 케이크 뭐길래',
    link: 'https://www.neusral.com/r?n=BnCkynKopg',
    date: '23.12.12',
  },
  {
    id: 'l7lb4sfn9nqdxcbuc2nzo1fd',
    neusralId: 'xACA7ag6ae',
    description:
      '건강 관리에 관심을 갖는 젊은 층이 크게 늘고 있다.에이블리코퍼레이션이 운영하는 스타일 커머스 플랫폼 에이블리는 11월 푸드 카테고리 거래액 및 주문자 수가 급증했다고 12일 밝혔다. 에이블리는 무신사와 함께 꼽히는 대표적인 MZ세대 패션앱으로, 1020세대가 고객의...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200766.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=03014326635837864&mediaCodeNo=257',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '이데일리',
    title: "MZ세대 건강 관리 관심 '급증'...에이블리 푸드 카테고리 주문 2배↑",
    link: 'https://www.neusral.com/r?n=xACA7ag6ae',
    date: '23.12.12',
  },
  {
    id: 'j9ofgkzh3qvptn1ndw81opil',
    neusralId: 'p0CdaGp0Pn',
    description:
      '[이슈앤비즈 김대우 기자] 롯데웰푸드(옛 롯데제과)의 찰떡아이스가 MZ세대의 크림빵 명소 ‘푸하하크림빵’과 컬래버해 한정판 ‘찰떡아이스 소금크림’을 선보인다고 12일 밝혔다.롯데웰푸드는 펀슈머(Fun+Consumer) 마케팅을 내세우며 이색 소재인 치즈떡볶이, 씨앗 호떡을 접목한 제품과 독특한 하트 모양 제품으로 젊은 소비자의 뜨거운 반응을 이끌어낸 것에 이어 최근 MZ가 좋아하는 크림빵을 활용한 이색 디저트 콘셉트를 담았다.‘푸하하크림빵’은 특허받은 크림 소금을 사용해 크림빵의 느끼함은 덜하면서 진한 풍미가 좋아 연남동과 익선동',
    image:
      'https://cdn.issuenbiz.com/news/thumbnail/202312/34476_35030_5910_v150.jpg',
    realLink: 'http://www.issuenbiz.com/news/articleView.html?idxno=34476',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '이슈앤비즈',
    title: '롯데웰푸드, ‘푸하하크림빵’과 맞손...찰떡아이스 공동마케팅',
    link: 'https://www.neusral.com/r?n=p0CdaGp0Pn',
    date: '23.12.12',
  },
  {
    id: 'zgqmfn0sbyogmbmkmfbvs4a8',
    neusralId: 'Z2C0oBbg0X',
    description:
      '&quot;(비싼 음식 먹는) 회식은 필수~ 2차는 선택~!&quot; 술자리...',
    image: 'https://www.imaeil.com/photos/2023/12/12/2023121209570122629_m.jpg',
    realLink: 'https://www.imaeil.com/page/view/2023121211081900278',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '매일신문',
    title: '[MMM] “MZ 직장인은 회식 싫어한다? 그건 사바사(사람 by 사람)!”',
    link: 'https://www.neusral.com/r?n=Z2C0oBbg0X',
    date: '23.12.12',
  },
  {
    id: 'qwepezpy8enhmiqdlchj6tj6',
    neusralId: 'A4Cy8Nnz7Q',
    description:
      "[서울=뉴시스] 박주연 기자 = 한국관광공사가 운영하는 '하이커 그라운드'가 한국관광 랜드마크로 거듭나고 있다",
    image: 'http://image.newsis.com/2023/12/12/NISI20231212_0001434624_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002554617',
    category: 'MZ 소비 트렌드',
    tag: '주거/공간',
    reporter: '뉴시스',
    title: "'글로벌 MZ들의 놀이터' 하이커, 누적 방문객 100만 돌파",
    link: 'https://www.neusral.com/r?n=A4Cy8Nnz7Q',
    date: '23.12.12',
  },
  {
    id: 'lzt35piv7qk26dl5s1lengqq',
    neusralId: 'yMCle6YAmb',
    description:
      '뉴욕 화장품 브랜드 키엘이 오는 17일까지 신세계백화점 강남점 1층에서 ‘키엘 빌리지’ 팝업 스토어를 운영한다고 12일 밝혔다.키엘 홀리데이 울트라 훼이셜 크림 듀오 세트.(사진=키엘)키엘 빌리지는 ‘즐거움이 녹지 않는 키엘 홀리데이’를 테마로 뉴욕 크리스마스의 따뜻...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200359.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=02046726635837864&mediaCodeNo=257',
    category: 'MZ 소비 트렌드',
    tag: '주거/공간',
    reporter: '이데일리',
    title: '키엘, 신세계 강남점에 키엘빌리지 열어…"연말 분위기 물씬"',
    link: 'https://www.neusral.com/r?n=yMCle6YAmb',
    date: '23.12.12',
  },
  {
    id: 'zf90x3eu5v0mc3bv63lof4ju',
    neusralId: 'WqCmON7emO',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121223182119277_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121223182119277',
    category: 'MZ 소비 트렌드',
    tag: '주거/공간',
    reporter: '머니투데이',
    title: 'VIP 마케팅 vs 근린형 쇼핑몰…불황에 맞서는 국내 백화점들',
    link: 'https://www.neusral.com/r?n=WqCmON7emO',
    date: '23.12.13',
  },
  {
    id: 'qgkpxkgop50xd7ya1yum997p',
    neusralId: 'KYCzjKejNo',
    description:
      '겨울비가 흠뻑 내렸습니다. 일부 지역에서는 폭설이 온 곳도 있는데요. 이 비와 눈이 지나가면 한파가 찾아온다고 합니다. 모쪼록 건강관리가 필요한 때입니다. 이번 주 여행가중계에서는 훈훈한 두 소식을 전합니다. ‘효도 여행에 제격인 패키지여행사 만족도 순위’와 ‘달라진 2030 여행 추세’입니다. 12월 첫째 주 여행가중계 지금 시작합니다. 1. ‘90%가 ',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/news-p.v1.20231208.6d701739aa584ca29d7f33724fba0722.png',
    realLink: 'https://www.mk.co.kr/news/culture/10897123',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '매일경제',
    title:
      '‘90%가 여행지에서 낯선 사람과 만남 즐겨’…달라진 2030 여행 추세[여행가중계]',
    link: 'https://www.neusral.com/r?n=KYCzjKejNo',
    date: '23.12.13',
  },
  {
    id: 'wubysxeq19s4kwzhnmf4sho6',
    neusralId: 'A4Cy8Nnbpw',
    description:
      '&ldquo;4년 만에 연말 주문량이 늘어서 허리를 필 수 있을 것 같다. 여기 주문서 내역을 보면 알겠지만 작년보다 몇배는 주문이 더 들어와서 바쁘다.&rdquo; 지난 11일 서울 종로구 세운상가 일대의 상패 제작 업체 박모(71) 씨의 말이다. 연말 송년회와 인사이동이 다가오면서 상패&middot;트로피 제작 업체가 활기를 띄고 있다. 20년 가까이 상가에서 상패를 팔았다는 김모(66) 씨는 &ldquo;코로나19로 인해서 정말 죽을듯이 힘들었다. 문을 닫아야 ...',
    image:
      'https://res.heraldm.com/content/image/2023/12/12/20231212000114_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000104',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '헤럴드경제',
    title: '“송년회, 감사패 문화 MZ 덕에 4년 만에 활기”…상패 업체 특수',
    link: 'https://www.neusral.com/r?n=A4Cy8Nnbpw',
    date: '23.12.12',
  },
  {
    id: 'i8jy2s5hg8lcs07ei50zrczs',
    neusralId: 'xACA7agBrK',
    description:
      "직장인들, 송년회로 점심 뷔페·영화 관람 외식 물가와 주류 물가 큰 폭으로 오른 탓 '폭음 문화 기피' MZ 세대의 성향도 반영 코로나19 이후 아예 송년회 사라진 곳도",
    image: 'http://image.newsis.com/2023/12/03/NISI20231203_0020150621_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002554984',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '뉴시스',
    title: "점심 뷔페에 영화 단체 관람도…송년회 新풍속도 '정착'",
    link: 'https://www.neusral.com/r?n=xACA7agBrK',
    date: '23.12.12',
  },
  {
    id: 'hxvnfce31g34aqdnxk7y0nzn',
    neusralId: 'p0CdaGpWWX',
    description:
      '달린만큼 내고, 반려견 이름으로 내고...MZ들의 연말 이색 기부  지난 10월 저희 러닝 크루원들이 1783㎞를 달렸습니다. 1㎞당 50~100원씩 기부해 총 15만7319원을 기부했네요. 서울에 사는 직장인 김진욱39씨는 지난 2020년 1월부터 매주 1회씩 서울 ',
    image:
      'https://images.chosun.com/resizer/67LEmPR7CPl8uKAEKzfXO9lZwZE=/900x472/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/T6MTTZ67ZFG6VHGXFMIUDMEYOY.JPG',
    realLink:
      'https://www.chosun.com/national/national_general/2023/12/12/YSOTS4DIQBBERI6W65JIEFT43Y/?utm_source=naver&utm_medium=referral&utm_campaign=naver-news',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '조선일보',
    title: '달린 만큼 기부, 인증샷으로 기부...요즘 MZ세대들의 이색 기부',
    link: 'https://www.neusral.com/r?n=p0CdaGpWWX',
    date: '23.12.12',
  },
  {
    id: 'cjxrdyhm0y9ez9y4kxcshinb',
    neusralId: 'JbCMXPgNBA',
    description: "'나 혼자 산다'가 TV화제성지수 비드라마 전체 1위를 차지...",
    image:
      'https://image.ytn.co.kr/general/jpg/2023/1212/202312121256281028_t.jpg',
    realLink: 'https://star.ytn.co.kr/_sn/0117_202312121256281028',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: 'YTN',
    title: "'나 혼자 산다', 비드라마 화제성 1위...10년째 변함없는 인기",
    link: 'https://www.neusral.com/r?n=JbCMXPgNBA',
    date: '23.12.12',
  },
  {
    id: 'uxwl2m3g106lt6iuelag9l4j',
    neusralId: 'zRCyJzPndx',
    description:
      '상조 3.0 시대를 맞아 시장 규모가 커지고 있다. 장례 서비스가 주축인 상조 1.0시대, 다양한 결합상품을 도입한 2.0시대를 넘어 신사업 진출을 통한 상조 3.0 시대가 열리면서 중장년층은 물론, 젊은 MZ세대의 호응까지 이끌고 있다. 상조업체들이 다양한 취향을 ...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200227.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01374326635837864&mediaCodeNo=257',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '이데일리',
    title: '1조 클럽만 네 곳 덩치커진 상조, 신사업 진출로 MZ까지 유혹',
    link: 'https://www.neusral.com/r?n=zRCyJzPndx',
    date: '23.12.12',
  },
  {
    id: 'gf5u4eoqygnfdlp00hzvmays',
    neusralId: 'OMCOMPLpdo',
    description:
      '한국 스포츠를 이끌어갈 &#39;예비 스포츠 마케터&#39;들이 프로당구(PBA) 현장을 찾았다. 한양대학교 스포츠산업과학부 &#39;스포츠 광고 실습&#39; 과목의 수강생 30여 명은 지난 9일, 11일 경기도 &#39;고양 킨텍스 PBA 스타디움&#39;을 ..',
    image:
      'https://file2.nocutnews.co.kr/newsroom/image/2023/12/12/202312121542003638_0.jpg',
    realLink: 'https://www.nocutnews.co.kr/news/6062135',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '노컷뉴스',
    title: "'프로당구 찾은 MZ 세대' 韓 예비 스포츠 마케터들, PBA 관전",
    link: 'https://www.neusral.com/r?n=OMCOMPLpdo',
    date: '23.12.12',
  },
  {
    id: 'oto4dauuv5927o4lb1pr6ox8',
    neusralId: 'KYCzjKmW7N',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '연합뉴스',
    title: '동해시, 젊은 직원 목소리 반영…혁신 주니어보드 운영',
    link: 'https://www.neusral.com/r?n=KYCzjKmW7N',
    date: '23.12.12',
  },
  {
    id: 'rm3tsnn9zq3utwkitckodf2r',
    neusralId: 'VwCyo70jN1',
    description:
      '3분기 최대 실적거둔 야놀자뉴욕거래소 출신 CFO 선임NYSE 전광판에 축전 도배해외매출 전년동기比 200%↑클라우드 사업 흑자전환 성과美투자업계서 러브콜 쏟아져',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01110121000002_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896685',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '매일경제',
    title: '야놀자 美IPO, 이르면 내년 상반기 출격',
    link: 'https://www.neusral.com/r?n=VwCyo70jN1',
    date: '23.12.12',
  },
  {
    id: 'd62ubb0wfegzelpf61fkl05x',
    neusralId: 'aVCVRbJbx7',
    description:
      '12일 AI 반도체 업계와 과학기술정보통신부(과기정통부) 취재를 종합하면, 19일 과기정통부가 주관하는 제4차 AI 반도체 최고위 전략대화에서 네이버클라우드는 AI 반도체 성능을 공개 시연할 예정이다. 이동수 네이버클라우드 이사는 지난 2일 자신의 페이스북에 &quot;서울대 AI 효율성 워크숍에서 처음으로 AI 반도체의 개발 결과 일부를 발표했다&quot;면서 &quot;네이버클라우드는 대량생산 가능성과 저전력에 초점을 두고 LPDDR(저전력D램)을 채택했고 경량화 기술 덕에 HBM(고대역폭메모리)을 썼을 때의 성능과 동일하거나 그 이상의 LLM(거대언어모델) 추론 성능을 확보했다&quot;고 밝혔다. 정부는 지난해 6월 제1차 AI 반도체 최고위 전략대화를 열고 AI 반도체 산업 성장 지원 대책을 발표했다.',
    image:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202312/13/cc87069d-0af5-4b6f-88dc-00caf7ab4416.jpg/_ir_/resize/1280',
    realLink: 'https://www.joongang.co.kr/article/25214365',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '중앙일보',
    title: '[단독] 네이버·삼성 공동 개발한 AI 반도체, 19일 공개된다 | 팩플',
    link: 'https://www.neusral.com/r?n=aVCVRbJbx7',
    date: '23.12.13',
  },
  {
    id: 'oxc5jjumbdwkez8pelkp4ks1',
    neusralId: 'zRCyJzez6x',
    description:
      '네이버페이 앱 서비스 통합 개편 투자자 보호장치 마련 등은 숙제, 네이버파이낸셜(네이버페이)이 자사 모바일 애플리케이션(앱)에 증권·부동산 서비스를 통합한다고 12일 밝혔다. 이번 개편을 시작으로 네이버페이는 금융서비스를 보다 확대할 것으로 보인다. 주요 증권사와 제휴하는 방식으로 네이...',
    image: 'https://img.seoul.co.kr/img/facebook.png',
    realLink:
      'https://www.seoul.co.kr/news/newsView.php?id=20231213018002&wlog_tag3=naver',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '서울신문',
    title: '결제 넘어 증권·부동산까지… 네이버 ‘금융 공룡’ 되나',
    link: 'https://www.neusral.com/r?n=zRCyJzez6x',
    date: '23.12.13',
  },
  {
    id: 'orowoexp37ln6zo1kxzfdk8h',
    neusralId: 'WqCmONx8zK',
    image:
      'https://image.kmib.co.kr/online_image/2023/1212/2023121117161964789_1702282636_0018960527.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0018960527&code=61171811&cp=nv',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '국민일보',
    title: '쿠팡 ‘로켓럭셔리’ VS 컬리 ‘뷰티컬리’ 결과가 궁금하다',
    link: 'https://www.neusral.com/r?n=WqCmONx8zK',
    date: '23.12.12',
  },
  {
    id: 'euu82qyxi8pdz6pb938752t3',
    neusralId: 'NACn3XqQak',
    realLink: 'https://www.news1.kr/articles/5258834',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '뉴스1',
    title: '카카오뱅크 "모임통장, 5년만에 순이용자 1000만명 육박"',
    link: 'https://www.neusral.com/r?n=NACn3XqQak',
    date: '23.12.12',
  },
  {
    id: 'dufvqve7fsz5ng1xkpcdfthn',
    neusralId: 'qkCZqxlxq2',
    image:
      'https://image.munhwa.com/gen_news/202312/2023121201071707006001_b.jpg',
    realLink: 'https://www.munhwa.com/news/view.html?no=2023121201071707006001',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '문화일보',
    title: '‘국민앱’ 은 여전히 카카오톡… 사용자 4000만명 넘어 1위',
    link: 'https://www.neusral.com/r?n=qkCZqxlxq2',
    date: '23.12.12',
  },
  {
    id: 'e9jlja3ho726rvcdu2oqcnwk',
    neusralId: 'eWCWLrGBnK',
    description:
      '[서울=뉴시스]윤정민 기자 = 일본인 메이저리거 오타니 쇼헤이(29)의 LA 다저스행 소식에 쿠팡플레이가 덩달아 주목을 받고 있다',
    image: 'http://image.newsis.com/2023/09/17/NISI20230917_0000497349_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231211_0002553817',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '뉴시스',
    title: "'7억불 사나이' 오타니 다저스행 소식에 쿠팡플레이 '함박웃음'",
    link: 'https://www.neusral.com/r?n=eWCWLrGBnK',
    date: '23.12.12',
  },
  {
    id: 'ebndrd20byueqkchmzkuuwcg',
    neusralId: 'KYCzjKm2Yw',
    description:
      '쿠팡 윙(WING) 판매자 페이지에서 자신의 계정으로 로그인하면 타 판매자 정보가 보이는 등 개인정보 노출 사고가 발생한 것으로 확인됐다.',
    image: 'https://byline.network/wp-content/uploads/2023/12/쿠팡-배송.jpeg',
    realLink: 'https://byline.network/2023/12/12-272/',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '바이라인네트워크',
    title: '타 판매자 정보가 보인다고? 쿠팡 “즉시 조치, 현재 조사 중”',
    link: 'https://www.neusral.com/r?n=KYCzjKm2Yw',
    date: '23.12.12',
  },
  {
    id: 'rsgmzxcbozq9tbg6vhr2zlvf',
    neusralId: 'mxC4Mg8kPa',
    description:
      'CJ제일제당 자사몰 ‘내일도착’ 배송 서비스\n홈플러스, 1시간 즉시배송…年 80% 성장\n롯데, 부산에 230만여 가구 장보기 물류센터',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.046fcf8f3f864c8999730e67ebd7236a.jpg',
    realLink: 'https://www.mk.co.kr/news/economy/10896559',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '매일경제',
    title: '“쿠팡 때문에 참”…‘비장의 카드’ 다시 꺼내드는 대기업들',
    link: 'https://www.neusral.com/r?n=mxC4Mg8kPa',
    date: '23.12.12',
  },
  {
    id: 'hle3v6vi4gpnsbhkhnnd7ceq',
    neusralId: 'YKCRYnJZgn',
    description:
      '특정 사업자군에서 단말기유통구조개선법(단통법)을 위반한 불법 게시글이 통제되지 않아 논란이다. 단통법 폐지에 대한 여론도 있지만, 법이 존재하는 한 공정한 적용이 필요한데, 현재 네이버 밴드, 카페, 카카오톡에서는 불법 게시글이 적절히 삭제되지 않고 있다.불법 게시글은...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300899.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=02666646635837864&mediaCodeNo=257',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '이데일리',
    title: '휴대폰 판매 불법 게시글, 네이버·카카오가 쿠팡보다 덜 지워..왜?',
    link: 'https://www.neusral.com/r?n=YKCRYnJZgn',
    date: '23.12.12',
  },
  {
    id: 'm87z40rf60a8i6wketw85zp5',
    neusralId: '23CPKNBLoE',
    description:
      '김병욱 더불어민주당 의원이 대표 발의한 ‘공인중개사법 개정안’이 국토교통위원회 법안심사소위 안건으로 올랐다. 오는 21일 법안 처리가 추진될 것이라는 관측에 프롭테크(부동산 기술) 업계에서는 혁신을 가로 막는 ‘개악’이라며 반대 목소리가 나온다. 총선을 앞두고 정치권의',
    image:
      'https://img.etnews.com/news/article/2023/12/12/news-p.v1.20231212.76151bd76f3a475d96ec4377b84f0357_P1.png',
    realLink: 'https://www.etnews.com/20231212000232',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '전자신문',
    title: "'직방'도 타다 전철 밟나…프롭테크 반대에도 공인중개사 법 개정 추진",
    link: 'https://www.neusral.com/r?n=23CPKNBLoE',
    date: '23.12.12',
  },
  {
    id: 'py6p00k2hin44da2mmrcnw7x',
    neusralId: 'BnCkynKaBn',
    description:
      '배달의민족 물류서비스를 전담하는 우아한청년들이 DB손해보험과 제공하는 라이더 대상 시간제 유...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/news-p.v1.20231212.22a36e557f514fe0959235ae07ebcb09_P1.jpg',
    realLink:
      'https://www.khan.co.kr/economy/economy-general/article/202312120858011',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '경향신문',
    title: '배달의민족, 내년 라이더 시간제 보험료 933원으로 인하',
    link: 'https://www.neusral.com/r?n=BnCkynKaBn',
    date: '23.12.12',
  },
  {
    id: 'k4qjp9f14dmmitebx92qwuui',
    neusralId: 'PRCjRJNxVm',
    description:
      'SM엔터 사건 첫 재판서 날선 공방\n변호인단 “검찰, 수사기록 비공개” 지적\n검찰 “사건 관계자 증거인멸 시도 때문”',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.eff110b91e104082a36d8acfa609f843.jpg',
    realLink: 'https://www.mk.co.kr/news/society/10896886',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '매일경제',
    title: '배재현 카카오투자총괄 ‘시세조종 혐의’ 부인 “정상적 매입”',
    link: 'https://www.neusral.com/r?n=PRCjRJNxVm',
    date: '23.12.12',
  },
  {
    id: 'hwsra6bkjr41k8hdyix8k730',
    neusralId: '47CpoymKyd',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '지디넷코리아',
    title: '카카오 노조 "현 경영진 교체 등 구체적 방안 필요"',
    link: 'https://www.neusral.com/r?n=47CpoymKyd',
    date: '23.12.12',
  },
  {
    id: 'j93q2o5ga3tea3hdnnyypx91',
    neusralId: 'ROCyaoYbx1',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121015010391205_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121015010391205',
    category: '네카라쿠배당토 뉴스',
    tag: '기술/R&D',
    reporter: '머니투데이',
    title: 'R&D 강화 나선 네이버웹툰…"AI 인력, 100명 채운다"',
    link: 'https://www.neusral.com/r?n=ROCyaoYbx1',
    date: '23.12.12',
  },
  {
    id: 'r26f95c0h65x3bhhx3i0pu5k',
    neusralId: 'p0CdaGpqpJ',
    description:
      '2009년 겨울, 김범수 카카오 창업자(현 미래이니셔티브 센터장)와 전 직원은 강원 홍천으로 워크숍을 떠났다. 카카오 신화의 시작이 된 카카오톡 출시를 앞둔 시점이었다. 당시 워크숍은 사진으로 남아있다. 사진에는 김 센터장과 10여명 남짓 한 전 직원이 숙소 거실에 둘러앉아 술잔을 기울이는 모습이 담겼다. 취기가 오른 듯 얼굴이 붉어진 김 센터장은 스스럼없이 직원들과 이야기를 나누고 있었다. 김 센터장이 직원들과 동그랗게 둘러앉아 토론을...',
    image:
      'https://res.heraldm.com/content/image/2023/12/12/20231212000384_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000362',
    category: '네카라쿠배당토 뉴스',
    tag: '채용/기업문화',
    reporter: '헤럴드경제',
    title: '자율·수평 카카오 기업문화...14년 뒤 부메랑 되다',
    link: 'https://www.neusral.com/r?n=p0CdaGpqpJ',
    date: '23.12.12',
  },
  {
    id: 'lsvrf0el072z618wyzbravuj',
    neusralId: 'PRCjRJNJQE',
    description:
      '‘홍은택 측근 모임’ 익명 폭로, “모임 회원 업체에 일감 몰아줘”홍 대표 아들 친구 채용 의혹도쇄신 발표 하루 만에 또 논란 검찰 수사 등 창업 이래 최대 위기를 겪고 있는 카카오 창업자 김범수 경영쇄신위원장(미래이니셔티브센터장)이 이번에는 최측근인 홍은택 카카오 대표가 연루된 사조직...',
    image:
      'https://img.seoul.co.kr/img/upload/2023/12/13/SSI_20231213100028.jpg',
    realLink:
      'https://www.seoul.co.kr/news/newsView.php?id=20231213019001&wlog_tag3=naver',
    category: '네카라쿠배당토 뉴스',
    tag: '채용/기업문화',
    reporter: '서울신문',
    title: '[단독] ‘우리는 양재하버드’… 카카오 사조직 내홍',
    link: 'https://www.neusral.com/r?n=PRCjRJNJQE',
    date: '23.12.13',
  },
  {
    id: 'n40z5tay5rdx545wso7znh2m',
    neusralId: '8XCjNnLaMJ',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121209230665490_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121209230665490',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: "AI 웹툰 '리얼드로우', 22억원 프리A 투자유치…알토스 주도",
    link: 'https://www.neusral.com/r?n=8XCjNnLaMJ',
    date: '23.12.12',
  },
  {
    id: 'y4axlp0upz36ou2plxmi9cly',
    neusralId: '23CPKNmdKP',
    description:
      '영상 처리 AI(인공지능) 스타트업 메이아이가 60억 원 규모의 시리즈A 투자 유치를 성공적으로 완료했다고 밝혔다.&nbsp; 이번 투자는 삼성벤처투자가 주도했다. 또한 에버그린투자파트너스, 미래에셋벤처투자, 플럭스벤처스, IBK기업은행, 대교인베스트먼트가 신규로 참여했다. 기존 투자자인 빅베이슨캐피탈 역시 후속 투자를 진행했다. 이에 따라 메이아이의…',
    image:
      'https://wowtale.s3.ap-northeast-2.amazonaws.com/wp-content/uploads/2023/12/12175152/wowtale.net-ai-60-a-wowtale.net-ai-60-a-3bd98d83-8f25-4184-afee-f6fe9b7ec0a2.png',
    realLink: 'https://wowtale.net/2023/12/12/68090/',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '와우테일',
    title: '영상 AI ‘메이아이’, 60억원 시리즈A 투자유치',
    link: 'https://www.neusral.com/r?n=23CPKNmdKP',
    date: '23.12.12',
  },
  {
    id: 'k2fszw7llb90mfd5j6lo7a17',
    neusralId: '23CPKNBaop',
    description:
      "스톤브릿지벤처스와 스마일게이트인베스트먼트가 영유아 놀잇감 구독 서비스 '피카비(peekaby)'에 투자했다. 9일 업계에 따르면 스톤브릿지벤처스와 스마일게이트인베스트먼트는 피카비 운영사인 영유아 에듀테크 스타트업 올디너리매직에 프리 시리즈A 투자를 진행했다. 투자금액은 비공개다.앞서 ",
    image:
      'https://cdn.bloter.net/news/thumbnail/202312/609352_213750_1702342440_v150.jpg',
    realLink: 'https://www.bloter.net/news/articleView.html?idxno=609352',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '블로터',
    title:
      "스톤브릿지·스마일게이트인베, 놀잇감 구독 서비스 '피카비'에 투자 [넘버스]",
    link: 'https://www.neusral.com/r?n=23CPKNBaop',
    date: '23.12.12',
  },
  {
    id: 'd1sf7g6buh27otr6f4vjh6sp',
    neusralId: 'XJCeWYK01x',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213584689040_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213584689040',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: '\'킥라니\' 오명에도 119억 빨아들인 스타트업…"글로벌 공략 박차"',
    link: 'https://www.neusral.com/r?n=XJCeWYK01x',
    date: '23.12.12',
  },
  {
    id: 'iftdeqia914bdmh6pn9lk1ht',
    neusralId: 'aVCVRbm37d',
    description:
      '#비침습혈당측정기 를 개발하는 #스타트업 #에이치엠이스퀘어 가 40억원 규모의 #프리시리즈A #투자 를 유치했다.',
    image:
      'https://www.venturesquare.net/wp-content/uploads/2023/12/unnamed-1-5-e1702349087550-695x522.png',
    realLink: 'https://www.venturesquare.net/906303',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '벤처스퀘어',
    title: '에이치엠이스퀘어, 40억 원 투자 유치',
    link: 'https://www.neusral.com/r?n=aVCVRbm37d',
    date: '23.12.12',
  },
  {
    id: 'zb4vzmxcdp014e5s7mysqh65',
    neusralId: 'EZCYng4Jre',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213144486307_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213144486307',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: '"벤처대출로 데스밸리 탈출…M&A 완화로 투자회수 활성화"',
    link: 'https://www.neusral.com/r?n=EZCYng4Jre',
    date: '23.12.12',
  },
  {
    id: 'r5go9fnaxgo2ip2os3xq8zuu',
    neusralId: 'XJCeWYKqPM',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213474638788_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213474638788',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: '벤처기업 75% "ESG 경영 필요"… 38% "투자자들도 요구"',
    link: 'https://www.neusral.com/r?n=XJCeWYKqPM',
    date: '23.12.12',
  },
  {
    id: 'shi1aefxfltkkkza7rl1esxu',
    neusralId: 'VwCyo7Ql7b',
    description:
      '부동산 시장 침체 영향으로 공인중개소의 줄폐업이 이어지면서 한때 너도나도 뛰어들었던 공인중개사 시험에 대한 응시자도 급감하고 있다. 이런 탓에 공인중개소를 대상으로 시장을 넓혀 갔던 프롭테크(부동산 산업에 IT 서비스를 접목한 산업) 업계도 타격을 받고 있다.(그래픽...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300044.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01269366635838192&mediaCodeNo=257',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '이데일리',
    title: "공인중개업소 매달 1200곳 문닫아…프롭테크도 투자 유치 '뚝'",
    link: 'https://www.neusral.com/r?n=VwCyo7Ql7b',
    date: '23.12.13',
  },
  {
    id: 'ydyqhfeb818th994mdt16pno',
    neusralId: 'aVCVRbmgOl',
    description:
      '&#039;AI칩의 제왕&#039; 엔비디아, AI 기업들의 초석 투자자 됐다, 김리안 기자, 국제',
    image: 'https://img.hankyung.com/photo/202312/ZA.35305453.1.jpg',
    realLink: 'https://www.hankyung.com/article/202312129667i',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '한국경제',
    title: "'AI칩의 제왕' 엔비디아, AI 기업들의 초석 투자자 됐다",
    link: 'https://www.neusral.com/r?n=aVCVRbmgOl',
    date: '23.12.12',
  },
  {
    id: 'zab16kbb17z4hs6ba67v204g',
    neusralId: 'Z2C0oBb44P',
    description: '',
    image:
      'https://platum.kr/wp-content/uploads/2023/12/unnamed-4-2-640x427.jpg',
    realLink: 'https://platum.kr/archives/219244',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '플래텀',
    title:
      '지구테크 스타트업 ‘오후두시랩’, AI기반 기업 탄소관리 ‘그린플로’ 정식 론칭',
    link: 'https://www.neusral.com/r?n=Z2C0oBb44P',
    date: '23.12.12',
  },
  {
    id: 'silwgj1x7lcq0fo0cou7jgn0',
    neusralId: 'eWCWLrJJaA',
    description:
      '아파트멘터리가 한국경제신문사와 스태티스타가 진행한 ‘대한민국 성장챔피언 2024’에서 150개 기업 중 56위에 올랐다.‘대한민국 성장 챔피언’은 한국경제신문사와 글로벌 리서치 전문 기관 스태티스타(Statista)가 조사해 발표하는 기업 순위로, 2019년 매출 1억 5,000만 원',
    image:
      'https://cdn.startupn.kr/news/thumbnail/202312/43282_43916_1751_v150.jpg',
    realLink: 'https://www.startupn.kr/news/articleView.html?idxno=43282',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '스타트업엔',
    title:
      '인테리어 서비스 혁신 스타트업 아파트멘터리, ‘대한민국 성장 챔피언 2024’ 선정',
    link: 'https://www.neusral.com/r?n=eWCWLrJJaA',
    date: '23.12.12',
  },
  {
    id: 'os1z3l0ulazxvo5k6m9pstvg',
    neusralId: 'NACn3XqMBR',
    description: '',
    image: 'https://platum.kr/wp-content/uploads/2023/12/ad-640x427.jpg',
    realLink: 'https://platum.kr/archives/219274',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '플래텀',
    title: '오픈랩소디, 스타트업을 위한 무료 마케팅 솔루션 ‘애드스왑’ 출시',
    link: 'https://www.neusral.com/r?n=NACn3XqMBR',
    date: '23.12.12',
  },
  {
    id: 'e1z192cdolhb8pwadw2ald4t',
    neusralId: '47Cpoym10E',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121215013653273_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121215013653273',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '머니투데이',
    title: '올해 거래액 2조 돌파 알스퀘어 "데이터 신사업으로 수익 강화"',
    link: 'https://www.neusral.com/r?n=47Cpoym10E',
    date: '23.12.12',
  },
  {
    id: 'm31p7rduuewf7dvd5pif8v19',
    neusralId: 'PRCjRJeKw3',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023120708070678304_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023120708070678304',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '머니투데이',
    title: '"통장만 갉아먹네" 안 쓰는 구독서비스 한방에 정리하는 이 기술',
    link: 'https://www.neusral.com/r?n=PRCjRJeKw3',
    date: '23.12.12',
  },
  {
    id: 'x86pw2myk680n3lrs1ksaatv',
    neusralId: 'LBCp1jkbEA',
    description:
      '㈜씨에이티빔텍이 ‘소부장 스타트업 100’ 사업 지원을 토대로 탄소나노튜브 기반 차세대 디지털 엑스레이를 개발 중이라고 밝혔다. 이에 약 20년 동안 탄소나노튜브 엑스레이를 연구해 온 ㈜씨에이티빔텍 류제황 대표는 지난 11월 26일부터 30일까지 미국 시카고에서 개최된 북미영상의학회(RSNA 2023)에서 탄소나노튜브를 활용한 초소형 엑스레이 시스템과 160kV 탄소나노튜브 엑스레이 소스를 발표했다. 또 그는 &quot;씨에이티빔텍은 올해 서울창조경제혁신센터가 주관하는 ‘소재·부품·장비 스타트업 100’(이하 ‘소부장 스타트업 100’)에 선정돼 지원을 받았다&quot;며 &quot;특히 서울창조경제혁신센터와 산업은행이 주최한 ‘소부장 스타트업 혁신성장펀드IR’ 참가를 계기로 총 37억의 투자유치를 달성했다&quot;고 덧붙였다.',
    image:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202312/12/74434bd0-6a7f-489a-a926-8b525d2193c7.jpg/_ir_/resize/1280',
    realLink: 'https://www.joongang.co.kr/article/25214149',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '중앙일보',
    title: '㈜씨에이티빔텍, 탄소나노튜브 기반 차세대 디지털 엑스레이 개발 나서',
    link: 'https://www.neusral.com/r?n=LBCp1jkbEA',
    date: '23.12.12',
  },
  {
    id: 'h1r2evrtra91yz7cz7zdq34n',
    neusralId: 'k4CQneNQaR',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213390758688_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213390758688',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '머니투데이',
    title: "폐식용유의 변신...써스테인어스, 서울시 기후테크 챌린지 '대상'",
    link: 'https://www.neusral.com/r?n=k4CQneNQaR',
    date: '23.12.12',
  },
  {
    id: 'rj7bpyrdzs18r4g0kkutzf8g',
    neusralId: '7eCXbokkl2',
    description:
      '멘탈테크 스타트업 닥터프레소(대표 정환보)는 인공지능 기술을 기반으로 차별화된 정신 건강 연구를 선보이며 업계의 주목을 받고 있다. 중앙대학교 캠퍼스타운 소속 창업기업인 닥터프레소는 ‘디지털 라이프 마커’를 활용해 더 많은 사람들이 쉽고 편리하게 마음을 돌볼 수 있는',
    image:
      'https://img.etnews.com/news/article/2023/12/12/news-p.v1.20231212.b275d836612540ab8d495dc14887e1c3_P1.png',
    realLink: 'https://www.etnews.com/20231212000285',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '전자신문',
    title: '닥터프레소, AI기반 정신건강 관리 보조 솔루션 개발',
    link: 'https://www.neusral.com/r?n=7eCXbokkl2',
    date: '23.12.12',
  },
  {
    id: 'fgbxjjkwlj2qud4xxlqhcpkw',
    neusralId: '3jCARk3mkY',
    description:
      '장례서비스 기업 ’고이장례연구소‘를 창업한 송슬옹 대표는 서울대 경제학과와 벤처경영학과를 복수전공하고, 벤처회사에 재직 중 ’내가 하고 싶은 일을 해야 한다‘라는 결심 아래 장례서비스 스타트업을 설립했다. ’고이장례연구소‘는 저렴한 비용으로 장례와 관련된 모든 절차를 일괄적으로 처리할 수 있는 원-스톱 서비스를 제공한다. 또한 진정성의 가치를 실현시키기 위해 회사 소속 담당자가 직접 견적과 절차 등의 상담을 진행한다.특히 장례 경험이 부족한 상주를 위해 장례에 필요한 모든 정보를 유선을 통해 1차 설명한 뒤, 장례 의뢰가 오면 ’고',
    image:
      'https://cdn.itbiznews.com/news/thumbnail/202312/120558_117093_41_v150.jpg',
    realLink: 'https://www.itbiznews.com/news/articleView.html?idxno=120558',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: 'IT비즈뉴스',
    title: '고이장례연구소, 투명하고 정직한 서비스로 새로운 장례문화 구축',
    link: 'https://www.neusral.com/r?n=3jCARk3mkY',
    date: '23.12.12',
  },
  {
    id: 't75xa4moi14hwc8ojayz05j7',
    neusralId: 'lnCWqrlgyg',
    description:
      '[스타트업투데이] ‘스타트업 101’ 프로젝트가 시즌2로 돌아왔습니다. ‘스타트업 101’은 스타트업의 친구이자 동반자 가 빛나는 101개의 스타트업을 소개하는 프로젝트입니다. 유망 스타트업에는 투자자와 대중에게 눈도장 찍을 기회를, 투자자에게는 성장 가능성이 높은 스타트업을 발굴할 수 있는 기회를 제공합니다. [편집자 주] [▶관련기사: [스타트업 101] “시즌2로 돌아왔다” 제품∙서비스 알리고 싶은 101개 스타트업을 찾습니다!] 쉰한 번째 주인공은 ‘칼만텍’입니다. ▲‘칼만텍’은 어떤 스타트업인가요? 칼만텍은',
    image:
      'https://cdn.startuptoday.kr/news/thumbnail/202312/48010_36180_4442_v150.jpg',
    realLink: 'https://www.startuptoday.kr/news/articleView.html?idxno=48010',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '스타트업투데이',
    title:
      '[스타트업 101 시즌2 #51] 칼만텍, ‘전후좌우 이동 가능한 로봇 모빌리티 플랫폼’으로 새로운 이동 패러다임 제시',
    link: 'https://www.neusral.com/r?n=lnCWqrlgyg',
    date: '23.12.12',
  },
  {
    id: 'xm1zmasr7ek1qd5akk8faent',
    neusralId: '23CPKNBZa3',
    image:
      'https://image.munhwa.com/gen_news/202312/2023121201039907170002_b.jpg',
    realLink: 'https://www.munhwa.com/news/view.html?no=2023121201039907170002',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '문화일보',
    title: '“국내 스타트업의 글로벌 개방성 확대 위한 입법 지원 절실”',
    link: 'https://www.neusral.com/r?n=23CPKNBZa3',
    date: '23.12.12',
  },
  {
    id: 'bji164gplx39pskysq2pyjmy',
    neusralId: '3jCARk3Lz3',
    description:
      '미국 보스턴에 팁스(TIPS) 기업을 위한 글로벌 진출 거점이 마련된다. 12일 창립 1주년을 맞은 스케일업팁스협회 주도로 스케일업팁스 기업을 비롯한 팁스 기업 전체의 글로벌 진출과 성장을 지원하기 위해서다. 보스턴 연구대학인 매사추세츠 공과대학(MIT)과 스케일업팁스',
    image:
      'https://img.etnews.com/news/article/2023/12/12/news-p.v1.20231212.d65d025e4f3d43c2a3875761420ee643_P1.jpg',
    realLink: 'https://www.etnews.com/20231212000209',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '전자신문',
    title:
      '스케일업팁스협회, TIPS 브랜드 글로벌에 알린다…보스턴에 미국 진출 거점 마련',
    link: 'https://www.neusral.com/r?n=3jCARk3Lz3',
    date: '23.12.12',
  },
  {
    id: 'yps4d91hfxyq5ld95ryq12ke',
    neusralId: '7eCXbokrVA',
    description:
      "충정 대전 권역 액셀러레이터인 JB벤처스가 30억원 규모의 지역엔젤투자 재간접펀드 1호 조합 결성을 완료했다.11일 업계에 따르면 JB벤처스는 이달 8일 '제이비벤처스라이즈1호조합' 결성총회를 개최했다.제이비벤처스라이즈1호조합은 지역엔젤투자 재간접펀드(Fund of Funds)다. 중",
    image:
      'https://cdn.bloter.net/news/thumbnail/202312/609376_213775_1702359173_v150.jpg',
    realLink: 'https://www.bloter.net/news/articleView.html?idxno=609376',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '블로터',
    title:
      'JB벤처스, 지역엔젤투자 재간접펀드 1호 결성..."비수도권 초기 소부장 기업 투자" [넘버스]',
    link: 'https://www.neusral.com/r?n=7eCXbokrVA',
    date: '23.12.12',
  },
  {
    id: 'y2gaq603ltwvroklbcoml4sz',
    neusralId: 'aVCVRbmpy8',
    description:
      '중소벤처기업부가 ‘벤처투자 촉진 법령’ 개정안을 국무회의에서 의결함으로써 ▲투자조건부 융자 ▲벤처펀드의 투자목적회사 등이 제도화되어 민간 투자재원이 창업 및 벤처기업에 유입되는 기반을 마련, 법령 개정으로 벤처투자 활성화와 규제 개선이 예상되고 있다.',
    image: 'https://www.venturesquare.net/wp-content/uploads/2023/12/1-3.jpg',
    realLink: 'https://www.venturesquare.net/906342',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '벤처스퀘어',
    title: '중기부 ‘벤처투자 촉진 법률’ 개정안 의결 “창업·벤처 자금 유입 촉진”',
    link: 'https://www.neusral.com/r?n=aVCVRbmpy8',
    date: '23.12.12',
  },
  {
    id: 'm1fb72y8xskl9wdh9t1njago',
    neusralId: 'Z2C0oB6kon',
    description:
      "한국여성경제인협회가 여성기업 판로지원에 적극 나섰다. 특히 올해는 체계적이고 수요자 맞춤형으로 지원해 참여기업으로부터 만족도도 높았다.  12일 중소벤처기업부에 따르면 여경협은 기존 여성기업 국내 판로지원 사업 전반을 개편해 올해 새롭게 기획한 '여성기업 판로역량 강화지원' 사업을 성공적으로 수행했다. 이..",
    image: 'https://image.fnnews.com/resources/images/no_img_fnnews_570.jpg',
    realLink: 'https://www.fnnews.com/news/202312121821278890',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '파이낸셜뉴스',
    title: "여경협, 여성기업 판로역량 강화 지원사업 '완수'",
    link: 'https://www.neusral.com/r?n=Z2C0oB6kon',
    date: '23.12.12',
  },
  {
    id: 'kclm6bepflam5s2u99b4so2u',
    neusralId: 'yMCle6YWbV',
    description:
      '#(재)부산창조경제혁신센터 가 오는 15일 아스티 호텔 부산 22층 그랜드볼룸에서 2023 초기창업패키지 우수기업을 대상으로 진행하는 #IR데모데이 #&#039;B.I.C DAY&#039; 를 개최한다.',
    image:
      'https://www.venturesquare.net/wp-content/uploads/2023/12/별첨-포스터세로-e1702351628734.jpg',
    realLink: 'https://www.venturesquare.net/906338',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '벤처스퀘어',
    title: '부산창경, IR 데모데이 ‘B.I.C DAY’ 개최',
    link: 'https://www.neusral.com/r?n=yMCle6YWbV',
    date: '23.12.12',
  },
  {
    id: 'fiurn29ijcqfv26cfbvku3wm',
    neusralId: 'lnCWqrlxVq',
    description:
      '신생 벤처캐피탈(VC) 제이원창업투자(J1 Venture Capital)는 지난달 말 첫 펀드 결성을 완료했다고 11일 밝혔다. 이번 펀드에는 일반 법인과 사회적 기업 등 다수의 출자자(LP)가 참여했다. 이번에 결성한 제이원창업투자 1호 펀드는 벤처조합 결성금액을 넘겼으며, 향후 50억원 수준으로 확대될 예정이다. 제이원창업투자는 안정성과 수익성을 동시에',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.a5ed615df563497a9e4ccd864c29e340.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896851',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '매일경제',
    title: '제이원창업투자, 마수걸이 펀드 결성 완료',
    link: 'https://www.neusral.com/r?n=lnCWqrlxVq',
    date: '23.12.12',
  },
  {
    id: 'vzj2ri702gypgto7frzw6u6t',
    neusralId: 'mxC4MgLN7x',
    description:
      '마르타 알리나 사우스벤처스 이사 &quot;언어장벽 넘을 K창업 커뮤니티 만들었죠&quot;, 외국인 창업지원 서울스타트업스 6년 만에 가입자 4600명 넘어 업계 네트워킹·해커톤 행사 개최 韓 선후배 문화처럼 서로 도울 것',
    image: 'https://img.hankyung.com/photo/202312/AA.35310076.1.jpg',
    realLink: 'https://www.hankyung.com/article/2023121215021',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '한국경제',
    title: '"언어장벽 넘을 K창업 커뮤니티 만들었죠"',
    link: 'https://www.neusral.com/r?n=mxC4MgLN7x',
    date: '23.12.12',
  },
  {
    id: 'nkjtp0vbbhprmum91cn048o1',
    neusralId: 'GkCGKPmexb',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '지디넷코리아',
    title: 'KISIA, 미국 현지 액셀러레이팅 프로그램 성료',
    link: 'https://www.neusral.com/r?n=GkCGKPmexb',
    date: '23.12.12',
  },
  {
    id: 'keo7hqdig8xbnyf30k3m0oz4',
    neusralId: 'KYCzjKmE3j',
    description:
      '[파이낸셜뉴스] 코스피가 동학개미로 불리는 개인투자자의 6800억원이 넘는 순매도세에도 2530선에서 상승세다.12일 코스피는 전거래일 대비 0.39%오른 2535.27에 마감했다. 장 출발과 비슷한 수준이다. 이날 코스피는 전거래일 대비 0.39%오른 2535.11로 출발했다.개인, 연기금은 각각 6846억원, 559억원을 순매도했다.하..',
    image:
      'https://image.fnnews.com/resource/media/image/2023/09/25/202309251317138532_l.jpg',
    realLink: 'https://www.fnnews.com/news/202312121535062975',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '파이낸셜뉴스',
    title: '[fn마감시황]코스피, 동학개미 6800억 넘게 팔아도 2530선 상승세',
    link: 'https://www.neusral.com/r?n=KYCzjKmE3j',
    date: '23.12.12',
  },
  {
    id: 'o9ibvmykuyds2mchgj31e0ez',
    neusralId: 'dQCxrW0NOG',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121215041039888_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121215041039888',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '머니투데이',
    title: "반도체 회복·美 금리인상 종료 기대…국내증시 외국인 45억불 '순유입'",
    link: 'https://www.neusral.com/r?n=dQCxrW0NOG',
    date: '23.12.12',
  },
  {
    id: 'csxstc0h08o4kfmg4w1rhybp',
    neusralId: 'NACn3Xq0g0',
    description:
      '대주주 요건을 강화해 주식 양도소득세 납부 대상을 줄이자는 최근 논의와 관련해 추경호 부총리 겸 기획재정부 장관이 검토하고 있지 않다고 밝혔다. 연말을 앞두고 주식 양도세를 회피하려는 큰손 개미들의 매도세가 올해도 반복될 가능성이 높아졌다. 12일 추 부총리는 정부세종청사에서 기자들과 만나 “현재 대주주 양도세 기준 완화와 관련해서는 구체적으로 검토하고 있',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.c6d71e073a31453c82de261d0dcc2917.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896732',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '매일경제',
    title:
      '올 연말 큰손 개미들 1조 매물폭탄 쏟아내나…“대주주 양도세 완화 검토안해”',
    link: 'https://www.neusral.com/r?n=NACn3Xq0g0',
    date: '23.12.12',
  },
  {
    id: 'a5tmpnt5d2sff55jso9qmsi2',
    neusralId: 'XJCeWYGoxK',
    description:
      '자녀 유학보낸 부모, 요즘 매일 애탄다 왜 원달러 환율 하루 평균 변동폭, 지난달부터 3~5원 더 커져 최근 달러 대비 원화 환율이 하루 10원 이상 움직이는 날이 늘었다. 통상 환율은 하루 3~5원쯤 움직이는데, 출렁임이 커진 것이다. 지난달 2~6일엔 3거래일 연속',
    image:
      'https://images.chosun.com/resizer/gQjj62QeqLJoMxjmSxUzvx1LtGo=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/ZOP2CGXTTZFRDM2MRPJF3JUKCQ.png',
    realLink:
      'https://www.chosun.com/economy/economy_general/2023/12/13/IEXTKB2GYZCETDJGJUJSMBL5BY/?utm_source=naver&utm_medium=referral&utm_campaign=naver-news',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '조선일보',
    title: '금융시장 안갯속… 환율, 사흘에 한번꼴 10원 이상 출렁',
    link: 'https://www.neusral.com/r?n=XJCeWYGoxK',
    date: '23.12.13',
  },
  {
    id: 'q4zqofpna3ohtwrbbwhsbblr',
    neusralId: 'VwCyo70jN1',
    description:
      '3분기 최대 실적거둔 야놀자뉴욕거래소 출신 CFO 선임NYSE 전광판에 축전 도배해외매출 전년동기比 200%↑클라우드 사업 흑자전환 성과美투자업계서 러브콜 쏟아져',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01110121000002_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896685',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '매일경제',
    title: '야놀자 美IPO, 이르면 내년 상반기 출격',
    link: 'https://www.neusral.com/r?n=VwCyo70jN1',
    date: '23.12.12',
  },
  {
    id: 'n7yb12qgid2clb6xffp6o8p2',
    neusralId: 'qkCZqx7L8p',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '연합뉴스',
    title: "고금리·고물가 그늘…이자부담, '입고 신는' 지출보다 커졌다",
    link: 'https://www.neusral.com/r?n=qkCZqx7L8p',
    date: '23.12.13',
  },
  {
    id: 'j2nbxvcc4qmd9mn27a7qjhjb',
    neusralId: 'MLC6zeWmGL',
    description:
      '국내 3대 신용평가사(한국기업평가·나이스신용평가·한국신용평가)들이 올해 하반기 기업 신용도 정기평가에서 자동차와 조선, 전력기기 기업의 신용도를 올렸지...',
    image:
      'https://cphoto.asiae.co.kr/listimglink/1/2023121308510286714_1702425062.png',
    realLink: 'https://view.asiae.co.kr/article/2023121207195379468',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '아시아경제',
    title: "'건설·금융·석화' 신용도 떨어지고 '조선·자동차'는 개선",
    link: 'https://www.neusral.com/r?n=MLC6zeWmGL',
    date: '23.12.13',
  },
  {
    id: 'nbip5sem4916ib6u074g9uii',
    neusralId: '23CPKNmKge',
    description:
      '\r\n\r\n[서울=뉴시스]남주현 기자 = 환율 안정세와 국제유가 하락에 수출입물가가 5개월 만에 내림세로 전환했다',
    image: 'http://image.newsis.com/2023/12/11/NISI20231211_0020158716_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002555630',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '뉴시스',
    title: "환율·유가 안정세에…11월 수출입물가 다섯달 만에 '하락'",
    link: 'https://www.neusral.com/r?n=23CPKNmKge',
    date: '23.12.13',
  },
  {
    id: 'aimqxxwsk44j8ym7gq8682sn',
    neusralId: 'EZCYngJb6b',
    image:
      'https://image.kmib.co.kr/online_image/2023/1213/2023121216331666035_1702366396_0018964033.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0018964033&code=61141211&cp=nv',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '국민일보',
    title: '채권 ‘큰 손’ 된 개인 투자자… 금리 인하 기대감에 올해 36兆 샀다',
    link: 'https://www.neusral.com/r?n=EZCYngJb6b',
    date: '23.12.13',
  },
  {
    id: 'pfxsj0rs0mplu2tvi2z9eupr',
    neusralId: 'QlCdWPgMGJ',
    image:
      'https://image.kmib.co.kr/online_image/2023/1213/2023121219180666443_1702376286_0924334511.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0924334511&code=11151300&cp=nv',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '국민일보',
    title: '‘상생금융 2兆’ 갹출 방법 두고 예민한 은행권',
    link: 'https://www.neusral.com/r?n=QlCdWPgMGJ',
    date: '23.12.13',
  },
  {
    id: 'hlckvnepcsl27ahc9m8uynwr',
    neusralId: 'mxC4MgLlGb',
    description:
      '\r\n[서울=뉴시스] 박성환 기자 = &quot;기존 시세보다 수억원 낮은 가격에 급매물이 많이 나오면서 집값이 빠르게 하락했어요',
    image: 'http://image.newsis.com/2023/06/12/NISI20230612_0019919203_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002554893',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '뉴시스',
    title: "'GTX 호재'도 무용지물…동탄 아파트값 한 달 새 5억 빠져",
    link: 'https://www.neusral.com/r?n=mxC4MgLlGb',
    date: '23.12.13',
  },
  {
    id: 'no6d911k32vz9ouohlartz9i',
    neusralId: 'VwCyo7Ql7b',
    description:
      '부동산 시장 침체 영향으로 공인중개소의 줄폐업이 이어지면서 한때 너도나도 뛰어들었던 공인중개사 시험에 대한 응시자도 급감하고 있다. 이런 탓에 공인중개소를 대상으로 시장을 넓혀 갔던 프롭테크(부동산 산업에 IT 서비스를 접목한 산업) 업계도 타격을 받고 있다.(그래픽...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300044.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01269366635838192&mediaCodeNo=257',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '이데일리',
    title: "공인중개업소 매달 1200곳 문닫아…프롭테크도 투자 유치 '뚝'",
    link: 'https://www.neusral.com/r?n=VwCyo7Ql7b',
    date: '23.12.13',
  },
  {
    id: 'gczki1lojiszmfz5sqy2b8b5',
    neusralId: '8XCjNnmPbR',
    description:
      '美 11월 물가상승률 3.1% 2% 향해 순항중  11월 미국 소비자물가지수CPI가 전년 동월 대비 3.1% 상승했다고 12일이하 현지시각 미국 노동부가 발표했다. 이 같은 물가 상승세는 지난 9월3.7%과 10월3.2%보다 더 낮아진 것이다. 시장 ...',
    image:
      'https://images.chosun.com/resizer/krAsDD2ms45TyNhZT1ERTdIeX1U=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/ODRT3SPZFNMFNEJ276FONW5EOQ.jpg',
    realLink:
      'https://www.chosun.com/economy/economy_general/2023/12/12/AJ3CYH5GMNFHDEZB6CRDKLNECA/?utm_source=naver&utm_medium=referral&utm_campaign=naver-news',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '조선일보',
    title: '美 11월 물가상승률 3.1%…”2%를 향해 순항중”',
    link: 'https://www.neusral.com/r?n=8XCjNnmPbR',
    date: '23.12.12',
  },
  {
    id: 'pcu3vkutkdkabifv6vno9egv',
    neusralId: 'r1CndPVPyd',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '연합뉴스',
    title: '美물가 우려에 유가 3.8% 급락…WTI 5개월만에 최저치',
    link: 'https://www.neusral.com/r?n=r1CndPVPyd',
    date: '23.12.13',
  },
  {
    id: 'muek7ggn9p8f0nsd3r0i3z9l',
    neusralId: 'MLC6zeWOZN',
    description:
      '이복현 금융감독원장이 12일 부동산 프로젝트파이낸싱(PF) 사업장에 대해 “옥석가리기”라는 표현을 직접 거론하면서 금융권에선 현재 시장에서 공통적으로 꼽고 있는 부실한 PF 사업장이나 건설회사 후보군들이 차례 대로 정리 절차를 맞게 될 것으로 보고 있다. 금융당국의 이번 방침은 부실 PF 이대로 놔두면 더욱 커져 터질 수 있기 때문에, ‘풍선의 바람빼기’처',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.8bb802c24e6747229a2800812a9b9ece.png',
    realLink: 'https://www.mk.co.kr/news/economy/10896949',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '매일경제',
    title: '134조 ‘빚 폭탄’ 한번에 터지면 한국 망해…‘좀비사업장’ 칼질 나서',
    link: 'https://www.neusral.com/r?n=MLC6zeWOZN',
    date: '23.12.12',
  },
  {
    id: 'yvylv6wc5cwjjsa3zh0vvtz3',
    neusralId: 'A4Cy8N3Nj0',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121215185016813_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121215185016813',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '머니투데이',
    title: '"이자도 못 내" 중소기업 죽을 맛…지방은행 \'깡통대출\' 47% 껑충',
    link: 'https://www.neusral.com/r?n=A4Cy8N3Nj0',
    date: '23.12.13',
  },
  {
    id: 'a6ds89yi6hcj7pakonxi3zwm',
    neusralId: 'ROCyaojon1',
    description:
      '앞서 왕 장관은 지난 5월 열린 제7차 세계정보회의(WIC)에서 &quot;차세대 기술인 AI는 경제·사회 발전을 위한 새로운 엔진이 될 것&quot;이라며 &quot;AI를 활용해 기업 주도 산업을 강화하고 경제 발전을 촉진하겠다&quot;고 밝혔다. 2017년 7월 중국 정부가 발표한 ‘차세대 인공지능 발전 계획’에선 2030년까지 중국 내 AI 산업 규모를 10조 위안(약 1700조원)까지 키워 세계 1위 AI 국가가 되겠다는 목표를 세웠다. 지난달 16일 중국 선전 본사에서 만난 제프 트램블리 화웨이 홍보 부사장은 &quot;미국 반도체산업협회에선 미 정부의 제재가 글로벌 반도체 산업을 해치고 있으며 오히려 중국 반도체 산업에 도움이 되고 있다고 말한다&quot;며 &quot;제재로 힘들었던 화웨이의 스마트폰 비즈니스도 이제 많이 회복된 상태&quot;라고 말했다.',
    image:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202312/13/5cdc8e2f-91cd-4214-b69a-72321c41c262.jpg/_ir_/resize/1280',
    realLink: 'https://www.joongang.co.kr/article/25214359',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '중앙일보',
    title: "'디플레 늪' 중국 반격…年19조 쏟아부어 '세계 최강 AI' 만든다 | 팩플",
    link: 'https://www.neusral.com/r?n=ROCyaojon1',
    date: '23.12.13',
  },
  {
    id: 'om2u2d5yljtqfdi1tug43b8i',
    neusralId: 'YKCRYnMYRa',
    description:
      '삼성전자, 갤럭시S24에 제미나이, GPT-4′ 등 최신 AI 탑재 가능성  삼성전자가 내달 선보이는 갤럭시 S24 시리즈에 자체 개발 인공지능AI과 함께 다른 GPT-4와 같은 타사의 최신 AI 기술을 탑재할 가능성이 제기된다. 13일 IT업계에 따르면 삼성전자는 다',
    image:
      'https://biz.chosun.com/resizer/_NOFPbW7MuBM90y4cQyVcY0S0v0=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/H4P4MZTN5ZHXFH5VR2WKEGUTSI.png',
    realLink:
      'https://biz.chosun.com/it-science/ict/2023/12/13/GNN2ITQDE5CLXIDF6XNIUHNZMI/?utm_source=naver&utm_medium=original&utm_campaign=biz',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '조선비즈',
    title: "삼성전자, 갤럭시S24에 '제미나이', 'GPT-4' 등 최신 AI 탑재 전망",
    link: 'https://www.neusral.com/r?n=YKCRYnMYRa',
    date: '23.12.13',
  },
  {
    id: 'e8tq21qbbh7zg5yavpona04t',
    neusralId: 'joCVNj8p0j',
    description:
      '미국 10개 주 AI 관련 검색어 조사\n캘리포니아주가 가장 많은 검색\nAI 관련 검색어 1위는 ‘챗GPT’',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/11/news-p.v1.20231211.2358a56de00d4b13b46eec8ddd9ad94a.png',
    realLink: 'https://www.mk.co.kr/news/it/10896022',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '매일경제',
    title: '시장 선점 효과 무섭네...“생성형AI 하면? 역시 챗GPT”',
    link: 'https://www.neusral.com/r?n=joCVNj8p0j',
    date: '23.12.12',
  },
  {
    id: 'l6wqaopchjt26f8au0s92cp3',
    neusralId: 'YKCRYnJ8nZ',
    description:
      "佛미스트랄 자체 모델 공개몸값 2.6조원 평가 스타트업범용 아닌 특정영역에 특화'유럽의 AI 희망'으로 불려EU, 美빅테크 견제 방침에獨 등 유럽회사 속속 AI 도전",
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01160116000001_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/it/10896822',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '매일경제',
    title: '한발늦은 유럽…AI 소형모델로 틈새 노린다',
    link: 'https://www.neusral.com/r?n=YKCRYnJ8nZ',
    date: '23.12.12',
  },
  {
    id: 'vevi8ohym9lijiar901a3yft',
    neusralId: 'k4CQne1e1G',
    description:
      'MIT그룹, AI 거버넌스 백서 발표\n악용될 경우 플랫폼 사용자에도 책임\nAI 규제하는 관리 감독 기구 필요\n“적절한 규제, AI 발전에 도움”',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.e501673dcb8248998bfef97462590e80.png',
    realLink: 'https://www.mk.co.kr/news/it/10896367',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '매일경제',
    title: 'MIT그룹, AI 거버넌스 발표… AI 규제 논의 본격화',
    link: 'https://www.neusral.com/r?n=k4CQne1e1G',
    date: '23.12.12',
  },
  {
    id: 'm8i65kge52y4lm3vqjveicmm',
    neusralId: 'ROCyaoYbx1',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121015010391205_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121015010391205',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '머니투데이',
    title: 'R&D 강화 나선 네이버웹툰…"AI 인력, 100명 채운다"',
    link: 'https://www.neusral.com/r?n=ROCyaoYbx1',
    date: '23.12.12',
  },
  {
    id: 'dbgn1hz5rr7tjvkm9lrhtrts',
    neusralId: 'BnCkynKYz7',
    description:
      '[파이낸셜뉴스] 네이버 자회사 스노우가 인공지능(AI) 사진편집 애플리케이션(앱) 에픽을 통해 셀피 이미지를 기반으로 크리스마스 콘셉트의 이미지를 받아볼 수 있는 ‘AI 크리스마스’ 서비스를 출시했다고 12일 밝혔다.이번 서비스는 지난 9월 처음 선보인 뒤 열풍을 일으킨 ‘AI 이어북’의 연장선에서 출시됐다.&nbsp;..',
    image:
      'https://image.fnnews.com/resource/media/image/2023/12/12/202312121059476428_l.jpg',
    realLink: 'https://www.fnnews.com/news/202312121054035455',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '파이낸셜뉴스',
    title: '네이버 스노우 "AI가 만든 크리스마스 이미지 받아보세요"',
    link: 'https://www.neusral.com/r?n=BnCkynKYz7',
    date: '23.12.12',
  },
  {
    id: 'idqwws3ly9ooru5ki4uhzebx',
    neusralId: '47Cpoybz8g',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '연합뉴스',
    title: '11번가, 테크 콘퍼런스…"AI 기술로 상품·가격·검색 지원"',
    link: 'https://www.neusral.com/r?n=47Cpoybz8g',
    date: '23.12.12',
  },
  {
    id: 'xfld0q8glsksp2t3ppf95dcs',
    neusralId: '8XCjNnLaMJ',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121209230665490_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121209230665490',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '머니투데이',
    title: "AI 웹툰 '리얼드로우', 22억원 프리A 투자유치…알토스 주도",
    link: 'https://www.neusral.com/r?n=8XCjNnLaMJ',
    date: '23.12.12',
  },
  {
    id: 'ydv5uh7jjy5zn4ekgps9qunw',
    neusralId: 'wLCEAzbPjN',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121210262457957_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121210262457957',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '머니투데이',
    title: "오이사공, 생성 AI 기반 HR 동료 'AI 인사쟁이' 무료 오픈",
    link: 'https://www.neusral.com/r?n=wLCEAzbPjN',
    date: '23.12.12',
  },
  {
    id: 'ijizbd5gmxf20ndp3odkr61z',
    neusralId: 'p0CdaGpd08',
    description: '(사진 왼쪽부터) NIA 이용진 본부장, 미니레코드 김명군...',
    image: '/2023/12/12/2023121208484554774_l.jpg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121208563881350',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '디지털데일리',
    title: "NIA-업스테이지, '한국어 초거대 LLM' 시상식 개최",
    link: 'https://www.neusral.com/r?n=p0CdaGpd08',
    date: '23.12.12',
  },
  {
    id: 'owbd72cd8dcrolt7lgep7rcb',
    neusralId: 'BnCkynKrgB',
    realLink: 'https://www.news1.kr/articles/5259064',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '뉴스1',
    title: '국내 연구진, 인공지능 기반 수면 질환 검사 알고리즘 개발',
    link: 'https://www.neusral.com/r?n=BnCkynKrgB',
    date: '23.12.12',
  },
  {
    id: 'qg4uilmqonv9df95l0smph1h',
    neusralId: 'aVCVRbmGYp',
    description: '서종훈 스켈터랩스 개발총괄 [ⓒ 스켈터랩스]...',
    image: '/2023/12/11/2023121118240344617_l.jpg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121118274790405',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '디지털데일리',
    title:
      '[인터뷰] "오픈AI 위협? 맞서볼 만하다" 스켈터랩스, 대화형 AI 기술로 진격',
    link: 'https://www.neusral.com/r?n=aVCVRbmGYp',
    date: '23.12.12',
  },
  {
    id: 'ah2nfheodh1rpx4el5by1v8z',
    neusralId: '8XCjNnLl0X',
    description:
      "인공지능(AI) 전문 마인즈앤컴퍼니(대표 전상현, 고석태)는 우리은행의 생성 인공지AI 기반 'AI 뱅커' 서비스 구축을 시작한다고 12일 밝혔다. 마인즈앤컴퍼니는 지난 10월 해당 사업 수행자로 선정됐다. 생성 AI를 활용해 고객 대상 금융상담 서비스를 제공하는 '금융권 최초의 사례'라는 설명이다.마인즈앤컴퍼니는 금융상담 서비스를 위한 AI 모델을 구축, 이를 지속적으로 학습 및 관리해 다양한 고객 상담에 대응하는 AI 뱅커 솔루션을 개발한다.고객 대상 업무 지원을 강화하는 생성 AI까지 도입한다. 금융 분야에 특화한 생성 AI",
    image:
      'https://cdn.aitimes.com/news/thumbnail/202312/155807_167012_497_v150.jpg',
    realLink: 'https://www.aitimes.com/news/articleView.html?idxno=155807',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: 'AI타임스',
    title: '마인즈앤컴퍼니, 우리은행 ‘생성 AI 뱅커 서비스’ 구축',
    link: 'https://www.neusral.com/r?n=8XCjNnLl0X',
    date: '23.12.12',
  },
  {
    id: 'd06qmzmjbzdtjzqgrzhkk8l2',
    neusralId: 'Z2C0oBbeMR',
    image:
      'http://file.mk.co.kr/meet/neds/2023/12/image_readtop_2023_951956_17023684815747410.jpg',
    realLink: 'http://game.mk.co.kr/view.php?year=2023&no=951956',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '매일경제',
    title: '앤유PC방 선론칭 AI 게임 코칭 서비스 ‘GGQ’ 인기',
    link: 'https://www.neusral.com/r?n=Z2C0oBbeMR',
    date: '23.12.12',
  },
  {
    id: 'vp5ayuxqk651xl2bxrlmt8j6',
    neusralId: '8XCjNnLpkR',
    description:
      '-카카오 김범수, 브라이언톡에서 &lsquo;AI&rsquo; 강조-일상생활 관련 신규사업 진출 그만&hellip;내년부터 AI 본격 드라이브-&ldquo;우수 AI 아이디어 제시한 임직원에 포상하겠다&rdquo;-필요하다면 임직원 절...',
    image: '/2023/12/11/2023121115591900989_l.jpeg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121217561383472',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '디지털데일리',
    title: '[단독] 카카오 김범수, ‘AI’ 전력투구…아이디어 포상까지 내걸어',
    link: 'https://www.neusral.com/r?n=8XCjNnLpkR',
    date: '23.12.12',
  },
  {
    id: 'bvey2acfwik63x1kjolaslqb',
    neusralId: 'MLC6ze8pZd',
    description:
      '에마뉘엘 마크롱 프랑스 대통령이 최근 유럽연합(EU) 회원국들이 합의한 AI규제법안(AI Act)에 반대 목소리를 내고 있다. 미국, 영국, 중국의 경쟁자들에 비해 상대적으로 약한 EU AI의 혁신을 가로막을 수 있다는 이유에서다.에마뉘엘 마크롱 프랑스 대통령. (사...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200047.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01269366635837864&mediaCodeNo=257',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '이데일리',
    title: '마크롱 “EU AI혁신 막을 것” 경고…AI규제안 막판 변수 떠올라',
    link: 'https://www.neusral.com/r?n=MLC6ze8pZd',
    date: '23.12.12',
  },
  {
    id: 'c3sao368zl1djnzlc6pvwieb',
    neusralId: 'QlCdWPemBP',
    description:
      '\n시가총액 세계 2위 기업인 마이크로소프트(MS)가 미국 노동조합과 &#039;인공지능(AI) 동맹&#039;을 체결했다. 지난해 11월 시작된 챗GPT 열풍으로 &#039;AI가 사람의 일자리를 채울 것&#039;이란 우려가 커져 가는 가운데, 테크업체와 노동자들이 AI 이슈를 놓고 협력 관계를 맺은 건 처음이다. 세계 AI 개발 경쟁을 선도하는 MS의 선제적 움직임은 다른 기업들의 후속 ',
    image:
      'https://newsimg-hams.hankookilbo.com/2023/12/12/9ebd4485-bff7-491d-b917-6a830fc9d82b.jpg?t=20231213173158',
    realLink:
      'https://www.hankookilbo.com/News/Read/A2023121213440003628?did=NA',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '한국일보',
    title:
      '"AI, 일자리 뺏을 것" 우려에... MS, 미국 최대 노조와 사상 첫 \'AI 협력\'',
    link: 'https://www.neusral.com/r?n=QlCdWPemBP',
    date: '23.12.12',
  },
  {
    id: 'ppjflau9dn17jqgdaql17tfx',
    neusralId: 'nECyPQZYxB',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121216391953481_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121216391953481',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '머니투데이',
    title: '한국에 세계 최초 국제인공지능저작권관리기구 출범 추진',
    link: 'https://www.neusral.com/r?n=nECyPQZYxB',
    date: '23.12.12',
  },
  {
    id: 'ifdjgswgyxzf60txyu6rypud',
    neusralId: 'aVCVRbmgOl',
    description:
      '&#039;AI칩의 제왕&#039; 엔비디아, AI 기업들의 초석 투자자 됐다, 김리안 기자, 국제',
    image: 'https://img.hankyung.com/photo/202312/ZA.35305453.1.jpg',
    realLink: 'https://www.hankyung.com/article/202312129667i',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '한국경제',
    title: "'AI칩의 제왕' 엔비디아, AI 기업들의 초석 투자자 됐다",
    link: 'https://www.neusral.com/r?n=aVCVRbmgOl',
    date: '23.12.12',
  },
  {
    id: 's8ntrnsj137irxrt0yb3rlgr',
    neusralId: 'GkCGKPmwPP',
    description:
      '개도국·저개발국가에 2050년까지 배상 땐 연 20조 달할 듯중국 6529조 1위…국내 기업 책임액 ...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000422300040101.jpg',
    realLink:
      'https://www.khan.co.kr/environment/climate/article/202312122133005',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '경향신문',
    title: '한국, 온실가스 배출 ‘기후 부채’는 517조원 ‘세계 9위’',
    link: 'https://www.neusral.com/r?n=GkCGKPmwPP',
    date: '23.12.12',
  },
  {
    id: 'ah85vnzyfyqwodjvef8gc2i9',
    neusralId: 'p0CdaGpnQr',
    description:
      '&ldquo;에어컨만 잘 틀어도 아낄 수 있는 전기 요금이 연 1조 달러&rdquo; 제28차 유엔기후변화협약 당사국총회(COP28)에서 미국 등 60여개 국가는 지난 5일 국제 냉방 서약(Global Cooling Pledge)에 가입하며 2050년까지 냉방 관련 온실가스 배출량을 2022년의 68% 이상 줄이기로 했다. 이 목표를 달성하면 2050년까지 온실가스를 약 780억t 감축할 전망이다. 뿐만 아니라 전세계 소비자들은 2050년 전기 요금으로만 연 1조 달러를 아낄 수 있을 것으...',
    image:
      'https://res.heraldm.com/content/image/2023/08/09/20230809000631_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000664',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '헤럴드경제',
    title:
      '“전기 요금만 1300조원” 어마어마하게 아낀다…에어컨 잘 틀면 벌어지는 놀라운 일 [지구, 뭐래?]',
    link: 'https://www.neusral.com/r?n=p0CdaGpnQr',
    date: '23.12.12',
  },
  {
    id: 't7kgafm5alccaltc0w0h0bep',
    neusralId: 'aVCVRbm8z4',
    description:
      '기후테크가 온다 COP28가 인정했다...기후위기 해결사 떠오른 한국 우주기업들 SIA·나라스페이스, 기후테크 중심으로 국제 활동 넓혀 개도국 기상 예측부터 대기 중 메탄 감시까지 전 지구적 차원 관측 중요해우주 기반 기후테크 수요 늘 것 국방과 통신 분야에서 주로 활',
    image:
      'https://biz.chosun.com/resizer/v-Y-Yrbm5bGYb7lQChrhq_9OERI=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/7BNL6YQPYBH6XMB6B6YGFG4H6U.jpg',
    realLink:
      'https://biz.chosun.com/science-chosun/technology/2023/12/12/ILHB7IN3GVCOZFIUA2DX4QZ3XI/?utm_source=naver&utm_medium=original&utm_campaign=biz',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '조선비즈',
    title:
      '[기후테크가 온다] COP28가 인정했다...기후위기 해결사 떠오른 한국 우주기업들',
    link: 'https://www.neusral.com/r?n=aVCVRbm8z4',
    date: '23.12.12',
  },
  {
    id: 'l1v2l7rfmog7jskvm2sjbg2u',
    neusralId: 'eWCWLrJX7W',
    description:
      '수소연료가 탄소 배출량이 많은 건설&middot;산업 중장비의 탄소중립을 이끌 핵심 수단으로 부상했다. 국내외에서 관련 연료전지 및 내연기관 연구개발이 활발히 진행되고 있어 동향을 알아보는 자리가 마련된다.  건설기계부품연구원(원장 채규남)이 오는 13일 서울 역삼동 SC컨벤션센터에서 &lsquo;제5회 수소 건설&middot;산업기계 발전포럼&rsquo;을 연다고 밝혔다.  포럼에서 ▷HD현대인프라코어 신명호 책임연구원이 &lsquo;14t급 수소로더 개발 ...',
    image:
      'https://res.heraldm.com/content/image/2023/12/12/20231212000625_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000667',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '헤럴드경제',
    title: '“수소연료, 건설기계 탄소중립 핵심자원”',
    link: 'https://www.neusral.com/r?n=eWCWLrJX7W',
    date: '23.12.12',
  },
  {
    id: 'foihuw4dyeedkm8m7u7iwkq9',
    neusralId: 'NACn3XjNPL',
    description:
      '“겨울에는 충전하면 150㎞밖에 못 가요. 이럴 줄 알았으면 전기 말고 LPG(액화석유가스) 트럭을...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000433400039941.jpg',
    realLink: 'https://www.khan.co.kr/economy/auto/article/202312122200035',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '경향신문',
    title: '디젤 빠질 1톤 트럭…LPG에 시선 집중',
    link: 'https://www.neusral.com/r?n=NACn3XjNPL',
    date: '23.12.12',
  },
  {
    id: 'gzk7o2vqotru091h70okbq5g',
    neusralId: 'qkCZqxl628',
    description:
      '은행대상 / 강신숙 Sh수협은행장10월까지 순이익 3100억작년 전체 번 돈보다 많아총자산 57조…7년새 2배무디스 평가 신용등급 올라어업·수산·해양 맞춤 서비스해양수산금융 발전에도 기여',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01110205000002_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/special-edition/10896579',
    category: 'ESG 뉴스',
    tag: '사회공헌/인권경영(SOCIAL)',
    reporter: '매일경제',
    title: "수협 1호 여성행장 … 최대실적에 내실까지 '두토끼' 잡아",
    link: 'https://www.neusral.com/r?n=qkCZqxl628',
    date: '23.12.12',
  },
  {
    id: 'dqkpe8dzouh3uh35iayb4gnu',
    neusralId: 'EZCYngJQwL',
    description:
      'SK그룹이 연말을 맞아 이웃사랑 성금 120억원을 사회복지공동모금회에 기부(사진)했다고 12일 밝혔...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000410100039001.jpg',
    realLink:
      'https://www.khan.co.kr/people/people-general/article/202312122048015',
    category: 'ESG 뉴스',
    tag: '사회공헌/인권경영(SOCIAL)',
    reporter: '경향신문',
    title: 'SK그룹, 사회복지공동모금회에 120억원 기부',
    link: 'https://www.neusral.com/r?n=EZCYngJQwL',
    date: '23.12.12',
  },
  {
    id: 'kuoya6covkelp6fowtwx7jq6',
    neusralId: 'qkCZqx7Yml',
    image:
      'https://image.kmib.co.kr/online_image/2023/1213/2023121219150566437_1702376105_0924334613.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0924334613&code=11151300&cp=nv',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '국민일보',
    title: '은행권 셀프 연임 막는다… 이복현표 지배구조 30개 원칙 제시',
    link: 'https://www.neusral.com/r?n=qkCZqx7Yml',
    date: '23.12.13',
  },
  {
    id: 's6ocbkwjoyhfe3q7ba0z5cuh',
    neusralId: 'KYCzjKm8qz',
    description:
      '은행권 이사회를 ‘일하는 이사회’로 만들기 위한 모범관행이 마련됐다. 한국의 고질적 문제로 거론되는 이사회의 취약한 견제...',
    image:
      'https://flexible.img.hani.co.kr/flexible/normal/640/383/imgdb/original/2023/1212/20231212502995.jpg',
    realLink: 'https://www.hani.co.kr/arti/economy/finance/1120107.html',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한겨레',
    title: '은행권 ‘일하는 이사회’ 만들 수 있을까…금감원, 모범관행 마련',
    link: 'https://www.neusral.com/r?n=KYCzjKm8qz',
    date: '23.12.12',
  },
  {
    id: 'g6thdtkqcogjtzpz5lh0vrcw',
    neusralId: 'XJCeWYGYy6',
    description:
      '[이데일리 정두리 기자] 내부통제와 관련한 금융사 임원의 책임소재를 명확히 하는 책무구조도 도입이 내년 하반기 시행 예정인 가운데 금융권이 대책 마련에 분주하다. 전문가들은 앞으로 책무구조도 도입으로 해당임원의 책무가 명확해짐에 따라 임원 신규선임뿐만 아니라 기존 임원...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300034.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01230006635838192&mediaCodeNo=257',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '이데일리',
    title: '내년부터 책무구조도 도입…금융사 내부통제 어떻게 바뀌나',
    link: 'https://www.neusral.com/r?n=XJCeWYGYy6',
    date: '23.12.13',
  },
  {
    id: 'mhobcbpqi83201f9muu2kaps',
    neusralId: 'EZCYngJgVo',
    description: '이창민의 한국 경제 속 재벌 탐구',
    image:
      'https://flexible.img.hani.co.kr/flexible/normal/800/481/imgdb/original/2023/1212/20231212503404.jpg',
    realLink:
      'https://www.hani.co.kr/arti/economy/economy_general/1120153.html',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한겨레',
    title: "5공 때로 퇴보한 정경유착…재벌들 `울며 떡볶이 먹기'",
    link: 'https://www.neusral.com/r?n=EZCYngJgVo',
    date: '23.12.13',
  },
  {
    id: 'qqzsl91luxgrakhmhufh2ods',
    neusralId: 'yMCle6YdXQ',
    description:
      '&quot;3년 만에 규정 삭제&quot;…KT&amp;G, &#039;내부 출신 사장&#039; 원칙 깨지나 [박동휘의 컨슈머 리포트] , 박동휘 기자, 경제',
    image: 'https://img.hankyung.com/photo/202312/01.35306319.1.jpg',
    realLink: 'https://www.hankyung.com/article/202312118605i',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한국경제',
    title:
      "행동주의 압박에…KT&G, '내부 출신 사장' 원칙 깨지나 [박동휘의 컨슈머 리포트]",
    link: 'https://www.neusral.com/r?n=yMCle6YdXQ',
    date: '23.12.12',
  },
  {
    id: 'enl1cm71zec0ukaglf73enyd',
    neusralId: 'yMCle6YB03',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121216573886405_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121216573886405',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '머니투데이',
    title: '위믹스, 코인원 고팍스 코빗 이어 빗썸에도 재상장',
    link: 'https://www.neusral.com/r?n=yMCle6YB03',
    date: '23.12.12',
  },
  {
    id: 's48yenpaffne0lzuivbs69jz',
    neusralId: 'mxC4Mg8nwM',
    description:
      '[디지털투데이 강주현 기자] 구글이 내년 1월부터 미국에서 가상자산(암호화폐) 신탁 광고를 허용한다. 11일(현지시간) 더블록에 따르면 구글은 이같은 내용의 업데이트를 발표했다. 구글 업데이트 내용은 내년 1월 29일부터 적용된다. 구글은 더블록에 &quot;인증 절차를 완료한 뒤 미국 증권거래위원회(SEC)에 등록한 가상자산 신탁의 경우 미국에서 광고가 가능하다&quot;고 말했다. 구글은 지난해 9월 도박 관련 콘텐츠를 광고하지 않는다는 조건에서 대체불가토큰(NFT) 게임 홍보를 허용한 뒤로 점차 가상자산 친화적인 광고 정책을 발표하고 있다. 올',
    image:
      'https://cdn.digitaltoday.co.kr/news/thumbnail/202312/497833_463734_1019_v150.jpg',
    realLink:
      'http://www.digitaltoday.co.kr/news/articleView.html?idxno=497833',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '디지털투데이',
    title: '구글, 미국서 가상자산 신탁 광고 허용',
    link: 'https://www.neusral.com/r?n=mxC4Mg8nwM',
    date: '23.12.12',
  },
  {
    id: 'll29enqt3twr1tkih81fyzv3',
    neusralId: 'MLC6ze8YYQ',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '연합뉴스',
    title: "'너무 올랐나' 비트코인 6% 급락…한때 4만 달러도 위협",
    link: 'https://www.neusral.com/r?n=MLC6ze8YYQ',
    date: '23.12.12',
  },
  {
    id: 'cntn63h2dy29u9mjsvjr6bja',
    neusralId: 'KYCzjKmQB0',
    description:
      '빗썸이 수수료 무료 정책에 힘입어 11월 국내 암호화폐 거래량 점유율을 약 26% 수준으로 끌어올렸다. 수수료 무료가 아닐 경우 282억 원의 수수료 수입을 올렸을 것으로 추정된다. 빗썸은 창립 10주년 기념 이벤트로, 상장 코인 전체(256종)에 대해 거래 수수료를 받지',
    image:
      'https://i1.wp.com/www.blockmedia.co.kr/wp-content/uploads/2024/12/빗썸_단독_로고.jpg?fit=598%2C359&ssl=1',
    realLink: 'https://www.blockmedia.co.kr/archives/425590',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '블록미디어',
    title: '빗썸, 점유율 25% 넘겼다…암호화폐 11월 거래량 지난해 초 수준 회복',
    link: 'https://www.neusral.com/r?n=KYCzjKmQB0',
    date: '23.12.12',
  },
  {
    id: 'x91j7takazx42vj8knhbwe6q',
    neusralId: 'zRCyJzj1Yx',
    description:
      '세계 최대 가상자산 거래소 바이낸스의 거래소 점유율이 30%까지 떨어졌다. 12일 씨씨데이터 등에 따르면 바이낸스의 현물 시장 점유율은 올해 초 55%에서 12월 현재 30.1%를 기록하고 있다. 이 추세라면 곧 20%대로 떨어질 것으로 보인다.바이낸스의 현물 거래량도 1월 4740억 달러에서 9월 1140% 달러로 70% 넘게 줄었다.다만 바이낸스는 여전히 점유율 1위 자리를 지키고 있다. 2위는 ‘오케이엑스(OKX)’로 현재 점유율은 8%다. 1위와 2위의 점유율 차이는 크지만, 오케이엑스의 확산 속도가 상당히 빠르다. 연초 점',
    image:
      'https://cdn.bonmedia.kr/news/thumbnail/202312/1588_1706_43_v150.jpg',
    realLink: 'https://www.bonmedia.kr/news/articleView.html?idxno=1588',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '비온미디어',
    title: '바이낸스, 거래소 점유율 30%로 하락',
    link: 'https://www.neusral.com/r?n=zRCyJzj1Yx',
    date: '23.12.12',
  },
  {
    id: 'us57voz72a4cibhh0c5argw5',
    neusralId: 'eWCWLrJqdB',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '지디넷코리아',
    title: "기사회생 솔라나, '이더리움 킬러' 자리 되찾나",
    link: 'https://www.neusral.com/r?n=eWCWLrJqdB',
    date: '23.12.12',
  },
  {
    id: 'cg4zazg0i7uxqz5bdqzsg5qh',
    neusralId: 'BnCkynKG64',
    description:
      '이더리움의 라이벌 코인으로 유명한 아발란체(AVAX)가 글로벌 암호화폐(가상자산) 시장에서 10위 안에 안착하며 코인 투자자들의 주목을 받고 있다. 국',
    image:
      'https://economist.co.kr/data/ecn/image/2023/12/12/ecn20231212000030.png',
    realLink: 'https://economist.co.kr/article/view/ecn202312120025',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '이코노미스트',
    title: '아발란체, 조정 맞은 코인 시장서 85% ‘껑충’…왜?',
    link: 'https://www.neusral.com/r?n=BnCkynKG64',
    date: '23.12.12',
  },
  {
    id: 'mrsnjlv02q2ntwuguh1sm2kr',
    neusralId: 'joCVNjKGZq',
    description:
      '솔라나 기반 밈코인 봉크(BONK)가 한 달 새 370% 급등하며 시가총액 3위 밈코인에 등극했다. 11일(이하 현지시간) 코인텔레그래...',
    image: 'https://newsimg.sedaily.com/2023/12/12/29YHG4L857_1.jpg',
    realLink: 'https://www.sedaily.com/NewsView/29YHG4L857',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '서울경제',
    title: '솔라나 BONK, 한달새 370% 급등…3위 밈코인 등극',
    link: 'https://www.neusral.com/r?n=joCVNjKGZq',
    date: '23.12.12',
  },
  {
    id: 't91mtyvaxqee5do8nwf5gqoq',
    neusralId: 'NACn3XqrwJ',
    description:
      '[아이티데일리] 최근 한국정보인증이 출시한 NFT도메인서비스 ‘WEB3ID(web3id.kr)’ 판매량이 급증하면서 1인당 평균 구매 객단가가 10만 원을 넘어선 것으로 나타났다. 한국정보인증은 비트코인이 반감기와 미국 상장지수펀드(ETF)상장 기대감으로 인해 1년 만에 6천만 원선을 돌파하면서 이러한 호조세가 NFT(대체불가토큰) 시장에 영향을 끼친 것으로 분석했다.지난 8월 한국정보인증(대표 김상준)은 미국 유니콘 기업 ‘언스토퍼블 도메인’과 한국 유통 파트너십 제휴를 맺고 NFT도메인 서비스 ‘WEB3ID’를 제공, 국내 시장',
    image:
      'https://cdn.itdaily.kr/news/thumbnail/202312/218797_223546_1947_v150.jpg',
    realLink: 'http://www.itdaily.kr/news/articleView.html?idxno=218797',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '아이티데일리',
    title: '비트코인 상승에 NFT도메인 ‘WEB3ID’판매량 급증',
    link: 'https://www.neusral.com/r?n=NACn3XqrwJ',
    date: '23.12.12',
  },
  {
    id: 'uuyo17t6wy5yznryj57z5y5s',
    neusralId: '68Ce0PwExa',
    description:
      '윤차용 예금보험공사 부사장(사진 왼쪽)과 오세진 코빗 대표이...',
    image: '/2023/12/12/2023121217453751360_l.jpg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121217464864771',
    category: '블록체인 뉴스',
    tag: '가상자산/월렛/거래소',
    reporter: '디지털데일리',
    title: '코빗, 예금보험공사와 가상자산 상호교류 목적 업무협약 체결',
    link: 'https://www.neusral.com/r?n=68Ce0PwExa',
    date: '23.12.12',
  },
  {
    id: 'k881sftxvo7xtxhx4bofdfa4',
    neusralId: 'mxC4MgLqm4',
    description:
      'NFT 투자로 이익 내도 소득세 안낸다, &quot;경제 가치보단 수집에 특화&quot; 금융당국, 가상자산서 제외',
    image: 'https://static.hankyung.com/img/logo/logo-news-sns.png?v=20201130',
    realLink: 'https://www.hankyung.com/article/2023121215211',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '한국경제',
    title: 'NFT 투자로 이익 내도 소득세 안낸다',
    link: 'https://www.neusral.com/r?n=mxC4MgLqm4',
    date: '23.12.12',
  },
  {
    id: 'x7oj19ijdmpdz31q1471um8s',
    neusralId: '3jCARk3eMZ',
    description:
      '(조세금융신문=안종명 기자) 대체불가토큰(NFT)이 내년 7월부터 시행되는 가상자산이용자보호법 적용 대상에서 제외된다. 아울러 시행령에 따라 가상자산 사업자는 이용자의 가상자산 중 80%이상을 콜드월렛(인터넷 차단된 가상화폐 지갑)에 보관하도록해 이용자가 사용하는 가상자산의 안정성을 높이도록 했다. 금융위원회는 지난 11일부터 내년 1월 22일까지 ‘가상자',
    image:
      'https://www.tfmedia.co.kr/data/photos/20231250/art_17023507378487_c40149.jpg',
    realLink: 'https://www.tfmedia.co.kr/news/article.html?no=154886',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '조세금융신문',
    title: "대체불가토큰(NFT) 가상자산이용자보호법 대상서 '제외'",
    link: 'https://www.neusral.com/r?n=3jCARk3eMZ',
    date: '23.12.12',
  },
  {
    id: 'rv6uyh401umlyzs09eucngwe',
    neusralId: '02CzLgydKZ',
    description:
      '하나증권이 토큰증권(ST)플랫폼을 내년 8월 공개한다. 이후 한 달정도 안정화기간을 거쳐 정식으로 서비스할 계획이다. 하나증권은 ST플랫폼을 통해 발행부터 유통까지 토큰증권 전체 영역을 아우르는 블록체인 생태계를 구축한다는 계획이다. 다양한 자산을 토큰화하는 작업도 병행한다. 국내 최고 연예기획사와도 조각투자와 관련한 업무제휴를 추진할 방침이다. 12일 증',
    image: 'https://static.mk.co.kr/facebook_mknews.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896551',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '매일경제',
    title: '하나증권, 토큰증권 플랫폼 내년 8월에 나온다',
    link: 'https://www.neusral.com/r?n=02CzLgydKZ',
    date: '23.12.12',
  },
  {
    id: 'eykpnjqtcdc2hvori1jxscmy',
    neusralId: 'LBCp1jkwEW',
    description:
      '미술품 경매회사 케이옥션(102370)의 자회사인 투게더아트가 토큰증권발행(STO) 관련 사업을 본격 추진한다. 투게더아트는 신한투자증권과 미술품 투자계약증권 발행 업무 및 토큰증권 사업의 추진을 위한 업무협약(MOU)을 체결했다고 12일 밝혔다. 양사는 미술품 투자...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200394.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=02151686635837864&mediaCodeNo=257',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '이데일리',
    title: '투게더아트, 신한투자증권과 STO 협업 추진',
    link: 'https://www.neusral.com/r?n=LBCp1jkwEW',
    date: '23.12.12',
  },
  {
    id: 'y2ux7qjbrmc8ie4lu6u2b1bx',
    neusralId: 'zRCyJzjBQ7',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121209202784119_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121209202784119',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '머니투데이',
    title: "미술품 조각투자 '테사', 나이스피앤아이 ST평가협의체 합류",
    link: 'https://www.neusral.com/r?n=zRCyJzjBQ7',
    date: '23.12.12',
  },
  {
    id: 'zu77lsxw1rjg6b4cvm9xrsab',
    neusralId: 'xACA7aglMk',
    image: 'https://menu.mt.co.kr/common/meta/meta_mt_twonly.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121217481360232',
    category: '블록체인 뉴스',
    tag: 'NFT/STO',
    reporter: '머니투데이',
    title: "아이티센, 지앤비에스 에코와 에너지 멀티플랙스 기반 STO 사업 '맞손'",
    link: 'https://www.neusral.com/r?n=xACA7aglMk',
    date: '23.12.12',
  },
  {
    id: 'm5c5aer4drqmjxwljbvttcs8',
    neusralId: 'joCVNjK8ZY',
    description:
      '국내 주요 가상자산이 하락세다. 12일 오후 1시 40분 빗썸에서 국내 비트코인(BTC)은 전일 대비 1.11% 하락한 4902만 4000원에 ...',
    image: 'https://newsimg.sedaily.com/2023/12/12/29YHF1DKNF_1.png',
    realLink: 'https://www.sedaily.com/NewsView/29YHF1DKNF',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '서울경제',
    title: '[점심브리핑] 美 제재 강화에 테더, 161개 지갑 동결',
    link: 'https://www.neusral.com/r?n=joCVNjK8ZY',
    date: '23.12.12',
  },
  {
    id: 'xz1dlxdzihg276vumx3tb439',
    neusralId: 'xACA7agrgA',
    description:
      '\r\n[서울=뉴시스]홍연우 기자 = 가상화폐(가상자산) 거래소 빗썸 관계사 주가조작 의혹 등으로 구속돼 재판받고 있던 사업가 강종현(41)씨가 풀려난다',
    image: 'http://image.newsis.com/2023/02/01/NISI20230201_0019732341_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002555243',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '뉴시스',
    title: "'빗썸 실소유주' 의혹 강종현, 구속 10개월만 보석 석방",
    link: 'https://www.neusral.com/r?n=xACA7agrgA',
    date: '23.12.12',
  },
  {
    id: 'g9kpouar1buna01plrccfij9',
    neusralId: '02CzLgy3xd',
    description:
      '엘살바도르가 비트코인 채권 발행을 위한 규제 허가를 확보했다.12일(현지시간) 엘살바도르 국가 비트코인 사무국(National Bitcoin Office)은 공식 채널을 통해 볼케이노 채권(Volcano Bond)이 디지털자산위원회(CNAD)의 승인을...',
    image: 'https://f1.tokenpost.kr/2022/02/mg8g6t5gql.jpg',
    realLink: 'https://www.tokenpost.kr/article-155860',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '토큰포스트',
    title: '엘살바도르 "비트코인 채권 규제 승인 받았다...내년 1분기 발행"',
    link: 'https://www.neusral.com/r?n=02CzLgy3xd',
    date: '23.12.12',
  },
  {
    id: 'hybizwqm4dxhth5dett7k48x',
    neusralId: '02CzLgpg4Y',
    realLink: 'https://www.news1.kr/articles/5259120',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '뉴스1',
    title:
      '"코인 MM은 불법" 못박은 금융당국…거래소 \'상장 유지\' 기준 강화되나',
    link: 'https://www.neusral.com/r?n=02CzLgpg4Y',
    date: '23.12.13',
  },
  {
    id: 'pddzi9m5ibpn2kx5ustdc798',
    neusralId: 'bXC8GNnxNP',
    description:
      '\n&#039;비밀 계좌의 성지&#039;로 불리던 스위스나 영국령 케이맨제도 등이 거부들의 금고지기 역할을 한 것도 옛말이 된 지 오래. 조세피난처 맞먹는 금융 혜택을 앞세운 아랍에미리트(UAE) 수도 아부다비가 글로벌 자금을 블랙홀처럼 빨아들이고 있다. 전 세계 억만장자들의 뭉칫돈이 걸프만 부국 UAE로 속속 이동하는 이유는 뭘까. 미국 블룸버그통신은 11일(현지시간) &#034;',
    image:
      'https://newsimg-hams.hankookilbo.com/2023/12/12/f754a58b-d06c-4e7b-b42a-af637292d46e.jpg?t=20231213172829',
    realLink:
      'https://www.hankookilbo.com/News/Read/A2023121214230002979?did=NA',
    category: '블록체인 뉴스',
    tag: '정책/규제',
    reporter: '한국일보',
    title:
      "억만장자 '피난처'로 떠오른 아부다비... 자오창펑, 레이 달리오 돈이 달려온다",
    link: 'https://www.neusral.com/r?n=bXC8GNnxNP',
    date: '23.12.12',
  },
  {
    id: 'anogcy4zced3lnm9re6sezbz',
    neusralId: 'wLCEAz0zpY',
    description:
      '주요 패션업체 재고자산 전년 대비 14% 증가비축 개념…남은 재고 아울렛 소진 및 재활용(이투데이 그래픽팀/신미영 기자)실적 부진에 빠진 패션업계가',
    image:
      'https://img.etoday.co.kr/pto_db/2023/12/20231212214601_1962246_1199_468.jpg',
    realLink: 'https://www.etoday.co.kr/news/view/2311116',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '이투데이',
    title: '따뜻한 겨울 탓에…패션업계 ‘진땀’',
    link: 'https://www.neusral.com/r?n=wLCEAz0zpY',
    date: '23.12.13',
  },
  {
    id: 'qs21p4s62i23ehl7vy629ch0',
    neusralId: 'JbCMXPgywd',
    description:
      "[서울파이낸스 권서현 기자] 자기 관리와 외모를 경쟁력으로 보는 MZ세대가 슬로우에이징(Slow-Aging)'에 대한 관심을 키우고 있다. 슬로우에이징이란 노화를 받아들이되 속도를 늦춰 건강한 피부로 관리·유지하는 것을 의미한다. 기존에 '나이가 드는 것을 막는다'는 의미의 노화를 부정적으로 인식하는 '안티에이징'과 반대되는 개념이다.얼굴, 목, 손 등 다양한 피부 관리 제품들이 등장하지만 최근 관심이 높은 곳은 입술이다. 이전엔 입술을 피부로 인식하지 않는 사람들이 많아 슬로우에이징 시장에서 큰 관심을 얻지 못했다. 하지만 입술은",
    image:
      'http://www.seoulfn.com/news/thumbnail/202312/504237_262047_1652_v150.jpg',
    realLink: 'http://www.seoulfn.com/news/articleView.html?idxno=504237',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '서울파이낸스',
    title: '"입술도 피부"···뷰티업계, 겨울철 \'립 케어\' 전쟁 개막',
    link: 'https://www.neusral.com/r?n=JbCMXPgywd',
    date: '23.12.12',
  },
  {
    id: 'sw49hxog8r0rp3xkb8191r6b',
    neusralId: 'joCVNjKQEy',
    description:
      'K팝의 인기가 높아지면서 세계적인 명품 기업들의 아이돌 쟁탈전이 갈수록 치열해지고 있다. 데뷔 3개월 된 아이돌을 명품 브랜드의 ‘글로벌 앰버서더’로 전격 ...',
    image:
      'https://cphoto.asiae.co.kr/listimglink/1/2023121209133585276_1702340015.jpg',
    realLink: 'https://view.asiae.co.kr/article/2023121209315362784',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '아시아경제',
    title: '3개월차 신인도 ‘앰버서더’…명품업계 K팝 스타 모시기 전쟁',
    link: 'https://www.neusral.com/r?n=joCVNjKQEy',
    date: '23.12.12',
  },
  {
    id: 'vnxaoql9p8b6r5anwfw9zw6y',
    neusralId: 'mxC4MgLldj',
    realLink: 'https://www.news1.kr/articles/5259351',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '뉴스1',
    title: '"K-주얼리 찾는 MZ"…신세계백화점 강남점으로 몰린다',
    link: 'https://www.neusral.com/r?n=mxC4MgLldj',
    date: '23.12.13',
  },
  {
    id: 'hggoivffirfdi4ll004i4jqr',
    neusralId: 'ROCyaoWwRj',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121210332360273_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121210332360273',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '머니투데이',
    title: "LF 아떼, '선 에센스' 올 매출 12배 급증...스테디 셀러 등극",
    link: 'https://www.neusral.com/r?n=ROCyaoWwRj',
    date: '23.12.12',
  },
  {
    id: 'hzy0vezwdvvumvhb1vrohi2r',
    neusralId: 'r1CndPWm1q',
    description:
      '- 서울시-레페리(Leferi), 12일(화) 서울뷰티산업 활성화 위한 업무협약 체결- 인플루언서 연계한 서울뷰티위크, 수출상담회 및 뷰티 전문가 육성·인재 발굴방안 모색- 트렌드에 맞는 콘텐츠 확산 기대…서울뷰티기업 경쟁력 강화, 글로벌 시장 도약 지원',
    image: 'http://www.thesegye.com/images/oglogo.jpg',
    realLink: 'http://www.thesegye.com/news/view/1065590113926167',
    category: 'MZ 소비 트렌드',
    tag: '패션/뷰티',
    reporter: '세계타임즈',
    title:
      '서울시, 국내 뷰티 1위 MCN 기업과 손잡고 우리 뷰티제품 해외 노출 기회 높인다',
    link: 'https://www.neusral.com/r?n=r1CndPWm1q',
    date: '23.12.12',
  },
  {
    id: 'yegonc0s20pua4fun0baez18',
    neusralId: 'VwCyo7QlaK',
    description:
      "\r\n[서울=뉴시스]송혜리 기자 = 정보보안 회사가 편의점에서 구운계란을 판다?\r\n\r\n컴퓨터·모바일 백신 프로그램 '알약' 서비스를 제공하는 이스트시큐리티가 이기종 기업들과 벌이는 이색 콜라보레이션 마케팅이 화제다",
    image: 'http://image.newsis.com/2023/12/11/NISI20231211_0001434418_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231211_0002554228',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '뉴시스',
    title: '정보보안 회사가 편의점 구운 계란 파는 이유',
    link: 'https://www.neusral.com/r?n=VwCyo7QlaK',
    date: '23.12.13',
  },
  {
    id: 'e35m2im9mftiyom3hibzwfpw',
    neusralId: 'BnCkynKopg',
    description:
      '키친205·노티드·성심당 등\n가성비 앞세운 연말 케이크\n조기 예약 마감, 오픈런까지\nSNS 비주얼·가성비 다 잡아',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.cd70420bf452412f8f4dfec918467900.jpg',
    realLink: 'https://www.mk.co.kr/news/business/10896407',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '매일경제',
    title: '“12월엔 꼭 사야 해”…매일 오픈런 벌어지는 케이크 뭐길래',
    link: 'https://www.neusral.com/r?n=BnCkynKopg',
    date: '23.12.12',
  },
  {
    id: 'k7jgtpplkt10j6fhjeywu7tq',
    neusralId: 'xACA7ag6ae',
    description:
      '건강 관리에 관심을 갖는 젊은 층이 크게 늘고 있다.에이블리코퍼레이션이 운영하는 스타일 커머스 플랫폼 에이블리는 11월 푸드 카테고리 거래액 및 주문자 수가 급증했다고 12일 밝혔다. 에이블리는 무신사와 함께 꼽히는 대표적인 MZ세대 패션앱으로, 1020세대가 고객의...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200766.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=03014326635837864&mediaCodeNo=257',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '이데일리',
    title: "MZ세대 건강 관리 관심 '급증'...에이블리 푸드 카테고리 주문 2배↑",
    link: 'https://www.neusral.com/r?n=xACA7ag6ae',
    date: '23.12.12',
  },
  {
    id: 'cs2vku72y9umhvsh6k25obb4',
    neusralId: 'p0CdaGp0Pn',
    description:
      '[이슈앤비즈 김대우 기자] 롯데웰푸드(옛 롯데제과)의 찰떡아이스가 MZ세대의 크림빵 명소 ‘푸하하크림빵’과 컬래버해 한정판 ‘찰떡아이스 소금크림’을 선보인다고 12일 밝혔다.롯데웰푸드는 펀슈머(Fun+Consumer) 마케팅을 내세우며 이색 소재인 치즈떡볶이, 씨앗 호떡을 접목한 제품과 독특한 하트 모양 제품으로 젊은 소비자의 뜨거운 반응을 이끌어낸 것에 이어 최근 MZ가 좋아하는 크림빵을 활용한 이색 디저트 콘셉트를 담았다.‘푸하하크림빵’은 특허받은 크림 소금을 사용해 크림빵의 느끼함은 덜하면서 진한 풍미가 좋아 연남동과 익선동',
    image:
      'https://cdn.issuenbiz.com/news/thumbnail/202312/34476_35030_5910_v150.jpg',
    realLink: 'http://www.issuenbiz.com/news/articleView.html?idxno=34476',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '이슈앤비즈',
    title: '롯데웰푸드, ‘푸하하크림빵’과 맞손...찰떡아이스 공동마케팅',
    link: 'https://www.neusral.com/r?n=p0CdaGp0Pn',
    date: '23.12.12',
  },
  {
    id: 'tpztyarmot56vtq8tqljw7pt',
    neusralId: 'Z2C0oBbg0X',
    description:
      '&quot;(비싼 음식 먹는) 회식은 필수~ 2차는 선택~!&quot; 술자리...',
    image: 'https://www.imaeil.com/photos/2023/12/12/2023121209570122629_m.jpg',
    realLink: 'https://www.imaeil.com/page/view/2023121211081900278',
    category: 'MZ 소비 트렌드',
    tag: '음식/주류',
    reporter: '매일신문',
    title: '[MMM] “MZ 직장인은 회식 싫어한다? 그건 사바사(사람 by 사람)!”',
    link: 'https://www.neusral.com/r?n=Z2C0oBbg0X',
    date: '23.12.12',
  },
  {
    id: 'svqi2gxsfytt767wz8hevpid',
    neusralId: 'A4Cy8Nnz7Q',
    description:
      "[서울=뉴시스] 박주연 기자 = 한국관광공사가 운영하는 '하이커 그라운드'가 한국관광 랜드마크로 거듭나고 있다",
    image: 'http://image.newsis.com/2023/12/12/NISI20231212_0001434624_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002554617',
    category: 'MZ 소비 트렌드',
    tag: '주거/공간',
    reporter: '뉴시스',
    title: "'글로벌 MZ들의 놀이터' 하이커, 누적 방문객 100만 돌파",
    link: 'https://www.neusral.com/r?n=A4Cy8Nnz7Q',
    date: '23.12.12',
  },
  {
    id: 'cx2rssy83bqdvsijjjzqgplb',
    neusralId: 'yMCle6YAmb',
    description:
      '뉴욕 화장품 브랜드 키엘이 오는 17일까지 신세계백화점 강남점 1층에서 ‘키엘 빌리지’ 팝업 스토어를 운영한다고 12일 밝혔다.키엘 홀리데이 울트라 훼이셜 크림 듀오 세트.(사진=키엘)키엘 빌리지는 ‘즐거움이 녹지 않는 키엘 홀리데이’를 테마로 뉴욕 크리스마스의 따뜻...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200359.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=02046726635837864&mediaCodeNo=257',
    category: 'MZ 소비 트렌드',
    tag: '주거/공간',
    reporter: '이데일리',
    title: '키엘, 신세계 강남점에 키엘빌리지 열어…"연말 분위기 물씬"',
    link: 'https://www.neusral.com/r?n=yMCle6YAmb',
    date: '23.12.12',
  },
  {
    id: 'aibg6t6brxn75iktx5ojv4bn',
    neusralId: 'WqCmON7emO',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121223182119277_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121223182119277',
    category: 'MZ 소비 트렌드',
    tag: '주거/공간',
    reporter: '머니투데이',
    title: 'VIP 마케팅 vs 근린형 쇼핑몰…불황에 맞서는 국내 백화점들',
    link: 'https://www.neusral.com/r?n=WqCmON7emO',
    date: '23.12.13',
  },
  {
    id: 'z5yjfyyv0ztcbszhgr2wttkg',
    neusralId: 'KYCzjKejNo',
    description:
      '겨울비가 흠뻑 내렸습니다. 일부 지역에서는 폭설이 온 곳도 있는데요. 이 비와 눈이 지나가면 한파가 찾아온다고 합니다. 모쪼록 건강관리가 필요한 때입니다. 이번 주 여행가중계에서는 훈훈한 두 소식을 전합니다. ‘효도 여행에 제격인 패키지여행사 만족도 순위’와 ‘달라진 2030 여행 추세’입니다. 12월 첫째 주 여행가중계 지금 시작합니다. 1. ‘90%가 ',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/news-p.v1.20231208.6d701739aa584ca29d7f33724fba0722.png',
    realLink: 'https://www.mk.co.kr/news/culture/10897123',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '매일경제',
    title:
      '‘90%가 여행지에서 낯선 사람과 만남 즐겨’…달라진 2030 여행 추세[여행가중계]',
    link: 'https://www.neusral.com/r?n=KYCzjKejNo',
    date: '23.12.13',
  },
  {
    id: 'hp0uzp5nweaoia977ltq7ajh',
    neusralId: 'A4Cy8Nnbpw',
    description:
      '&ldquo;4년 만에 연말 주문량이 늘어서 허리를 필 수 있을 것 같다. 여기 주문서 내역을 보면 알겠지만 작년보다 몇배는 주문이 더 들어와서 바쁘다.&rdquo; 지난 11일 서울 종로구 세운상가 일대의 상패 제작 업체 박모(71) 씨의 말이다. 연말 송년회와 인사이동이 다가오면서 상패&middot;트로피 제작 업체가 활기를 띄고 있다. 20년 가까이 상가에서 상패를 팔았다는 김모(66) 씨는 &ldquo;코로나19로 인해서 정말 죽을듯이 힘들었다. 문을 닫아야 ...',
    image:
      'https://res.heraldm.com/content/image/2023/12/12/20231212000114_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000104',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '헤럴드경제',
    title: '“송년회, 감사패 문화 MZ 덕에 4년 만에 활기”…상패 업체 특수',
    link: 'https://www.neusral.com/r?n=A4Cy8Nnbpw',
    date: '23.12.12',
  },
  {
    id: 'oe72ajnenls9bdimf2yibkwj',
    neusralId: 'xACA7agBrK',
    description:
      "직장인들, 송년회로 점심 뷔페·영화 관람 외식 물가와 주류 물가 큰 폭으로 오른 탓 '폭음 문화 기피' MZ 세대의 성향도 반영 코로나19 이후 아예 송년회 사라진 곳도",
    image: 'http://image.newsis.com/2023/12/03/NISI20231203_0020150621_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002554984',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '뉴시스',
    title: "점심 뷔페에 영화 단체 관람도…송년회 新풍속도 '정착'",
    link: 'https://www.neusral.com/r?n=xACA7agBrK',
    date: '23.12.12',
  },
  {
    id: 'm4vr5azluuzvpw4ku5dpe26w',
    neusralId: 'p0CdaGpWWX',
    description:
      '달린만큼 내고, 반려견 이름으로 내고...MZ들의 연말 이색 기부  지난 10월 저희 러닝 크루원들이 1783㎞를 달렸습니다. 1㎞당 50~100원씩 기부해 총 15만7319원을 기부했네요. 서울에 사는 직장인 김진욱39씨는 지난 2020년 1월부터 매주 1회씩 서울 ',
    image:
      'https://images.chosun.com/resizer/67LEmPR7CPl8uKAEKzfXO9lZwZE=/900x472/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/T6MTTZ67ZFG6VHGXFMIUDMEYOY.JPG',
    realLink:
      'https://www.chosun.com/national/national_general/2023/12/12/YSOTS4DIQBBERI6W65JIEFT43Y/?utm_source=naver&utm_medium=referral&utm_campaign=naver-news',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '조선일보',
    title: '달린 만큼 기부, 인증샷으로 기부...요즘 MZ세대들의 이색 기부',
    link: 'https://www.neusral.com/r?n=p0CdaGpWWX',
    date: '23.12.12',
  },
  {
    id: 'oe6w08eup1qq3czifs9ipo82',
    neusralId: 'JbCMXPgNBA',
    description: "'나 혼자 산다'가 TV화제성지수 비드라마 전체 1위를 차지...",
    image:
      'https://image.ytn.co.kr/general/jpg/2023/1212/202312121256281028_t.jpg',
    realLink: 'https://star.ytn.co.kr/_sn/0117_202312121256281028',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: 'YTN',
    title: "'나 혼자 산다', 비드라마 화제성 1위...10년째 변함없는 인기",
    link: 'https://www.neusral.com/r?n=JbCMXPgNBA',
    date: '23.12.12',
  },
  {
    id: 'gbh9cxcycfttviq27d89z3up',
    neusralId: 'zRCyJzPndx',
    description:
      '상조 3.0 시대를 맞아 시장 규모가 커지고 있다. 장례 서비스가 주축인 상조 1.0시대, 다양한 결합상품을 도입한 2.0시대를 넘어 신사업 진출을 통한 상조 3.0 시대가 열리면서 중장년층은 물론, 젊은 MZ세대의 호응까지 이끌고 있다. 상조업체들이 다양한 취향을 ...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200227.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01374326635837864&mediaCodeNo=257',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '이데일리',
    title: '1조 클럽만 네 곳 덩치커진 상조, 신사업 진출로 MZ까지 유혹',
    link: 'https://www.neusral.com/r?n=zRCyJzPndx',
    date: '23.12.12',
  },
  {
    id: 'dgrs2jztt4q49obac5qcnack',
    neusralId: 'OMCOMPLpdo',
    description:
      '한국 스포츠를 이끌어갈 &#39;예비 스포츠 마케터&#39;들이 프로당구(PBA) 현장을 찾았다. 한양대학교 스포츠산업과학부 &#39;스포츠 광고 실습&#39; 과목의 수강생 30여 명은 지난 9일, 11일 경기도 &#39;고양 킨텍스 PBA 스타디움&#39;을 ..',
    image:
      'https://file2.nocutnews.co.kr/newsroom/image/2023/12/12/202312121542003638_0.jpg',
    realLink: 'https://www.nocutnews.co.kr/news/6062135',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '노컷뉴스',
    title: "'프로당구 찾은 MZ 세대' 韓 예비 스포츠 마케터들, PBA 관전",
    link: 'https://www.neusral.com/r?n=OMCOMPLpdo',
    date: '23.12.12',
  },
  {
    id: 'p4ma1krl3iz1rtp0adpk6y99',
    neusralId: 'KYCzjKmW7N',
    category: 'MZ 소비 트렌드',
    tag: '문화/생활/여행',
    reporter: '연합뉴스',
    title: '동해시, 젊은 직원 목소리 반영…혁신 주니어보드 운영',
    link: 'https://www.neusral.com/r?n=KYCzjKmW7N',
    date: '23.12.12',
  },
  {
    id: 'pvgkn6sljatg9ic3c6h2lgqa',
    neusralId: 'VwCyo70jN1',
    description:
      '3분기 최대 실적거둔 야놀자뉴욕거래소 출신 CFO 선임NYSE 전광판에 축전 도배해외매출 전년동기比 200%↑클라우드 사업 흑자전환 성과美투자업계서 러브콜 쏟아져',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01110121000002_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896685',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '매일경제',
    title: '야놀자 美IPO, 이르면 내년 상반기 출격',
    link: 'https://www.neusral.com/r?n=VwCyo70jN1',
    date: '23.12.12',
  },
  {
    id: 'athu3opfmlh9jox6fsltwlg3',
    neusralId: 'aVCVRbJbx7',
    description:
      '12일 AI 반도체 업계와 과학기술정보통신부(과기정통부) 취재를 종합하면, 19일 과기정통부가 주관하는 제4차 AI 반도체 최고위 전략대화에서 네이버클라우드는 AI 반도체 성능을 공개 시연할 예정이다. 이동수 네이버클라우드 이사는 지난 2일 자신의 페이스북에 &quot;서울대 AI 효율성 워크숍에서 처음으로 AI 반도체의 개발 결과 일부를 발표했다&quot;면서 &quot;네이버클라우드는 대량생산 가능성과 저전력에 초점을 두고 LPDDR(저전력D램)을 채택했고 경량화 기술 덕에 HBM(고대역폭메모리)을 썼을 때의 성능과 동일하거나 그 이상의 LLM(거대언어모델) 추론 성능을 확보했다&quot;고 밝혔다. 정부는 지난해 6월 제1차 AI 반도체 최고위 전략대화를 열고 AI 반도체 산업 성장 지원 대책을 발표했다.',
    image:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202312/13/cc87069d-0af5-4b6f-88dc-00caf7ab4416.jpg/_ir_/resize/1280',
    realLink: 'https://www.joongang.co.kr/article/25214365',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '중앙일보',
    title: '[단독] 네이버·삼성 공동 개발한 AI 반도체, 19일 공개된다 | 팩플',
    link: 'https://www.neusral.com/r?n=aVCVRbJbx7',
    date: '23.12.13',
  },
  {
    id: 'd19601qvwzn06e0k85p4j22g',
    neusralId: 'zRCyJzez6x',
    description:
      '네이버페이 앱 서비스 통합 개편 투자자 보호장치 마련 등은 숙제, 네이버파이낸셜(네이버페이)이 자사 모바일 애플리케이션(앱)에 증권·부동산 서비스를 통합한다고 12일 밝혔다. 이번 개편을 시작으로 네이버페이는 금융서비스를 보다 확대할 것으로 보인다. 주요 증권사와 제휴하는 방식으로 네이...',
    image: 'https://img.seoul.co.kr/img/facebook.png',
    realLink:
      'https://www.seoul.co.kr/news/newsView.php?id=20231213018002&wlog_tag3=naver',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '서울신문',
    title: '결제 넘어 증권·부동산까지… 네이버 ‘금융 공룡’ 되나',
    link: 'https://www.neusral.com/r?n=zRCyJzez6x',
    date: '23.12.13',
  },
  {
    id: 't5zzw522j5dt40y6nc6dloxu',
    neusralId: 'WqCmONx8zK',
    image:
      'https://image.kmib.co.kr/online_image/2023/1212/2023121117161964789_1702282636_0018960527.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0018960527&code=61171811&cp=nv',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '국민일보',
    title: '쿠팡 ‘로켓럭셔리’ VS 컬리 ‘뷰티컬리’ 결과가 궁금하다',
    link: 'https://www.neusral.com/r?n=WqCmONx8zK',
    date: '23.12.12',
  },
  {
    id: 'tl8haef46dvg45rc3jints3z',
    neusralId: 'NACn3XqQak',
    realLink: 'https://www.news1.kr/articles/5258834',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '뉴스1',
    title: '카카오뱅크 "모임통장, 5년만에 순이용자 1000만명 육박"',
    link: 'https://www.neusral.com/r?n=NACn3XqQak',
    date: '23.12.12',
  },
  {
    id: 'mc1ug4eguxkjm0cey9qypyc0',
    neusralId: 'qkCZqxlxq2',
    image:
      'https://image.munhwa.com/gen_news/202312/2023121201071707006001_b.jpg',
    realLink: 'https://www.munhwa.com/news/view.html?no=2023121201071707006001',
    category: '네카라쿠배당토 뉴스',
    tag: '출시/성과',
    reporter: '문화일보',
    title: '‘국민앱’ 은 여전히 카카오톡… 사용자 4000만명 넘어 1위',
    link: 'https://www.neusral.com/r?n=qkCZqxlxq2',
    date: '23.12.12',
  },
  {
    id: 'jd2zqycnc8rolko1vm61uliz',
    neusralId: 'eWCWLrGBnK',
    description:
      '[서울=뉴시스]윤정민 기자 = 일본인 메이저리거 오타니 쇼헤이(29)의 LA 다저스행 소식에 쿠팡플레이가 덩달아 주목을 받고 있다',
    image: 'http://image.newsis.com/2023/09/17/NISI20230917_0000497349_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231211_0002553817',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '뉴시스',
    title: "'7억불 사나이' 오타니 다저스행 소식에 쿠팡플레이 '함박웃음'",
    link: 'https://www.neusral.com/r?n=eWCWLrGBnK',
    date: '23.12.12',
  },
  {
    id: 'cq8sm83jyxq2ddkk7364btgf',
    neusralId: 'KYCzjKm2Yw',
    description:
      '쿠팡 윙(WING) 판매자 페이지에서 자신의 계정으로 로그인하면 타 판매자 정보가 보이는 등 개인정보 노출 사고가 발생한 것으로 확인됐다.',
    image: 'https://byline.network/wp-content/uploads/2023/12/쿠팡-배송.jpeg',
    realLink: 'https://byline.network/2023/12/12-272/',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '바이라인네트워크',
    title: '타 판매자 정보가 보인다고? 쿠팡 “즉시 조치, 현재 조사 중”',
    link: 'https://www.neusral.com/r?n=KYCzjKm2Yw',
    date: '23.12.12',
  },
  {
    id: 'tl29as8ip1cevtmsnc26ce3y',
    neusralId: 'mxC4Mg8kPa',
    description:
      'CJ제일제당 자사몰 ‘내일도착’ 배송 서비스\n홈플러스, 1시간 즉시배송…年 80% 성장\n롯데, 부산에 230만여 가구 장보기 물류센터',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.046fcf8f3f864c8999730e67ebd7236a.jpg',
    realLink: 'https://www.mk.co.kr/news/economy/10896559',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '매일경제',
    title: '“쿠팡 때문에 참”…‘비장의 카드’ 다시 꺼내드는 대기업들',
    link: 'https://www.neusral.com/r?n=mxC4Mg8kPa',
    date: '23.12.12',
  },
  {
    id: 's432wtfbzxpb275r13wwnct9',
    neusralId: 'YKCRYnJZgn',
    description:
      '특정 사업자군에서 단말기유통구조개선법(단통법)을 위반한 불법 게시글이 통제되지 않아 논란이다. 단통법 폐지에 대한 여론도 있지만, 법이 존재하는 한 공정한 적용이 필요한데, 현재 네이버 밴드, 카페, 카카오톡에서는 불법 게시글이 적절히 삭제되지 않고 있다.불법 게시글은...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300899.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=02666646635837864&mediaCodeNo=257',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '이데일리',
    title: '휴대폰 판매 불법 게시글, 네이버·카카오가 쿠팡보다 덜 지워..왜?',
    link: 'https://www.neusral.com/r?n=YKCRYnJZgn',
    date: '23.12.12',
  },
  {
    id: 'p5tu8vtpib09qaiar2ptwsgx',
    neusralId: '23CPKNBLoE',
    description:
      '김병욱 더불어민주당 의원이 대표 발의한 ‘공인중개사법 개정안’이 국토교통위원회 법안심사소위 안건으로 올랐다. 오는 21일 법안 처리가 추진될 것이라는 관측에 프롭테크(부동산 기술) 업계에서는 혁신을 가로 막는 ‘개악’이라며 반대 목소리가 나온다. 총선을 앞두고 정치권의',
    image:
      'https://img.etnews.com/news/article/2023/12/12/news-p.v1.20231212.76151bd76f3a475d96ec4377b84f0357_P1.png',
    realLink: 'https://www.etnews.com/20231212000232',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '전자신문',
    title: "'직방'도 타다 전철 밟나…프롭테크 반대에도 공인중개사 법 개정 추진",
    link: 'https://www.neusral.com/r?n=23CPKNBLoE',
    date: '23.12.12',
  },
  {
    id: 'hmsrioa4cyffk7k0gdhexne4',
    neusralId: 'BnCkynKaBn',
    description:
      '배달의민족 물류서비스를 전담하는 우아한청년들이 DB손해보험과 제공하는 라이더 대상 시간제 유...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/news-p.v1.20231212.22a36e557f514fe0959235ae07ebcb09_P1.jpg',
    realLink:
      'https://www.khan.co.kr/economy/economy-general/article/202312120858011',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '경향신문',
    title: '배달의민족, 내년 라이더 시간제 보험료 933원으로 인하',
    link: 'https://www.neusral.com/r?n=BnCkynKaBn',
    date: '23.12.12',
  },
  {
    id: 'h55au8bftf14iri866vx473g',
    neusralId: 'PRCjRJNxVm',
    description:
      'SM엔터 사건 첫 재판서 날선 공방\n변호인단 “검찰, 수사기록 비공개” 지적\n검찰 “사건 관계자 증거인멸 시도 때문”',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.eff110b91e104082a36d8acfa609f843.jpg',
    realLink: 'https://www.mk.co.kr/news/society/10896886',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '매일경제',
    title: '배재현 카카오투자총괄 ‘시세조종 혐의’ 부인 “정상적 매입”',
    link: 'https://www.neusral.com/r?n=PRCjRJNxVm',
    date: '23.12.12',
  },
  {
    id: 'ggop48z1r57kby564bsua9y2',
    neusralId: '47CpoymKyd',
    category: '네카라쿠배당토 뉴스',
    tag: '경영/인사/이슈',
    reporter: '지디넷코리아',
    title: '카카오 노조 "현 경영진 교체 등 구체적 방안 필요"',
    link: 'https://www.neusral.com/r?n=47CpoymKyd',
    date: '23.12.12',
  },
  {
    id: 'wgrlopphepu0zibm9hcqltul',
    neusralId: 'ROCyaoYbx1',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121015010391205_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121015010391205',
    category: '네카라쿠배당토 뉴스',
    tag: '기술/R&D',
    reporter: '머니투데이',
    title: 'R&D 강화 나선 네이버웹툰…"AI 인력, 100명 채운다"',
    link: 'https://www.neusral.com/r?n=ROCyaoYbx1',
    date: '23.12.12',
  },
  {
    id: 'qqgzhrrlchmfp06o54v21bsa',
    neusralId: 'p0CdaGpqpJ',
    description:
      '2009년 겨울, 김범수 카카오 창업자(현 미래이니셔티브 센터장)와 전 직원은 강원 홍천으로 워크숍을 떠났다. 카카오 신화의 시작이 된 카카오톡 출시를 앞둔 시점이었다. 당시 워크숍은 사진으로 남아있다. 사진에는 김 센터장과 10여명 남짓 한 전 직원이 숙소 거실에 둘러앉아 술잔을 기울이는 모습이 담겼다. 취기가 오른 듯 얼굴이 붉어진 김 센터장은 스스럼없이 직원들과 이야기를 나누고 있었다. 김 센터장이 직원들과 동그랗게 둘러앉아 토론을...',
    image:
      'https://res.heraldm.com/content/image/2023/12/12/20231212000384_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000362',
    category: '네카라쿠배당토 뉴스',
    tag: '채용/기업문화',
    reporter: '헤럴드경제',
    title: '자율·수평 카카오 기업문화...14년 뒤 부메랑 되다',
    link: 'https://www.neusral.com/r?n=p0CdaGpqpJ',
    date: '23.12.12',
  },
  {
    id: 'ngmtcanxevomix5lk8ae7btb',
    neusralId: 'PRCjRJNJQE',
    description:
      '‘홍은택 측근 모임’ 익명 폭로, “모임 회원 업체에 일감 몰아줘”홍 대표 아들 친구 채용 의혹도쇄신 발표 하루 만에 또 논란 검찰 수사 등 창업 이래 최대 위기를 겪고 있는 카카오 창업자 김범수 경영쇄신위원장(미래이니셔티브센터장)이 이번에는 최측근인 홍은택 카카오 대표가 연루된 사조직...',
    image:
      'https://img.seoul.co.kr/img/upload/2023/12/13/SSI_20231213100028.jpg',
    realLink:
      'https://www.seoul.co.kr/news/newsView.php?id=20231213019001&wlog_tag3=naver',
    category: '네카라쿠배당토 뉴스',
    tag: '채용/기업문화',
    reporter: '서울신문',
    title: '[단독] ‘우리는 양재하버드’… 카카오 사조직 내홍',
    link: 'https://www.neusral.com/r?n=PRCjRJNJQE',
    date: '23.12.13',
  },
  {
    id: 'urlzc5hr6ygvib0cxdu7wsnb',
    neusralId: '8XCjNnLaMJ',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121209230665490_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121209230665490',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: "AI 웹툰 '리얼드로우', 22억원 프리A 투자유치…알토스 주도",
    link: 'https://www.neusral.com/r?n=8XCjNnLaMJ',
    date: '23.12.12',
  },
  {
    id: 'og2sxbiq134nhfkmcl0phekn',
    neusralId: '23CPKNmdKP',
    description:
      '영상 처리 AI(인공지능) 스타트업 메이아이가 60억 원 규모의 시리즈A 투자 유치를 성공적으로 완료했다고 밝혔다.&nbsp; 이번 투자는 삼성벤처투자가 주도했다. 또한 에버그린투자파트너스, 미래에셋벤처투자, 플럭스벤처스, IBK기업은행, 대교인베스트먼트가 신규로 참여했다. 기존 투자자인 빅베이슨캐피탈 역시 후속 투자를 진행했다. 이에 따라 메이아이의…',
    image:
      'https://wowtale.s3.ap-northeast-2.amazonaws.com/wp-content/uploads/2023/12/12175152/wowtale.net-ai-60-a-wowtale.net-ai-60-a-3bd98d83-8f25-4184-afee-f6fe9b7ec0a2.png',
    realLink: 'https://wowtale.net/2023/12/12/68090/',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '와우테일',
    title: '영상 AI ‘메이아이’, 60억원 시리즈A 투자유치',
    link: 'https://www.neusral.com/r?n=23CPKNmdKP',
    date: '23.12.12',
  },
  {
    id: 'bwmpcbnwih9k5oqcuknsnqbq',
    neusralId: '23CPKNBaop',
    description:
      "스톤브릿지벤처스와 스마일게이트인베스트먼트가 영유아 놀잇감 구독 서비스 '피카비(peekaby)'에 투자했다. 9일 업계에 따르면 스톤브릿지벤처스와 스마일게이트인베스트먼트는 피카비 운영사인 영유아 에듀테크 스타트업 올디너리매직에 프리 시리즈A 투자를 진행했다. 투자금액은 비공개다.앞서 ",
    image:
      'https://cdn.bloter.net/news/thumbnail/202312/609352_213750_1702342440_v150.jpg',
    realLink: 'https://www.bloter.net/news/articleView.html?idxno=609352',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '블로터',
    title:
      "스톤브릿지·스마일게이트인베, 놀잇감 구독 서비스 '피카비'에 투자 [넘버스]",
    link: 'https://www.neusral.com/r?n=23CPKNBaop',
    date: '23.12.12',
  },
  {
    id: 'yfejwyh04rdeav5kkr0rdbjr',
    neusralId: 'XJCeWYK01x',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213584689040_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213584689040',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: '\'킥라니\' 오명에도 119억 빨아들인 스타트업…"글로벌 공략 박차"',
    link: 'https://www.neusral.com/r?n=XJCeWYK01x',
    date: '23.12.12',
  },
  {
    id: 'anap8cbcs8snvmeh0gzrdqhi',
    neusralId: 'aVCVRbm37d',
    description:
      '#비침습혈당측정기 를 개발하는 #스타트업 #에이치엠이스퀘어 가 40억원 규모의 #프리시리즈A #투자 를 유치했다.',
    image:
      'https://www.venturesquare.net/wp-content/uploads/2023/12/unnamed-1-5-e1702349087550-695x522.png',
    realLink: 'https://www.venturesquare.net/906303',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '벤처스퀘어',
    title: '에이치엠이스퀘어, 40억 원 투자 유치',
    link: 'https://www.neusral.com/r?n=aVCVRbm37d',
    date: '23.12.12',
  },
  {
    id: 'hh887omxwm6x5a4afzvqraze',
    neusralId: 'EZCYng4Jre',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213144486307_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213144486307',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: '"벤처대출로 데스밸리 탈출…M&A 완화로 투자회수 활성화"',
    link: 'https://www.neusral.com/r?n=EZCYng4Jre',
    date: '23.12.12',
  },
  {
    id: 'pp939mfinhf5a6pq42tej16z',
    neusralId: 'XJCeWYKqPM',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213474638788_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213474638788',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '머니투데이',
    title: '벤처기업 75% "ESG 경영 필요"… 38% "투자자들도 요구"',
    link: 'https://www.neusral.com/r?n=XJCeWYKqPM',
    date: '23.12.12',
  },
  {
    id: 'zqr7wgzspu0k6ul9za53ds8e',
    neusralId: 'VwCyo7Ql7b',
    description:
      '부동산 시장 침체 영향으로 공인중개소의 줄폐업이 이어지면서 한때 너도나도 뛰어들었던 공인중개사 시험에 대한 응시자도 급감하고 있다. 이런 탓에 공인중개소를 대상으로 시장을 넓혀 갔던 프롭테크(부동산 산업에 IT 서비스를 접목한 산업) 업계도 타격을 받고 있다.(그래픽...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300044.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01269366635838192&mediaCodeNo=257',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '이데일리',
    title: "공인중개업소 매달 1200곳 문닫아…프롭테크도 투자 유치 '뚝'",
    link: 'https://www.neusral.com/r?n=VwCyo7Ql7b',
    date: '23.12.13',
  },
  {
    id: 'cf4zxj2ufsgb2vqchb83n8z2',
    neusralId: 'aVCVRbmgOl',
    description:
      '&#039;AI칩의 제왕&#039; 엔비디아, AI 기업들의 초석 투자자 됐다, 김리안 기자, 국제',
    image: 'https://img.hankyung.com/photo/202312/ZA.35305453.1.jpg',
    realLink: 'https://www.hankyung.com/article/202312129667i',
    category: '스타트업 뉴스',
    tag: '투자',
    reporter: '한국경제',
    title: "'AI칩의 제왕' 엔비디아, AI 기업들의 초석 투자자 됐다",
    link: 'https://www.neusral.com/r?n=aVCVRbmgOl',
    date: '23.12.12',
  },
  {
    id: 'r9dgyfgdbhnkk55m1c7bsu7l',
    neusralId: 'Z2C0oBb44P',
    description: '',
    image:
      'https://platum.kr/wp-content/uploads/2023/12/unnamed-4-2-640x427.jpg',
    realLink: 'https://platum.kr/archives/219244',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '플래텀',
    title:
      '지구테크 스타트업 ‘오후두시랩’, AI기반 기업 탄소관리 ‘그린플로’ 정식 론칭',
    link: 'https://www.neusral.com/r?n=Z2C0oBb44P',
    date: '23.12.12',
  },
  {
    id: 'i322tm54gdix6iclarvxr4y0',
    neusralId: 'eWCWLrJJaA',
    description:
      '아파트멘터리가 한국경제신문사와 스태티스타가 진행한 ‘대한민국 성장챔피언 2024’에서 150개 기업 중 56위에 올랐다.‘대한민국 성장 챔피언’은 한국경제신문사와 글로벌 리서치 전문 기관 스태티스타(Statista)가 조사해 발표하는 기업 순위로, 2019년 매출 1억 5,000만 원',
    image:
      'https://cdn.startupn.kr/news/thumbnail/202312/43282_43916_1751_v150.jpg',
    realLink: 'https://www.startupn.kr/news/articleView.html?idxno=43282',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '스타트업엔',
    title:
      '인테리어 서비스 혁신 스타트업 아파트멘터리, ‘대한민국 성장 챔피언 2024’ 선정',
    link: 'https://www.neusral.com/r?n=eWCWLrJJaA',
    date: '23.12.12',
  },
  {
    id: 't2d5zddd3s1tl4t7snfk07eo',
    neusralId: 'NACn3XqMBR',
    description: '',
    image: 'https://platum.kr/wp-content/uploads/2023/12/ad-640x427.jpg',
    realLink: 'https://platum.kr/archives/219274',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '플래텀',
    title: '오픈랩소디, 스타트업을 위한 무료 마케팅 솔루션 ‘애드스왑’ 출시',
    link: 'https://www.neusral.com/r?n=NACn3XqMBR',
    date: '23.12.12',
  },
  {
    id: 'zspv8tnfgmo7woajvdoykoeu',
    neusralId: '47Cpoym10E',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121215013653273_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121215013653273',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '머니투데이',
    title: '올해 거래액 2조 돌파 알스퀘어 "데이터 신사업으로 수익 강화"',
    link: 'https://www.neusral.com/r?n=47Cpoym10E',
    date: '23.12.12',
  },
  {
    id: 'aygc5v3rt3jymahykgssmy55',
    neusralId: 'PRCjRJeKw3',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023120708070678304_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023120708070678304',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '머니투데이',
    title: '"통장만 갉아먹네" 안 쓰는 구독서비스 한방에 정리하는 이 기술',
    link: 'https://www.neusral.com/r?n=PRCjRJeKw3',
    date: '23.12.12',
  },
  {
    id: 'eu4c0x5o76tgfdxrjg4xacn9',
    neusralId: 'LBCp1jkbEA',
    description:
      '㈜씨에이티빔텍이 ‘소부장 스타트업 100’ 사업 지원을 토대로 탄소나노튜브 기반 차세대 디지털 엑스레이를 개발 중이라고 밝혔다. 이에 약 20년 동안 탄소나노튜브 엑스레이를 연구해 온 ㈜씨에이티빔텍 류제황 대표는 지난 11월 26일부터 30일까지 미국 시카고에서 개최된 북미영상의학회(RSNA 2023)에서 탄소나노튜브를 활용한 초소형 엑스레이 시스템과 160kV 탄소나노튜브 엑스레이 소스를 발표했다. 또 그는 &quot;씨에이티빔텍은 올해 서울창조경제혁신센터가 주관하는 ‘소재·부품·장비 스타트업 100’(이하 ‘소부장 스타트업 100’)에 선정돼 지원을 받았다&quot;며 &quot;특히 서울창조경제혁신센터와 산업은행이 주최한 ‘소부장 스타트업 혁신성장펀드IR’ 참가를 계기로 총 37억의 투자유치를 달성했다&quot;고 덧붙였다.',
    image:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202312/12/74434bd0-6a7f-489a-a926-8b525d2193c7.jpg/_ir_/resize/1280',
    realLink: 'https://www.joongang.co.kr/article/25214149',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '중앙일보',
    title: '㈜씨에이티빔텍, 탄소나노튜브 기반 차세대 디지털 엑스레이 개발 나서',
    link: 'https://www.neusral.com/r?n=LBCp1jkbEA',
    date: '23.12.12',
  },
  {
    id: 'l3y177gn7auh1emiacbakf55',
    neusralId: 'k4CQneNQaR',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121213390758688_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121213390758688',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '머니투데이',
    title: "폐식용유의 변신...써스테인어스, 서울시 기후테크 챌린지 '대상'",
    link: 'https://www.neusral.com/r?n=k4CQneNQaR',
    date: '23.12.12',
  },
  {
    id: 'kwiw0arcogix1bwomse71xxs',
    neusralId: '7eCXbokkl2',
    description:
      '멘탈테크 스타트업 닥터프레소(대표 정환보)는 인공지능 기술을 기반으로 차별화된 정신 건강 연구를 선보이며 업계의 주목을 받고 있다. 중앙대학교 캠퍼스타운 소속 창업기업인 닥터프레소는 ‘디지털 라이프 마커’를 활용해 더 많은 사람들이 쉽고 편리하게 마음을 돌볼 수 있는',
    image:
      'https://img.etnews.com/news/article/2023/12/12/news-p.v1.20231212.b275d836612540ab8d495dc14887e1c3_P1.png',
    realLink: 'https://www.etnews.com/20231212000285',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '전자신문',
    title: '닥터프레소, AI기반 정신건강 관리 보조 솔루션 개발',
    link: 'https://www.neusral.com/r?n=7eCXbokkl2',
    date: '23.12.12',
  },
  {
    id: 'zj4s4m0hzs5nev3xyee4z5ae',
    neusralId: '3jCARk3mkY',
    description:
      '장례서비스 기업 ’고이장례연구소‘를 창업한 송슬옹 대표는 서울대 경제학과와 벤처경영학과를 복수전공하고, 벤처회사에 재직 중 ’내가 하고 싶은 일을 해야 한다‘라는 결심 아래 장례서비스 스타트업을 설립했다. ’고이장례연구소‘는 저렴한 비용으로 장례와 관련된 모든 절차를 일괄적으로 처리할 수 있는 원-스톱 서비스를 제공한다. 또한 진정성의 가치를 실현시키기 위해 회사 소속 담당자가 직접 견적과 절차 등의 상담을 진행한다.특히 장례 경험이 부족한 상주를 위해 장례에 필요한 모든 정보를 유선을 통해 1차 설명한 뒤, 장례 의뢰가 오면 ’고',
    image:
      'https://cdn.itbiznews.com/news/thumbnail/202312/120558_117093_41_v150.jpg',
    realLink: 'https://www.itbiznews.com/news/articleView.html?idxno=120558',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: 'IT비즈뉴스',
    title: '고이장례연구소, 투명하고 정직한 서비스로 새로운 장례문화 구축',
    link: 'https://www.neusral.com/r?n=3jCARk3mkY',
    date: '23.12.12',
  },
  {
    id: 'x9jepgz6xatxz698qacv4fh2',
    neusralId: 'lnCWqrlgyg',
    description:
      '[스타트업투데이] ‘스타트업 101’ 프로젝트가 시즌2로 돌아왔습니다. ‘스타트업 101’은 스타트업의 친구이자 동반자 가 빛나는 101개의 스타트업을 소개하는 프로젝트입니다. 유망 스타트업에는 투자자와 대중에게 눈도장 찍을 기회를, 투자자에게는 성장 가능성이 높은 스타트업을 발굴할 수 있는 기회를 제공합니다. [편집자 주] [▶관련기사: [스타트업 101] “시즌2로 돌아왔다” 제품∙서비스 알리고 싶은 101개 스타트업을 찾습니다!] 쉰한 번째 주인공은 ‘칼만텍’입니다. ▲‘칼만텍’은 어떤 스타트업인가요? 칼만텍은',
    image:
      'https://cdn.startuptoday.kr/news/thumbnail/202312/48010_36180_4442_v150.jpg',
    realLink: 'https://www.startuptoday.kr/news/articleView.html?idxno=48010',
    category: '스타트업 뉴스',
    tag: '출시/성과/이슈',
    reporter: '스타트업투데이',
    title:
      '[스타트업 101 시즌2 #51] 칼만텍, ‘전후좌우 이동 가능한 로봇 모빌리티 플랫폼’으로 새로운 이동 패러다임 제시',
    link: 'https://www.neusral.com/r?n=lnCWqrlgyg',
    date: '23.12.12',
  },
  {
    id: 'sga0ertrnze18mm14kga1kwu',
    neusralId: '23CPKNBZa3',
    image:
      'https://image.munhwa.com/gen_news/202312/2023121201039907170002_b.jpg',
    realLink: 'https://www.munhwa.com/news/view.html?no=2023121201039907170002',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '문화일보',
    title: '“국내 스타트업의 글로벌 개방성 확대 위한 입법 지원 절실”',
    link: 'https://www.neusral.com/r?n=23CPKNBZa3',
    date: '23.12.12',
  },
  {
    id: 'h7cn2r8yep4ftyn8495o7n0g',
    neusralId: '3jCARk3Lz3',
    description:
      '미국 보스턴에 팁스(TIPS) 기업을 위한 글로벌 진출 거점이 마련된다. 12일 창립 1주년을 맞은 스케일업팁스협회 주도로 스케일업팁스 기업을 비롯한 팁스 기업 전체의 글로벌 진출과 성장을 지원하기 위해서다. 보스턴 연구대학인 매사추세츠 공과대학(MIT)과 스케일업팁스',
    image:
      'https://img.etnews.com/news/article/2023/12/12/news-p.v1.20231212.d65d025e4f3d43c2a3875761420ee643_P1.jpg',
    realLink: 'https://www.etnews.com/20231212000209',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '전자신문',
    title:
      '스케일업팁스협회, TIPS 브랜드 글로벌에 알린다…보스턴에 미국 진출 거점 마련',
    link: 'https://www.neusral.com/r?n=3jCARk3Lz3',
    date: '23.12.12',
  },
  {
    id: 'l3add3u7yywpwv4yk9x9v4mu',
    neusralId: '7eCXbokrVA',
    description:
      "충정 대전 권역 액셀러레이터인 JB벤처스가 30억원 규모의 지역엔젤투자 재간접펀드 1호 조합 결성을 완료했다.11일 업계에 따르면 JB벤처스는 이달 8일 '제이비벤처스라이즈1호조합' 결성총회를 개최했다.제이비벤처스라이즈1호조합은 지역엔젤투자 재간접펀드(Fund of Funds)다. 중",
    image:
      'https://cdn.bloter.net/news/thumbnail/202312/609376_213775_1702359173_v150.jpg',
    realLink: 'https://www.bloter.net/news/articleView.html?idxno=609376',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '블로터',
    title:
      'JB벤처스, 지역엔젤투자 재간접펀드 1호 결성..."비수도권 초기 소부장 기업 투자" [넘버스]',
    link: 'https://www.neusral.com/r?n=7eCXbokrVA',
    date: '23.12.12',
  },
  {
    id: 'h03fwk8i924eoatakeh8ghgj',
    neusralId: 'aVCVRbmpy8',
    description:
      '중소벤처기업부가 ‘벤처투자 촉진 법령’ 개정안을 국무회의에서 의결함으로써 ▲투자조건부 융자 ▲벤처펀드의 투자목적회사 등이 제도화되어 민간 투자재원이 창업 및 벤처기업에 유입되는 기반을 마련, 법령 개정으로 벤처투자 활성화와 규제 개선이 예상되고 있다.',
    image: 'https://www.venturesquare.net/wp-content/uploads/2023/12/1-3.jpg',
    realLink: 'https://www.venturesquare.net/906342',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '벤처스퀘어',
    title: '중기부 ‘벤처투자 촉진 법률’ 개정안 의결 “창업·벤처 자금 유입 촉진”',
    link: 'https://www.neusral.com/r?n=aVCVRbmpy8',
    date: '23.12.12',
  },
  {
    id: 'bmad1zp937ap80yf77i3c7dw',
    neusralId: 'Z2C0oB6kon',
    description:
      "한국여성경제인협회가 여성기업 판로지원에 적극 나섰다. 특히 올해는 체계적이고 수요자 맞춤형으로 지원해 참여기업으로부터 만족도도 높았다.  12일 중소벤처기업부에 따르면 여경협은 기존 여성기업 국내 판로지원 사업 전반을 개편해 올해 새롭게 기획한 '여성기업 판로역량 강화지원' 사업을 성공적으로 수행했다. 이..",
    image: 'https://image.fnnews.com/resources/images/no_img_fnnews_570.jpg',
    realLink: 'https://www.fnnews.com/news/202312121821278890',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '파이낸셜뉴스',
    title: "여경협, 여성기업 판로역량 강화 지원사업 '완수'",
    link: 'https://www.neusral.com/r?n=Z2C0oB6kon',
    date: '23.12.12',
  },
  {
    id: 'o7lxj9yw2651m0zlywyz6hkd',
    neusralId: 'yMCle6YWbV',
    description:
      '#(재)부산창조경제혁신센터 가 오는 15일 아스티 호텔 부산 22층 그랜드볼룸에서 2023 초기창업패키지 우수기업을 대상으로 진행하는 #IR데모데이 #&#039;B.I.C DAY&#039; 를 개최한다.',
    image:
      'https://www.venturesquare.net/wp-content/uploads/2023/12/별첨-포스터세로-e1702351628734.jpg',
    realLink: 'https://www.venturesquare.net/906338',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '벤처스퀘어',
    title: '부산창경, IR 데모데이 ‘B.I.C DAY’ 개최',
    link: 'https://www.neusral.com/r?n=yMCle6YWbV',
    date: '23.12.12',
  },
  {
    id: 'deyybx8zn3zfi4ugl5bdjetr',
    neusralId: 'lnCWqrlxVq',
    description:
      '신생 벤처캐피탈(VC) 제이원창업투자(J1 Venture Capital)는 지난달 말 첫 펀드 결성을 완료했다고 11일 밝혔다. 이번 펀드에는 일반 법인과 사회적 기업 등 다수의 출자자(LP)가 참여했다. 이번에 결성한 제이원창업투자 1호 펀드는 벤처조합 결성금액을 넘겼으며, 향후 50억원 수준으로 확대될 예정이다. 제이원창업투자는 안정성과 수익성을 동시에',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.a5ed615df563497a9e4ccd864c29e340.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896851',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '매일경제',
    title: '제이원창업투자, 마수걸이 펀드 결성 완료',
    link: 'https://www.neusral.com/r?n=lnCWqrlxVq',
    date: '23.12.12',
  },
  {
    id: 'qszlbwum495qja9u3qjztqef',
    neusralId: 'mxC4MgLN7x',
    description:
      '마르타 알리나 사우스벤처스 이사 &quot;언어장벽 넘을 K창업 커뮤니티 만들었죠&quot;, 외국인 창업지원 서울스타트업스 6년 만에 가입자 4600명 넘어 업계 네트워킹·해커톤 행사 개최 韓 선후배 문화처럼 서로 도울 것',
    image: 'https://img.hankyung.com/photo/202312/AA.35310076.1.jpg',
    realLink: 'https://www.hankyung.com/article/2023121215021',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '한국경제',
    title: '"언어장벽 넘을 K창업 커뮤니티 만들었죠"',
    link: 'https://www.neusral.com/r?n=mxC4MgLN7x',
    date: '23.12.12',
  },
  {
    id: 'i3rq9wzuktgtbd8cbxqpdvmg',
    neusralId: 'GkCGKPmexb',
    category: '스타트업 뉴스',
    tag: '지원',
    reporter: '지디넷코리아',
    title: 'KISIA, 미국 현지 액셀러레이팅 프로그램 성료',
    link: 'https://www.neusral.com/r?n=GkCGKPmexb',
    date: '23.12.12',
  },
  {
    id: 'q9sqh88lts85lr579pjegwcv',
    neusralId: 'KYCzjKmE3j',
    description:
      '[파이낸셜뉴스] 코스피가 동학개미로 불리는 개인투자자의 6800억원이 넘는 순매도세에도 2530선에서 상승세다.12일 코스피는 전거래일 대비 0.39%오른 2535.27에 마감했다. 장 출발과 비슷한 수준이다. 이날 코스피는 전거래일 대비 0.39%오른 2535.11로 출발했다.개인, 연기금은 각각 6846억원, 559억원을 순매도했다.하..',
    image:
      'https://image.fnnews.com/resource/media/image/2023/09/25/202309251317138532_l.jpg',
    realLink: 'https://www.fnnews.com/news/202312121535062975',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '파이낸셜뉴스',
    title: '[fn마감시황]코스피, 동학개미 6800억 넘게 팔아도 2530선 상승세',
    link: 'https://www.neusral.com/r?n=KYCzjKmE3j',
    date: '23.12.12',
  },
  {
    id: 'namb43kwipjlzq0a083nha65',
    neusralId: 'dQCxrW0NOG',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121215041039888_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121215041039888',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '머니투데이',
    title: "반도체 회복·美 금리인상 종료 기대…국내증시 외국인 45억불 '순유입'",
    link: 'https://www.neusral.com/r?n=dQCxrW0NOG',
    date: '23.12.12',
  },
  {
    id: 'r57pupxzvw84l8qm5a4z5gs0',
    neusralId: 'NACn3Xq0g0',
    description:
      '대주주 요건을 강화해 주식 양도소득세 납부 대상을 줄이자는 최근 논의와 관련해 추경호 부총리 겸 기획재정부 장관이 검토하고 있지 않다고 밝혔다. 연말을 앞두고 주식 양도세를 회피하려는 큰손 개미들의 매도세가 올해도 반복될 가능성이 높아졌다. 12일 추 부총리는 정부세종청사에서 기자들과 만나 “현재 대주주 양도세 기준 완화와 관련해서는 구체적으로 검토하고 있',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.c6d71e073a31453c82de261d0dcc2917.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896732',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '매일경제',
    title:
      '올 연말 큰손 개미들 1조 매물폭탄 쏟아내나…“대주주 양도세 완화 검토안해”',
    link: 'https://www.neusral.com/r?n=NACn3Xq0g0',
    date: '23.12.12',
  },
  {
    id: 'lhkgmwr2oektb98grzv7sit6',
    neusralId: 'XJCeWYGoxK',
    description:
      '자녀 유학보낸 부모, 요즘 매일 애탄다 왜 원달러 환율 하루 평균 변동폭, 지난달부터 3~5원 더 커져 최근 달러 대비 원화 환율이 하루 10원 이상 움직이는 날이 늘었다. 통상 환율은 하루 3~5원쯤 움직이는데, 출렁임이 커진 것이다. 지난달 2~6일엔 3거래일 연속',
    image:
      'https://images.chosun.com/resizer/gQjj62QeqLJoMxjmSxUzvx1LtGo=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/ZOP2CGXTTZFRDM2MRPJF3JUKCQ.png',
    realLink:
      'https://www.chosun.com/economy/economy_general/2023/12/13/IEXTKB2GYZCETDJGJUJSMBL5BY/?utm_source=naver&utm_medium=referral&utm_campaign=naver-news',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '조선일보',
    title: '금융시장 안갯속… 환율, 사흘에 한번꼴 10원 이상 출렁',
    link: 'https://www.neusral.com/r?n=XJCeWYGoxK',
    date: '23.12.13',
  },
  {
    id: 'h6i3fsatebtfel5bwzo5hkq3',
    neusralId: 'VwCyo70jN1',
    description:
      '3분기 최대 실적거둔 야놀자뉴욕거래소 출신 CFO 선임NYSE 전광판에 축전 도배해외매출 전년동기比 200%↑클라우드 사업 흑자전환 성과美투자업계서 러브콜 쏟아져',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01110121000002_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/stock/10896685',
    category: '경제 뉴스',
    tag: '증시/환율',
    reporter: '매일경제',
    title: '야놀자 美IPO, 이르면 내년 상반기 출격',
    link: 'https://www.neusral.com/r?n=VwCyo70jN1',
    date: '23.12.12',
  },
  {
    id: 'c69q0jsoey9c528lqskipo0z',
    neusralId: 'qkCZqx7L8p',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '연합뉴스',
    title: "고금리·고물가 그늘…이자부담, '입고 신는' 지출보다 커졌다",
    link: 'https://www.neusral.com/r?n=qkCZqx7L8p',
    date: '23.12.13',
  },
  {
    id: 'e7b8ob9btztobpr0gs1b6meh',
    neusralId: 'MLC6zeWmGL',
    description:
      '국내 3대 신용평가사(한국기업평가·나이스신용평가·한국신용평가)들이 올해 하반기 기업 신용도 정기평가에서 자동차와 조선, 전력기기 기업의 신용도를 올렸지...',
    image:
      'https://cphoto.asiae.co.kr/listimglink/1/2023121308510286714_1702425062.png',
    realLink: 'https://view.asiae.co.kr/article/2023121207195379468',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '아시아경제',
    title: "'건설·금융·석화' 신용도 떨어지고 '조선·자동차'는 개선",
    link: 'https://www.neusral.com/r?n=MLC6zeWmGL',
    date: '23.12.13',
  },
  {
    id: 'tbiw1e288s9ql9p8scch9pnt',
    neusralId: '23CPKNmKge',
    description:
      '\r\n\r\n[서울=뉴시스]남주현 기자 = 환율 안정세와 국제유가 하락에 수출입물가가 5개월 만에 내림세로 전환했다',
    image: 'http://image.newsis.com/2023/12/11/NISI20231211_0020158716_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002555630',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '뉴시스',
    title: "환율·유가 안정세에…11월 수출입물가 다섯달 만에 '하락'",
    link: 'https://www.neusral.com/r?n=23CPKNmKge',
    date: '23.12.13',
  },
  {
    id: 'sn048ac38evoiu2lufy1zflg',
    neusralId: 'EZCYngJb6b',
    image:
      'https://image.kmib.co.kr/online_image/2023/1213/2023121216331666035_1702366396_0018964033.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0018964033&code=61141211&cp=nv',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '국민일보',
    title: '채권 ‘큰 손’ 된 개인 투자자… 금리 인하 기대감에 올해 36兆 샀다',
    link: 'https://www.neusral.com/r?n=EZCYngJb6b',
    date: '23.12.13',
  },
  {
    id: 'jdteljv645hfqqn823o14m9h',
    neusralId: 'QlCdWPgMGJ',
    image:
      'https://image.kmib.co.kr/online_image/2023/1213/2023121219180666443_1702376286_0924334511.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0924334511&code=11151300&cp=nv',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '국민일보',
    title: '‘상생금융 2兆’ 갹출 방법 두고 예민한 은행권',
    link: 'https://www.neusral.com/r?n=QlCdWPgMGJ',
    date: '23.12.13',
  },
  {
    id: 'c2p84fr06cgaiwwc5aqdlsj2',
    neusralId: 'mxC4MgLlGb',
    description:
      '\r\n[서울=뉴시스] 박성환 기자 = &quot;기존 시세보다 수억원 낮은 가격에 급매물이 많이 나오면서 집값이 빠르게 하락했어요',
    image: 'http://image.newsis.com/2023/06/12/NISI20230612_0019919203_web.jpg',
    realLink: 'https://www.newsis.com/view/?id=NISX20231212_0002554893',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '뉴시스',
    title: "'GTX 호재'도 무용지물…동탄 아파트값 한 달 새 5억 빠져",
    link: 'https://www.neusral.com/r?n=mxC4MgLlGb',
    date: '23.12.13',
  },
  {
    id: 'zr39mbykke41cc70syo38wwy',
    neusralId: 'VwCyo7Ql7b',
    description:
      '부동산 시장 침체 영향으로 공인중개소의 줄폐업이 이어지면서 한때 너도나도 뛰어들었던 공인중개사 시험에 대한 응시자도 급감하고 있다. 이런 탓에 공인중개소를 대상으로 시장을 넓혀 갔던 프롭테크(부동산 산업에 IT 서비스를 접목한 산업) 업계도 타격을 받고 있다.(그래픽...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300044.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01269366635838192&mediaCodeNo=257',
    category: '경제 뉴스',
    tag: '금리/부동산/물가',
    reporter: '이데일리',
    title: "공인중개업소 매달 1200곳 문닫아…프롭테크도 투자 유치 '뚝'",
    link: 'https://www.neusral.com/r?n=VwCyo7Ql7b',
    date: '23.12.13',
  },
  {
    id: 'glioqs8nfyopnu7o8t2ve6xp',
    neusralId: '8XCjNnmPbR',
    description:
      '美 11월 물가상승률 3.1% 2% 향해 순항중  11월 미국 소비자물가지수CPI가 전년 동월 대비 3.1% 상승했다고 12일이하 현지시각 미국 노동부가 발표했다. 이 같은 물가 상승세는 지난 9월3.7%과 10월3.2%보다 더 낮아진 것이다. 시장 ...',
    image:
      'https://images.chosun.com/resizer/krAsDD2ms45TyNhZT1ERTdIeX1U=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/ODRT3SPZFNMFNEJ276FONW5EOQ.jpg',
    realLink:
      'https://www.chosun.com/economy/economy_general/2023/12/12/AJ3CYH5GMNFHDEZB6CRDKLNECA/?utm_source=naver&utm_medium=referral&utm_campaign=naver-news',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '조선일보',
    title: '美 11월 물가상승률 3.1%…”2%를 향해 순항중”',
    link: 'https://www.neusral.com/r?n=8XCjNnmPbR',
    date: '23.12.12',
  },
  {
    id: 'xus1eus8zum3ujn2tldldbor',
    neusralId: 'r1CndPVPyd',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '연합뉴스',
    title: '美물가 우려에 유가 3.8% 급락…WTI 5개월만에 최저치',
    link: 'https://www.neusral.com/r?n=r1CndPVPyd',
    date: '23.12.13',
  },
  {
    id: 'h6o4lccgg18qe3aht2age37g',
    neusralId: 'MLC6zeWOZN',
    description:
      '이복현 금융감독원장이 12일 부동산 프로젝트파이낸싱(PF) 사업장에 대해 “옥석가리기”라는 표현을 직접 거론하면서 금융권에선 현재 시장에서 공통적으로 꼽고 있는 부실한 PF 사업장이나 건설회사 후보군들이 차례 대로 정리 절차를 맞게 될 것으로 보고 있다. 금융당국의 이번 방침은 부실 PF 이대로 놔두면 더욱 커져 터질 수 있기 때문에, ‘풍선의 바람빼기’처',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.8bb802c24e6747229a2800812a9b9ece.png',
    realLink: 'https://www.mk.co.kr/news/economy/10896949',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '매일경제',
    title: '134조 ‘빚 폭탄’ 한번에 터지면 한국 망해…‘좀비사업장’ 칼질 나서',
    link: 'https://www.neusral.com/r?n=MLC6zeWOZN',
    date: '23.12.12',
  },
  {
    id: 'fyu6agg2lywqg6mkllpebiwt',
    neusralId: 'A4Cy8N3Nj0',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121215185016813_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121215185016813',
    category: '경제 뉴스',
    tag: '전망/이슈',
    reporter: '머니투데이',
    title: '"이자도 못 내" 중소기업 죽을 맛…지방은행 \'깡통대출\' 47% 껑충',
    link: 'https://www.neusral.com/r?n=A4Cy8N3Nj0',
    date: '23.12.13',
  },
  {
    id: 'cimrvptaxyhrv4dsbc57seer',
    neusralId: 'ROCyaojon1',
    description:
      '앞서 왕 장관은 지난 5월 열린 제7차 세계정보회의(WIC)에서 &quot;차세대 기술인 AI는 경제·사회 발전을 위한 새로운 엔진이 될 것&quot;이라며 &quot;AI를 활용해 기업 주도 산업을 강화하고 경제 발전을 촉진하겠다&quot;고 밝혔다. 2017년 7월 중국 정부가 발표한 ‘차세대 인공지능 발전 계획’에선 2030년까지 중국 내 AI 산업 규모를 10조 위안(약 1700조원)까지 키워 세계 1위 AI 국가가 되겠다는 목표를 세웠다. 지난달 16일 중국 선전 본사에서 만난 제프 트램블리 화웨이 홍보 부사장은 &quot;미국 반도체산업협회에선 미 정부의 제재가 글로벌 반도체 산업을 해치고 있으며 오히려 중국 반도체 산업에 도움이 되고 있다고 말한다&quot;며 &quot;제재로 힘들었던 화웨이의 스마트폰 비즈니스도 이제 많이 회복된 상태&quot;라고 말했다.',
    image:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202312/13/5cdc8e2f-91cd-4214-b69a-72321c41c262.jpg/_ir_/resize/1280',
    realLink: 'https://www.joongang.co.kr/article/25214359',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '중앙일보',
    title: "'디플레 늪' 중국 반격…年19조 쏟아부어 '세계 최강 AI' 만든다 | 팩플",
    link: 'https://www.neusral.com/r?n=ROCyaojon1',
    date: '23.12.13',
  },
  {
    id: 't806o2brlv6sqobqabogbb5e',
    neusralId: 'YKCRYnMYRa',
    description:
      '삼성전자, 갤럭시S24에 제미나이, GPT-4′ 등 최신 AI 탑재 가능성  삼성전자가 내달 선보이는 갤럭시 S24 시리즈에 자체 개발 인공지능AI과 함께 다른 GPT-4와 같은 타사의 최신 AI 기술을 탑재할 가능성이 제기된다. 13일 IT업계에 따르면 삼성전자는 다',
    image:
      'https://biz.chosun.com/resizer/_NOFPbW7MuBM90y4cQyVcY0S0v0=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/H4P4MZTN5ZHXFH5VR2WKEGUTSI.png',
    realLink:
      'https://biz.chosun.com/it-science/ict/2023/12/13/GNN2ITQDE5CLXIDF6XNIUHNZMI/?utm_source=naver&utm_medium=original&utm_campaign=biz',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '조선비즈',
    title: "삼성전자, 갤럭시S24에 '제미나이', 'GPT-4' 등 최신 AI 탑재 전망",
    link: 'https://www.neusral.com/r?n=YKCRYnMYRa',
    date: '23.12.13',
  },
  {
    id: 'gtv2qyos02ph6qdjlrtp22zs',
    neusralId: 'joCVNj8p0j',
    description:
      '미국 10개 주 AI 관련 검색어 조사\n캘리포니아주가 가장 많은 검색\nAI 관련 검색어 1위는 ‘챗GPT’',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/11/news-p.v1.20231211.2358a56de00d4b13b46eec8ddd9ad94a.png',
    realLink: 'https://www.mk.co.kr/news/it/10896022',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '매일경제',
    title: '시장 선점 효과 무섭네...“생성형AI 하면? 역시 챗GPT”',
    link: 'https://www.neusral.com/r?n=joCVNj8p0j',
    date: '23.12.12',
  },
  {
    id: 'svnmnu8q9w8b9dylv09fhegv',
    neusralId: 'YKCRYnJ8nZ',
    description:
      "佛미스트랄 자체 모델 공개몸값 2.6조원 평가 스타트업범용 아닌 특정영역에 특화'유럽의 AI 희망'으로 불려EU, 美빅테크 견제 방침에獨 등 유럽회사 속속 AI 도전",
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01160116000001_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/it/10896822',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '매일경제',
    title: '한발늦은 유럽…AI 소형모델로 틈새 노린다',
    link: 'https://www.neusral.com/r?n=YKCRYnJ8nZ',
    date: '23.12.12',
  },
  {
    id: 'o8cikkwa0vlnshjtagvzcnac',
    neusralId: 'k4CQne1e1G',
    description:
      'MIT그룹, AI 거버넌스 백서 발표\n악용될 경우 플랫폼 사용자에도 책임\nAI 규제하는 관리 감독 기구 필요\n“적절한 규제, AI 발전에 도움”',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/12/news-p.v1.20231212.e501673dcb8248998bfef97462590e80.png',
    realLink: 'https://www.mk.co.kr/news/it/10896367',
    category: 'AI 뉴스',
    tag: '챗GPT/생성AI',
    reporter: '매일경제',
    title: 'MIT그룹, AI 거버넌스 발표… AI 규제 논의 본격화',
    link: 'https://www.neusral.com/r?n=k4CQne1e1G',
    date: '23.12.12',
  },
  {
    id: 'bmn1z3uwqbdsvf79mh7syg4z',
    neusralId: 'ROCyaoYbx1',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121015010391205_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121015010391205',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '머니투데이',
    title: 'R&D 강화 나선 네이버웹툰…"AI 인력, 100명 채운다"',
    link: 'https://www.neusral.com/r?n=ROCyaoYbx1',
    date: '23.12.12',
  },
  {
    id: 'fimi27nw8ytqrpjpw9nbcrbb',
    neusralId: 'BnCkynKYz7',
    description:
      '[파이낸셜뉴스] 네이버 자회사 스노우가 인공지능(AI) 사진편집 애플리케이션(앱) 에픽을 통해 셀피 이미지를 기반으로 크리스마스 콘셉트의 이미지를 받아볼 수 있는 ‘AI 크리스마스’ 서비스를 출시했다고 12일 밝혔다.이번 서비스는 지난 9월 처음 선보인 뒤 열풍을 일으킨 ‘AI 이어북’의 연장선에서 출시됐다.&nbsp;..',
    image:
      'https://image.fnnews.com/resource/media/image/2023/12/12/202312121059476428_l.jpg',
    realLink: 'https://www.fnnews.com/news/202312121054035455',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '파이낸셜뉴스',
    title: '네이버 스노우 "AI가 만든 크리스마스 이미지 받아보세요"',
    link: 'https://www.neusral.com/r?n=BnCkynKYz7',
    date: '23.12.12',
  },
  {
    id: 'tusz432emvi3zku432bqw8x3',
    neusralId: '47Cpoybz8g',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '연합뉴스',
    title: '11번가, 테크 콘퍼런스…"AI 기술로 상품·가격·검색 지원"',
    link: 'https://www.neusral.com/r?n=47Cpoybz8g',
    date: '23.12.12',
  },
  {
    id: 'qnnif5a3qenbddd2w3hsxvx6',
    neusralId: '8XCjNnLaMJ',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121209230665490_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121209230665490',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '머니투데이',
    title: "AI 웹툰 '리얼드로우', 22억원 프리A 투자유치…알토스 주도",
    link: 'https://www.neusral.com/r?n=8XCjNnLaMJ',
    date: '23.12.12',
  },
  {
    id: 't4f1bt6zglhisqos1rhow2x7',
    neusralId: 'wLCEAzbPjN',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121210262457957_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121210262457957',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '머니투데이',
    title: "오이사공, 생성 AI 기반 HR 동료 'AI 인사쟁이' 무료 오픈",
    link: 'https://www.neusral.com/r?n=wLCEAzbPjN',
    date: '23.12.12',
  },
  {
    id: 'tx4elpnz465f16axr0js7878',
    neusralId: 'p0CdaGpd08',
    description: '(사진 왼쪽부터) NIA 이용진 본부장, 미니레코드 김명군...',
    image: '/2023/12/12/2023121208484554774_l.jpg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121208563881350',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '디지털데일리',
    title: "NIA-업스테이지, '한국어 초거대 LLM' 시상식 개최",
    link: 'https://www.neusral.com/r?n=p0CdaGpd08',
    date: '23.12.12',
  },
  {
    id: 'vbds10do76kn1pzwsuynglpm',
    neusralId: 'BnCkynKrgB',
    realLink: 'https://www.news1.kr/articles/5259064',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '뉴스1',
    title: '국내 연구진, 인공지능 기반 수면 질환 검사 알고리즘 개발',
    link: 'https://www.neusral.com/r?n=BnCkynKrgB',
    date: '23.12.12',
  },
  {
    id: 'es14d390af6mouu4gpt92q45',
    neusralId: 'aVCVRbmGYp',
    description: '서종훈 스켈터랩스 개발총괄 [ⓒ 스켈터랩스]...',
    image: '/2023/12/11/2023121118240344617_l.jpg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121118274790405',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '디지털데일리',
    title:
      '[인터뷰] "오픈AI 위협? 맞서볼 만하다" 스켈터랩스, 대화형 AI 기술로 진격',
    link: 'https://www.neusral.com/r?n=aVCVRbmGYp',
    date: '23.12.12',
  },
  {
    id: 'shrp3tyyvpyxexca1qc81tk8',
    neusralId: '8XCjNnLl0X',
    description:
      "인공지능(AI) 전문 마인즈앤컴퍼니(대표 전상현, 고석태)는 우리은행의 생성 인공지AI 기반 'AI 뱅커' 서비스 구축을 시작한다고 12일 밝혔다. 마인즈앤컴퍼니는 지난 10월 해당 사업 수행자로 선정됐다. 생성 AI를 활용해 고객 대상 금융상담 서비스를 제공하는 '금융권 최초의 사례'라는 설명이다.마인즈앤컴퍼니는 금융상담 서비스를 위한 AI 모델을 구축, 이를 지속적으로 학습 및 관리해 다양한 고객 상담에 대응하는 AI 뱅커 솔루션을 개발한다.고객 대상 업무 지원을 강화하는 생성 AI까지 도입한다. 금융 분야에 특화한 생성 AI",
    image:
      'https://cdn.aitimes.com/news/thumbnail/202312/155807_167012_497_v150.jpg',
    realLink: 'https://www.aitimes.com/news/articleView.html?idxno=155807',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: 'AI타임스',
    title: '마인즈앤컴퍼니, 우리은행 ‘생성 AI 뱅커 서비스’ 구축',
    link: 'https://www.neusral.com/r?n=8XCjNnLl0X',
    date: '23.12.12',
  },
  {
    id: 'lqw98zpvrqvnpu0e2b83z1k5',
    neusralId: 'Z2C0oBbeMR',
    image:
      'http://file.mk.co.kr/meet/neds/2023/12/image_readtop_2023_951956_17023684815747410.jpg',
    realLink: 'http://game.mk.co.kr/view.php?year=2023&no=951956',
    category: 'AI 뉴스',
    tag: '출시/개발',
    reporter: '매일경제',
    title: '앤유PC방 선론칭 AI 게임 코칭 서비스 ‘GGQ’ 인기',
    link: 'https://www.neusral.com/r?n=Z2C0oBbeMR',
    date: '23.12.12',
  },
  {
    id: 'fq0limfs4770guvjgt14vho5',
    neusralId: '8XCjNnLpkR',
    description:
      '-카카오 김범수, 브라이언톡에서 &lsquo;AI&rsquo; 강조-일상생활 관련 신규사업 진출 그만&hellip;내년부터 AI 본격 드라이브-&ldquo;우수 AI 아이디어 제시한 임직원에 포상하겠다&rdquo;-필요하다면 임직원 절...',
    image: '/2023/12/11/2023121115591900989_l.jpeg',
    realLink: 'https://www.ddaily.co.kr/page/view/2023121217561383472',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '디지털데일리',
    title: '[단독] 카카오 김범수, ‘AI’ 전력투구…아이디어 포상까지 내걸어',
    link: 'https://www.neusral.com/r?n=8XCjNnLpkR',
    date: '23.12.12',
  },
  {
    id: 'o6gnq4bohfusyin33cj4edgp',
    neusralId: 'MLC6ze8pZd',
    description:
      '에마뉘엘 마크롱 프랑스 대통령이 최근 유럽연합(EU) 회원국들이 합의한 AI규제법안(AI Act)에 반대 목소리를 내고 있다. 미국, 영국, 중국의 경쟁자들에 비해 상대적으로 약한 EU AI의 혁신을 가로막을 수 있다는 이유에서다.에마뉘엘 마크롱 프랑스 대통령. (사...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121200047.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01269366635837864&mediaCodeNo=257',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '이데일리',
    title: '마크롱 “EU AI혁신 막을 것” 경고…AI규제안 막판 변수 떠올라',
    link: 'https://www.neusral.com/r?n=MLC6ze8pZd',
    date: '23.12.12',
  },
  {
    id: 'ewsbczzgid0vp92c350f2v0x',
    neusralId: 'QlCdWPemBP',
    description:
      '\n시가총액 세계 2위 기업인 마이크로소프트(MS)가 미국 노동조합과 &#039;인공지능(AI) 동맹&#039;을 체결했다. 지난해 11월 시작된 챗GPT 열풍으로 &#039;AI가 사람의 일자리를 채울 것&#039;이란 우려가 커져 가는 가운데, 테크업체와 노동자들이 AI 이슈를 놓고 협력 관계를 맺은 건 처음이다. 세계 AI 개발 경쟁을 선도하는 MS의 선제적 움직임은 다른 기업들의 후속 ',
    image:
      'https://newsimg-hams.hankookilbo.com/2023/12/12/9ebd4485-bff7-491d-b917-6a830fc9d82b.jpg?t=20231213173158',
    realLink:
      'https://www.hankookilbo.com/News/Read/A2023121213440003628?did=NA',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '한국일보',
    title:
      '"AI, 일자리 뺏을 것" 우려에... MS, 미국 최대 노조와 사상 첫 \'AI 협력\'',
    link: 'https://www.neusral.com/r?n=QlCdWPemBP',
    date: '23.12.12',
  },
  {
    id: 'ehm602db0dr57epggo7bia2h',
    neusralId: 'nECyPQZYxB',
    image: 'https://thumb.mt.co.kr/21/2023/12/2023121216391953481_1.jpg',
    realLink: 'https://news.mt.co.kr/mtview.php?no=2023121216391953481',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '머니투데이',
    title: '한국에 세계 최초 국제인공지능저작권관리기구 출범 추진',
    link: 'https://www.neusral.com/r?n=nECyPQZYxB',
    date: '23.12.12',
  },
  {
    id: 'udgafkuhpjgmpcqasi5f4mve',
    neusralId: 'aVCVRbmgOl',
    description:
      '&#039;AI칩의 제왕&#039; 엔비디아, AI 기업들의 초석 투자자 됐다, 김리안 기자, 국제',
    image: 'https://img.hankyung.com/photo/202312/ZA.35305453.1.jpg',
    realLink: 'https://www.hankyung.com/article/202312129667i',
    category: 'AI 뉴스',
    tag: '현상/규제/전망',
    reporter: '한국경제',
    title: "'AI칩의 제왕' 엔비디아, AI 기업들의 초석 투자자 됐다",
    link: 'https://www.neusral.com/r?n=aVCVRbmgOl',
    date: '23.12.12',
  },
  {
    id: 'dnushh9iu7bqfw0bxmckhrf1',
    neusralId: 'GkCGKPmwPP',
    description:
      '개도국·저개발국가에 2050년까지 배상 땐 연 20조 달할 듯중국 6529조 1위…국내 기업 책임액 ...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000422300040101.jpg',
    realLink:
      'https://www.khan.co.kr/environment/climate/article/202312122133005',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '경향신문',
    title: '한국, 온실가스 배출 ‘기후 부채’는 517조원 ‘세계 9위’',
    link: 'https://www.neusral.com/r?n=GkCGKPmwPP',
    date: '23.12.12',
  },
  {
    id: 'ehdtvllnut8lul34sopm129q',
    neusralId: 'p0CdaGpnQr',
    description:
      '&ldquo;에어컨만 잘 틀어도 아낄 수 있는 전기 요금이 연 1조 달러&rdquo; 제28차 유엔기후변화협약 당사국총회(COP28)에서 미국 등 60여개 국가는 지난 5일 국제 냉방 서약(Global Cooling Pledge)에 가입하며 2050년까지 냉방 관련 온실가스 배출량을 2022년의 68% 이상 줄이기로 했다. 이 목표를 달성하면 2050년까지 온실가스를 약 780억t 감축할 전망이다. 뿐만 아니라 전세계 소비자들은 2050년 전기 요금으로만 연 1조 달러를 아낄 수 있을 것으...',
    image:
      'https://res.heraldm.com/content/image/2023/08/09/20230809000631_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000664',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '헤럴드경제',
    title:
      '“전기 요금만 1300조원” 어마어마하게 아낀다…에어컨 잘 틀면 벌어지는 놀라운 일 [지구, 뭐래?]',
    link: 'https://www.neusral.com/r?n=p0CdaGpnQr',
    date: '23.12.12',
  },
  {
    id: 'xwjpxpesee6hwylwwpx69brf',
    neusralId: 'aVCVRbm8z4',
    description:
      '기후테크가 온다 COP28가 인정했다...기후위기 해결사 떠오른 한국 우주기업들 SIA·나라스페이스, 기후테크 중심으로 국제 활동 넓혀 개도국 기상 예측부터 대기 중 메탄 감시까지 전 지구적 차원 관측 중요해우주 기반 기후테크 수요 늘 것 국방과 통신 분야에서 주로 활',
    image:
      'https://biz.chosun.com/resizer/v-Y-Yrbm5bGYb7lQChrhq_9OERI=/1200x630/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/7BNL6YQPYBH6XMB6B6YGFG4H6U.jpg',
    realLink:
      'https://biz.chosun.com/science-chosun/technology/2023/12/12/ILHB7IN3GVCOZFIUA2DX4QZ3XI/?utm_source=naver&utm_medium=original&utm_campaign=biz',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '조선비즈',
    title:
      '[기후테크가 온다] COP28가 인정했다...기후위기 해결사 떠오른 한국 우주기업들',
    link: 'https://www.neusral.com/r?n=aVCVRbm8z4',
    date: '23.12.12',
  },
  {
    id: 'qbcwlyuqp9aal88zptfyj0p6',
    neusralId: 'eWCWLrJX7W',
    description:
      '수소연료가 탄소 배출량이 많은 건설&middot;산업 중장비의 탄소중립을 이끌 핵심 수단으로 부상했다. 국내외에서 관련 연료전지 및 내연기관 연구개발이 활발히 진행되고 있어 동향을 알아보는 자리가 마련된다.  건설기계부품연구원(원장 채규남)이 오는 13일 서울 역삼동 SC컨벤션센터에서 &lsquo;제5회 수소 건설&middot;산업기계 발전포럼&rsquo;을 연다고 밝혔다.  포럼에서 ▷HD현대인프라코어 신명호 책임연구원이 &lsquo;14t급 수소로더 개발 ...',
    image:
      'https://res.heraldm.com/content/image/2023/12/12/20231212000625_p.jpg',
    realLink: 'http://news.heraldcorp.com/view.php?ud=20231212000667',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '헤럴드경제',
    title: '“수소연료, 건설기계 탄소중립 핵심자원”',
    link: 'https://www.neusral.com/r?n=eWCWLrJX7W',
    date: '23.12.12',
  },
  {
    id: 'lbr1znc8tpimbu3sy0qaeev6',
    neusralId: 'NACn3XjNPL',
    description:
      '“겨울에는 충전하면 150㎞밖에 못 가요. 이럴 줄 알았으면 전기 말고 LPG(액화석유가스) 트럭을...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000433400039941.jpg',
    realLink: 'https://www.khan.co.kr/economy/auto/article/202312122200035',
    category: 'ESG 뉴스',
    tag: '기후/환경(ENVIRONMENTAL)',
    reporter: '경향신문',
    title: '디젤 빠질 1톤 트럭…LPG에 시선 집중',
    link: 'https://www.neusral.com/r?n=NACn3XjNPL',
    date: '23.12.12',
  },
  {
    id: 'miaitxkzxylcimsykpcshcb7',
    neusralId: 'qkCZqxl628',
    description:
      '은행대상 / 강신숙 Sh수협은행장10월까지 순이익 3100억작년 전체 번 돈보다 많아총자산 57조…7년새 2배무디스 평가 신용등급 올라어업·수산·해양 맞춤 서비스해양수산금융 발전에도 기여',
    image:
      'https://wimg.mk.co.kr/news/cms/202312/13/20231213_01110205000002_L00.jpg',
    realLink: 'https://www.mk.co.kr/news/special-edition/10896579',
    category: 'ESG 뉴스',
    tag: '사회공헌/인권경영(SOCIAL)',
    reporter: '매일경제',
    title: "수협 1호 여성행장 … 최대실적에 내실까지 '두토끼' 잡아",
    link: 'https://www.neusral.com/r?n=qkCZqxl628',
    date: '23.12.12',
  },
  {
    id: 'p52n204r371ifqbubkabcsgr',
    neusralId: 'EZCYngJQwL',
    description:
      'SK그룹이 연말을 맞아 이웃사랑 성금 120억원을 사회복지공동모금회에 기부(사진)했다고 12일 밝혔...',
    image:
      'https://img.khan.co.kr/news/2023/12/12/l_2023121301000410100039001.jpg',
    realLink:
      'https://www.khan.co.kr/people/people-general/article/202312122048015',
    category: 'ESG 뉴스',
    tag: '사회공헌/인권경영(SOCIAL)',
    reporter: '경향신문',
    title: 'SK그룹, 사회복지공동모금회에 120억원 기부',
    link: 'https://www.neusral.com/r?n=EZCYngJQwL',
    date: '23.12.12',
  },
  {
    id: 'dk2f7gb2i0qur4hyq72y3zf2',
    neusralId: 'qkCZqx7Yml',
    image:
      'https://image.kmib.co.kr/online_image/2023/1213/2023121219150566437_1702376105_0924334613.jpg',
    realLink:
      'https://news.kmib.co.kr/article/view.asp?arcid=0924334613&code=11151300&cp=nv',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '국민일보',
    title: '은행권 셀프 연임 막는다… 이복현표 지배구조 30개 원칙 제시',
    link: 'https://www.neusral.com/r?n=qkCZqx7Yml',
    date: '23.12.13',
  },
  {
    id: 'j6l6gld7ghyhc88ask194hdc',
    neusralId: 'KYCzjKm8qz',
    description:
      '은행권 이사회를 ‘일하는 이사회’로 만들기 위한 모범관행이 마련됐다. 한국의 고질적 문제로 거론되는 이사회의 취약한 견제...',
    image:
      'https://flexible.img.hani.co.kr/flexible/normal/640/383/imgdb/original/2023/1212/20231212502995.jpg',
    realLink: 'https://www.hani.co.kr/arti/economy/finance/1120107.html',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한겨레',
    title: '은행권 ‘일하는 이사회’ 만들 수 있을까…금감원, 모범관행 마련',
    link: 'https://www.neusral.com/r?n=KYCzjKm8qz',
    date: '23.12.12',
  },
  {
    id: 'dneq8jdd479312g0nj2tj8jd',
    neusralId: 'XJCeWYGYy6',
    description:
      '[이데일리 정두리 기자] 내부통제와 관련한 금융사 임원의 책임소재를 명확히 하는 책무구조도 도입이 내년 하반기 시행 예정인 가운데 금융권이 대책 마련에 분주하다. 전문가들은 앞으로 책무구조도 도입으로 해당임원의 책무가 명확해짐에 따라 임원 신규선임뿐만 아니라 기존 임원...',
    image:
      'https://image.edaily.co.kr/images/Photo/files/NP/S/2023/12/PS23121300034.jpg',
    realLink:
      'https://www.edaily.co.kr/news/read?newsId=01230006635838192&mediaCodeNo=257',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '이데일리',
    title: '내년부터 책무구조도 도입…금융사 내부통제 어떻게 바뀌나',
    link: 'https://www.neusral.com/r?n=XJCeWYGYy6',
    date: '23.12.13',
  },
  {
    id: 'gnahclh6b2rrbnczx3fsqngg',
    neusralId: 'EZCYngJgVo',
    description: '이창민의 한국 경제 속 재벌 탐구',
    image:
      'https://flexible.img.hani.co.kr/flexible/normal/800/481/imgdb/original/2023/1212/20231212503404.jpg',
    realLink:
      'https://www.hani.co.kr/arti/economy/economy_general/1120153.html',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한겨레',
    title: "5공 때로 퇴보한 정경유착…재벌들 `울며 떡볶이 먹기'",
    link: 'https://www.neusral.com/r?n=EZCYngJgVo',
    date: '23.12.13',
  },
  {
    id: 'ian1pco68k66ix2qgsdp7mub',
    neusralId: 'yMCle6YdXQ',
    description:
      '&quot;3년 만에 규정 삭제&quot;…KT&amp;G, &#039;내부 출신 사장&#039; 원칙 깨지나 [박동휘의 컨슈머 리포트] , 박동휘 기자, 경제',
    image: 'https://img.hankyung.com/photo/202312/01.35306319.1.jpg',
    realLink: 'https://www.hankyung.com/article/202312118605i',
    category: 'ESG 뉴스',
    tag: '청렴/투명경영(GOVERNANCE)',
    reporter: '한국경제',
    title:
      "행동주의 압박에…KT&G, '내부 출신 사장' 원칙 깨지나 [박동휘의 컨슈머 리포트]",
    link: 'https://www.neusral.com/r?n=yMCle6YdXQ',
    date: '23.12.12',
  },
] as ItemTestType[];

async function TagfindOrCreate(text: string): Promise<Tag> {
  const data = await db.tag.findUnique({
    where: {
      name: text,
    },
  });
  if (!data) {
    const tag = await db.tag.create({
      data: {
        name: text,
      },
    });
    return tag;
  }
  return data;
}

async function CategoryfindOrCreate(text: string): Promise<Category> {
  const data = await db.category.findUnique({
    where: {
      name: text,
    },
  });
  if (!data) {
    const category = await db.category.create({
      data: {
        name: text,
      },
    });
    return category;
  }
  return data;
}

async function NewspaperfindOrCreate(text: string): Promise<Newspaper> {
  const data = await db.newspaper.findUnique({
    where: {
      name: text,
    },
  });
  if (!data) {
    const newspaper = await db.newspaper.create({
      data: {
        name: text,
      },
    });
    return newspaper;
  }
  return data;
}

async function Create(input: ItemTestType) {
  const {
    tag,
    category,
    neusralId,
    reporter,
    title,
    link,
    image,
    description,
    realLink,
  } = input;

  const exists = await db.item.findFirst({
    where: {
      neusralId,
      title,
      link,
      realLink,
    },
  });

  if (exists) {
    return exists;
  }

  const tagItem = await db.tag.findFirst({
    where: {
      name: tag,
    },
  });
  const categoryItem = await db.category.findFirst({
    where: {
      name: category,
    },
  });

  const newspaperItem = await db.newspaper.findFirst({
    where: {
      name: reporter,
    },
  });

  // 'YY.MM.DD' => 'YYYY-MM-DD HH:mm:ss' 형식으로 변환하는데 순수 자바스크립트로는 구현
  const dateString = input.date ? dateStringFormating(input.date) : undefined;
  const dateTime = dateString ? new Date(dateString) : undefined;
  const pulbishedAt = dateTime ? dateTime : undefined;

  const data = await db.item.create({
    data: {
      neusralId,
      title,
      link,
      realLink,
      description,
      pulbishedAt,
      image,
      ...(newspaperItem && {
        Newspaper: {
          connect: {
            id: newspaperItem.id,
          },
        },
      }),
      ...(categoryItem && {
        Category: {
          connect: {
            id: categoryItem.id,
          },
        },
      }),
      ...(tagItem && {
        ItemTag: {
          create: [
            {
              tag: {
                connect: {
                  id: tagItem.id,
                },
              },
            },
          ],
        },
      }),
    },
  });

  return data;
}

async function bootstrap() {
  try {
    const unionTags = new Set<string>();
    const unionCategories = new Set<string>();
    const unionNewspapers = new Set<string>();
    DEFAULT_ITEMS.forEach((item) => {
      if (item.tag) unionTags.add(item.tag);
      if (item.category) unionCategories.add(item.category);
      if (item.reporter) unionNewspapers.add(item.reporter);
    });

    try {
      const tags = [...unionTags];
      await Promise.all(tags.map((tag) => TagfindOrCreate(tag)));
    } catch (error) {
      console.error(error);
    }

    try {
      const categories = [...unionCategories];
      await Promise.all(categories.map((item) => CategoryfindOrCreate(item)));
    } catch (error) {
      console.error(error);
    }

    try {
      const newspapers = [...unionNewspapers];
      await Promise.all(newspapers.map((item) => NewspaperfindOrCreate(item)));
    } catch (error) {
      console.error(error);
    }

    await Promise.all(DEFAULT_ITEMS.map((item) => Create(item)));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

void bootstrap();
