export async function POST(request: Request) {
  //   const response1 = await fetch("https://kauth.kakao.com/oauth/authorize", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: new URLSearchParams({
  //       grant_type: "authorization_code",
  //       client_id: "f5f9a3f8c3b6e0c0b3e6c8e2e4a2e2a4",
  //       redirect_uri: "https://neusral.com",
  //       code: "1p4Y2cQ4Z1UxXfWtK1Y1XwZ1WxZ1WxZ1",
  //       prompt: "none",
  //     }).toString(),
  //   });

  const template_object = {
    object_type: "list",
    header_title: "WEEKELY MAGAZINE",
    header_link: {
      web_url: "http://www.daum.net",
      mobile_web_url: "http://m.daum.net",
      android_execution_params: "main",
      ios_execution_params: "main",
    },
    contents: [
      {
        title: "자전거 라이더를 위한 공간",
        description: "매거진",
        image_url:
          "https://mud-kage.kakao.com/dn/QNvGY/btqfD0SKT9m/k4KUlb1m0dKPHxGV8WbIK1/openlink_640x640s.jpg",
        image_width: 640,
        image_height: 640,
        link: {
          web_url: "http://www.daum.net/contents/1",
          mobile_web_url: "http://m.daum.net/contents/1",
          android_execution_params: "/contents/1",
          ios_execution_params: "/contents/1",
        },
      },
      {
        title: "비쥬얼이 끝내주는 오레오 카푸치노",
        description: "매거진",
        image_url:
          "https://mud-kage.kakao.com/dn/boVWEm/btqfFGlOpJB/mKsq9z6U2Xpms3NztZgiD1/openlink_640x640s.jpg",
        image_width: 640,
        image_height: 640,
        link: {
          web_url: "http://www.daum.net/contents/2",
          mobile_web_url: "http://m.daum.net/contents/2",
          android_execution_params: "/contents/2",
          ios_execution_params: "/contents/2",
        },
      },
      {
        title: "감성이 가득한 분위기",
        description: "매거진",
        image_url:
          "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        image_width: 640,
        image_height: 640,
        link: {
          web_url: "http://www.daum.net/contents/3",
          mobile_web_url: "http://m.daum.net/contents/3",
          android_execution_params: "/contents/3",
          ios_execution_params: "/contents/3",
        },
      },
    ],
    buttons: [
      {
        title: "웹으로 이동",
        link: {
          web_url: "http://www.daum.net",
          mobile_web_url: "http://m.daum.net",
        },
      },
      {
        title: "앱으로 이동",
        link: {
          android_execution_params: "main",
          ios_execution_params: "main",
        },
      },
    ],
  };

  const response = await fetch(
    "https://kapi.kakao.com/v2/api/talk/memo/default/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer y7TBvOKp2XNFTDhY2oOjBkXMh5CDzJ6t`,
      },
      body: new URLSearchParams({
        template_object: JSON.stringify(template_object),
      }).toString(),
    }
  );

  const { status, statusText } = response;

  const data = await response.json();

  return new Response(JSON.stringify({ status, statusText, data }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// curl -v -X POST "https://kapi.kakao.com/v2/api/talk/memo/default/send" \
//     -H "Content-Type: application/x-www-form-urlencoded" \
//     -H "Authorization: Bearer ${ACCESS_TOKEN}" \
//     --data-urlencode 'template_object={
//         "object_type": "list",
//         "header_title": "WEEKELY MAGAZINE",
//         "header_link": {
//             "web_url": "http://www.daum.net",
//             "mobile_web_url": "http://m.daum.net",
//             "android_execution_params": "main",
//             "ios_execution_params": "main"
//         },
//         "contents": [
//             {
//                 "title": "자전거 라이더를 위한 공간",
//                 "description": "매거진",
//                 "image_url": "https://mud-kage.kakao.com/dn/QNvGY/btqfD0SKT9m/k4KUlb1m0dKPHxGV8WbIK1/openlink_640x640s.jpg",
//                 "image_width": 640,
//                 "image_height": 640,
//                 "link": {
//                     "web_url": "http://www.daum.net/contents/1",
//                     "mobile_web_url": "http://m.daum.net/contents/1",
//                     "android_execution_params": "/contents/1",
//                     "ios_execution_params": "/contents/1"
//                 }
//             },
//             {
//                 "title": "비쥬얼이 끝내주는 오레오 카푸치노",
//                 "description": "매거진",
//                 "image_url": "https://mud-kage.kakao.com/dn/boVWEm/btqfFGlOpJB/mKsq9z6U2Xpms3NztZgiD1/openlink_640x640s.jpg",
//                 "image_width": 640,
//                 "image_height": 640,
//                 "link": {
//                     "web_url": "http://www.daum.net/contents/2",
//                     "mobile_web_url": "http://m.daum.net/contents/2",
//                     "android_execution_params": "/contents/2",
//                     "ios_execution_params": "/contents/2"
//                 }
//             },
//             {
//                 "title": "감성이 가득한 분위기",
//                 "description": "매거진",
//                 "image_url": "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
//                 "image_width": 640,
//                 "image_height": 640,
//                 "link": {
//                     "web_url": "http://www.daum.net/contents/3",
//                     "mobile_web_url": "http://m.daum.net/contents/3",
//                     "android_execution_params": "/contents/3",
//                     "ios_execution_params": "/contents/3"
//                 }
//             }
//         ],
//         "buttons": [
//             {
//                 "title": "웹으로 이동",
//                 "link": {
//                     "web_url": "http://www.daum.net",
//                     "mobile_web_url": "http://m.daum.net"
//                 }
//             },
//             {
//                 "title": "앱으로 이동",
//                 "link": {
//                     "android_execution_params": "main",
//                     "ios_execution_params": "main"
//                 }
//             }
//         ]
//     }'
