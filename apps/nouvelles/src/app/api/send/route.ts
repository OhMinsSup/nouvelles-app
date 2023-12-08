import { API_ENDPOINTS } from "~/constants/constants";
import { accountsService } from "~/server/accounts/accounts.server";
import { getSession } from "~/server/auth";
import { itemService } from "~/server/items/items.server";
import createTemplateMessage from "~/server/template/createTemplateMessage";
import { fetchService } from "~/services/fetch/client";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return new Response(
      JSON.stringify({ status: 401, statusText: "Unauthorized" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const account = await accountsService.getAccount(session.user.id, "kakao");
  if (!account) {
    return new Response(
      JSON.stringify({ status: 404, statusText: "Not Found" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const { list } = await itemService.getItemsByMessage({
    category: "MZ 소비 트렌드",
    limit: 5,
  });

  const { template_object } = createTemplateMessage(list);

  const response = await fetchService.raw(API_ENDPOINTS.kakao_default_message, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${account.access_token}`,
    },
    body: new URLSearchParams({
      template_object: JSON.stringify(template_object),
    }).toString(),
  });

  const { status, statusText } = response;

  const data = await response.json();

  return new Response(JSON.stringify({ status, statusText, data }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
