import { render, screen, waitFor } from "@testing-library/react";

import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  // waitFor 는 조건이 만족될 때 까지 기다린다.
  // 2개의 axios 호출이 실패하고, alert가 2개가 생기는게 맞긴 하다.
  // 그러나 첫 번째 axios 호출이 응답되었을 때 await screen.findAllByRole("alert") 이 만족되고, 이때 alert 개수는 하나다.
  // 2개 alert 를 모두 기다리려면 아래와 같이 waitFor() 를 써야 한다.
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
