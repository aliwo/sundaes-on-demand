import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // ScoopOption 이 비동기 axios 요청에 의해 생성 되므로 getAllByRole() 은 못 찾는다. findAllByRole() 해야 함.
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  // Then
  expect(scoopImages).toHaveLength(2);
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("토핑 찾기", async () => {
  // Given
  render(<Options optionType="toppings" />);

  // When
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  // Then
  expect(toppingImages).toHaveLength(3);
  const imageTitles = toppingImages.map((img) => img.alt);
  expect(imageTitles).toStrictEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
